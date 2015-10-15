# typeof--
typeof-in: light version

compatible with **IE6+**

best performances on browsers/servers supporting ES6:Function.name

# Foretaste
when it can, **typeof--**  retrieves the type of your value by extracting the name of its constructor
```js
var typeOf = require('typeof--');
console.log(typeOf(42)); // 'Number';
```

# Why use *typeof--* ? 
## typeof and instanceof are, somehow, broken
### null
For example, **null** has a type of an object, but it is not an instance of Object.
```js
typeof null; // 'object'
null instanceof Object //false
``` 
**\[fun fact\]** *Object.prototype* has the same behavior as *null* with *typeof* and *instanceof*

### RegEx
Using a regular expression literal, someone would expect **typeof** to return a specific value like **"regexp"**, but it's not the case. (it's not a primitive value but a literal...)
```js
typeof /regularExpression/ // 'object'
/regularExpression/ instanceof RegExp // true
```
### Primitives x Objects
Unlike RegEx, other values like **Number**, **String** or **Boolean** have some issues when we want to retrieve their type when we use them as primitive or object (*wrapper*).
```js
typeof new Number(42) //'object'
typeof Number(42) //'number'
typeof 42 //'number'

666 instanceof Number //false
new Number(42) instanceof (666).constructor //true, because:
(666).constructor === Number.prototype.constructor
```
So, the previous example shows that it is possible to verify a primitive value with **typeof** and its wrapper with **instanceof** but we can't test both of them with the same method even if they share the same constructor. One method to deal with this problem would be to use **typeof value.valueOf()**.

### NaN
One of the most famous example in JavaScript is **NaN** (a.K.a *"Not a Number"*) which return a type of: **number**... \* sigh \*
```js
typeof NaN //'number'
typeof new Number(NaN) //'object'
```

### prototypes
As you may have noticed above, prototypes have a weird behavior. For example, the prototype of an Array is an empty Array, and it is the same thing with Number, String, Boolean... which store a default value (0,"",false). Therefore, we would expect them to be an instance of their own constructor. But, sadly, it is not the case... 
```js
Number.prototype instanceof Number //false
Number.prototype instanceof Number.prototype.constructor //false

//the best method so far to deal with it.
Object.prototype.toString.call(Number.prototype) //'[object Number]'
```

**And many more...** 

## why typeof-- help us:

typeof-- retrieve the constructor name when this one is valid. Otherwise it will call *Object.prototype.toString*. 

**String**, **Number** and **Boolean** return the exact same type whether it's an object or a literal.

**null**, **undefined** and **NaN** have their own type (respectively: **'#Null'**, **'#Undefined'** and **'#NaN'**)

An Instance of an anonymous constructor will return **#Anonymous** (for readability).

And finally, the library can deal with built-in object like JSON, Math or prototypes.

# Usage:
```js
var typeOf = require('typeof--');

console.log(typeOf('lollipop')) // 'String'
console.log(typeOf(42)) //  'Number'
console.log(typeOf(false)) // 'Boolean'
console.log(typeOf(/myRegExp/)) // 'RegExp'

console.log(typeOf(null)) // '#Null'
console.log(typeOf(undefined)) // '#Undefined'
console.log(typeOf(NaN)) // '#NaN'
console.log(typeOf(Number(NaN))) // '#NaN'

console.log(typeOf([])) // 'Array'
console.log(typeOf({})) // 'Object'

console.log(typeOf(new TypeError())) // 'TypeError'

console.log(typeOf(Math)) // 'Math'

console.log(typeOf(Number.prototype)) // 'Number'

function MyOwnClass(){}
var myOwnInstance = new MyOwnClass()
console.log(typeOf(myOwnInstance)) // 'MyOwnClass'

var MyAnonymousClass = function(){}; 
console.log(typeOf(new MyAnonymousClass())) // '#Anonymous'

// /!\ be careful with constructor/!\
function test(){}
var myObject = new tEsT();
console.log(typeOf(myObject)) //tEsT, so it is case sensitive

Object.getPrototypeOf(myObject).constructor = myObject.constructor = function hacked(){}; //tampered constructor

console.log(typeOf(myObject))//'Object', and is also 'constructor' sensitive

// and so on ...
```

### table of common values
##### and their type returned by typeOf(value)
[see JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

|                **values**               |      **types**      |  **tampered constructor** |
|:---------------------------------------:|:-------------------:|:-------------------:|
|                    42                   |       'Number'      |       'Number'      | 
|              new Number(42)             |       'Number'      |       'Number'      | 
|                'lolipop'                |       'String'      |       'String'      |
|           new String('lolipop')         |       'String'      |       'String'      |
|                   true                  |      'Boolean'      |      'Boolean'      |
|              new Boolean(true)          |      'Boolean'      |      'Boolean'      |
|                /myRegExp/               |       'RegExp'      |       'RegExp'      |
|          new RegExp(/myRegExp/)         |       'RegExp'      |       'RegExp'      |
|                   null                  |       '#Null'       |       '#Null'       |
|                undefined                |     '#Undefined'    |     '#Undefined'    |
|                   NaN                   |       '#NaN'        |       '#NaN'        |
|             new Number('NaN')           |       '#NaN'        |       '#NaN'        |
|                    []                   |       'Array'       |       'Array'       |
|               new Array()               |       'Array'       |       'Array'       |
|                    {}                   |       'Object'      |       'Object'      |
|               new Object()              |       'Object'      |       'Object'      |
|               new Error()               |       'Error'       |       'Error'       |
|             new TypeError()             |     'TypeError'     |     **'Error'**     |
|               new Map()                 |        'Map'        |        'Map'        |
|             new WeakMap()               |       'WeakMap'     |       'WeakMap'     |
|                new Date()               |        'Date'       |        'Date'       |
|                  Object                 |      'Function'     |      'Function'     |
|               function(){}              |      'Function'     |      'Function'     |
|    new (function MyCustomKlass(){})()   |      'MyKlass'      |     **'Object'**    |
|           new (function(){})()          |     '#Anonymous'    |     **'Object'**    |
|    (function(){ return arguments })()   |      'Arguments'    |      'Arguments'    | 
|           Array.prototype               |       'Array'       |       'Array'       | 
| [global] JSON                           |        'JSON'       |        'JSON'       |
| [ES6:promise] new Promise(function(){}) |      'Promise'      |     **'Object'**    |
| [ES6:generator] function*(){}           | 'GeneratorFunction' | 'GeneratorFunction' |
| [ES6:Symbol] Symbol('foo')              |       'Symbol'      |       'Symbol'      |
| [ES6:fat arrow] \()=>{}                 |      'Function'     |      'Function'     |

**'Arguments'** type become **'Object'** in **internet explorer < 9**

# with requireJS (AMD)
```js
require.config({
    baseUrl: "/",
    paths: {
        'typeOf':'./typeof--/index'
    }
});
requirejs(['typeOf'], function(typeOf) {
    console.log(typeOf(42)==='Number');
    console.log(typeOf(42)==='String');
});
```
[see the following example](https://github.com/d-mon-/typeof--/tree/master/example)

you might also be interested with the [typeof-in library](https://www.npmjs.com/package/typeof-in) which use instanceof when needed.

Finally, I'm open to any suggestions.


