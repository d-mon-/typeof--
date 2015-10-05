/**
 * Created by GUERIN Olivier, on 05/10/2015.
 * Twitter: @MisterRaton
 */
;
(function (factory) {
        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = factory();
            }
            exports.getOwnConstructor = factory();

        }
        if (typeof define === 'function' && define.amd) {
            define(factory);
        }
    }(function () {
        var getPrototypeOf = Object.getPrototypeOf;

        if (typeof getPrototypeOf !== 'function') { // < IE9
            getPrototypeOf = function (value) {
                var prototype = value.__proto__;
                if (typeof  prototype === "object" && prototype !== null) {
                    return prototype
                }
                var constructor = value.constructor;
                if (typeof constructor === 'function') {
                    prototype = constructor.prototype;
                    if (typeof prototype === 'object' && prototype !== null) {
                        return prototype;
                    }
                }
                return null;
            }
        }

        function getOwnConstructor(value) {
            //expect value !== null
            if (typeof value !== 'object' || (typeof value.constructor === 'function' && value instanceof value.constructor)) { //primitive values always return true, otherwise check instanceof
                return value.constructor;
            } else if (typeof getPrototypeOf === 'function') { //if main constructor is  corrupted, try prototype.constructor
                var prototype = getPrototypeOf(value);
                if (prototype !== null && typeof prototype.constructor === 'function' && value instanceof prototype.constructor) {
                    return prototype.constructor;
                }
            }
            return null;
        }

        return getOwnConstructor;
    })
);



