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
    if (value === undefined) return 'Undefined'; //undefined values are more likely to happen than null and NaN
    if (value === null) return 'Null';
    if ((typeof value === "number" || value instanceof Number) && isNaN(value)) return "NaN";
    return getConstructorName(value);
};