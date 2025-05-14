---
title: 'JARVIS - Write me a Codemod'
date: Wed, 18 Dec 2019 05:08:13 +0000
draft: false
tags: ['Articles', 'codemod', 'codemods', 'Javascript', 'jscodeshift']
---

In this article, we are going to take a look at a tool called **JARVIS** which will profoundly transform the way how you write codemods.

This is a continuation post for [AST Finder](/2019/12/ast-finder-finding-ast-nodes-from-code/) which is a tool to generate an api to find AST nodes automatically from source code.

If you want to know more about codemods, their building blocks and how they work, please check out this [detailed post](/2019/03/codemods-the-new-age-saviors-for-js-developers/) about codemods.

### What?

[JARVIS](https://rajasegar.github.io/jarvis/) is actually a playground for writing codemods, where in you can specify the input and output code, choose the appropriate transformation you want to apply and the codemod is automatically generated for you.

![](/wp-content/uploads/2019/12/jarvis-annotated.jpg)

JARVIS currently supports Javascript and [Glimmer.js](https://glimmerjs.com) templates. For Javascript, you can use parsers like [recast](https://github.com/benjamn/recast) and [babel](https://babeljs.io). For Glimmer.js templates which is a more advanced form of [Handlebars](https://handlebarsjs.com/) templates used by Ember.js framework, it is using the [ember-template-recast](https://github.com/ember-template-lint/ember-template-recast) parser to parse and transform the code.

It gives a playground to write code transformations just like AST Explorer but with a more fine-grained control and flexibility to write the transformations because it automatically figures out a lot of things for you like, how you can build new nodes, how you can find nodes from the AST, how to replace, remove or insert nodes into the tree, which visitor function you need to use for writing transformations.

### Why?

> If the goal is to enhance software development throughput, you can either:
> 
> • get faster people to do the work,  
> • get more people to do the work, or  
> • automate the work.
> 
> ― **Chad Fowler** in The Pragmatic Programmer

We already have a very good tool called "[ast-explorer](https://astexplorer.net/)" for visualizing abstract syntax trees or ASTs and writing codemods. Why we need a new tool then? Because AST explorer is only for exploring your ASTs, it doesn't tell how to find or build AST nodes. You have to figure out a lot of things before you can start writing a codemod.

I spent a lot of time figuring out the jscodeshift apis, by looking at their documentation, learning from existing codemods, searching in google, and so on. The learning curve is kind of steep. And my colleagues have to tread down the same path. Whenever we tell any new developer in our team to learn about codemods, they face the same challenges we had in learning about them. Hence I wanted to make their lives easier and approach, learning about codemods a painless task. And that's why JARVIS is created.

The first task in writing codemods is to find the appropriate nodes in the AST and work on them. And we definitely need a tool which makes it easy to find nodes. The problem is, there is no proper documentation on finding AST nodes using the jscodeshift api. All you have to do is learn from other [awesome-codemods](https://github.com/rajasegar/awesome-codemods) out there and sift through the code and find out how you can query nodes.

And the second thing, when you are replacing nodes, you need to know how you can build new nodes. While writing codemods, most of the time we will be creating new nodes. JARVIS can take care of these things for you so that you can focus on building or tweaking the transformation rather than wasting most of your precious time in finding the reference or documentation for building and finding AST nodes.

Once you are done with the transformation, you can simply copy the codemod from JARVIS, put it in a file, let's say for example `transform.js` and run it through with jscodeshift.

```
$ jscodeshift -t transform.js app/components

```

### How?

JARVIS uses two npm packages underneath. One for [building](https://github.com/rajasegar/ast-node-finder) AST nodes from code and the other one for [finding](https://github.com/rajasegar/ast-node-finder) AST nodes from code. It is pretty much a combination of both AST-Builder and AST-Finder working together to automatically generate code transforms.

![](/wp-content/uploads/2019/12/jarvis-arch.png)

First you need to specify the input code in the top-left panel (please see the annotated screenshot above for reference), then you choose the appropriate AST Node operation below. You can choose to remove the node, replace , insert the new node before or after the existing node.

Second, if you are replacing code you can enter the destination code how it is going to change in the bottom-left panel. Then JARVIS will automatically generate a boilerplate code for your transformation in the top-right panel. You can tweak the transformation according to your requirements and verify the transformation is working properly or not by looking at the output in the bottom-right panel.

Let's consider a simple example in JS. Let's say you want to replace all your `foo()` calls with `foo.bar()` in your code. The first task here is you need to identify the type of AST node you want to manipulate, in our case replace. This is an `ExpressionStatement` with an expression of type `CallExpression`. Whereas, the expected output node type is a `MemberExpression`. Hence you need to understand the syntax and semantics of finding a `CallExpression` and create a `MemberExpression` AST node, which will be a very difficult endeavor for someone who has just starting with codemods.

```
foo()

```

What JARVIS does here is, it figures out the type of the input node and the output node, the node manipulation operation you want to do with, and then automatically generates a codemod boilerplate for the same.

```
foo.bar()

```

The codemod for the above transformation will look something like this:

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

To know more about how JARVIS works, you can take a look at the source code [here](https://github.com/rajasegar/jarvis), it is built in [Ember.js](https://emberjs.com/).

And if you are a dark-theme fan, JARVIS also allows to switch your editor themes to dark mode. Please use the `Report issues` link at the footer if you want to report any issues or feedback, you can tell us how we can improve the tool and what additional languages / parsers we need to support.

Stay tuned or subscribe to the newsletter at the bottom to know more about the exciting tools we are building around ASTs and Codemods.

### References

*   [jscodeshift](https://github.com/facebook/jscodeshift)
*   [recast](https://github.com/benjamn/recast)
*   [ast-types](https://github.com/benjamn/ast-types)
*   [ast-builder](https://rajasegar.github.io/ast-builder/)
*   [ast-finder](https://rajasegar.github.io/ast-finder/)
*   [ast-node-builder](https://github.com/rajasegar/ast-node-builder)
*   [ast-node-finder](https://github.com/rajasegar/ast-node-finder)
*   [jarvis](https://github.com/rajasegar/jarvis)
