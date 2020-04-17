"use stricts";

; (function (
    global,
    factory,
    plugin) {
    global[plugin] = factory.call(global);
})(window, function () {
    function Events() {
        this.__eventsC__ = {

        };
    };

    Events.prototype = {
        register: function (key, fn) {
            this.__eventsC__[key] = fn;
        },
        trigger: function (key) {
            this.__eventsC__[key]();
        },
        remove: function (key) {
            delete this.__eventsC__[key];
        }
    }

    function Variables() {
        this.__variablesC__ = {

        };
    }

    Variables.prototype = {
        add: function (key, value) {
            this.__variablesC__[key] = value;
        },
        remove: function (key) {
            delete this.__variablesC__[key];
        },
        get: function (key) {
            return this.__variablesC__[key];
        }
    }

    var Modules = {};

    return {
        Events: new Events(),
        Variables: new Variables(),
        Modules
    }

}, '$Scope');