---
title: 'AST Builder - Building AST nodes from code'
pubDate: '2019-12-08'
description: 'A look at the AST Builder tool for generating AST nodes from source code.'
tags: ['abstract syntax tree', 'Articles', 'codemod', 'codemods', 'Javascript', 'jscodeshift']
heroImage: '/blog-placeholder-1.jpg'
---

In this article, we are going to take a look at a tool called 'AST Builder' which will significantly improve the developer experience for writing codemods.

[Codemod](https://github.com/facebook/codemod) is a tool/library to assist you with large-scale codebase refactors that can be partially automated but still require human oversight and occasional intervention. Codemod was developed at Facebook and released as open source.

If you want to know more about codemods, their building blocks and how they work, please check out this [detailed post](/2019/03/codemods-the-new-age-saviors-for-js-developers/) about codemods.

![](/wp-content/uploads/2019/12/ast-builder-screenshot-main.png)

### What?

[AST Builder](https://rajasegar.github.io/ast-builder/) is actually a playground for building [AST](http://en.wikipedia.org/wiki/Abstract_syntax_tree) nodes using source code. Because ASTs play a big role in writing codemods, this tool will assist the developers to a great extent in writing codemods. Because codemods actually do AST-to-AST transformation on your source code, and that's one of the primary reasons, why codemods are more resilient in making effective code transformations.

![](/wp-content/uploads/2019/12/ast-builder-annotated.jpg)

It currently supports Javascript (ES5, ES6 and some ES7 constructs) , JSX and [Glimmer.js](https://github.com/glimmerjs) handlebars syntax. Please take a look at these issues, [Cover core api](https://github.com/rajasegar/ast-node-builder/issues/1), [Cover ES6 api](https://github.com/rajasegar/ast-node-builder/issues/2) for coverage information. And I am planning to include more language syntax and semantics.

### Why?

We already have an well-established and battle-tested tool called "[ast-explorer](https://astexplorer.net/)" for visualizing abstract syntax trees or ASTs. Why we need a new tool then? Because AST explorer is only for exploring your ASTs, it doesn't tell how to create AST nodes. Even though, ast-explorer offers [intellisense](https://docs.microsoft.com/en-us/visualstudio/ide/using-intellisense) in their editor for the [jscodeshift](https://github.com/facebook/jscodeshift) apis, it doesn't work for all the parsers like you can only be using the autocomplete api for [recast](https://github.com/benjamn/recast) parser. If you choose any other parser other than recast, you won't get the intellisense in the codemod editor.

And most of the time, you will be creating nodes for transforming code using codemods. And we definitely need a tool which makes it easy to create nodes. The problem is, there is no proper documentation on creating AST nodes using the jscodeshift api. All you have to do is learn from other [codemods](https://github.com/reactjs/react-codemod) out there and sift through the code and find out how you can create new nodes.

For that you need to understand the parser internals, the Node schema and the types of node builders available for the language you are working.

If you are still not convinced why this tool will make a difference in developer experience for building codemods, listen to what others say [here](https://github.com/benjamn/ast-types/issues/369).

Say for example, for Javascript, you need to know the [ESTree](https://github.com/estree/estree) spec or the node builder definition in [ast-types](https://github.com/benjamn/ast-types). This module provides an efficient, modular, [Esprima](https://github.com/ariya/esprima)\-compatible implementation of the abstract syntax tree type hierarchy pioneered by the [Mozilla Parser API](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API).

Now let's say you want to replace a `CallExpression`, `foo()` with a new one like `foo.bar()`. The AST representation for the above two expressions will be like:

```
// AST Node for foo()
{
  "type": "ExpressionStatement",
  "expression": {
    "type": "CallExpression",
    "callee": {
      "type": "Identifier",
      "name": "foo",
    }
  }
}

```

I have omitted a lot of information in the above code for clarity and readability purposes. It only contains the relevant information for the actual `CallExpression` AST node. If you want to explore the full tree structure of the AST, you can check it in ast-explorer.

```
// AST Node for foo.bar()
{
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "foo",
          }
        }
      }
  }

```

As you can see from the above two AST nodes, the only difference between the two is the callee object which is a simple `Identifier` in `foo()` and a `MemberExpression` in `foo.bar()`. Usually with codemods, we will be replacing the original expression with the new one. Hence here, we will be replacing the original CallExpression with a new one like this.

```
module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const body = root.get().value.program.body;

  root.find(j.CallExpression, {
    callee: {
      name: "foo"
    }
  }).replaceWith(path => {
    return j.callExpression(
      j.memberExpression(
        j.identifier("foo"), j.identifier("bar"), false), \[\]);
  });

  return root.toSource();
};
```

In order to replace the old CallExpression with a new one, we need to build the new one. From the above codemod you can see we are building the new one using jscodeshift api like this:

```
return j.callExpression(
  j.memberExpression(
    j.identifier("foo"), j.identifier("bar"), false), \[\]);
```

If you try to build the above CallExpression within the ast-explorer transform editor, you will be having a tough time if you are doing it for the first-time. Because you are not very familiar with the the builder api in the first place, and you don't know the correct order and type of parameters you need to supply to correctly build the AST node. And don't forget the typos and punctuation errors you make while typing the code.

> There are also some subtle nuances with the jscodeshift api which beginners won't know for example, the api `j.callExpression` is a constructor for building `CallExpression` nodes, whereas `j.CallExpression` is an instance of the type `CallExpression` which is basically used to find nodes of the type `CallExpression`.

This is where [AST Builder](https://rajasegar.github.io/ast-builder/) comes into the picture, it is acting as a reference guide for builder apis to easily build your AST nodes. Just input the expected code in the input editor (see the image above to identify the input editor which is always at the top left pane in the layout) you will get the builder api automatically generated for you without any mistakes. So if you input `foo.bar()` into the AST Builder it will give you something like:

```
j.expressionStatement(
  j.callExpression(
    j.memberExpression(
      j.identifier("foo"), j.identifier("bar"), false), \[\])
);

```

You can safely omit the `ExpressionStatement` wrapper if you are just replacing the nodes.

Now, you can simply copy the builder api from AST Builder and use it in your codemods. How easy is that?

### How?

AST Builder uses '[ast-node-builder](https://github.com/rajasegar/ast-node-builder)' an npm package underneath, which provides the apis for building AST nodes through jscodeshift. All the api's takes an object as a parameter and returns the builder api in string format, which you can use with jscodeshift to create new nodes. The object which is passed to the api as a parameter is actually a node in the AST generated by the respective parser. When you feed the node to the ast-node-builder api, you get back the jscodeshift api to build that node.

This allows developers to easily and effectively create AST nodes from source code, instead of tinkering with the autocomplete api in ast-explorer. All you have to do is just enter or copy paste the source code into the input editor and you can see the jscodeshift api automatically generated for you in the output editor.

```
const { buildAST } = require('ast-node-builder');
const { parse }  = require('recast');
const code = \`foo.bar()\`;

let ast = parse(code);

let pseudoAst =  buildAST(ast);
console.log(pseudoAst);
```

The above snippet will generate some thing like this:

```
j.expressionStatement(
  j.callExpression(
    j.memberExpression(
      j.identifier("foo"), j.identifier("bar"), false), \[\])
);

```

You can also use the AST Builder to visualize your AST on the top right pane without all the noise and clutter of meta information. We deliberately filter out the `loc` nodes from the AST and also the `tokens`, since we feel it is not of much use for working with codemods. To dig deep into the builder you can take a look at the source code [here](https://github.com/rajasegar/ast-builder), it is built in [Ember.js](https://emberjs.com/).

And if you are a dark-theme fan, AST Builder also allows to switch your editor themes to dark mode. You can play around with the list of languages and list of parsers. Please use the `Report issues` link at the footer if you want to report any issues or feedback, you can tell us how we can improve the tool and what additional languages we need to support.

Stay tuned or subscribe to the newsletter at the bottom to know more about the exciting tools we are building around ASTs and Codemods.

### References

*   [jscodeshift](https://github.com/facebook/jscodeshift)
*   [recast](https://github.com/benjamn/recast)
*   [ast-types](https://github.com/benjamn/ast-types)
*   [ast-node-builder](https://github.com/rajasegar/ast-node-builder)
*   [ast-builder](https://github.com/rajasegar/ast-builder)
