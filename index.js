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
        var anonymous = '#Anonymous';
        var objectToString = Object.prototype.toString;
        var functionToString = Function.prototype.toString;
        var getPrototypeOf = Object.getPrototypeOf;
        var extract;

        if(functionToString.call(new (  function ie_proof() {})().constructor) === functionToString.call(function ie_proof() {})){ //if >= IE 9
            extract =  function (value) {
                var start_index = (value[0]!=='\n')?9:10; //fix bug on IE < edge
                var end_index = value.indexOf('(', start_index);
                return (start_index === end_index)? anonymous : value.slice(start_index, end_index);
            }
        } else {
            extract = function (value) {
                //cleaning constructor name (<IE 9)
                var result = value
                    .replace(/(\/\*(.|[\r\n])*?\*\/)|(\/\/.*\n)/g, '') //remove all comments
                    .replace(/[^\w]*function/, '')
                    .replace(/\s/g,'');
                var index = result.indexOf('(');
                return (index===0)?anonymous:result.slice(0, index);
            };
        }

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
                if (constructor.name !== undefined) {
                    type = constructor.name || anonymous;
                } else { //pre ES6
                    type = extract(functionToString.call(constructor));
                }
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