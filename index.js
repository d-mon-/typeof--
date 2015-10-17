/**
 * Created by GUERIN Olivier, on 30/09/2015.
 * Twitter: @MisterRaton
 */
;
(function (factory) {
        if (typeof exports !== 'undefined') {
            var getFunctionName = require('./getFunctionName');
            var getConstructor = require('./getConstructor');
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = factory(getFunctionName, getConstructor);
            }
            exports.typeOf = factory(getFunctionName, getConstructor);

        }
        if (typeof define === 'function' && define.amd) {
            define(['./getFunctionName', './getConstructor'], factory);
        }
    }(function (getFunctionName, getConstructor, undefined) {
        var objectToString = Object.prototype.toString;

        /**
         * retrieve type of value after calling Object.prototype.toString
         * @param value
         * @returns {String}
         */
        function getObjectToStringValue(value) {
            var result = objectToString.call(value);
            switch (result) {
                case '[object Undefined]':
                    return '#Undefined';
                case '[object Null]':
                    return '#Null';
                case '[object Object]':
                    return 'Object';
                case '[object Function]':
                    return 'Function';
                case '[object String]':
                    return 'String';
                case '[object Number]':
                    return (value != +value) ? '#NaN' : 'Number';
                case '[object Array]':
                    return 'Array';
                case '[object Boolean]':
                    return 'Boolean';
                case '[object RegExp]':
                    return 'RegExp';
                case '[object Symbol]':
                    return 'Symbol';
                case '[object Map]':
                    return 'Map';
                case '[object WeakMap]':
                    return 'WeakMap';
                case '[object Set]':
                    return 'Set';
                case '[object WeakSet]':
                    return 'WeakSet';
                case '[object Int8Array]':
                    return 'Int8Array';
                case '[object Uint8Array]':
                    return 'Uint8Array';
                case '[object Uint8ClampedArray]':
                    return 'Uint8ClampedArray';
                case '[object Int16Array]':
                    return 'Int16Array';
                case '[object Uint16Array]':
                    return 'Uint16Array';
                case '[object Int32Array]':
                    return 'Int32Array';
                case '[object Uint32Array]':
                    return 'Uint32Array';
                case '[object Float32Array]':
                    return 'Float32Array';
                case '[object Float64Array]':
                    return 'Float64Array';
                case '[object ArrayBuffer]':
                    return 'ArrayBuffer';
                case '[object DataView]':
                    return 'DataView';
                case '[object Error]':
                    return 'Error';
                case '[object Arguments]':
                    return 'Arguments';
                case '[object JSON]':
                    return 'JSON';
                case '[object Math]':
                    return 'Math';
                case '[object Date]':
                    return 'Date';
                default: //handle the rest (HTML element, future global objects,...)
                    return result.slice(8, -1);
            }
        }

        /**
         * return the constructor name if "defined" and "valid" of the value, otherwise return Object.prototype.toString
         * @param {*} value
         * @returns {String}
         */
        function typeOf(value, options) {
            if (value === undefined) return '#Undefined';
            if (value === null) return '#Null';
            if (options !== 'forceObjectToString') {
                var constructor = getConstructor(value);
                if (constructor !== null) {
                    var type = getFunctionName(constructor);
                    if (type === 'Object') {
                        return getObjectToStringValue(value);
                    }
                    return (type === 'Number' && value != +value) ? '#NaN' : type;
                }
            }
            return getObjectToStringValue(value);
        }

        return typeOf;
    })
);