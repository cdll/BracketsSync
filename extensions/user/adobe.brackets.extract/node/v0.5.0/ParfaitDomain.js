/*
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */


/*jslint newcap: true, vars: true, plusplus: true, devel: true, node: true, nomen: true, indent: 4, maxerr: 50, sub: true */
/*global */

(function () {
    "use strict";

    var DOMAIN = "parfait-v0.5.0"; // TODO add build step

    var crypto = require("crypto"),
        fs = require("fs"),
        fsextra = require("fs-extra"),
        copy_paste = require('copy-paste'),
        Entities = require('html-entities').AllHtmlEntities,
        path = require("path"),
        http = require("http"),
        https = require("https"),
        httpProxy = require("http-proxy"),
        send = require("send"),
        url = require("url"),
        through = require("through"),
        zlib = require("zlib");
    
    var _domainManager,
        _servers = {},
        _imsServer,
        _cookie,
        _cachePath,
        _accessToken,
        entities = new Entities();

    function writeBase64(fullpath, data, callback) {
        var dirname = path.dirname(fullpath);

        function doWriteFile() {
            fs.writeFile(fullpath, new Buffer(data, "base64"), callback);
        }

        fs.exists(dirname, function (exists) {
            if (exists) {
                doWriteFile();
            } else {
                fsextra.mkdirp(dirname, function (err) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    doWriteFile();
                });
            }
        });
    }
    
    /**
     * @private
     * Handler function for the parfait.copy command.
     * @param {string} data Copies data to clipboard.
     */
    function cmdCopy(data, callback) {
        var str = entities.encodeNonASCII(data);
        copy_paste.copy(str, callback);
    }

    function _hashRequest(path) {
        return crypto.createHash("md5").update(path).digest("hex");
    }
    
    function _cacheFileFolder(reqURL, headers) {
        var cachePathFragement = headers['e4b-cache-path'] || "",
            sanitizedUrl = decodeURI(reqURL.pathname.replace(/:/, ""))  + "/";
        
        return _cachePath + cachePathFragement + sanitizedUrl;
    }
    
    function _cacheFilePath(reqURL, headers) {
        var cacheFileFolder = _cacheFileFolder(reqURL, headers);
        
        return cacheFileFolder + _hashRequest(reqURL.path);
    }

    function setCookie(cookie) {
        _cookie = cookie;
    }
    
    function _fetchCachedResponse(cacheFilePath, isCacheFallback, req, res) {
        fs.exists(cacheFilePath + "-boundary.txt", function (exists) {
            if (exists) {
                fs.readFile(cacheFilePath + "-boundary.txt", 'utf8', function (err, reqBoundary) {
                    res.setHeader("Content-Type", "multipart/related; boundary=" + reqBoundary);
                    try {
                        send(req, cacheFilePath).pipe(res);

                        if (isCacheFallback) {
                            _domainManager.emitEvent(DOMAIN, "cacheFallbackComplete", [req.url]);
                        }
                    } catch (sendErr) {
                        // Not in cache, do nothing (404)
                    }
                });
            } else {
                // don't send multipart header if there is no boundary.txt file
                send(req, cacheFilePath).pipe(res);

                if (isCacheFallback) {
                    _domainManager.emitEvent(DOMAIN, "cacheFallbackComplete", [req.url]);
                }
            }
        });
    }
 
    function _fetchRemoteResponse(target, req, res, proxy) {
        var sendCookie = false;

        // Only send IMS cookies to HTTPS adobe domains
        sendCookie = target.match(/https:\/\/\S+\.(adobe|adobelogin)\.com$/);

        proxy.web(req, res, {
            target: target,
            agent : https.globalAgent,
            headers: {
                host: url.parse(target).host,
                cookie: sendCookie ? _cookie : undefined,
                referer: "brackets-auth://redirectims.html"
            }
        });
    }
    
    function handleServiceRequest(proxyRes, req, res) {
        var request = proxyRes.req,
            reqURL = url.parse(req.url),
            cacheFileFolder = request && _cacheFileFolder(reqURL, req.headers),
            cacheFilePath = _cacheFilePath(reqURL, req.headers),
            encoding = proxyRes.headers["content-encoding"],
            writeStream,
            boundaryMarker = "";

        // Only cache GET and POST requests
        if (req.method !== "GET" && req.method !== "POST") {
            return;
        }

        // extract the boundary marker so that we can set it as a header when serving files from cache
        var saveBoundaryPipe = new through(function (data) {
            var dataStr,
                boundaryFilePath = cacheFilePath + "-boundary.txt",
                boundaryTerminator = '\n';

            if (!boundaryMarker) {
                dataStr = data.toString();
                var dataLines = dataStr.split(boundaryTerminator);

                // This will break if the syntax of the boundary marker changes :/
                boundaryMarker = dataLines[0].toString();
                boundaryMarker = boundaryMarker.replace("--", "");
                if (boundaryMarker.match(/Boundary/)) {
                    fs.writeFile(boundaryFilePath, boundaryMarker, null);
                }
            }

            this.queue(data);
        });

        // Create parent path using the pathname, e.g. /<psd-name>/introspect
        // Cache files are named with a hash based on the path (with search string), e.g. /api/v1/psd/HASH
        fsextra.mkdirpSync(cacheFileFolder);
        // Write response to psd-lens cache with MD5 hash of URL path as the file name
        writeStream = fs.createWriteStream(cacheFilePath);

        // decompress if gzip
        if (encoding === "gzip") {
            proxyRes.pipe(zlib.createGunzip()).pipe(writeStream);
        } else {
            proxyRes.pipe(saveBoundaryPipe);
            saveBoundaryPipe.pipe(writeStream);
        }

        _domainManager.emitEvent(DOMAIN, "proxyRequestComplete", [req.url]);
    }

    function _testCache(cacheFilePath, isCacheFallback, req, res, errBack) {
        // try to fetch from cache first if we are fetching PSD data
        fs.exists(cacheFilePath, function (exists) {
            if (exists) {
                _fetchCachedResponse(cacheFilePath, isCacheFallback, req, res);
            } else {
                errBack();
            }
        });
    }

    // HACK: https://git.corp.adobe.com/jhagenst/brackets-parfait-extension/issues/486
    function _patchEmit(proxy, proxyErrorHandler) {
        var baseEmit = proxy.emit;

        function patchedEmit() {
            var args = Array.prototype.slice.call(arguments),
                isError = args[0] === "error",
                req = isError && args[2];

            try {
                baseEmit.apply(proxy, args);
            } catch (err) {
                if (isError) {
                    // Special case handling for node-http-proxy server "error" event
                    console.error(req.url + " - Error from EventEmitter3.emit(): " + err);

                    if (proxyErrorHandler) {
                        proxyErrorHandler.apply(null, args.slice(1));
                    }
                } else {
                    // Unexpected error from a non-error event handler
                    console.error(args[0] + " event error from EventEmitter3.emit(): " + err);
                }
            }
        }

        proxy.emit = patchedEmit.bind(proxy);
    }

    function _createProxyErrorHandler(proxy) {
        return function (err, req, res) {
            var reqURL = url.parse(req.url),
                cacheFilePath = _cacheFilePath(reqURL, req.headers);

            // fallback to cache if we're offline
            _testCache(cacheFilePath, true, req, res, function () {
                // cache is empty AND offline, end the request
                res.writeHead(500);
                res.end();

                _domainManager.emitEvent(DOMAIN, "proxyRequestError", [req.url]);
            });
        };
    }
    
    function configureService(proxy, target) {
        var proxyErrorHandler = _createProxyErrorHandler(proxy);

        // Wrap emit with try/catch, directly call proxyErrorHandler if
        // exceptions are caught
        _patchEmit(proxy, proxyErrorHandler);

        proxy.on("proxyRes", handleServiceRequest);

        // Error indicates target is offline
        // Read from cache using MD5 hash of URL path
        proxy.on("error", proxyErrorHandler);

        // Create HTTP server
        _servers[target] = http.createServer(function (req, res) {
            var reqURL = url.parse(req.url),
                cacheFilePath = _cacheFilePath(reqURL, req.headers);

            if (reqURL.href.match(/rendition;size=/) ||
                    req.headers.accept === "application/vnd.adobe.directory+json" ||
                    reqURL.href.match(/:metadata/)) {
                // always try to refresh directory data and thumbnails
                _fetchRemoteResponse(target, req, res, proxy);
            } else {
                // try to fetch from cache first if we are fetching PSD data
                _testCache(cacheFilePath, false, req, res, function () {
                    // fallback to live data if the cache doesn't exist
                    _fetchRemoteResponse(target, req, res, proxy);
                });
            }
        });
    }
    
    function configureIMS(callback) {
        if (_imsServer) {
            callback(null, { port: _imsServer.address().port });
            return;
        }

        // Create proxy
        var proxy = httpProxy.createProxy();

        _patchEmit(proxy, function (err, req, res) {
            res.end();
        });

        // Create HTTP server
        _imsServer = http.createServer(function (req, res) {
            var reqURL = url.parse(req.url, true),
                target = reqURL.query["e4b-target-domain"];

            _fetchRemoteResponse(target, req, res, proxy);
        });

        // Start server, return dynamic port to Brackets
        _imsServer.listen(0, null, null, function () {
            callback(null, { port: _imsServer.address().port });
        });
    }
    
    function configureProxy(target, cachePath, callback) {
        if (_servers[target]) {
            callback(null, { port: _servers[target].address().port });
            return;
        }
        
        // Setup proxy server
        var proxy = httpProxy.createProxy();

        // Set cache if cache path was not set before
        _cachePath = _cachePath || cachePath;
        configureService(proxy, target);

        // Start server, return dynamic port to Brackets
        _servers[target].listen(0, null, null, function () {
            callback(null, { port: _servers[target].address().port });
        });
        
        _servers[target].timeout = 0;
    }
    
    /**
     * Clear the proxy cache by deleting the local folder cache
     * of downloaded PSD content.
     */
    function clearProxyCache(cachePath) {
        var _path = cachePath ? _cachePath + cachePath : _cachePath;
        
        fsextra.removeSync(_path);
    }

    /**
     * Initialize the "psdLensSupport" domain.
     * The extensions domain handles various file management tasks for PSD Lens.
     */
    function init(domainManager) {
        if (!domainManager.hasDomain(DOMAIN)) {
            domainManager.registerDomain(DOMAIN, {major: 0, minor: 1});
        }

        domainManager.registerEvent(
            DOMAIN,
            "cacheFallbackComplete",
            [
                {name: "url", type: "string"}
            ]
        );

        domainManager.registerEvent(
            DOMAIN,
            "proxyRequestError",
            [
                {name: "url", type: "string"}
            ]
        );

        domainManager.registerEvent(
            DOMAIN,
            "proxyRequestComplete",
            [
                {name: "url", type: "string"}
            ]
        );
        
        domainManager.registerCommand(
            DOMAIN,
            "writeBase64",
            writeBase64,
            true,
            "Write binary data to a file path",
            [{
                name: "path",
                type: "string",
                description: "absolute file path"
            }, {
                name: "data",
                type: "string",
                description: "Base64 encoded string"
            }],
            []
        );
        
        domainManager.registerCommand(
            DOMAIN,
            'copy',
            cmdCopy,  // command handler function
            true,
            'Copies data to clipboard.',
            [{name: 'data', type: 'string', description: 'data to be copied'}],
            []                      // no return
        );
        
        domainManager.registerCommand(
            DOMAIN,
            'setCookie',
            setCookie,
            false,
            'Specify cookies to send to adobe domains only',
            [
                {name: 'cookie', type: 'string', description: 'Cookie'}
            ],
            []
        );
        
        domainManager.registerCommand(
            DOMAIN,
            'configureProxy',
            configureProxy,  // command handler function
            true,
            'Configure CC Proxy',
            [
                {name: 'target', type: 'string', description: 'Host'},
                {name: 'cachePath', type: 'string', description: 'Path to Brackets cache'}
            ],
            [{
                name: "response",
                type: "Object",
                description: "Server configuration response"
            }]
        );
        
        domainManager.registerCommand(
            DOMAIN,
            'configureIMS',
            configureIMS,  // command handler function
            true,
            'Configure IMS Proxy',
            [],
            [{
                name: "response",
                type: "Object",
                description: "Server configuration response"
            }]
        );
        
        domainManager.registerCommand(
            DOMAIN,
            'clearProxyCache',
            clearProxyCache,
            true,
            'deletes cached PSD display content',
            [
                {name: 'cachePath', type: 'string', description: 'Path to Brackets cache'}
            ],
            []      // no return
        );

        _domainManager = domainManager;
    }
    
    

    // used to load the domain
    exports.init = init;
}());
