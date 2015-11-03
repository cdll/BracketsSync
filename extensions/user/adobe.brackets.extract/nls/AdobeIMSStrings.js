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
/*global define */

define(function (require, exports, module) {
    
    'use strict';
    
    // Code that needs to display user strings should call require("AdobeIMSStrings") to load
    // AdobeIMSStrings.js. This file will dynamically load AdobeIMSStrings.js for the locale specified by brackets.locale.
    // 
    // Translations for other locales should be placed in nls/<locale<optional country code>>/AdobeIMSStrings.js
    // Localization is provided via the i18n plugin.
    // All other bundles for languages need to add a prefix to the exports below so i18n can find them.
    // TODO: dynamically populate the local prefix list below?
    module.exports = {
        root: true,
        "fr": true,
        "ja": true
    };
});