---
title: 'Javascript Refactoring Series: Extract Function'
date: Fri, 20 Oct 2017 19:13:19 +0000
draft: false
tags: ['Articles', 'javascript', 'Javascript', 'refactoring', 'web development']
---

In this article we take a look at one of the refactoring techniques named as Extract Function originally known as [Extract Method](https://refactoring.com/catalog/extractMethod.html). We will see how to apply these techniques in Javascript code since the original methodology is language agnostic. This is first in the series of articles exploring various [refactoring](https://refactoring.com/) techniques by [Martin Fowler.](https://martinfowler.com/)  

Table of Contents
-----------------

*   [Extract Function (aka Extract Method)](#org7554293)
    *   [Motivation](#org70f381b)
    *   [Example: No local variables](#org94621b0)
    *   [Example: Using Local Variables](#orga0c7934)
    *   [Example: Reassigning a Local Variable](#orgd696d38)

Extract Function (aka Extract Method)
-------------------------------------

You have a code fragment that can be grouped together. Turn the fragment into a function whose name explains the purpose of the function.

```
function printOwing(amount) {
  printBanner();

  // print details
  console.log('name: ', \_name);
  console.log('amount: ', \_amount);
}

```

After extracting the print details block as a function

```
function printOwing(amount) {
  printBanner();
  printDetails(\_name, \_amount);
}

function printDetails(name, amount) {
  console.log('name: ', name);
  console.log('amount: ', amount);
}

```

### Motivation

Any function that is too long or any code that needs a comment to understand its purpose. We then turn that fragment of code into its own function. We prefer short, well-named functions for several reasons. First,

> it increases the chances that other functions can use a function when the function is finely grained.

Second,

> it allows the higher-level functions to read more like a series of comments.

Overriding also is easier when the functions are finely grained. It does take a little getting used to if you are used to seeing larger functions. And small functions really work only when you have good names, so you need to pay attention to naming. People sometimes ask what length should we look for in a function. Actually length is not the issue. The key is the semantic distance between the function name and the function body. If extracting improves clarity, do it, even if the name is longer than the code you have extracted.

### Example: No local variables

In the simplest case, Extract Function is trivially easy. Take the following function:

```
const orders = \[
  { amount: 100 },
  { amount: 200 },
  { amount: 300 }
\];

function printOwing(name, orders) {
  let outstanding = 0;

  // print banner
  console.log('\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*');
  console.log('\*\*\*\*\*\* Customer Owes \*\*\*\*');
  console.log('\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*');

  // calculate outstanding
  orders.forEach(function(order) {
    outstanding += order.amount;
  });

  // print details
  console.log('name: ', name);
  console.log('amount: ', outstanding);

}

console.log(printOwing('Tony Stark', orders));

```

It is easy to extract the code that prints the banner. We can just cut, paste and put in new function.

```
function printBanner() {
  // print banner
  console.log('\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*');
  console.log('\*\*\*\*\*\* Customer Owes \*\*\*\*');
  console.log('\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*');
}

function printOwing(name, orders) {
  let outstanding = 0;

  printBanner();

  // calculate outstanding
  orders.forEach(function(order) {
    outstanding += order.amount;
  });

  // print details
  console.log('name: ', name);
  console.log('amount: ', outstanding);

}

```

### Example: Using Local Variables

One of the major problems we will be facing now is local variables: parameters passed into the original function and the temporaries declared within the original function. Local variables are only in scope in that function, so when we use Extract Function, these variables cause us extra work. In some cases they even prevent us from even doing the refactoring at all. The easiest case with local variables is when the variables are read but not changed. We can extract the printing of details with a function with two parameters.

```
function printDetails(name, outstanding) {
  // print details
  console.log('name: ', name);
  console.log('amount: ', outstanding);
}

function printOwing(name, orders) {
  let outstanding = 0;

  printBanner();

  // calculate outstanding
  orders.forEach(function(order) {
    outstanding += order.amount;
  });

  printDetails(name, outstanding);

}

```

We can use this with as many local variables as we need. The same is true if the local variable is an object and we invoke a modifying method on the variable. Again we can just pass the object in as a parameter. We only have to do something different if we actually assign to the local variable.

### Example: Reassigning a Local Variable

It's the assignment to local variables that becomes complicated. In this case we are only talking about temps. If you see an assignment to a parameter, you should immediately use **Remove Assignments to Parameters**. For temps that are assigned to, there are two cases. The simpler case is that in which the variable is a temporary variable used only within the extracted code. When that happens, we can move the temp into the extracted code. The other case is use of the variable outside the code. If the variable is not used after the code is extracted, you can make the change in just the extracted code. If it is used afterward, you need to make the extracted code return the changed value of the variable. We can now extract the calculation of outstanding from the original function

```
function getOutstanding(orders) {

  let outstanding = 0;
  // calculate outstanding
  orders.forEach(function(order) {
    outstanding += order.amount;
  });

  return outstanding;
}

function printOwing(name, orders) {

  printBanner();

  let outstanding = getOutstanding(orders);

  printDetails(name, outstanding);

}

```

The enumeration variable is used only in the extracted code, so I can move it entirely within the new function. The outstanding variable is used in both places, so we need to return it from the extracted function. Once we've compiled and tested for the extraction, we rename the returned value to follow some usual convention.

```
function getOutstanding(orders) {

  let result = 0;
  // calculate outstanding
  orders.forEach(function(order) {
    result += order.amount;
  });

  return result;
}

```

In this case the outstanding variable is initialized only to an obvious initial value, so we can initialize it only within th extracted function. If something more involved happens to the variable, we have to pass in the previous value as a parameter. The initial code for this variation might look like this:

```
function printOwing(name, orders, previousAmount) {
  let outstanding = previousAmount \* 1.2;

  printBanner();

  outstanding = getOutstanding(orders, outstanding);

  printDetails(name, outstanding);

}

```

In this case the extraction would look like this:

```
function getOutstanding(orders, initialValue = 0) {

  let result = initialValue;
  // calculate outstanding
  orders.forEach(function(order) {
    result += order.amount;
  });

  return result;
}

```

After we compile and test this, we clear up the way the outstanding variable is initialized:

```
function printOwing(name, orders, previousAmount) {

  printBanner();

  let outstanding = getOutstanding(orders, previousAmount \* 1.2);

  printDetails(name, outstanding);

}

```

#### Reference:

Refactoring: Improving the design of the existing code by Martin Fowler   Cover Photo by Hedi Alija on Unsplash [Hedi Alija](https://unsplash.com/@stoppedframe?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from Hedi Alija")