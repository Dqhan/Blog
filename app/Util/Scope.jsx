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

    return new Events();

}, '$Scope');