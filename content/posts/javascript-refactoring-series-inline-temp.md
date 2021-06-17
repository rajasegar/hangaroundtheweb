---
title: 'Javascript Refactoring Series: Inline Temp'
date: Tue, 21 Nov 2017 22:50:33 +0000
draft: false
tags: ['Articles', 'javascript', 'Javascript', 'refactoring']
---

Table of Contents
-----------------

*   [Inline Temp](#org111fff3)
    *   [Motivation](#org291c836)
    *   [Mechanics](#org8af1165)
        *   [Declare the temp as const if it isn't already, and compile.](#orgd40cbfe)
        *   [Find all references to the temp and replace them with the right-hand side of the assignment.](#org94568bf)
        *   [Compile and test after each change.](#orgf6c61ff)
        *   [Remove the declaration and the assignment of the temp.](#org3613e50)
        *   [Compile and test.](#orgcc6b3c5)

Inline Temp
-----------

You have a temp that is assigned to once with a simple expression, and the temp is getting in the way of other refactorings.

```
function foo(order) {
  let basePrice = order.basePrice();
  return (basePrice > 1000);
}

```

Replace all references to that temp with the expression.

```
function foo(order) {
  return (order.basePrice() > 1000);
}

```

### Motivation

Most of the time **[Inline Temp](https://refactoring.com/catalog/inlineTemp.html)** is used as part of **[Replace Temp with Query](https://refactoring.com/catalog/replaceTempWithQuery.html)** so the real motivation is there. The only time **Inline Temp** is used on its own is when you find a temp that is assigned the value of a function call. Often this temp isn't doing any harm and you can safely leave it there. If the temp is getting in the way of other refactorings, such as **Extract Method**, it's time to inline it.

### Mechanics

#### Declare the temp as const if it isn't already, and compile.

*   This checks that the temp is really only assigned to once.

#### Find all references to the temp and replace them with the right-hand side of the assignment.

#### Compile and test after each change.

#### Remove the declaration and the assignment of the temp.

#### Compile and test.

 Featured image by:

[Gabriel Sanchez](https://unsplash.com/@gabrielsanchez?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from Gabriel Sanchez")