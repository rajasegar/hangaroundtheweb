---
title: 'Arguing for the sake of arguments in JavaScript'
pubDate: '2018-03-29'
description: ''
tags: ['article', 'Articles', 'articles', 'javascript', 'Javascript']
---

Arguing for the sake of arguments in JavaScript
-----------------------------------------------

This article deals with some intricacies revolving around the **arguments** object, a magical and mysterious creature residing in the functional realms of the Javascript world, which can be summoned anytime in your code by the programming wizards without any spells, incantations or sorcery. The arguments object is an Array-like object corresponding to the arguments passed to a function. It is a local variable available within all **(non-arrow)** functions. We will also be discussing the different ways the **arguments** object can be put to use to solve various problems involving multiple argument functions.

### Build a function that multiplies the first argument with the largest of the remaining arguments

As an example we will be looking to build a function that multiplies the first argument with the largest of the remaining arguments We’ll grab the first argument and multiply it by the biggest of the remaining argument values. Clearly this problem requires an ingenious use of the **arguments** object of the function we are going to build, since this function takes variable number of arguments which is also known as a **variadic** function. Also this function obviously qualifies as a **polyadic** function since it requires multiple arguments.

  

Function Type

No. of arguments

Also known as

Niladic function

0

Nullary function

Monadic function

1

Unary function

Dyadic function

2

Binary function

Triadic function

3

Ternary function

Polyadic function

Multiple

n-ary function

Variadic function

Variable

> In mathematics and in computer programming, a **variadic** function is a function of indefinite **arity**, i.e., one which accepts a variable number of arguments.

The **arity** of a function or operation is the number of arguments or operands that the function takes. So this gives us an useful insight such as whenever you are encountered with a problem of variadic functions in Javascript, most often the **arguments** object will be our savior. Our general approach to this particular problem will be like this:

*   Convert the arguments object to a real array
*   Get the remaining arguments from this array excluding the first element
*   Sort the remaining arguments in descending order
*   Return the product of the first argument and the largest of the remaining (i.e, the first of the sorted )

#### ES5 - v1

The arguments object is not an Array. It is similar to an Array, but does not have any Array properties except length. However it can be converted to a real Array: using any one of the two below examples in ES5:

```js
var args = Array.prototype.slice.call(arguments);
var args = \[\].slice.call(arguments);

```

With the first method using **Array.prototype.slice.call(arguments)** we can write our program as:

```js
function multiMax() {
  var args = Array.prototype.slice.call(arguments);
  var remaining = args.slice(1);
  var sorted = remaining.sort(function(a, b) {
    return b - a;
  });
  return args\[0\] \* sorted\[0\];
}

```

With the second method using **\[\].slice.call(arguments)** the same program will be like:

#### ES5 - v2

```js
function multiMax() 
  var args = \[\].slice.call(arguments);
  var remaining = args.slice(1);
  var sorted = remaining.sort(function(a, b) {
    return b - a;
  });
  return args\[0\] \* sorted\[0\];
}

```

In ES6, it is very easy to convert the arguments object to an array, using the **Array.from()**function.

```js
const args = Array.from(arguments);

```

#### ES6 - v1:

```js
function multiMax() {
  let args = Array.from(arguments);
  let remaining = args.slice(1);
  let sorted = remaining.sort((a, b) => b - a);
  return args\[0\] \* sorted\[0\];
}

```

We can also use the **spread** operator to convert the arguments object like this:

#### ES6 - v2

```js
function multiMax() {
  let args = \[...arguments\];
  let remaining = args.slice(1);
  let sorted = remaining.sort((a, b) => b - a);
  return args\[0\] \* sorted\[0\];
}

```

Or we can also make use of , in ES6, **rest parameters**

#### ES6 - v3

```js
function multiMax(first, ...remaining) {
  let sorted = remaining.sort((a, b) => b - a);
  return first \* sorted\[0\];
}

```

### Define a function that concatenates several strings

Our next problem we are going to take it for our discussion is to define a function that concatenates several strings. This example defines a function that concatenates several strings. The only formal argument for the function is a string that specifies the characters that separate the items to concatenate. The function is defined as follows:

```js
function multiConcat(separator) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separator);
}

```

Example use of this function will be like:

```js
// returns "red, orange, blue"
multiConcat(', ', 'red', 'orange', 'blue');

// returns "elephant; giraffe; lion; cheetah"
multiConcat('; ', 'elephant', 'giraffe', 'lion', 'cheetah');

// returns "sage. basil. oregano. pepper. parsley"
multiConcat('. ', 'sage', 'basil', 'oregano', 'pepper', 'parsley');

```

### Define a function to compute the average of numbers

```js
function average(/\*numbers\*/) {
    for (var i=0, total = 0, len=arguments.length; i  
```

If you are planning to solve this problem more elegantly and functional way, we can make use of the Array **reduce** function to obtain the sum of the arguments once it has been converted to a real array like below.

```js
function average() {
  var args = \[\].slice.call(arguments);
  var sum  = args.reduce(function(a, b) {
    return a + b;
  }, 0);
  return sum / args.length;
}

```

If you want to go all guns blazing with ES6 spread operator and arrow functions, you may write.

```js
function average() {
  var args = \[...arguments\];
  var sum  = args.reduce((a, b) =>  a + b, 0);
  return sum / args.length;
}

```

### Find the maximum number

The following function accepts any number of numeric arguments and returns the value of the largest argument it is passed (see also the built-in function Math.max(), which behaves the same way):

```js
function max( /\* ... \*/ ) {
  var max = Number.NEGATIVE\_INFINITY;
  // Loop through the arguments, looking for, and remembering, the biggest.
  for (var i = 0; i < arguments.length; i++) {
    if (arguments\[i\] > max) {
      max = arguments\[i\];
    }
  }
  // Return the biggest
  return max;
}
var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6); // => 10000

```

### Verifying all named arguments are supplied

JavaScript’s liberal attitude to parameter passing is appealing but some functions will break if all named arguments are not supplied. We could write a function wrapper to enforce this when necessary:

```js
function requireAllArgs(fn) {
    return function() {
        if (arguments.length < fn.length) {
            throw(\["Expected", fn.length, "arguments, got", arguments.length\].join(" "));
        }
        return fn.apply(this, arguments);
    }   
} 

var divide = requireAllArgs(function(a, b) {return a/b});

divide(2/5); //"Expected 2 arguments, got 1"
divide(2,5); //0.4

```

### Defining a function that creates HTML lists

This example defines a function that creates a string containing HTML for a list. The only formal argument for the function is a string that is "u" if the list is to be unordered (bulleted), or "o" if the list is to be ordered (numbered). The function is defined as follows:

```js
function list(type) {
  var result = '<' + type + 'l>*   ';
      var args = Array.prototype.slice.call(arguments, 1);
      result += args.join('
*   ');
      result += '
'; // end list

  return result;
}

```

You can pass any number of arguments to this function, and it adds each argument as an item to a list of the type indicated. For example:

```js
var listHTML = list('u', 'One', 'Two', 'Three');

/\* listHTML is:

"

*   One
*   Two
*   Three

"

\*/

```

### A String formatter

```js
function format(string) {  
    var args = arguments;  
    var pattern = RegExp("%(\[1-" + (arguments.length-1) + "\])", "g");
    return string.replace(pattern, function(match, index) {  
        return args\[index\];  
    });  
}; 

format("a %1 and a %2", "cat", "dog");
//"a cat and a dog"

```

### Partial function application

The typical JavaScript implementations of curry, partial and compose store the arguments object for later concatenation with the runtime arguments of the inner function.

```js
Function.prototype.curry = function() {
    if (arguments.length<1) {
        return this; //nothing to curry with - return function
    }
    var \_\_method = this;
    var args = \[\].slice.apply(arguments);
    return function() {
        return \_\_method.apply(this, args.concat(\[\].slice.apply(arguments)));
    }
}

var converter = function(ratio, symbol, input) {
    return \[(input\*ratio).toFixed(1),symbol\].join(" ");
}

var kilosToPounds = converter.curry(2.2,"lbs");
var milesToKilometers = converter.curry(1.62, "km");

kilosToPounds(4); //8.8 lbs
milesToKilometers(34); //55.1 km

```

### No binding of arguments inside ES6 arrow functions

An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.

```js
let myArrowFunc = () => {
  let args = \[...arguments\];
  return args\[0\];
};

console.log("myArrowFunc = ", myArrowFunc(1, 2, 3));

// Instead of returning 1, it returns an empty object  literal
// myArrowFunc = {}


```

Arrow functions do not have their own arguments object. Thus, in this example, arguments is simply a reference to the arguments of the enclosing scope:

```js
var arguments = \[1, 2, 3\];
var arr = () => arguments\[0\];

arr(); // 1

function foo(n) {
  var f = () => arguments\[0\] + n; // foo's implicit arguments binding. arguments\[0\] is n
  return f();
}

foo(1); // 2

```

In most cases, using rest parameters is a good alternative to using an arguments object.

```js
function foo(n) { 
  var f = (...args) => args\[0\] + n; 
  return f(10); 
}

foo(1); // 11

```

### References:

*   [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
*   [https://javascriptweblog.wordpress.com/2011/01/18/javascripts-arguments-object-and-beyond/](https://javascriptweblog.wordpress.com/2011/01/18/javascripts-arguments-object-and-beyond/)
*   [https://www.nczonline.net/blog/2010/11/02/mysterious-arguments-object-assignments/](https://www.nczonline.net/blog/2010/11/02/mysterious-arguments-object-assignments/)
*   [http://webreflection.blogspot.in/2009/06/javascript-arguments-weridness.html](http://webreflection.blogspot.in/2009/06/javascript-arguments-weridness.html)
*   [https://en.wikipedia.org/wiki/Variadic\_function](https://en.wikipedia.org/wiki/Variadic_function)
*   [https://softwareengineering.stackexchange.com/questions/178827/what-does-polyadic-mean-in-the-context-of-functional-programming-and-type-syst](https://softwareengineering.stackexchange.com/questions/178827/what-does-polyadic-mean-in-the-context-of-functional-programming-and-type-syst)
*   [Secrets of the JavaScript Ninja - 2nd Edition by John Resig](http://amzn.in/ai34lJ7%20)
*   [Functional Programming in Javascript by Dan Mantyla](http://amzn.in/2A5obPx%20)
*   [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow\_functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

Cover Image from Unsplash by:

[unsplash-logoJason Rosewell](https://unsplash.com/@jasonrosewell?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from Jason Rosewell")