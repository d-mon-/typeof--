# typeof--
typeof-in: light version

compatible with **IE6+**

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

All *objects* return their **own constructor.name** (you are now advised!).

If no constructor can be found, the algorithm will call *Object.prototype.toString()* on the value.

An Instance of an anonymous constructor will return #Anonymous.

And finally, built-in object like **Math** and **JSON** will return their **own name**.

### tables of common values
##### and their type returned by typeOf(value)
|                **values**               |      **types**      |  **corrupted constructor** |
|:---------------------------------------:|:-------------------:|:-------------------:|
|                    42                   |       'Number'      |       'Number'      | 
|              new Number(42)             |       'Number'      |       'Number'      | 
|                'lolipop'                |       'String'      |       'String'      |
|          new String('lolipop')          |       'String'      |       'String'      |
|                   true                  |      'Boolean'      |      'Boolean'      |
|            new Boolean(true)            |      'Boolean'      |      'Boolean'      |
|                /myRegExp/               |       'RegExp'      |       'RegExp'      |
|          new RegExp(/myRegExp/)         |       'RegExp'      |       'RegExp'      |
|                   null                  |        'Null'       |        'Null'       |
|                undefined                |     'Undefined'     |     'Undefined'     |
|                   NaN                   |        'NaN'        |        'NaN'        |
|            new Number('NaN')            |        'NaN'        |        'NaN'        |
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
|       new (function MyKlass(){})()      |      'MyKlass'      |     **'Object'**    |
|           new (function(){})()          |     '#Anonymous'    |     **'Object'**    |
|    (function(){ return arguments })()   |      'Arguments'    |      'Arguments'    | 
| [global] Math                           |        'Math'       |        'Math'       |
| [global] JSON                           |        'JSON'       |        'JSON'       |
| [ES6:promise] new Promise(function(){}) |      'Promise'      |     **'Object'**    |
| [ES6:generator] function*(){}           | 'GeneratorFunction' | 'GeneratorFunction' |
| [ES6:Symbol] Symbol('foo')              |       'Symbol'      |       'Symbol'      |
| [ES6:fat arrow] \()=>{}                 |      'Function'     |      'Function'     |
**'Argument'** type become **'Object'** in **internet explorer < ie9**

the test was made on node.js >= v4.0.0

## Important

typeof-- uses **constructor(.name)** when possible, and is therefore influenced by the change of the constructor function!

Which imply that: an object "A" deriving from another object "B" will have the constructor of "B" and not "A", you can avoid this problem by using Object.assign, _.assign or _.extend...

Moreover, any change on the constructor will modify the type returned (cf: See the table above).

```js
function Example(){}
var test = new Example()
test.constructor = function hacked(); //undefined or null
console.log(typeOf(test)) //'Object'
```

To avoid such problem, use **instanceof**. Or you can also use the following library [typeof-in](https://www.npmjs.com/package/typeof-in)
```js
var typeOf = require('typeof-in');

function Example(){};

var test = new Example('test'); 
//before constructor corruption
typeOf(test).in('Example') //true
typeOf(test).in('Object')  //true
typeOf(test).in(Example)   //true
typeOf(test).in(Object)    //true

Object.getPrototypeOf(test).constructor = test.constructor = function hacked(){} //typeOf(test).getType() will return 'Object'

//after constructor corruption
typeOf(test).in('Example') //false
typeOf(test).in('Object')  //true
typeOf(test).in(Example)   //true
typeOf(test).in(Object)    //true
```

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


