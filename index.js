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
        var call = Function.prototype.call;
        var objectToString = call.bind(Object.prototype.toString);
        var functionToString = call.bind(Function.prototype.toString);
        var getPrototypeOf = Object.getPrototypeOf;
        var extract = function (value) {
            var end_index = value.indexOf('(', 9);
            if (9 === end_index) {
                return '#Anonymous';
            }
            return value.slice(9, end_index);
        };
        if (functionToString(new (  function ie_proof() {})().constructor) !== functionToString(function ie_proof() {})) {
            extract = function (value) {
                console.log(1,value);
                //cleaning constructor name (<IE 9)
                var result = value.replace(/(\/\*[^\\*]*\*\/)|(\/\/.*[\n]+)|(\s)/g, '') //remove /*...*/, //... , whitespaces, ...
                    .replace(/[^\w]*function/, '');     //remove everything before constructor name
                var index = result.indexOf('(');
                console.log(2,result,result.slice(0, index));
                return result.slice(0, index);
            }
        }

        extract = function (value) {
            console.log(1,value);
            //cleaning constructor name (<IE 9)
            var result = value
                .replace(/(\/\*(.|[\r\n])*?\*\/)|(\/\/.*\n)/g, '') //remove all comments
                .replace(/[^\w]*function/, '')
                .replace(/\s/g,'');
            var index = result.indexOf('(');
            console.log(2,result,result.slice(0, index));
            return result.slice(0, index);
        }

        //polyfill
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
            } else if (typeof getPrototypeOf === 'function') { //if main constructor is corrupted, try prototype.constructor
                var prototype = getPrototypeOf(value);
                if (prototype !== null && typeof prototype.constructor === 'function' && value instanceof prototype.constructor) {
                    constructor = prototype.constructor;
                }
            }

            if (constructor !== undefined) {
                if (constructor.name !== undefined) {
                    type = constructor.name || '#Anonymous';
                } else { //pre ES6
                    type = extract(functionToString(constructor))
                }
                if (type === 'Object') { //handle built-in object like JSON and Math
                    var objectType = objectToString(value);
                    return (objectType === "[object Object]") ? type : objectType.slice(8, -1);
                }
            } else { //if constructors are corrupted
                type = objectToString(value).slice(8, -1);
            }
            return (type === 'Number' && value != +value) ? 'NaN' : type;
        }

        return typeOf;
    })
);




