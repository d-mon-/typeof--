/**
 * Created by GUERIN Olivier, on 30/09/2015.
 * Twitter: @MisterRaton
 */
;(function (factory) {
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
            var _constructor = value.__proto__.constructor, type;
            if (typeof _constructor === 'function') {
                if (_constructor.name !== undefined) {
                    type = _constructor.name || '#Anonymous';
                } else {
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
                    return _type.slice(8, -1);
                }
            } else {
                type = toString.call(value).slice(8, -1);
            }
            if (type === 'Number' && value != +value) {
                return "NaN";
            }
            return type;
        }
        return typeOf;
    })
)
;

