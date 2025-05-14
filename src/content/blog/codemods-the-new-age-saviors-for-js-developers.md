---
title: 'Codemods - The New Age Saviors for JS Developers'
pubDate: '2019-03-22'
description: 'An introduction to codemods and their role in large-scale codebase refactoring.'
tags: ['Articles', 'codemod', 'codemods', 'Javascript', 'jscodeshift']
heroImage: '/blog-placeholder-1.jpg'
---

In this article, we take a look at [Codemods](https://github.com/facebook/codemod), a tool for making sweeping changes across your code with ease and effectiveness. Codemods are invented by a team of developers from [Facebook](https://facebook.com) to assist large-scale migrations in code-base, and we are going to take a deep look into a particular codemod tool called jscodeshift.

### Refactoring

Before we dive into the codemod tools like jscodeshift, we need to understand why we need to do large-scale refactorings and what is really meant by refactoring. The term **refactoring** was first introduced by [Martin Fowler](https://martinfowler.com/) from [ThoughtWorks](http://www.thoughtworks.com/) and he also wrote a seminal [book](https://martinfowler.com/books/refactoring.html) about the topic. If you want to get better at writing good code or to do better refactorings, this is the one book you should definitely look into. According to Fowler,

> Refactoring is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior.

Its heart is a series of small behavior preserving transformations. Each transformation (called a "refactoring") does little, but a sequence of these transformations can produce a significant restructuring. Since each refactoring is small, it's less likely to go wrong. The system is kept fully working after each refactoring, reducing the chances that a system can get seriously broken during the restructuring.

But the real motivation behind code refactorings are the smells in your code or some hidden issues lurking in the dark for a very long time, which will eventually pop up during one of the critical moments when your application is trying to do some important task, this code can prove costly or it might bring you a maintenance nightmare time and again. Hence we need to understand these intricate patterns of code causing all these troubles in the first place and then apply proper refactoring mechanisms to remove them completely.

### Code smells

Bad smells in code are certain structures in the code that suggest (sometimes they scream for) the possibility of refactoring. Determining what is and is not a code smell is subjective, and varies by language, developer, and development methodology. In [Refactoring](https://refactoring.com/), Martin Fowler along with [Kent Beck](https://en.wikipedia.org/wiki/Kent_Beck) have identified about 20 different kinds of [code smells](https://en.wikipedia.org/wiki/Code_smell). They have also catalogued the various refactoring methods that can be applied to remove these code smells from your source.

![](/wp-content/uploads/2019/03/common-code-smells.png)

### Tools

#### jscodeshift

[jscodeshift](https://github.com/facebook/jscodeshift) is a toolkit for running codemods over multiple JavaScript or Typescript files. It provides:

*   A runner, which executes the provided transform for each file passed to it. It also outputs a summary of how many files have (not) been transformed.  
    
*   A wrapper around recast, providing a different API. [recast](https://github.com/benjamn/recast) is an AST-to-AST transform tool and also tries to preserve the style of original code as much as possible.  
    For making transforms using jscodeshift, all you need to do is install the package through npm and run it with a list of transforms against your source files.$ npm i -g jscodeshift $ jscodeshift -t myTransforms fileA fileB --foo=bar

#### recast

[recast](https://github.com/benjamn/recast) is a JavaScript syntax tree transformer, non-destructive pretty-printer, and automatic source map generator. Recast exposes two essential interfaces, one for parsing JavaScript code **(require("recast").parse)** and the other for reprinting modified syntax trees **(require("recast").print)**.

Here's a simple but non-trivial example of how you might use .parse and .print:

```
var recast = require("recast");

// Let's turn this function declaration into a variable declaration.
var code = \[
    "function add(a, b) {",
    "  return a +",
    "    // Weird formatting, huh?",
    "    b;",
    "}"
\].join("\\n");

// Parse the code using an interface similar to require("esprima").parse.
var ast = recast.parse(code);
```

Now do whatever you want to ast. Really, anything at all! When you finish manipulating the AST, let recast.print work its magic:

```
var output = recast.print(ast).code;
```

### High level overview of Codemods work

At a very high level, codemods do a very simple processing with your source code like converting it to AST representations, manipulating nodes in the AST and then finally converting the AST back to source code.

![](/wp-content/uploads/2019/03/codemod-high-level.png)

### Different stages of Codemods

Below you can find the details working of how the jscodeshift and recast tools transform your source code into AST and back to code again.

![](/wp-content/uploads/2019/03/codemod-stage-final.png)

### AST

An abstract syntax tree ([AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)), or just syntax tree, is a tree representation of the abstract syntactic structure of source code written in a programming language. Each node of the tree denotes a construct occurring in the source code.

### What you can do with AST

Understanding AST representations of your source code gives you a great leverage in doing a lot of awesome stuff like the following:

*   You can write your own eslint rules to enforce code conventions
*   You can write your own JS transpiling code
*   You can write powerful code mods to refactor your codebase

### Codemods in Frameworks

A lot of JS frameworks nowadays relies heavily on codemods to make their migrations seamless, so that their consumers or the developers using the frameworks don't have to rewrite a lot of stuff while moving on to newer apis or a newer version of the framework itself. Frameworks like[React](https://reactjs.org/), [Vue](https://vuejs.org/), [Angular](https://angular.io/) have published a lot of codemod tools to assist the developers in carrying out large-scale code migrations for their applications written in those frameworks.

### Ember ❤ Codemods

Ember.js, a popular MVC model JS framework relies heavily one codemods for their migration paths from one version to the next. Whenever there is a deprecation or breaking change introduced in the framework, the core team will ensure that they have proper backward compatibility and clearly defined migration paths with codemods.

*   [ember-modules-codemod](https://github.com/ember-cli/ember-modules-codemod) : Codemod to upgrade Ember apps to JavaScript (ES6) modules
*   [ember-qunit-codemod](https://github.com/rwjblue/ember-qunit-codemod) : Convert your projects from the older moduleFor\* syntax of ember-qunit@2 to the newer syntax
*   [ember-test-helpers-codemod](https://github.com/simonihmig/ember-test-helpers-codemod) : Codemod to transform your Ember tests to use @ember/test-helpers

#### ember-cli-update

[ember-cli-update](https://github.com/ember-cli/ember-cli-update#readme) is a command-line tool which updates Ember CLI Ember.js apps and addons (and Glimmer.js apps). You can run this either as a global executable available to all projects or an Ember CLI command in a single project. It also fetches list of codemods and instructions from [ember-cli-update-codemods-manifest](https://github.com/ember-cli/ember-cli-update-codemods-manifest).

```
$ npm install -g ember-cli-update

```

To update to the latest version of Ember CLI:

```
ember-cli-update

```

To update to a certain version of Ember CLI:

```
ember-cli-update --to 3.1.0

```

To run codemods: (This should be run after running the normal update shown above, and after you've resolved any conflicts.)

```
ember-cli-update --run-codemods

```

### Reference

#### Videos

*   [Christoph Nakazawa: Evolving Complex Systems Incrementally](https://www.youtube.com/watch?v=d0pOgY8__JM)
*   [Large Scale Refactoring with Codemods](https://www.youtube.com/watch?v=1X9p-RUUkak)
*   [Writing codemods to change all your code at once](https://www.youtube.com/watch?v=8r_sXUDoPYo)
*   [EmberFest 2018: Transformers - codemods in disguise by Jonathan Jackson](https://www.youtube.com/watch?v=mkg3NWcloOw&list=LLVxvrINFNKL9kCbakNFjstg&index=9&t=0s)
*   [Front-end Masters: Introducing Codemods and AST by Kent C. Dodds](https://frontendmasters.com/courses/linting-asts/introducing-codemods-and-ast/)
*   [Master the Art of the AST and Take Control of Your JS](https://www.youtube.com/watch?v=C06MohLG_3s)

#### Articles

*   [Effective Javascript Codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb)
*   [Codemod Survival](https://benmccormick.org/2018/06/18/codemod-survival/)
*   [Getting started with Codemods](https://www.sitepoint.com/getting-started-with-codemods/)
*   [Write code to rewrite your code](https://www.toptal.com/javascript/write-code-to-rewrite-your-code)
*   [awesome-ast](https://github.com/cowchimp/awesome-ast)

#### Tools

*   [https://github.com/facebook/jscodeshift](https://github.com/facebook/jscodeshift)
*   [https://github.com/benjamn/recast](https://github.com/benjamn/recast)
*   [https://github.com/benjamn/ast-types](https://github.com/benjamn/ast-types)
*   [https://astexplorer.net](https://astexplorer.net)
