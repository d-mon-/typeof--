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



