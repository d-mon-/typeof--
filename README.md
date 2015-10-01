# typeof--
typeof-in: light version

**Consider using [lodash](https://lodash.com) or [kind-of](https://www.npmjs.com/package/kind-of) first!**
# Usage:
```js
var typeOf = require('typeof--');

console.log(typeOf('lolipop')) // 'String'
console.log(typeOf(42)) //  'Number'
console.log(typeOf(false)) // 'Boolean'
console.log(typeOf(/myRegExp/)) // 'RegExp'

console.log(typeOf(null)) // 'Null'
console.log(typeOf(undefined)) // 'Undefined'
console.log(typeOf(NaN)) // 'NaN'

console.log(typeOf([])) // 'Array'
console.log(typeOf({})) // 'Object'

console.log(typeOf(new TypeError())) // 'TypeError'

console.log(typeOf(Math)) // 'Math'

// and so on ...


function MyOwnClass(){}
var myOwnInstance = new MyOwnClass()
console.log(typeOf(myOwnInstance)) // 'MyOwnClass'

myOwnInstance.constructor = undefined;
console.log(typeOf(myOwnInstance)) // 'Object'

var MyAnonymousClass = function(){}; 
console.log(typeOf(new MyAnonymousClass())) // '#Anonymous', you might prefer to use instanceof here.

console.log(typeOf((function(){ return arguments })()) ) // 'Arguments'
```



# Why use *typeof--* ? 
## JS is, somehow, broken
```js
console.log(typeof null) // 'object'
console.log(null instanceof Object) //false
``` 
null shouldn't be an object... And even if it is the case in JavaScript, null is not even an instance of Object...

```js
console.log(typeof /regularexpression/) // 'object'
```
every time I see this line, I would expect *'regexp'*

```js
console.log(typeof new Number(42)) //'object'
console.log(typeof 42) //'number'
```
new Number(42) and 42 have the same constructor name, but doesn't have the same type...
(String and Boolean have the same "problem")

```js
console.log(typeof NaN) //'number'
console.log(typeof new Number(NaN)) //'object'
```
And one of the most famous example in JS is NaN (a.K.a Not A Number) which return a type of number...

and some more...

## typeof-- overview:

all the type returned by typeof-- are strings

**null**, **undefined** and **NaN** have their own type (respectively: **'Null'**, **'Undefined'** and **'NaN'**)

**String**, **Number** and **Boolean** return the exact same type whether it's an object or a primitive value.

All *objects* return their **own constructor.name**.

If no constructor can be found, the algorithm will call *Object.prototype.toString()* on the value.

An Instance of an anonymous constructor will return #Anonymous.

And finally, built-in object like **Math** and **JSON** will return their **own name**.


|                **values**               |      **types**      |
|:---------------------------------------:|:-------------------:|
|                    42                   |       'Number'      |
|              new Number(42)             |       'Number'      |
|                'lolipop'                |       'String'      |
|          new String('lolipop')          |       'String'      |
|                   true                  |      'Boolean'      |
|            new Boolean(true)            |      'Boolean'      |
|                /myRegExp/               |       'RegExp'      |
|          new RegExp(/myRegExp/)         |       'RegExp'      |
|                   null                  |        'Null'       |
|                undefined                |     'Undefined'     |
|                   NaN                   |        'NaN'        |
|            new Number('NaN')            |        'NaN'        |
|                    []                   |       'Array'       |
|               new Array()               |       'Array'       |
|                    {}                   |       'Object'      |
|               new Object()              |       'Object'      |
|               new Error()               |       'Error'       |
|             new TypeError()             |     'TypeError'     |
|                new Date()               |        'Date'       |
|                  Object                 |      'Function'     |
|               function(){}              |      'Function'     |
|       new (function MyKlass(){})()      |      'MyKlass'      |
|           new (function(){})()          |     '#Anonymous'    |
| [global] Math                           |        'Math'       |
| [global] JSON                           |        'JSON'       |
| [ES6:promise] new Promise(function(){}) |      'Promise'      |
| [ES6:generator] function*(){}           | 'GeneratorFunction' |
| [ES6:Symbol] Symbol('foo')              |       'Symbol'      |
| [ES6:fat arrow] ()=>{}                  |      'Function'     |

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

you might also be interested with the [typeof-in library](https://www.npmjs.com/package/typeof-in)

Finally, I'm open to any suggestions.


