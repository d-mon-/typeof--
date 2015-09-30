/**
 * Created by GUERIN Olivier, on 14/09/2015.
 * Twitter: @MisterRaton
 */
module.exports = function (value) {
    var result, _constructor = value.constructor;
    if (_constructor !== undefined) {
        if (_constructor.name !== undefined) {
            result = _constructor.name || '#Anonymous';
        } else {
            var cons_str = _constructor.toString(), index = cons_str.indexOf('(', 9);
            result = (index === 9) ? '#Anonymous' : cons_str.slice(9, index);
        }
    }
    //handle built-in object like JSON and Math
    return (result === 'Object') ? Object.prototype.toString.call(value).slice(8, -1) : result;
};