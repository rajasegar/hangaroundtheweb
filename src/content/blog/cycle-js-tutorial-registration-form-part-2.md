---
title: 'Cycle.js tutorial: Registration Form - Part 2'
date: Sun, 12 Feb 2017 23:47:49 +0000
draft: false
tags: ['Cycle.js', 'cycle.js', 'tutorial', 'tutorials', 'web development']
---

This tutorial is the second part of our [previous](/2017/02/cycle-js-tutorial-create-a-simple-registration-form-and-track-the-application-state/) tutorial where we built a simple registration form using Cycle.js. In this part, we will introduce some basic concepts for building Cycle.js like seeds, intents and state.

Table of Contents
-----------------

*   [1\. Cycle.js tutorial: Registration Form - Part 2](#org38c4b74)
    *   [1.1. About Cycle.js](#orga9cad86)
    *   [1.2. Create the application boilerplate](#org7d4fe6c)
    *   [1.3. Defining the state update function](#org5392403)
    *   [1.4. Defining seeds for the application state](#org1124f39)
    *   [1.5. Defining the application intents](#org869d155)
    *   [1.6. Defining our application state](#org7f8c96e)
    *   [1.7. Constructing the virtual DOM tree](#orgf44e8b8)
    *   [1.8. Returning the output sinks](#org6cc9f4e)
    *   [1.9. Links](#org110a423)

1 Cycle.js tutorial: Registration Form - Part 2
-----------------------------------------------

This tutorial is the second part of our [previous](/2017/02/cycle-js-tutorial-create-a-simple-registration-form-and-track-the-application-state/) tutorial where we built a simple registration form using Cycle.js. In this part, we will introduce some basic concepts for building Cycle.js like seeds, intents and state. Online demo is available [here](https://outstanding-playground.surge.sh/). Source code for this tutorial is available in [Github](https://github.com/rajasegar/cyclejs-state-spy-2).

### 1.1 About Cycle.js

[Cycle.js](https://cycle.js.org/) is a functional and reactive JavaScript framework for predictable code created by [Andre Staltz](https://github.com/staltz) from [Futurice](http://futurice.com/blog/sponsoring-free-time-open-source-activities).

### 1.2 Create the application boilerplate

The quickest way to create a new project with Cycle.js is by using [create-cycle-app](https://github.com/cyclejs-community/create-cycle-app).

```
npm install --global create-cycle-app
create-cycle-app my-awesome-app

```

The application folder structure will look like this:

![folder-structure-small.jpg](/wp-content/uploads/2017/02/folder-structure-small.jpg)

Inside the **src/** directory, we will be having the source code:

*   **app.js** => will have your app source code, this is where we will be putting our logic
*   **main.js** => will have main() function which will be executed by Cycle.run
*   **app.test.js** => will have tests for your app

### 1.3 Defining the state update function

In this section we will define a simple function for updating our application state based on the user actions automatically.

```
const scanFn = curry((state, updateFn) => {
  return updateFn(state);
});

```

We are using the [curry](http://ramdajs.com/docs/#curry) function from [ramda](http://ramdajs.com/), which is a practical functional programming library for Javascript programmers. Unlike the likes of [underscore.js](http://underscorejs.org/) and [lodash](https://lodash.com/), ramda really shines as a truly functional programming library for Javascript. If you want to learn more about ramda, go to their official documentation.

### 1.4 Defining seeds for the application state

For any application, we need to start from somewhere to initialize the application state to a bare minimum, so that the user will have something to interact with. Seeds are the things which rightfully serve the exact place for the initial application state.

```
const seeds = {
  username: '',
  email: ''
};

```

### 1.5 Defining the application intents

Here we will be defining the actual user actions which in turn modify the application state as a collective object so that it will be easier for the developer to maintain the actions in a single place.

> Model-View-Intent (MVI) is reactive, functional, and follows the core idea in MVC. It is reactive because Intent observes the User, Model observes the Intent, View observes the Model, and the User observes the View.

For every DOM element with which the user will be interacting with we need to define a set of actions or inputs for which the application state will be reacting to. In our case, we will be interacting mainly with our input boxes, and for each input field we wil be doing the following:

*   From the DOM Source get the input dom element
*   Capture only the **input** events for the element
*   Map each event to the value of the input element i.e., the target

To know more about the MVI architecture, go the Cycle.js [documentation](https://cycle.js.org/model-view-intent.html)

```
const intents = {
  changeUsername: sources.DOM.select("#username")
    .events('input')
    .map((event) => event.target.value),

  changeEmail: sources.DOM.select("#email")
    .events('input')
    .map((event) => event.target.value)
};

```

### 1.6 Defining our application state

Its time to define our application state based on the intents which we have created previously. Our state is a single stream got by merging the two intents **changeUsername** and **changeEmail** and mapping their corresponding values.

```
const state$ = xs.merge(
    // Track fields
    intents.changeUsername.map((v) => assoc('username',v)),
    intents.changeEmail.map((v) => assoc('email',v))
  )
  .fold(scanFn,seeds)
  .remember();

```

### 1.7 Constructing the virtual DOM tree

Here we are constructing the Virtual DOM using the application state. We are using **React** like JSX syntax here, since it feels natural to write HTML markup in HTML rather than using some little **confusingly** hyperscript syntax. For our Virtual DOM, we use [snabbdom-jsx](https://github.com/yelouafi/snabbdom-jsx) which will provide you to write some HTML markup inside Javascript.

```
const vtree$ = state$.map((state) => {
    return (
        

          

Registration
============

          

            Username:
              
            
          

          

            Email:
              
            
          

          

* * *

          

State SPY
---------

          

{ JSON.stringify(state,null,2) }

        

    );
  });

```

![state-spy2.jpg](/wp-content/uploads/2017/02/state-spy2.jpg)

Also, we are capturing the application state using the values stored in **username** and **email** and rendering them in the DOM using pre tags in JSON format.

### 1.8 Returning the output sinks

Finally we are returning the virtual DOM tree as output sinks back again to the main function.

```
const sinks = {
    DOM: vtree$
  };
return sinks;

```

### 1.9 Links

*   [Demo](https://outstanding-playground.surge.sh/)
*   [Github](https://github.com/rajasegar/cyclejs-state-spy-2)
