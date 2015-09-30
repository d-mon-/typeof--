/**
 * Created by GUERIN Olivier, on 30/09/2015.
 * Twitter: @MisterRaton
 */
const getConstructorName = require('./getConstructorName');

/**
 * return the type/class-name of the value
 * return "Boolean"|"String"|"Function"|"Number"|"NaN"|"Null"|"Undefined"|"Error"|"TypeError"|"GeneratorFunction'|"Iterator"|"HTMLDocument"|"Symbol"|"RegExp" and more...
 * @param {*} value
 * @returns {String}
 */
module.exports = function typeOf(value) {
    if (value === undefined) return 'Undefined'; //undefined values are more likely to happen than null
    if (value === null) return 'Null';

    var type = getConstructorName(value);

    if (type === 'Number') { //Number type is more likely to happen than 'Object' type
        return (isNaN(value)) ? "NaN" : type;
    }
    if (type === 'Object') {
        var _type = Object.prototype.toString.call(value);
        return (_type === "[object Object]") ? type : _type.slice(8, -1);
    }
    return type;
};