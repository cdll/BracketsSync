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

/*
 *
 * Do *NOT* translate the string keys on the left of the colon.  These string
 *    keys *MUST* match the string values inherited from the JS source.
 *
 */

define(["text!./license.html"], function (licenseText) {
    "use strict";
    
    return {
        "EXTENSION_NAME":                   "Extract for Brackets (Preview)",

        // Menus
        "MENU_CC_SIGN_IN":                  "Sign In to Creative Cloud\u2026",
        "MENU_CC_SIGN_OUT":                 "Sign Out ({0})",
        "MENU_HELP_ONLINE":                 "Extract for Brackets Online Help",
        "MENU_HELP_TUTORIAL":               "Open Extract for Brackets Tutorial",

        // EULA
        "EULA_DIALOG_TITLE":                "Extract for Brackets (Preview) Software License Agreement",
        "EULA_HEADER":                      "The Adobe Software License Agreement only covers your use of the Extract for Brackets (Preview) feature and not Brackets as a whole. If you decline, you will be unable to use Extract for Brackets (Preview). Brackets will continue to work normally and is covered under an MIT license. Using Brackets does not require acceptance of a license agreement.",
        "EULA_CONTENT":                     licenseText,
        "EULA_OPT_OUT_NOTICE":              "<span class='dialog-notice-header strong'>Usage Statistics</span><br>In order to improve Extract for Brackets, we periodically send <strong>anonymous</strong> data about how you use the extension. You can change your preference at any time by clicking on the <span class=\"e4b-settings-icon\"/> icon in the Extract panel and modifying the \"Send Anonymous Usage Statistics\" setting. <a href=\"{PRIVACY_URL}\">Learn more</a>.",
        "TERMS_OF_USE":                     "Terms of Use",

        "EULA_BTN_ACCEPT":                  "Accept",
        "EULA_BTN_DECLINE":                 "Decline",

        "EXPLORE_EXTRACT_FOR_BRACKETS":     "Extract for Brackets (Preview)",

        "FIRSTLAUNCH_POPUP_MSG":            "Click here to get started<br>with Extract for Brackets (Preview).<br>",
        "GOT_IT":                           "Got it!",

        "CALL_TO_ACTION_TITLE":             "Extract is a <strong>Creative Cloud</strong> service",
        "CALL_TO_ACTION_MESSAGE":           "Once you sign in with your Adobe ID, you can upload a PSD or view your already-uploaded PSDs and start extracting design information and assets.",
        "CALL_TO_ACTION_BUTTON":            "Sign In for Free\u2026",

        // Commands
        "SHOW_EXTRACT_FOR_BRACKETS":        "Show Extract for Brackets (Preview)",
        "RESET_TO_FIRST_LAUNCH":            "Extract for Brackets Reset to First Launch",
        "CMD_GUIDED_TUTORIAL":              "Extract for Brackets Tutorial",

        "MORE_INFO":                        "More info...",

        "OPEN_A_PSD":                       "Use Your Own PSD",
        "SHOW_HIDE_LAYERS":                 "Toggle Layers panel",
        
        "TOOLBAR_HIDE":                     "Hide",
        "TOOLBAR_HIDE_HINT":                "Get Started",
        "TOOLBAR_OR":                       "or",
        "GET_STARTED":                      "Open a PSD\u2026",
        "GET_STARTED_DESCRIPTION":          "Once you sign in with your Adobe ID, you can upload a PSD or view your already-uploaded PSDs and start extracting design information and assets.",
        "SIGN_UP":                          "Don't have an account?",
        "SIGN_UP_LINK":                     "Get a free account.",

        "UNSUPPORTED_BLEND_MODES":          "Your file contains unsupported blend modes. Rendering may be inaccurate.",

        "HINTS_HEADSUP":                    "Put your cursor inside a CSS rule to see code hints related to your PSD.",

        "CSS_ALL_FONT_STYLES":              "All Font Styles",

        "EXTRACT_INVALID_CHARS":            "Invalid filename: {0}<br>The filename cannot contain any invalid characters (ie. <code>{1}</code>) or character sequences.",
        "EXTRACT_ALREADY_EXISTS":           "The {0} <span class='dialog-filename'>{1}</span> already exists.",
        "EXTRACT_UNABLE_TO_WRITE":          "Unable to write {0} as <span class='dialog-filename'>{1}</span>.<br>{2}",
        "EXTRACT_BEFORE_RENAME":            "To extract an image:<ol><li>Edit the path to choose file name/location</li><li>Use a .JPG, .PNG or .SVG extension</li><li>Press ENTER to download</li></ol>New folders are created as needed.",
        "EXTRACT_AFTER_RENAME":             "<p class='callout-download-status'>Extracting asset\u2026</p><p>To generate a different file type or name, use code hints again.</p>",
        "EXTRACT_DOWNLOADING_STATUS":       "Extracting asset \"{0}\"\u2026",
        "EXTRACT_DOWNLOAD_COMPLETE":        "Done!",
        "EXTRACT_ASSET":                    "Extract Asset\u2026",
        
        // Preferences
        "PREF_DIALOG_TITLE":                "Preferences",
        "PREF_PRIVACY_TITLE":               "Usage Statistics",
        "PREF_PRIVACY_MESSAGE":             "In order to improve Extract for Brackets, we periodically send <strong>anonymous</strong> data about how you use the extension. <a href=\"{PRIVACY_URL}\">Learn more</a>.",
        "PREF_PRIVACY_CHECKBOX_LABEL":      "Yes, I would like to share information on how I use the Extract for Brackets Extension.",
        
        // SUSI Modal Interstitial
        "SUSI_LOADING_WINDOW_TITLE":        "Adobe ID",
        "SUSI_LOADING_BASE":                "Loading\u2026",
        "SUSI_LOADING_AUTHORIZE":           "Loading Adobe ID\u2026",
        "SUSI_LOADING_CHECK_STATUS":        "Verifying Adobe ID\u2026",
        "SUSI_LOADING_CHECK_TOKEN":         "Verifying Adobe ID\u2026",
        "SUSI_LOADING_PROFILE":             "Loading Profile\u2026",
        "SUSI_LOADING_VALIDATE_TOKEN":      "Verifying Adobe ID\u2026",
        "SUSI_LOADING_LOGOUT":              "Signing Out\u2026",

        // Buttons
        "CANCEL":                           "Cancel",
        "DONE":                             "Done",
        "CLOSE":                            "Close",

        // Error messages
        "SVG_NOT_AVAILABLE":                "Can not export this layer as SVG",
        "STATIC_CONTENT_SVG_NOT_AVAILABLE": "This demo PSD can't export SVG yet. Use JPG or PNG for this demo, or upload your own PSD.",
        "OFFLINE_ERROR":                    "Error accessing Creative Cloud.",
        "SERVICE_ERROR":                    "Error accessing Creative Cloud: {0}. Try again?",
        "STATIC_CONTENT_SERVICE_ERROR":     "This demo PSD can't merge layers yet. Upload your own PSD and try again.",
        "FILE_FORMAT_ERROR":                "Unsupported file format: {0}",
        "NO_VISIBLE_LAYERS_ERROR":          "No visible layers. To extract an image, choose layers that are visible.",
        "ERROR_OFFLINE_MESSAGE_SIGN_IN":    "sign in",
        "ERROR_OFFLINE_MESSAGE_SIGN_UP":    "sign up",
        "ERROR_OFFLINE_MESSAGE_SIGN_OUT":   "sign out",
        "ERROR_OFFLINE_MESSAGE":            "To {0}, please connect to the internet.",
        "ERROR_OFFLINE_USE_CACHE_MESSAGE":  "While offline, you have limited access to cached files, values from CSS, values for measurement, and single layer image extraction.",
        "ERROR_RENDER_TITLE":               "Error Displaying File",
        "ERROR_RENDER_MESSAGE":             "An error occurred when trying to display the file <span class='dialog-filename'>{0}</span>.",
        "ERROR_ASSET_LIST_MESSAGE":         "An error occurred when trying to view the folder <span class='dialog-filename'>{0}</span>.",

        // Override ccweb
        "Drag and Drop a PSD here":         "Drag PSD files here to upload",
        "Upload PSD":                       "Upload PSD",
        "UPLOADING":                        "UPLOADING",
        "PROCESSING":                       "PROCESSING",
        
        // help callout
        "NEXT":                             "Next",
        "GUIDED_TUTORIAL_1":                "Select a layer to get started with Extract for Brackets.",
        "GUIDED_TUTORIAL_2":                "To extract CSS or images, start typing (or hit Ctrl-Space) with your cursor inside a CSS rule.",
        "GUIDED_TUTORIAL_3":                "Shift-Click to select multiple layers to measure the distance between objects.",
        "GUIDED_TUTORIAL_4":                "When you're ready to use Extract with your own content, choose one of these options."
    };
});