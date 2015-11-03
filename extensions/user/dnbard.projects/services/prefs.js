var PreferencesManager = require('preferences/PreferencesManager');

define(function(require, exports){
    var prefs = PreferencesManager.getExtensionPrefs('dnbard.projects'),
        _ = require('../vendor/lodash'),
        events = {},
        inits = {
            favorites: [],
            filter: ['favorite', 'regular'],
            customs: []
        };

    exports.init = function(){
        _.each(inits, function(initValue, initKey){
            if (prefs.get(initKey) === undefined){
                prefs.set(initKey, initValue);
            }
        });
    }

    exports.get = function(id){
        return prefs.get(id);
    }

    exports.set = function(id, value){
        if (typeof id === 'string' && value !== undefined){
            prefs.set(id, value);
        }

        if (typeof events[id] === 'function'){
            events[id](value);
        }
    }

    exports.notifier = function(id, handler){
        events[id] = handler;
    }
});
