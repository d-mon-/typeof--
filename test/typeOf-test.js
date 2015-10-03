/**
 * Created by GUERIN Olivier, on 14/09/2015.
 * Twitter: @MisterRaton
 */
'use strict';
const assert = require('assert');
const typeOf = require('../index');
var count=0,total=0;

function log(value, expect) {
    /*if(value !== null && value !== undefined && typeof value === 'object' ){
        value.constructor = undefined;
    }*/
    var _type = typeOf(value);
    var _r = _type === expect;
    if (_r) {
        console.log('ok :', _type, '==>', expect);
        count++;
    } else {
        console.log('not ok :', _type, '==>', expect, '#ERROR:', value);
    }
    total++;
}

//#null
log(null, 'Null');

//#undefined
log(undefined, 'Undefined');

//#NaN
log(NaN, 'NaN');
log(new Number(NaN), 'NaN');

//#String
log(new String('test'), 'String');
log('test', 'String');

//#Number
log(new Number(42), 'Number');
log(42, 'Number');

//#Boolean
log(new Boolean(false), 'Boolean');
log(false, 'Boolean');

//#Array
log([], 'Array');
log(new Array(), 'Array');

//#Object
log({}, 'Object');
log(new Object(), 'Object');

//#Symbol
try {
    log(Symbol("Foo"), 'Symbol');
} catch (err) {
    console.log(err.message, '-> SKIP')
}


//#regexp
log(/test/, 'RegExp')
log(new RegExp(), 'RegExp');

//#function
log(new Function(), 'Function');
log(function () {
}, 'Function');
try {
    log(()=> {
    }, 'Function');
} catch (err) {
    console.log(err.message, '-> SKIP');
}
//#generators
try {
    log(function*() {
    }, 'GeneratorFunction');
    log(new GeneratorFunction(), 'GeneratorFunction')
} catch (err) {
    console.log(err.message, '-> SKIP');
}
//#Promise
try {
    log(new Promise(function () {
    }), 'Promise');
} catch (err) {
    console.log(err.message, '-> SKIP');
}

//#TypedArray
try {
    log(new Uint32Array(), 'Uint32Array');
    log(new ArrayBuffer(), 'ArrayBuffer');
    log(new DataView(new ArrayBuffer()), 'DataView');
} catch (err) {
    console.log(err.message, '-> SKIP');
}

//#Error
log(new Error(), 'Error');
log(new TypeError(), 'TypeError');

//#map/set
try {
    log(new Map(), 'Map');
    log(new WeakMap(), 'WeakMap');
    log(new Set(), 'Set');
    log(new WeakSet(), 'WeakSet');
} catch (err) {
    console.log(err.message, '-> SKIP');
}

//#Date
log(new Date(), 'Date');
try {
    log(new Iterator('a'), 'Iterator');
} catch (err) {
    console.log(err.message, '-> SKIP');
}

//custom class
function MyOwnClass(){}
log(new MyOwnClass, 'MyOwnClass');

var MyAnonymousClass = function (){};
log(new MyAnonymousClass() , '#Anonymous');

//#special
log(new(function $(){}), '$');
log(new(function _(){}), '_');
log((function(){ return arguments })(), 'Arguments');
log(JSON,'JSON');
log(Math,'Math');


console.log('RESULT: '+count+'/'+total+' passed');