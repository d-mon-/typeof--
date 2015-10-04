/**
 * Created by GUERIN Olivier, on 04/10/2015.
 * Twitter: @MisterRaton
 */





/**
 * Created by GUERIN Olivier, on 30/09/2015.
 * Twitter: @MisterRaton
 */
;(function (factory) {
        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = factory();
            }
            exports.extractFunctionName = factory();

        }
        if (typeof define === 'function' && define.amd) {
            define(factory);
        }
    }(function () {
        var anonymous = '#Anonymous', extract;
        var functionToString = Function.prototype.toString;

        if(functionToString.call(new (  function ie_proof /**/ () {})().constructor) === functionToString.call(function ie_proof(){})){ //if >= IE 9
            extract =  function (value) {
                var start_index = (value[0]==='f')?9:10; //fix bug on IE < edge (v[0]: '\n')
                var end_index = value.indexOf('(', start_index);
                return (start_index === end_index)? anonymous : value.slice(start_index, end_index);
            }
        } else {
            var commentBlocRegexp = '\\/\\*(?:.|[\\r\\n])*?\\*\\/';
            var commentLinearRegexp = '\\/\\/.*?\\n';
            var commentRegex = '(?:'+commentBlocRegexp+'|'+commentLinearRegexp+'|'+'\\s'+')*';
            var captureFunctionNameRegex = '([\\w,\\$]*)';
            var retrieveFunctionNameRegex = new RegExp(commentRegex + 'function' + commentRegex + captureFunctionNameRegex+'(?=[\/,\s,\(])');

            extract = function (value) {
                var result = value
                    .match(retrieveFunctionNameRegex)[1];
                return result||anonymous;
            };
        }
        function extractFunctionName(value){
            if (value.name !== undefined) {
                return value.name || anonymous;
            } else { //pre ES6
                return extract(functionToString.call(value));
            }
        }

        return extractFunctionName;
    })
);



