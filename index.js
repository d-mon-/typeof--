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
        /**
         * return the type/class-name of the value
         * return "Boolean"|"String"|"Function"|"Number"|"NaN"|"Null"|"Undefined"|"Error"|"TypeError"|"GeneratorFunction'|"Iterator"|"HTMLDocument"|"Symbol"|"RegExp" and more...
         * @param {*} value
         * @returns {String}
         */
        function typeOf(value) {
            if (value === undefined) return 'Undefined';
            if (value === null) return 'Null';
            try {
                var _constructor = value.constructor, type;
                if (typeof _constructor === 'function') {
                    if (_constructor.name !== undefined) {
                        if (_constructor.name === '') {
                            return '#Anonymous';
                        }
                        type = _constructor.name;
                    } else {
                        var cons_str = _constructor.toString(), index = cons_str.indexOf('(', 9);
                        if (index === 9) {
                            return '#Anonymous';
                        }
                        type = cons_str.slice(9, index);
                    }
                    if (type === 'Object') { //handle built-in object like JSON and Math
                        var _type = Object.prototype.toString.call(value);
                        return (_type === "[object Object]") ? type : _type.slice(8, -1);
                    }
                } else {
                    type = Object.prototype.toString.call(value).slice(8, -1);
                }
                if (type === 'Number' && isNaN(value)) {
                    return "NaN";
                }
                return type;
            } catch (error) { //Cannot read property 'constructor'
                if (typeof console === 'object') {
                    if (typeof console.error === 'function') {
                        console.error(error); //print to stderr
                    } else {
                        console.log(error);
                    }
                } else {
                    throw error;
                }
            }
        }
        return typeOf;
    })
);

