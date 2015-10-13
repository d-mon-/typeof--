/**
 * Created by GUERIN Olivier, on 04/10/2015.
 * Twitter: @MisterRaton
 */
;
(function (factory) {
        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = factory();
            }
            exports.getFunctionName = factory();

        }
        if (typeof define === 'function' && define.amd) {
            define(factory);
        }
    }(function () {
        var anonymous = '#Anonymous', extractFunctionName;
        var functionToString = Function.prototype.toString;

        if (functionToString.call(new (  function ie_proof /*ie_proof*/ () {})().constructor) === 'function ie_proof(){}') { //if >= IE Edge
            extractFunctionName = function (value) {
                var start_index = 9;
                var end_index = value.indexOf('(', start_index);
                return (start_index === end_index) ? anonymous : value.slice(start_index, end_index);
            }
        } else { //IE < Edge use RegEx
            var commentBlocRegexp = '\\/\\*(?:.|[\\r\\n])*?\\*\\/';
            var commentLinearRegexp = '\\/\\/.*?\\n';
            var commentRegex = '(?:' + commentBlocRegexp + '|' + commentLinearRegexp + '|' + '\\s' + ')*';
            var retrieveFunctionNameRegex = new RegExp(commentRegex + 'function' + commentRegex + '([\\w,\\$]*)' + '(?=[\\/,\\s,\\(])');

            extractFunctionName = function (value) {
                return value.match(retrieveFunctionNameRegex)[1] || anonymous;
            };
        }
        /**
         * return the name of a function
         * @param {Function} value
         * @returns {String}
         */
        function getFunctionName(value) {
            if (typeof value.name === 'string') {
                return value.name || anonymous;
            } else { //pre ES6
                return extractFunctionName(functionToString.call(value));
            }
        }

        return getFunctionName;
    })
);



