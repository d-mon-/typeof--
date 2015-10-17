# typeof-- [![npm version][npm-image-v]][npm-url] [![npm download][npm-image-dm]][npm-url] [![npm total][npm-image-dt]][npm-url] 

#### retrieve the type of your value by using constructors when possible

[![build status][travis-image]][travis-url] 

[![saucelabs matrix][saucelabs-matrix]][saucelabs-url]


[travis-image]: https://img.shields.io/travis/d-mon-/typeof--.svg?style=flat
[travis-url]: https://travis-ci.org/d-mon-/typeof--
[npm-image-dt]:https://img.shields.io/npm/dt/typeof--.svg?style=flat
[npm-image-dm]:https://img.shields.io/npm/dm/typeof--.svg?style=flat
[npm-image-v]: https://img.shields.io/npm/v/typeof--.svg?style=flat
[npm-url]: https://npmjs.org/package/typeof--
[saucelabs-matrix]: https://saucelabs.com/browser-matrix/typeof--.svg
[saucelabs-url]: https://saucelabs.com/u/typeof--

# Foretaste
when it can, **typeof--**  retrieves the type of your value by extracting the name of its constructors
```js
var typeOf = require('typeof--');
typeOf(42); // 'Number';
```

# Why use *typeof--* ? 
## typeof and instanceof are, somehow, broken
### null
For example, **null** has a type of an object, but it is not an instance of Object.
```js
typeof null; // 'object'
null instanceof Object //false
``` 
**\[fun fact\]** *Object.prototype* has the same result as *null* with *typeof* and *instanceof*

### RegEx
Using a regular expression literal, someone would expect **typeof** to return a specific value like **"regexp"** which would be great in a perfect world.
```js
typeof /regularExpression/ // 'object'
/regularExpression/ instanceof RegExp // true
```
So, if you're dealing with regex, use instanceof.
### Primitives x Objects
Unlike RegEx, other values like **Number**, **String** or **Boolean** have some issues when we want to retrieve their type when we use them as primitive or object (*wrapper*).
```js
typeof new Number(42) //'object' , create an object
typeof Number(42) //'number', create a primitive value
typeof 42 //'number'

666 instanceof Number //false
new Number(42) instanceof (666).constructor //true, because:
(666).constructor === Number.prototype.constructor
```
So, the previous example shows that it is possible to verify a primitive value with **typeof** and its wrapper with **instanceof** but we can't test both of them with the same method even if they share the same constructor. One method to deal with this problem would be to use **typeof value.valueOf()**.

### NaN
One of the most famous example in JavaScript is **NaN** (a.K.a *"Not a Number"*) which return a type of: **number**... 
```js
typeof NaN //'number' *sigh*
typeof new Number(NaN) //'object' *sigh* x 2
```

### Prototypes
As you may have noticed above, prototypes have a weird behavior. For example, the prototype of an Array is an empty Array, and it is the same thing with Number, String, Boolean... which store a default value (0,"",false). Therefore, we would expect them to be an instance of their own constructor. But, sadly, it is not the case... 
```js
Number.prototype instanceof Number //false
Number.prototype instanceof Number.prototype.constructor //false

//the best method so far to deal with it.
Object.prototype.toString.call(Number.prototype) //'[object Number]'
```

**And many more...** 

## Why typeof-- help us:

*typeof--* retrieve the constructor name when this one is valid. Otherwise it will call *Object.prototype.toString*. 

**String**, **Number** and **Boolean** return the exact same type whether it's an object or a primitive value.

**null**, **undefined** and **NaN** have their own type (respectively: **#Null**, **#Undefined** and **#NaN**)

An Instance of an anonymous constructor will return **#Anonymous** instead of an empty string to improve readability.

And finally, the library can deal with built-in object like *JSON*, *Math* or *prototypes* by calling *Object.prototype.toString* when the type extracted from constructors is equal to **"Object"**.

# Usage:
```js
var typeOf = require('typeof--');
function MyCustomClass(){}
var AnonymousClass = function(){}; 

typeOf('lollipop');// 'String'
typeOf(42);        // 'Number'
typeOf(false);     // 'Boolean'
typeOf(/myRegExp/);// 'RegExp'
typeOf(null);      // '#Null'
typeOf(undefined); // '#Undefined'
typeOf(NaN);       // '#NaN'
typeOf([]);        // 'Array'
typeOf({});        // 'Object'
typeOf(Math);      // 'Math'
typeOf(new Number(NaN));     // '#NaN'
typeOf(Number.prototype);    // 'Number'
typeOf(new TypeError());     // 'TypeError'
typeOf(new MyCustomClass()); // 'MyOwnClass'
typeOf(new AnonymousClass());//'#Anonymous'

// /!\ be careful with constructors/!\
function tEsT(){}
var myObject = new tEsT();
typeOf(myObject) //tEsT, typeof-- is case sensitive

//invalid constructors will call Object.prototype.toString!
Object.getPrototypeOf(myObject).constructor = myObject.constructor = function hacked(){}; 
typeOf(myObject)//'Object'

// and so on ...
```

## force Object.prototype.toString call
you can force the call of *Object.prototype.toString* by adding **'forceObjectToString'**.
```js
typeOf( new Number(NaN), 'forceObjectToString') // '#NaN'
typeOf( new TypeError(), 'forceObjectToString') // 'Error'

function MyOwnClass(){}
typeOf(new MyOwnClass(), 'forceObjectToString'); // 'Object'

//on Node.JS
var mybuffer = new Buffer(4);
typeOf(myBuffer);               // 'Buffer'
typeOf(myBuffer, 'forceObjectToString'); // 'UInt8Array'
``` 
see table below for more example.  (**[tampered constructors]** column)
## table of common values
#### and their type returned by typeOf(value)
See [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) or [HTML API reference](https://developer.mozilla.org/en/docs/Web/API) for more types.

|                **values**               |      **types**      |  **tampered constructors** |
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
|             Array.prototype             |       'Array'       |       'Array'       | 
| [global] JSON                           |        'JSON'       |        'JSON'       |
| [ES6:promise] new Promise(function(){}) |      'Promise'      |     **'Object'**    |
| [ES6:generator] function*(){}           | 'GeneratorFunction' | 'GeneratorFunction' |
| [ES6:Symbol] Symbol('foo')              |       'Symbol'      |       'Symbol'      |
| [ES6:fat arrow] \()=>{}                 |      'Function'     |      'Function'     |

**'Arguments'** type become **'Object'** in **[IE6..8]**

Be careful with **Web APIs**, they might return different values depending on your browser version.

Example: typeOf(document) will return [IE6..8] *'Object'*, [IE9..10] *'Document'* or [IE11+] *'HTMLDocument'*

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