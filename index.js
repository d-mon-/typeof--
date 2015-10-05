/**
 * Created by GUERIN Olivier, on 30/09/2015.
 * Twitter: @MisterRaton
 */
;(function (factory) {
        if (typeof exports !== 'undefined') {
            var extractFunctionName = require('./extractFunctionName');
            var getOwnConstructor = require('./getOwnConstructor');
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = factory(extractFunctionName, getOwnConstructor);
            }
            exports.typeOf = factory(extractFunctionName, getOwnConstructor);

        }
        if (typeof define === 'function' && define.amd) {
            define(['./extractFunctionName','./getOwnConstructor'],factory);
        }
    }(function (extractFunctionName, getOwnConstructor) {
        var objectToString = Object.prototype.toString;

        /**
         * return the type/class-name of the value
         * return "Boolean"|"String"|"Function"|"Number"|"NaN"|"Null"|"Undefined"|"Error"|"TypeError"|"GeneratorFunction'|"Iterator"|"HTMLDocument"|"Symbol"|"RegExp" and more...
         * @param {*} value
         * @returns {String}
         */
        function typeOf(value) {
            if (value === undefined) return 'Undefined';
            if (value === null) return 'Null';

            var constructor = getOwnConstructor(value), type;

            if (typeof constructor === 'function') {
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