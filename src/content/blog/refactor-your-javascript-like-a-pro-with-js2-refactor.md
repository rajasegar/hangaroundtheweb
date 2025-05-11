---
title: 'Refactor your Javascript like a Pro with js2-refactor'
date: Mon, 17 Jul 2017 03:25:15 +0000
draft: false
tags: ['emacs', 'javascript', 'Javascript', 'refactoring', 'spacemacs', 'web development']
---

In this article i will show you how to use the js2-refactor tool in Spacemacs which is a community built version of Emacs using Space key as the leader key.  

Table of Contents
-----------------

*   [1\. Refactor your Javascript like a Pro with js2-refactor](#orga5b6bee)
    *   [1.1. Installation - Emacs](#org0bce022)
    *   [1.2. Installation - Spacemacs](#org96c3d39)
    *   [1.3. Usage](#org2ae3d67)
    *   [1.4. Refactorings](#org33dd987)
        *   [1.4.1. js2r-expand-array](#org1cec03e)
        *   [1.4.2. js2r-expand-object](#orgdd47bcf)
        *   [1.4.3. js2r-expand-function](#orgac9908e)
        *   [1.4.4. js2r-extract-function](#org90a32a8)
        *   [1.4.5. js2r-extract-method](#orgc795d55)
        *   [1.4.6. js2r-extract-var](#org1c095f4)
        *   [1.4.7. js2r-contract-array](#orgc5e55ed)
        *   [1.4.8. js2r-contract-object](#orga38c9e2)
        *   [1.4.9. js2r-contract-function](#org41ee1c9)
        *   [1.4.10. js2r-kill](#orgcd24887)
        *   [1.4.11. js2r-ternary-to-if](#org2f6760a)
        *   [1.4.12. js2r-forward-barf](#org04a8228)
        *   [1.4.13. js-doc-insert-file-doc](#orgd0a52fd)
        *   [1.4.14. js-doc-insert-function-doc](#orgbba9950)
        *   [1.4.15. js-doc-insert-tag](#org8915ce8)
        *   [1.4.16. js-doc-describe-tag](#orged1e5d2)
        *   [1.4.17. js2r-split-string](#org935cbce)
        *   [1.4.18. js2r-var-to-this](#orga07399c)
        *   [1.4.19. js2r-toggle-function-expression-and-declaration](#org0721849)
        *   [1.4.20. js2r-log-this](#org95cec08)
        *   [1.4.21. js2r-split-var-declaration](#org37b490a)
        *   [1.4.22. js2r-add-to-globals-annotation](#org7bfaec0)
        *   [1.4.23. js2r-wrap-in-for-loop](#org256c288)
        *   [1.4.24. js2r-forward-slurp](#org346c137)
        *   [1.4.25. js2r-arguments-to-object](#orgab803a2)

1 Refactor your Javascript like a Pro with js2-refactor
-------------------------------------------------------

js2-refactor is a JavaScript refactoring library for emacs. This is a collection of small refactoring functions to further the idea of a JavaScript IDE in Emacs that started with js2-mode. In this article i will show you how to use the js2-refactor tool in Spacemacs which is a community built version of Emacs using Space key as the leader key. To know more about Spacemacs click [here](http://spacemacs.org)

### 1.1 Installation - Emacs

I highly recommend installing js2-refactor through elpa. It's available on [melpa](http://melpa.milkbox.net/):

```
M-x package-install js2-refactor

```

Then add this to your emacs settings:

```
(require 'js2-refactor)
(add-hook 'js2-mode-hook #'js2-refactor-mode)

```

### 1.2 Installation - Spacemacs

For Spacemacs users, you need to add **javascript** layer. To use this configuration layer, add it to your **~/.spacemacs**. You will need to add **javascript** to the existing **dotspacemacs-configuration-layers** list in this file. For more information on this, visit the Spacemacs Javascript [layer](https://github.com/syl20bnr/spacemacs/tree/master/layers/+lang/javascript) configuration page.

### 1.3 Usage

Once you installed and configured your js2-refactor in to Spacemacs, open any Javascript source file and start refactoring.

### 1.4 Refactorings

#### 1.4.1 js2r-expand-array

Expand bracketed array list at point. **Key-Binding:** SPC-m-r-e-a Before:

```
let a = \[1, 2, 3, 4\];

```

After:

```
let a = \[
  1,
  2,
  3,
  4
\];

```

#### 1.4.2 js2r-expand-object

Expand bracketed object list at point. **Key-Binding:** SPC-m-r-e-o Before:

```
let obj = { 'name' : 'John', 'age': 30 };

```

After:

```
let obj = {
  'name': 'John',
  'age': 30
};

```

#### 1.4.3 js2r-expand-function

Expand function body at point. **Key-Binding:** SPC-m-r-e-u Before:

```
function myfunction() {let a =1; let b = 2; console.log("b = ", b); console.log(a);}

```

After:

```
function myfunction() {
  let a =1;
  let b = 2;
  console.log("b = ", b);
  console.log(a);
}

```

#### 1.4.4 js2r-extract-function

Turn the fragment into a function whose name explains the purpose of the function. **Key-Binding:** SPC-m-r-e-f Before:

```
function printOwning() {
  printBanner();

  // print details
  console.log("name: " + \_name);
  console.log("amount: " + getOutStanding());
}

```

After:

```
function printDetails() {
  console.log("name: " + \_name);
  console.log("amount: " + getOutStanding());
}

function printOwning() {
  printBanner();

  // print details
  printDetails();
}

```

#### 1.4.5 js2r-extract-method

You have a code fragment that can be grouped together. Turn the fragment into a method whose name explains the purpose of the method. Before:

```
class myClass {

  getName() {
    console.log('name: ' + name);
  }

  printOwning() {
    printBanner();

    // print details
    console.log("name: " + \_name);
    console.log("amount: " + getOutStanding());
  }
}

```

After:

```
class myClass {

  getName() {
    console.log('name: ' + name);
  }

  printOwning() {
    printBanner();

    // print details
    this.printDetails();
  }
}

```

#### 1.4.6 js2r-extract-var

You have a complicated expression. Put the result of the expression, or parts of the expression, in a temporary variable with a name that explains the purpose. **Inspiration:** [Extract Variable](https://refactoring.com/catalog/extractVariable.html) **Key-Binding:** SPC-m-r-e-v Before:

```
if ( (platform.toUpperCase().indexOf("MAC") > -1) &&
     (browser.toUpperCase().indexOf("IE") > -1) &&
      wasInitialized() && resize > 0 )
{
  // do something
}

```

After:

```
var isMacOs = (platform.toUpperCase().indexOf("MAC") > -1);

var isIEBrowser = (browser.toUpperCase().indexOf("IE") > -1);

var wasResized = resize > 0;

if ( isMacOs && isIEBrowser && wasInitialized() && wasResized )
{
  // do something
}


```

#### 1.4.7 js2r-contract-array

Contract bracketed array list at point. **Key-Binding:** SPC-m-r-c-a Before:

```
let a = \[
  1,
  2,
  3,
  4
\];

```

After:

```
let a = \[1, 2, 3, 4\];

```

#### 1.4.8 js2r-contract-object

Contract bracketed object list at point. **Key-Binding:** SPC-m-r-c-o Before:

```
let obj = {
  'name': 'John',
  'age': 30
};

```

After:

```
let obj = { 'name' : 'John', 'age': 30 };

```

#### 1.4.9 js2r-contract-function

Contract function body at point. **Key-Binding:** SPC-m-r-c-u Before:

```
function myfunction() {
  let a =1;
  let b = 2;
  console.log("b = ", b);
  console.log(a);
}

```

After:

```
function myfunction() {let a =1; let b = 2; console.log("b = ", b); console.log(a);}

```

#### 1.4.10 js2r-kill

Kills to the end of the line, but does not cross semantic boundaries. **Key-Binding:** SPC-m-k Before:

```
let a = \[1, 2, 3, 4\];
let obj = { 'name' : 'John', 'age': 30 };
let str = "Hello World";

```

After:

```
let a = \[1, 2\];
let obj = { 'name': 'John'};
let str = "Hello";

```

#### 1.4.11 js2r-ternary-to-if

Converts ternary operator to if-statement. **Key-Binding:** SPC-m-r-3-i Before:

```
function ternaryToIf(b) {
  let a;

  a =  b === true ? 1 : 0;

  return a;

}

```

After:

```
function ternaryToIf(b) {
  let a;

  if (b === true) {
    a =  1;
  } else {
    a =  0;
  }

  return a;

}

```

#### 1.4.12 js2r-forward-barf

Moves the last child out of current function, if-statement, for-loop or while-loop. **Key-Binding:** SPC-m-r-b-a Before:

```
function ternaryToIf(b) {
  let a;

  a =  b === true ? 1 : 0;

  return a;

}

```

After:

```
function ternaryToIf(b) {
  let a;

  a =  b === true ? 1 : 0;


}
return a;

```

#### 1.4.13 js-doc-insert-file-doc

Inserts documentation header information for the file. Will be very useful for writing source code documentation very quickly and effectively. **Key-Binding:** SPC-m-r-d-b

```
/\*\*
 \* @fileOverview
 \* @name js2-refactor-test.js
 \* @author 
 \* @license 
 \*/

```

#### 1.4.14 js-doc-insert-function-doc

Inserts documentation block for a function automatically deducing parameter info and return info. **Key-Binding:** SPC-m-r-d-f To use this properly, you have to select or mark a whole function body and use the above command.

```
/\*\*
 \* 
 \* @param {} b
 \* @returns {} 
 \*/
function ternaryToIf(b) {
  let a;

  a =  b === true ? 1 : 0;

  return a;

}

```

#### 1.4.15 js-doc-insert-tag

Inserts a documentation tag from a list of available tags. You can choose by looking up and select. **Key-Binding:** SPC-m-r-d-t I inserted the author tag using the above command in the below example.

```
/\*\*
 \* 
 \* @param {} b
 \* @returns {} 
 \* @author 
 \*/
function ternaryToIf(b) {
  let a;

  a =  b === true ? 1 : 0;

  return a;

}

```

#### 1.4.16 js-doc-describe-tag

Gives you detailed information and usage about a particular documentation tag. **Key-Binding:** SPC-m-r-d-h

#### 1.4.17 js2r-split-string

Splits a string **Key-Binding:** SPC-m-r-s-s Before:

```
var str = "Hello World";

```

After:

```
var str = "Hello" + "World";

```

#### 1.4.18 js2r-var-to-this

Changes local **var a** to be **this.a** instead. **Key-Binding:** SPC-m-r-v-t Before:

```
class myClass {
  constructor(\_name) {
    var name = \_name;
  }
}

```

After:

```
class myClass {
  constructor(\_name) {
    var this.name = \_name;
  }
}

```

#### 1.4.19 js2r-toggle-function-expression-and-declaration

Toggle between function name() {} and var name = function (); **Key-Binding:** SPC-m-r-t-f Before:

```
function myClass() {
  this.a = 'Hello World';
}

```

After:

```
var myClass = function () {
  this.a = 'Hello World';
};

```

#### 1.4.20 js2r-log-this

Adds a console.log() statement for what is at point (or region). With a prefix argument, use JSON pretty-printing. **Key-Binding:** SPC-m-r-l-t Before:

```
function ternaryToIf(b) {
  let a;

  a =  b === true ? 1 : 0;

  return a;

}

```

After:

```
function ternaryToIf(b) {
  let a;

  a =  b === true ? 1 : 0;
  console.log("a = ", a);

  return a;

}

```

#### 1.4.21 js2r-split-var-declaration

Splits a **var** with multiple vars declared, into several **var** statements. **Key-Binding:** SPC-m-r-s-v Before:

```
var a1 = 1, b1 = 2, c1 = 3;

```

After:

```
var a1 = 1;
var b1 = 2;
var c1 = 3;

```

#### 1.4.22 js2r-add-to-globals-annotation

Creates a _\*global \*_ annotation if it is missing, and adds the var at point to it. **Key-Binding:** SPC-m-r-a-g Before:

```
function greet() {
  message = "Hello World";
  return message;
}

```

After:

```
/\* global a, message \*/
function greet() {
  message = "Hello World";
  return message;
}

```

#### 1.4.23 js2r-wrap-in-for-loop

Wraps a simple For-loop around the selected or marked block at point to it. **Key-Binding:** SPC-m-r-w-l Before:

```
function printNumbers() {
  let i = 0;
  let text = "";
  text += "The number is " + i + "<br>";
  console.log("text = ", text);
}

```

After:

```
function printNumbers() {
  let i = 0;
  let text = "";
  for (var i = 0, l = length; i < l; i++) {
    text += "The number is " + i + "<br>";
  }
  console.log("text = ", text);
}

```

#### 1.4.24 js2r-forward-slurp

Moves the next statement into current function, if-statement, for-loop or while-loop. **Key-Binding:** SPC-m-r-s-l Before:

```
function printNumbers() {
  let i = 0;
  let text = "";
  for (var i = 0, l = length; i < l; i++) {
    text += "The number is " + i + "<br>";
  }
  console.log("text = ", text);
}

```

After:

```
function printNumbers() {
  let i = 0;
  let text = "";
  for (var i = 0, l = length; i < l; i++) {
    text += "The number is " + i + "<br>";
    console.log("text = ", text);
  }
}

```

#### 1.4.25 js2r-arguments-to-object

Replaces arguments to a function call with an object literal of named arguments. **Key-Binding:** SPC-m-r-a-o Before:

```
function printLocation(latitude, longitude) {
  console.log("longitude = ", longitude);
  console.log("latitude = ", latitude);
}

```

After:

```
function printLocation(params) {
  console.log("longitude = ", params.longitude);
  console.log("latitude = ", params.latitude);
}

```