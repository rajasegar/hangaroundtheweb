---
title: 'Cycle.js tutorial: Create a simple registration form and track the application state'
date: Wed, 08 Feb 2017 05:54:11 +0000
draft: false
tags: ['Cycle.js', 'cycle.js', 'cyclejs', 'frp', 'functional programming', 'reactive programming', 'web development']
---

Create a simple registration form using Cycle.js and track the application state This tutorial is the first in a series where we will be building a simple registration form using Cycle.js and we will be tracking the application state on what the user input is.

Table of Contents
-----------------

*   [1\. Create a simple registration form using Cycle.js and track the application state](#org1b16db6)
    *   [1.1. About Cycle.js](#orgb437669)
    *   [1.2. Create the application boilerplate](#org997295a)
    *   [1.3. Getting the value of username input field](#orgb4dd996)
    *   [1.4. Getting the value of email input field](#orgc2b5ae1)
    *   [1.5. Constructing the virtual DOM tree](#orgab4abae)
    *   [1.6. Returning the output sinks](#orge697073)
    *   [1.7. Links](#orgfe52730)

1 Create a simple registration form using Cycle.js and track the application state
----------------------------------------------------------------------------------

This tutorial is the first in a series where we will be building a simple registration form using Cycle.js and we will be tracking the application state on what the user input is. This repo is just a rewrite for [Ivan Kleshnin](https://github.com/ivan-kleshnin)'s Cyclejs example 1.1, except this version is using ****xstream**** library of [André Staltz](https://github.com/staltz) View the original version here: [1.0-Form](https://github.com/ivan-kleshnin/cyclejs-examples/tree/master/1.0-form) Online demo is available [here](https://excited-shirt.surge.sh/). Source code for this tutorial is available in [Github](https://github.com/rajasegar/cyclejs-state-spy).

### 1.1 About Cycle.js

[Cycle.js](https://cycle.js.org/) is a functional and reactive JavaScript framework for predictable code created by [Andre Staltz](https://github.com/staltz) from [Futurice](http://futurice.com/blog/sponsoring-free-time-open-source-activities).

### 1.2 Create the application boilerplate

The quickest way to create a new project with Cycle.js is by using [create-cycle-app](https://github.com/cyclejs-community/create-cycle-app).

```
npm install --global create-cycle-app
create-cycle-app my-awesome-app

```

The application folder structure will look like this:

![](/wp-content/uploads/2017/02/folder-structure.png)

Inside the ****src/**** directory, we will be having the source code:

*   ****app.js**** => will have your app source code, this is where we will be putting our logic
*   ****main.js**** => will have main() function which will be executed by Cycle.run
*   ****app.test.js**** => will have tests for your app

### 1.3 Getting the value of username input field

*   From the DOM Source get the ****username**** dom element
*   Capture only the **input** events for the element
*   Map each event to the value of the input element i.e., the target
*   Start with a empty quotes value for the initial application state

```
let username$ = sources.DOM.select('#username')
        .events("input")
        .map((event) => event.target.value)
        .startWith("");


```

### 1.4 Getting the value of email input field

Again we are doing the same for the ****email**** element

```
let email$ = sources.DOM.select("#email")
        .events("input")
        .map((event) => event.target.value)
        .startWith("");


```

### 1.5 Constructing the virtual DOM tree

Here we are constructing the Virtual DOM using the application state which in turn is got by combining the ****username**** and ****email**** streams. We will be using the [xstream](http://staltz.com/xstream/) library by Andre Staltz, which is an extremely intuitive, small, and fast functional reactive stream library for JavaScript

```
const vtree$ = xs.combine(username$,email$)
          .map((username,email) => {
            return div(\[
              h1("Registration"),
              div(".form-element",\[
                label({htmlFor:'username'},'Username:'),
                br(),
                input("#username",{type: "text", autocomplete: "off"})
              \]),
              div(".form-element",\[
                label({htmlFor: 'email'},'Email:'),
                br(),
                input("#email",{type: 'email', autocomplete: 'off'})
              \]),
              hr(),
              h2('State SPY'),
              pre(JSON.stringify({username: username,email: email}, null, 2))
            \]);
          });

```

![](/wp-content/uploads/2017/02/state-spy1.jpg)

Also, we are capturing the application state using the values stored in ****username**** and ****email**** and rendering them in the DOM using pre tags in JSON format.

### 1.6 Returning the output sinks

Finally we are returning the virtual DOM tree as output sinks back again to the main function.

```
const sinks = {
    DOM: vtree$
  };
return sinks;


```

### 1.7 Links

*   [Demo](https://excited-shirt.surge.sh/)
*   [Github](https://github.com/rajasegar/cyclejs-state-spy)
