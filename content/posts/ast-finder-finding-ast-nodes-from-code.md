---
title: 'AST Finder - Finding AST nodes from code'
date: Tue, 10 Dec 2019 02:27:46 +0000
draft: false
tags: ['abstract syntax tree', 'Articles', 'codemod', 'codemods', 'Javascript', 'jscodeshift']
---

In this article, we are going to take a look at a tool called 'AST Finder' which will significantly improve the developer experience for writing codemods.

This is a continuation post for [AST Builder](http://hangaroundtheweb.com/2019/12/ast-builder-building-ast-nodes-from-code/) which is a tool to generate AST nodes automatically from source code.

If you want to know more about codemods, their building blocks and how they work, please check out this [detailed post](http://hangaroundtheweb.com/2019/03/codemods-the-new-age-saviors-for-js-developers/) about codemods.

### What?

[AST Finder](https://rajasegar.github.io/ast-finder/) is actually a playground for finding [AST](http://en.wikipedia.org/wiki/Abstract_syntax_tree) nodes using source code. Because ASTs play a big role in writing codemods, this tool will assist the developers to a great extent in writing codemods. Because codemods actually do AST-to-AST transformation on your source code, and that's one of the primary reasons, why codemods are more resilient in making effective code transformations.

![](http://hangaroundtheweb.com/wp-content/uploads/2019/12/ast-finder-annotated.jpg)

### Why?

> Never memorize something that you can look up.
> 
> ― **Albert Einstein**

We already have an well-established and battle-tested tool called "[ast-explorer](https://astexplorer.net/)" for visualizing abstract syntax trees or ASTs. Why we need a new tool then? Because AST explorer is only for exploring your ASTs, it doesn't tell how to find AST nodes.

The first task in writing codemods is to find the appropriate nodes in the AST and work on them. And we definitely need a tool which makes it easy to find nodes. The problem is, there is no proper documentation on finding AST nodes using the jscodeshift api. All you have to do is learn from other [codemods](https://github.com/reactjs/react-codemod) out there and sift through the code and find out how you can query nodes.

Now let's say you want to replace a `CallExpression`, `foo.bar()` with a new one like `foo()`. The AST representation for the above two expressions will be like:

```
// AST Node for foo.bar()
"expression": {
  "type": "CallExpression",
  "callee": {
    "type": "MemberExpression",
    "computed": false,
    "object": {
      "type": "Identifier",
      "name": "foo"
    },
    "property": {
      "type": "Identifier",
      "name": "bar"
    }
  },
  "arguments": \[\]
}


```

I have omitted a lot of information in the above code for clarity and readability purposes. It only contains the relevant information for the actual `CallExpression` AST node. If you want to explore the full tree structure of the AST, you can check it in ast-explorer.

```
// AST Node for foo()
"expression": {
  "type": "CallExpression",
  "callee": {
    "type": "Identifier",
    "name": "foo"
  },
  "arguments": \[\]
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
      object: {
        name: "foo"
      },
      property: {
        name: "bar"
      }
    }
  }).replaceWith(path => {
    return j.callExpression(j.identifier("foo"), \[\]);
  });

  return root.toSource();
};
```

In order to replace the old `CallExpression` with a new one, first we need to find the existing `CallExpression`. From the above codemod you can see we are querying the AST using jscodeshift api like this:

```
root.find(j.CallExpression, {
  callee: {
    object: {
      name: "foo"
    },
    property: {
      name: "bar"
    }
  }
})

```

If you try to find the above `CallExpression` within ast-explorer transform editor, you will be having a tough time if you are doing it for the first-time. Because you are not very familiar with the find api in the first place, and you don't know the right order and type of parameters you need to supply to correctly find the AST node. And don't forget the typos and punctuation errors you make while typing the code.

> There are also some subtle nuances with the jscodeshift api which beginners won't know for example, the api `j.callExpression` is a constructor for building `CallExpression` nodes, whereas `j.CallExpression` is an instance of the type `CallExpression` which is basically used to find nodes of the type `CallExpression`.

This is where [AST Finder](https://rajasegar.github.io/ast-finder/) comes into the picture, it is acting as a reference guide for find apis to easily query your AST nodes. Just input the code in the input editor (see the image above to identify the input editor which is always at the top left pane in the layout) you will get the find api automatically generated for you without any mistakes. So if you input `foo.bar()` into the AST Finder, it will give you something like:

```
root.find(j.CallExpression, {
  callee: {
    object: {
      name: "foo"
    },
    property: {
      name: "bar"
    }
  }
})

```

Now, you can simply copy the query from AST Finder and use it in your codemods. How cool is that?

### How?

AST Finder uses '[ast-node-finder](https://github.com/rajasegar/ast-node-finder)' an npm package underneath, which provides the apis for finding AST nodes through jscodeshift. All the api's takes an object as a parameter and returns the find api in string format, which you can use with jscodeshift to query new nodes. The object which is passed to the api as a parameter is actually a node in the AST generated by the respective parser. When you feed the node to the ast-node-finder api, you get back the jscodeshift api to find that node.

This allows developers to easily and effectively find AST nodes from source code. All you have to do is just enter or copy paste the source code into the input editor and you can see the jscodeshift api automatically generated for you in the output editor.

```
import { findQuery } from 'ast-node-finder';
import { parse } from 'recast';

const source = \`foo.bar()\`;

const ast = parse(source);

// Pass the node from ast and get the find api
console.log(findQuery(ast.program.body\[0\].expression));
```

The above snippet will generate some thing like this:

```
root.find(j.CallExpression, {
  callee: {
    object: {
      name: "foo"
    },
    property: {
      name: "bar"
    }
  }
})

```

You can also use the AST Finder to visualize your AST on the top right pane without all the noise and clutter of meta information. We deliberately filter out the `loc` nodes from the AST and also the `tokens`, since we feel it is not of much use for working with codemods. To dig deep into the finder you can take a look at the source code [here](https://github.com/rajasegar/ast-finder), it is built in [Ember.js](https://emberjs.com/).

And if you are a dark-theme fan, AST Finder also allows to switch your editor themes to dark mode. Please use the `Report issues` link at the footer if you want to report any issues or feedback, you can tell us how we can improve the tool and what additional languages we need to support.

Stay tuned or subscribe to the newsletter at the bottom to know more about the exciting tools we are building around ASTs and Codemods.

### References

*   [jscodeshift](https://github.com/facebook/jscodeshift)
*   [recast](https://github.com/benjamn/recast)
*   [ast-types](https://github.com/benjamn/ast-types)
*   [ast-finder](https://rajasegar.github.io/ast-finder/)
*   [ast-node-finder](https://github.com/rajasegar/ast-node-finder)
*   [What is an AST? Is it needed?](https://stackoverflow.com/questions/11894326/what-is-an-abstract-syntax-tree-is-it-needed)