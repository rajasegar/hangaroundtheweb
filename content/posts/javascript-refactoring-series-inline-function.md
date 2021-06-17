---
title: 'Javascript Refactoring Series: Inline Function'
date: Sun, 22 Oct 2017 17:56:10 +0000
draft: false
tags: ['Articles', 'javascript', 'Javascript', 'refactoring', 'web development']
---

In this article we take a look at one of the refactoring techniques named as Inline Function originally known as [Inline Method](https://refactoring.com/catalog/inlineMethod.html). We will see how to apply these techniques in Javascript code since the original methodology is language agnostic. This is second in the series of articles exploring various [refactoring](https://refactoring.com/) techniques by [Martin Fowler.](https://martinfowler.com/)

 

Table of Contents
-----------------

*   [Javascript Refactoring Series: Inline Function](#org02e5bc0)
    *   [Motivation](#org60cff30)
    *   [Mechanics](#org6d081be)
        *   [Check that the function is not polymorphic](#orgec7834c)
        *   [Find all calls to the function](#org1d43b8c)
        *   [Replace each call with the function body.](#orgce277a1)
        *   [Compile and test.](#org834719c)
        *   [Remove the function definition.](#org9070f31)
    *   [Reference](#org3c5c5dc)

Javascript Refactoring Series: Inline Function
----------------------------------------------

Inline Function is Javascript version of the original [Inline Method](https://refactoring.com/catalog/inlineMethod.html) A function's body is just as clear as its name. Put the function's body into the body of its callers and remove the function.

```
const MAX\_LATE\_DELIVERIES = 5;

function getRating(numberOfLateDeliveries) {
  return (moreThanFiveLateDeliveries(numberOfLateDeliveries)) ? 2 : 1;
}

function moreThanFiveLateDeliveries(numberOfLateDeliveries) {
  return numberOfLateDeliveries > MAX\_LATE\_DELIVERIES;
}

```

We can replace the **moreThanFiveLateDeliveries** function's invocation with its body like this:

```
function getRating(numberOfLateDeliveries) {
  return (numberOfLateDeliveries > MAX\_LATE\_DELIVERIES) ? 2 : 1;
}

```

### Motivation

Use short functions to show their intention, because these functions lead to clearer and easier to read code. But sometimes we do come across a function in which the body is as clear as the name. Or we refactor the body of the code into something that is just as clear as the name. When this happens, you should then get rid of the function. Indirection can be helpful, but needless indirection is irritating. Another time to use **Inline Function** is when we have a group of functions that seem badly factored. We can inline them all into one big function and then re-extract the functions. It is recommended to use **Inline Function** when someone is using too much indirection and it seems that every function does simple delegation to another function, and we get lost in all the delegation. In these cases some of the indirection is worthwhile, but not all of it. By trying to inline we can flush out the useful ones and eliminate the rest.

### Mechanics

#### Check that the function is not polymorphic

*   Don't inline if subclasses override the function; they cannot override a function that isn't there.

#### Find all calls to the function

#### Replace each call with the function body.

#### Compile and test.

#### Remove the function definition.

**Inline Function** is simple, but in general it isn't. If you encounter complexities like recursion, multiple return points, inlining into another object when you don't have accessors, you shouldn't do this refactoring.

### Reference

Refactoring by Martin Fowler

#### Cover Image by :

[Slava Bowman](https://unsplash.com/@slavab?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from Slava Bowman")