/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
    "use strict";

    var _           = brackets.getModule("thirdparty/lodash"),
        urls        = require("i18n!nls/urls"),
        stringsCCW  = require("i18n!nls/str"),                  // strings used by Extract CCW
        stringsE4B  = require("i18n!nls/strings");              // E4B-specific strings

    var additionalGlobals = $.extend({}, urls);
    
    // Insert application strings
    _.forEach(stringsE4B, function (value, key) {
        _.forEach(additionalGlobals, function (item, name) {
            stringsE4B[key] = stringsE4B[key].replace(new RegExp("{" + name + "}", "g"), additionalGlobals[name]);
        });
    });
    
    module.exports = _.extend({}, stringsCCW, stringsE4B, urls);
});