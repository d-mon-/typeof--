# typeof--
typeof-in: light version

## Why use *typeof--* ? 
#### JS is, somehow, broken

> **typeof** null **===** 'object'
>
> null **instanceof** Object === **false**

null shouldn't be an object... And even if it is the case in JS, null is not an instance of Object...

> **typeof** /regularexpression/ **===** 'object'

every time I see this line, I would expect *'regexp'*

**new** Number(42) and 42 have the same constructor name, but doesn't have the same type:

- one is an object

- the other one is a primitive value: number

(String and Boolean have the same "problem")

> **typeof** NaN **===** 'number'

Quite famous, but still incoherent.

> **typeof** new Number(NaN) **===** 'object'

and this one doesn't improve the case of NaN...

and some more...

#### typeof-- overview:

all the type returned by typeof-- are strings

**null**, **undefined** and **NaN** have their own type (respectively: **'Null'**, **'Undefined'** and **'NaN'**)

**String**, **Number** and **Boolean** return the exact same type whether it's an object or a primitive value.

Because, all *objects* return their **own constructor.name**

(except: null, NaN, built-in objects and all instances of an **anonymous prototype**, which return **'#Anonymous'**)

And finally, built-in object like **Math** and **JSON** return their **own name**.

#### example

```js
var typeOf = require('typeof--');

typeOf('lolipop') === typeOf(new String('lolipop')) // === 'String'
typeOf(42) === typeOf(new Number(42)) // === 'Number'
typeOf(false) === typeOf(new Boolean(true)) // === 'Boolean'
typeOf(/myRegExp/) === typeOf(new RegExp(/myRegExp/)) // === 'RegExp'

typeOf(null) === 'Null'
typeOf(undefined) === 'Undefined'
typeOf(NaN) === 'NaN'
typeOf(new Number(NaN)) === 'NaN'

typeOf([]) === typeOf(new Array()) // === 'Array'
typeOf({}) === typeOf(new Object()) // === 'Object'

typeOf(new Promise(function () {}) === 'Promise'
typeOf(Promise) === 'Function'
typeOf(new Error()) === 'Error'
typeOf(new TypeError()) === 'TypeError'
typeOf(new Date()) === 'Date'
// ...

function MyOwnClass(){}
typeOf(new MyOwnClass())==='MyOwnClass'

var MyAnonymousClass = function(){}; 
typeOf(new MyAnonymousClass()) === '#Anonymous'
//you might want to use instanceof here
```

you might be interested in the [typeof-in library](https://www.npmjs.com/package/typeof-in)

I'm open to any suggestions.


