---
title: 'Do you care about Cohesion in Javascript functions?'
date: Sun, 03 Sep 2017 21:37:51 +0000
draft: false
tags: ['Articles', 'javascript', 'Javascript', 'web development']
---

Cohesion is the measure of strength of the association of elements within a module. Modules whose elements are strongly and genuinely related to each other are desired. A module should be highly cohesive.

Table of Contents
-----------------

*   [1\. Do you care about Cohesion in Javascript Functions?](#org2d38612)
    *   [1.1. Functional Cohesion](#org1105340)
        *   [1.1.1. Sequential Cohesion](#org007c11e)
        *   [1.1.2. Communicational Cohesion](#org85e4c3c)
        *   [1.1.3. Temporal Cohesion](#orge1f12d0)
    *   [1.2. Sequential Cohesion](#org22b1fc8)
    *   [1.3. Communicational Cohesion](#orgd78fb8a)
    *   [1.4. Temporal Cohesion](#orgb71ff13)
        *   [1.4.1. Procedural Cohesion](#org488a460)
        *   [1.4.2. Logical Cohesion](#org9b6da46)
        *   [1.4.3. Coincidental Cohesion](#org8b05a21)
    *   [1.5. Procedural Cohesion](#orga164dd3)
    *   [1.6. Logical Cohesion](#org2456782)
    *   [1.7. Coincidental Cohesion](#org95fcb0e)

1 Do you care about Cohesion in Javascript Functions?
-----------------------------------------------------

The concept of cohesion has been largely superceded by the concept of abstraction at the class level, but cohesion is still alive and well as the workhorse design heuristic at the individual-function level. For functions, cohesion refers to how closely the operations in a function are related. Some programmers prefer the term “strength”: How strongly related are the operations in a function? A function like **cosine()** is perfectly cohesive because the whole function is dedicated to performing one task. A function like **cosinetan()** has lower cohesion because it tries to do more than one thing. The goal is to have each function do one thing well and not do anything else. [via GIPHY](https://giphy.com/gifs/kim-kardashian-kris-jenner-gif-cRiSo5a7kVyww) The idea of cohesion was introduced in a paper by Wayne Stevens, Glenford Myers, and Larry Constantine (1974). Other, more modern concepts including abstraction and encapsulation tend to yield more insight at the class level, but cohesion is still a workhorse concept for the design of functions. Discussions about cohesion typically refer to several levels of cohesion. Understanding the concepts is more important than remembering specific terms. Use the concepts as aids in thinking about how to make functions as cohesive as possible.

### 1.1 Functional Cohesion

Functional cohesion is the strongest and best kind of cohesion, occurring when a function performs one and only one operation. Examples of highly cohesive functions include **sin()**, **getCustomerName()**, **eraseFile()**, **calculateLoanPayment()**, and **ageFromBirthday()**. Of course, this evaluation of their cohesion assumes that the functions do what their names say they do—if they do anything else, they are less cohesive and poorly named. [via GIPHY](https://giphy.com/gifs/realitytvgifs-real-housewives-rhonj-of-new-jersey-10tVhjcavACiBi) Several other kinds of cohesion are normally considered to be less than ideal:

#### 1.1.1 Sequential Cohesion

#### 1.1.2 Communicational Cohesion

#### 1.1.3 Temporal Cohesion

### 1.2 Sequential Cohesion

Sequential cohesion exists when a function contains operations that must be performed in a specific order, that share data from step to step, and that don’t make up a complete function when done together. An example of sequential cohesion is a function that calculates an employee’s age and time to retirement, given a birth date. If the function calculates the age and then uses that result to calculate the employee’s time to retirement, it has **sequential** cohesion. If the function calculates the age and then calculates the time to retirement in a completely separate computation that happens to use the same birth-date data, it has only **communicational** cohesion.

```
function timeToRetire(birthday) { // birthday is a date
  const RETIREMENT\_AGE = 65;
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  let age = Math.abs(ageDate.getUTCFullYear() - 1970)
  let \_timeToRetire = RETIREMENT\_AGE - age;
  return \_timeToRetire;
}

```

How would you make the function functionally cohesive? You’d create separate functions to compute an employee’s age given a birth date, and time to retirement given a birth date. The time-to-retirement function could call the age function. They’d both have functional cohesion. Other functions could call either function or both functions.

```
const RETIREMENT\_AGE = 65;

function calculateAge(birthday) {
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

function calcRetirementTime(age) {
  return RETIREMENT\_AGE - age;
}

function timeToRetire(birthday) { // birthday is a date
  let age = calculateAge(birthday);
  let \_timeToRetire = calcRetirementTime(age);
  return \_timeToRetire;
}

```

### 1.3 Communicational Cohesion

Communicational cohesion occurs when operations in a function make use of the same data and aren’t related in any other way. If a function prints a summary report and then reinitializes the summary data passed into it, the function has communicational cohesion; the two operations are related only by the fact that they use the same data.

```
function printSummary(summary) {
  // Print the summary data
  // Re-initialize the summary data
}

```

To give this function better cohesion, the summary data should be reinitialized close to where it’s created, which shouldn’t be in the report-printing function. [via GIPHY](https://giphy.com/gifs/communication-dFO1dMLwswMfu) Split the operations into individual functions. The first prints the report. The second reinitializes the data, close to the code that creates or modifies the data. Call both functions from the higher-level function that originally called the communicationally cohesive function.

```
function printReport(summary) {
}

function initialize(summary) {
}

function printSummary(summary) {
  printReport(summary);
  initialize(summary);
}

```

### 1.4 Temporal Cohesion

Temporal cohesion occurs when operations are combined into a function because they are all done at the same time. Typical examples would be **startup()**, **completeNewEmployee()**, and **shutdown()**. Some programmers consider temporal cohesion to be unacceptable because it’s sometimes associated with bad programming practices such as having a hodgepodge of code in a **startup()** function. [via GIPHY](https://giphy.com/gifs/j1Lb0pDlYmSuQ) To avoid this problem, think of temporal functions as organizers of other events. The **startup()** function, for example, might read a configuration file, initialize a scratch file, set up a memory manager, and show an initial screen. To make it most effective, have the temporally cohesive function call other functions to perform specific activities rather than performing the operations directly itself. That way, it will be clear that the point of the function is to orchestrate activities rather than to do them directly.

```
function completeNewEmployee() {
  // startup logic here
  // Read configuration file

  // Init scratch file
  // etc
  // shutdown logic here
}

function startup() {
  // Read configuration file
  // Init scratch file
  // etc
}

function shutdown() {
}

function completeNewEmployee() {
  startup();
  // completeNewEmployee logic here
  shutdown();
}



```

This example raises the issue of choosing a name that describes the function at the right level of abstraction. You could decide to name the function **readConfigFileInitScratchFileEtc()**, which would imply that the function had only coincidental cohesion. If you name it **startup()**, however, it would be clear that it had a single purpose and clear that it had functional cohesion.

![functional-cohesion.png](http://hangaroundtheweb.com/wp-content/uploads/2017/09/functional-cohesion.png)

The remaining kinds of cohesion are generally unacceptable. They result in code that’s poorly organized, hard to debug, and hard to modify. If a function has bad cohesion, it’s better to put effort into a rewrite to have better cohesion than investing in a pinpoint diagnosis of the problem. Knowing what to avoid can be useful, however, so here are the unacceptable kinds of cohesion:

#### 1.4.1 Procedural Cohesion

#### 1.4.2 Logical Cohesion

#### 1.4.3 Coincidental Cohesion

### 1.5 Procedural Cohesion

Procedural cohesion occurs when operations in a function are done in a specified order. An example is a function that gets an employee name, then an address, and then a phone number. The order of these operations is important only because it matches the order in which the user is asked for the data on the input screen. Another function gets the rest of the employee data. The function has procedural cohesion because it puts a set of operations in a specified order and the operations don’t need to be combined for any other reason. [via GIPHY](https://giphy.com/gifs/i5XuNwrlG2jRK) To achieve better cohesion, put the separate operations into their own functions. Make sure that the calling function has a single, complete job: **getEmployeeData()** rather than **getFirstPartOfEmployeeData()**. You’ll probably need to modify the functions that get the rest of the data too. It’s common to modify two or more original functions before you achieve functional cohesion in any of them.

### 1.6 Logical Cohesion

Logical cohesion occurs when several operations are stuffed into the same function and one of the operations is selected by a control flag that’s passed in. It’s called logical cohesion because the control flow or “logic” of the function is the only thing that ties the operations together—they’re all in a big if statement or case statement together. It isn’t because the operations are logically related in any other sense. Considering that the defining attribute of logical cohesion is that the operations are unrelated, a better name might illogical cohesion. One example would be an **inputAll()** function that input customer names, employee time-card information, or inventory data depending on a flag passed to the function. Other examples would be **computeAll()**, **editAll()**, **printAll()**, and **saveAll()**. The main problem with such functions is that you shouldn’t need to pass in a flag to control another function’s processing.

```
function inputAll(opFlag) {
  switch(opFlag) {
    case 'TIME\_CARD':
      // Input all the employee time-card information
      break;
    case 'INVENTORY':
      // Input all the inventory data
      break;
    case 'CUSTOMER':
      // Input all the customer names
      break;
  }
}


```

Instead of having a function that does one of three distinct operations, depending on a flag passed to it, it’s cleaner to have three functions, each of which does one distinct operation. If the operations use some of the same code or share data, the code should be moved into a lower-level function and the functions should be packaged into a class.

```
function inputTimeCard(timeCard) {
  // Input all the employee time-card information
}

function inputInventory(inventory) {
  // Input all the inventory data
}

function inputCustomer(customer) {
  // Input all the customer names
}


```

It’s usually all right, however, to create a logically cohesive function if its code consists solely of a series of if or case statements and calls to other functions. In such a case, if the function’s only function is to dispatch commands and it doesn’t do any of the processing itself, that’s usually a good design. The technical term for this kind of function is “event handler.”

### 1.7 Coincidental Cohesion

Coincidental cohesion occurs when the operations in a function have no discernible relationship to each other. Other good names are “no cohesion” or “chaotic cohesion.” It’s hard to convert coincidental cohesion to any better kind of cohesion—you usually need to do a deeper redesign and reimplementation.

![cohesion-table.png](http://hangaroundtheweb.com/wp-content/uploads/2017/09/cohesion-table.png)

None of these terms are magical or sacred. Learn the ideas rather than the terminology. It’s nearly always possible to write functions with functional cohesion, so focus your attention on functional cohesion for maximum benefit.

**References:**

1.  [Code Complete 2 by Steve McConnell](http://amzn.in/fKvTdgU)
2.  [Intramodule Cohesion](http://www.cs.unc.edu/~stotts/COMP145/cohesion.html)
3.  [Communication between modules: Cohesion](https://wlazuardi.wordpress.com/2013/05/13/communication-between-modules-cohesion-and-coupling/)

**Cover Image by:**

[Keit Trysh](https://unsplash.com/@tryshphoto?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from Keit Trysh")