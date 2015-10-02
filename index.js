/**
 * Created by GUERIN Olivier, on 30/09/2015.
 * Twitter: @MisterRaton
 */
;
(function (factory) {
        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = factory();
            }
            exports.typeOf = factory();

        }
        if (typeof define === 'function' && define.amd) {
            define(factory);
        }
    }(function () {
        var toString = Object.prototype.toString;

        /**
         * return the type/class-name of the value
         * return "Boolean"|"String"|"Function"|"Number"|"NaN"|"Null"|"Undefined"|"Error"|"TypeError"|"GeneratorFunction'|"Iterator"|"HTMLDocument"|"Symbol"|"RegExp" and more...
         * @param {*} value
         * @returns {String}
         */
        function typeOf(value) {
            if (value === undefined) return 'Undefined';
            if (value === null) return 'Null';
            var _constructor, type;

            if (typeof value.constructor === 'function' && (typeof value !== 'object' || value instanceof value.constructor)) {
                _constructor = value.constructor;
            } else if (typeof Object.getPrototypeOf === 'function') { //if main constructor is corrupted, try prototype.constructor
                var _prototype = (Object.getPrototypeOf(value));
                if (typeof _prototype === 'object' && typeof _prototype.constructor ==='function' && value instanceof _prototype.constructor) {
                    _constructor = _prototype.constructor;
                }
            }
            if (_constructor !== undefined) {
                if (_constructor.name !== undefined) {
                    type = _constructor.name || '#Anonymous';
                } else { //pre ES6
                    var cons_str = _constructor.toString(), index = cons_str.indexOf('(', 9);
                    if (index === 9) {
                        return '#Anonymous';
                    }
                    type = cons_str.slice(9, index);
                }
                if (type === 'Object') { //handle built-in object like JSON and Math
                    var _type = toString.call(value);
                    if (_type === "[object Object]") {
                        return type;
                    }
                    if (_type === "[object Math]") {
                        return 'Math';
                    }
                    if (_type === "[object JSON") {
                        return 'JSON';
                    }
                    //handle other type
                    return _type.slice(8, -1);
                }
            } else { //if corrupted constructor
                type = toString.call(value).slice(8, -1);
            }
            if (type === 'Number' && value != +value) {
                return "NaN";
            }
            return type;
        }

        return typeOf;
    })
);