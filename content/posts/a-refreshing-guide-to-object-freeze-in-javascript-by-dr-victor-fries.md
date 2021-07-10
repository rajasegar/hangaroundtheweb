---
title: 'A Refreshing Guide to Object.freeze in Javascript by Dr.Victor Fries'
date: Thu, 21 Jun 2018 23:58:52 +0000
draft: false
tags: ['article', 'Articles', 'articles', 'javascript', 'Javascript']
---

A Refreshing Guide to Object.freeze in Javascript by Dr.Victor Fries
--------------------------------------------------------------------

### What killed the dinosaurs? The Ice Age!

In JavaScript, objects are used to store keyed collections of various data and more complex entities. Objects penetrate almost every aspect of the JavaScript language. The object might be accessed as global or passed as an argument. Functions that have access to the object can modify the object, whether intentionally or accidentally. To prevent modification of our objects, one of the techniques is to use Object.freeze(). Freezing an object can be useful for representing a logically immutable data structure, especially if changing the properties of the object could lead to bad behavior elsewhere in your application.

> Allow me to break the ice: My name is **Object.freeze()**. Learn it well, for it's the chilling sound of your doom.

The **Object.freeze()** method freezes an object: basically it prevents four things from an object:

![](/wp-content/uploads/2018/06/object-freeze2.jpg)

The method returns the passed object.

### Let's kick some ice!

```
const object1 = {
  property1: 42
};

const object2 = Object.freeze(object1);

object2.property1 = 33;
// Throws an error in strict mode

console.log(object2.property1);
// expected output: 42

```

### Tonight's forecast… a freeze is coming!

Nothing can be added to or removed from the properties set of a frozen object. Any attempt to do so will fail, either silently or by throwing a **TypeError** exception (most commonly, but not exclusively, when in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)). For data properties of a frozen object, values cannot be changed, the writable and configurable attributes are set to false. Accessor properties (getters and setters) work the same (and still give the illusion that you are changing the value). Note that values that are objects can still be modified, unless they are also frozen. As an object, an array can be frozen whereafter its elements cannot be altered. No elements can be added or removed from it as well. The function returns the passed object. It does not create a frozen copy.

### Tonight, hell freezes over! (Freezing Objects)

```
var obj = {
  prop: function() {},
  foo: 'bar'
};

// New properties may be added, existing properties may be
// changed or removed
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;

// Both the object being passed as well as the returned
// object will be frozen. It is unnecessary to save the
// returned object in order to freeze the original.
var o = Object.freeze(obj);

o === obj; // true
Object.isFrozen(obj); // === true

// Now any changes will fail
obj.foo = 'quux'; // silently does nothing
// silently doesn't add the property
obj.quaxxor = 'the friendly duck';

// In strict mode such attempts will throw TypeErrors
function fail(){
  'use strict';
  obj.foo = 'sparky'; // throws a TypeError
  delete obj.foo; // throws a TypeError
  delete obj.quaxxor; // returns true since attribute 'quaxxor' was never added
  obj.sparky = 'arf'; // throws a TypeError
}

fail();

// Attempted changes through Object.defineProperty; 
// both statements below throw a TypeError.
Object.defineProperty(obj, 'ohai', { value: 17 });
Object.defineProperty(obj, 'foo', { value: 'eit' });

// It's also impossible to change the prototype
// both statements below will throw a TypeError.
Object.setPrototypeOf(obj, { x: 20 })
obj.\_\_proto\_\_ = { x: 20 }

```

### I'm putting array on ice (Freezing Arrays)

```
let a = \[0\];
Object.freeze(a); // The array cannot be modified now.

a\[0\]=1; // fails silently
a.push(2); // fails silently

// In strict mode such attempts will throw TypeErrors
function fail() {
  "use strict"
  a\[0\] = 1;
  a.push(2);
}

fail();


```

The object being frozen is _immutable_. However, it is not necessarily _constant_. The following example shows that a frozen object is not constant (freeze is shallow).

```
obj1 = {
  internal: {}
};

Object.freeze(obj1);
obj1.internal.a = 'aValue';

obj1.internal.a // 'aValue'

```

To be a constant object, the entire reference graph (direct and indirect references to other objects) must reference only immutable frozen objects. The object being frozen is said to be immutable because the entire object state (values and references to other objects) within the whole object is fixed. Note that strings, numbers, and booleans are always immutable and that Functions and Arrays are objects.

### Freeze in hell, Batman! (The Shallow Freeze)

The result of calling **Object.freeze(object)** only applies to the immediate properties of **object**itself and will prevent future property addition, removal or value re-assignment operations only on **object**. If the value of those properties are objects themselves, those objects are not frozen and may be the target of property addition, removal or value re-assignment operations.

```
var batman = {
  name: "Bruce Wayne",
  designation: "CEO",
  address: {
    street: "23rd",
    city: "Gotham"
  }
};

Object.freeze(batman);

batman.name = "Robin"; // fails silently in non-strict mode
batman.address.city = "NewYork"; // attributes of child object can be modified

console.log(batman.address.city) // Output: "NewYork"

```

### Everything freezes! (The Deep Freeze)

> In this universe, there's only one absolute… everything freezes!

To make an object immutable, recursively freeze each property which is of type object (deep freeze). Use the pattern on a case-by-case basis based on your design when you know the object contains no [cycles](https://en.wikipedia.org/wiki/Cycle_(graph_theory)) in the reference graph, otherwise an endless loop will be triggered. An enhancement to **deepFreeze()** would be to have an internal function that receives a path (e.g. an Array) argument so you can suppress calling **deepFreeze()** recursively when an object is in the process of being made immutable. You still run a risk of freezing an object that shouldn't be frozen, such as **window**.

```
function deepFreeze(object) {

  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (let name of propNames) {
    let value = object\[name\];

    object\[name\] = value && typeof value === "object" ? 
      deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

var obj2 = {
  internal: {
    a: null
  }
};

deepFreeze(obj2);

obj2.internal.a = 'anotherValue'; // fails silently in non-strict mode
obj2.internal.a; // null

```

### Object.freeze vs const

const and Object.freeze are two completely different things.

> The const declaration creates a read-only reference to a value. **It does not mean the value it holds is immutable**, solely that the variable identifier can not be reassigned.

const applies to **bindings** ("variables"). It creates an immutable binding, i.e. you cannot assign a new value to the binding. Object.freeze works on **values**, and more specifically, object values. It makes an object immutable, i.e. you cannot change its properties. In ES5 Object.freeze **doesn't work on primitives**, which would probably be more commonly declared using const than objects. You can freeze primitives in ES6, but then you also have support for const. On the other hand const used to declare objects doesn't "freeze" them, you just can't redeclare the whole object, but you can modify its keys freely. On the other hand you can redeclare frozen objects.

### Object.freeze vs Object.seal

Objects sealed with Object.seal() can have their existing properties changed. Existing properties in objects frozen with Object.freeze() are made immutable. The following related functions prevent the modification of object attributes.

  

Function

Object is made non-extensible

configurable is set to false for each property

writable is set to false for each property

[Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)

Yes

No

No

[Object.seal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)

Yes

Yes

No

Object.freeze

Yes

Yes

Yes

### Winter has come at last

> Yes! If I must suffer… Humanity will suffer with me! I shall repay them for sentencing me to a life without human comfort. I will blanket the city in endless winter! First… Gotham. And then… The world!

Hope, you enjoyed the article and learned something new about [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) in Javascript. Please show us your love by sharing the article and let us know your views in the comments.

### References

*   [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Object/freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
*   [https://www.imdb.com/title/tt0118688/](https://www.imdb.com/title/tt0118688/)
*   [https://stackoverflow.com/questions/33124058/object-freeze-vs-const](https://stackoverflow.com/questions/33124058/object-freeze-vs-const)
*   [https://docs.microsoft.com/en-us/scripting/javascript/reference/object-freeze-function-javascript](https://docs.microsoft.com/en-us/scripting/javascript/reference/object-freeze-function-javascript)
*   [https://mathiasbynens.be/notes/es6-const](https://mathiasbynens.be/notes/es6-const)
