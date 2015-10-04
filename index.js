/**
 * Created by GUERIN Olivier, on 30/09/2015.
 * Twitter: @MisterRaton
 */
;(function (factory) {
        if (typeof exports !== 'undefined') {
            var extractFunctionName = require('./extractFunctionName');
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = factory(extractFunctionName);
            }
            exports.typeOf = factory();

        }
        if (typeof define === 'function' && define.amd) {
            define(['./extractFunctionName'],factory);
        }
    }(function (extractFunctionName) {
        var objectToString = Object.prototype.toString;
        var getPrototypeOf = Object.getPrototypeOf;

        //based on Object.getPrototypeOf polyfill
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

        /**
         * return the type/class-name of the value
         * return "Boolean"|"String"|"Function"|"Number"|"NaN"|"Null"|"Undefined"|"Error"|"TypeError"|"GeneratorFunction'|"Iterator"|"HTMLDocument"|"Symbol"|"RegExp" and more...
         * @param {*} value
         * @returns {String}
         */
        function typeOf(value) {
            if (value === undefined) return 'Undefined';
            if (value === null) return 'Null';

            var constructor, type;

            if (typeof value !== 'object' || (typeof value.constructor === 'function' && value instanceof value.constructor)) { //primitive values always return true, otherwise check instanceof
                constructor = value.constructor;
            } else if (typeof getPrototypeOf === 'function') { //if main constructor is  corrupted, try prototype.constructor
                var prototype = getPrototypeOf.call(value);
                if (prototype !== null && typeof prototype.constructor === 'function' && value instanceof prototype.constructor) {
                    constructor = prototype.constructor;
                }
            }

            if (constructor !== undefined) {
                type = extractFunctionName(constructor);
                if (type === 'Object') { //handle built-in object like JSON and Math
                    var objectType = objectToString.call(value);
                    return (objectType === "[object Object]") ? type : objectType.slice(8, -1);
                }
            } else { //if constructors are corrupted
                type = objectToString.call(value).slice(8, -1);
            }
            return (type === 'Number' && value != +value) ? 'NaN' : type;
        };

        return typeOf;
    })
);