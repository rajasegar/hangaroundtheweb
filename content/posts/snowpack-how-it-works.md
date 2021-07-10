---
title: 'Snowpack - How it works?'
date: Thu, 26 Mar 2020 19:22:01 +0000
draft: false
tags: ['Articles', 'bundlers', 'javascript', 'Javascript', 'snowpack']
---

Snowpack is a post-install tool. It runs after npm install, and it essentially exists to convert your npm packages (in your "nodemodules/" directory) into JS files that run in the browser without a bundler (written to a "webmodules/" directory).

### Creating a sample app

In this tutorial we are going to create a simple demo app which is going to make use of a library called finance. We are going to create an app to calculate simple interest from principal, rate and time. This application has got no fancy user interface or something. It just calls the method from the library by giving parameters and print the result in the console.

First let's setup the application by creating the necessary files.

```
$ mkdir snowpack-demo
$ cd snowpack-demo
$ npm init -y
$ touch index.html
$ mkdir src
$ touch src/app.js

```

### index.html

This is how our index.html file will look like. As you can see, there's nothing much in the page apart from the script tag at the bottom. This script tag includes a file called app.js from the src folder of the app and having the attribute type set as module. This means that app.js is an ES module that can be used directly in the page. We will see what goes inside the app.js file later.

```
<!DOCTYPE html>
<**html** lang="en">
<**head**\>
  <**meta** charset="utf-8">
  <**title**\>**Snowpack Demo**</**title**\>
</**head**\>
<**body**\>
  <**h1**\>**Hello World**</**h1**\>
  <**script** type="module" src="/src/app.js"></**script**\>
</**body**\>
</**html**\>

```

### snowpack-demo/package.json

This is how our package.json will look like for the demo app. The important thing to note here is the dependency of \`finance\` package.

```
{
  **"name"**: "snowpack-demo",
  **"version"**: "1.0.0",
  **"description"**: "",
  **"main"**: "index.js",
  **"scripts"**: {
    **"test"**: "echo \\"Error: no test specified\\" && exit 1"
  },
  **"author"**: "",
  **"license"**: "ISC",
  **"dependencies"**: {
    **"finance"**: "1.0.0"
  }
}

```

### Creating a dummy package inside nodemodules

And now for this example, we are not going to **actually** install any npm package. We are going to create custom packages on the fly within the nodemodules folder. That's how nodemodules work, at the end of the day all the packages are just a folder of files with a package manifest, in other words a package.json. Hence in order to create a new package all you need is two things: one package.json and the source file.

For the finance package we were talking about earlier, we are going to create the package in the same way like below.

```
$ mkdir node\_modules
$ cd node\_modules
$ mkdir finance
$ cd finance
$ npm init -y
$ touch index.js

```

### package: finance

And the package finance will contain two functions: one for calculating simple interest from principal, rate and time and the other one including the principal. We will be using only the simpleInterest function for our demo. The other one just exists for the sake of it.

```
**import** { add, multiply, divide } from 'math';

**export** **function** simpleInterestPrincipal(principal, rate, time) {
  **return** multiply(
    principal,
    add(1, multiply(divide(rate,100),
    time)));
}

**export** **function** simpleInterest(principal, rate, time) {
  **return** multiply(principal, divide(rate,100), time);
}

```

### finance/package.json

The package.json for the finance module is a normal package.json manifest with one exception. We are adding the module field to point out the ESM version of this module by telling where it resides. Since we have already written the package using ES import and export statements, the value of this field is the same as the main field which points to index.js

```
{
  **"name"**: "finance",
  **"version"**: "1.0.0",
  **"description"**: "",
  **"main"**: "index.js",
  **"module"**: "index.js",
  **"scripts"**: {
    **"test"**: "echo \\"Error: no test specified\\" && exit 1"
  },
  **"keywords"**: \[\],
  **"author"**: "",
  **"license"**: "ISC",
  **"dependencies"**: {
    **"math"**: "1.0.0"
  }
}

```

### package: math

Now it's time to take a look at the math package. It's simple library exposing primitive operations like add, multiple, divide, etc., and it follows Common JS export system. The reason it is using CMD is to demonstrate the capabilities of Snowpack in handing Common JS modules. Snowpack can also bundle Common JS modules but which are actually the internal dependencies of your parent packages.

```
{
  **"name"**: "math",
  **"version"**: "1.0.0",
  **"description"**: "",
  **"main"**: "index.js",
  **"scripts"**: {
    **"test"**: "echo \\"Error: no test specified\\" && exit 1"
  },
  **"author"**: "",
  **"license"**: "ISC"
}

```

### math / index.js

The below are the contents of the math library.

```
module.exports = {
  **add**: **function**(a,b) {
    **return** a + b;
  },
  **subtract**: **function**(a,b) {
    **return** a - b;
  },
  **multiply**: **function**(a, b) {
    **return** a \* b;
  },
  **divide**: **function**(a,b) {
    **return** a / b;
  },
  **square**: **function**(a) {
    **return** a \* a;
  }
};

```

Now the dependency tree of our demo app looks like this.

![](/wp-content/uploads/2020/03/dependency-tree.png)

Now install the dependencies using npm and then run snowpack.

```
$ npm install
$ snowpack
✔ snowpack installed: finance. \[0.06s\]
$

```

Snowpack will read the dependencies from the package.json and start bundling them. Each individual dependency is built with all its dependent packages are flattened into a single file. As you can see below the finance and math packages is bundled into a single file in the new **webmodules** directory called **finance.js**. And this is the file which we will be consuming in our demo app.

![](/wp-content/uploads/2020/03/snowpack-run1.png)

Now if you inspect the finance.js file in your **webmodules** folder.

![](/wp-content/uploads/2020/03/finance-js-1.png)

Now we can see how we can use the finance.js from the webmodules folder in our app.js

```
**import** { simpleInterest } from '../web\_modules/finance.js';

console.log('Hello Snowpack');
console.log(simpleInterest(10000, 3.85, 5));


```

### Peer Dependencies

Now what about peer dependencies? Snowpack is very well equipped for handling peer dependencies in your applications also. It will properly bundle your dependencies by putting the commonly used code such as peer dependencies inside a common folder so that the packages which are consuming these can easily access the same without redundancy.

The dependency tree of our app is very simple we have only two packages finance which is depending on math. Let's introduce a new package called bmi which will expose methods for calculating bmi (body mass index). The bmi package is also depending on math package for its calculation. Hence our math package now becomes a peer dependency for finance and bmi.

We are going to follow the same steps for creating the bmi package just as we did for finance.

```
$ cd node\_modules
$ mkdir bmi
$ cd bmi
$ npm init -y
$ touch index.js

```

#### package/bmi

```
**import** { divide, square } from 'math';

**export** **default** **function**(weight, height) {
  **return** divide(weight / square(height));
}

```

Now add the same package to the dependencies list for the demo app in package.json

```
{
  **"name"**: "snowpack-demo",
  **"version"**: "1.0.0",
  **"description"**: "",
  **"main"**: "index.js",
  **"scripts"**: {
    **"test"**: "echo \\"Error: no test specified\\" && exit 1"
  },
  **"author"**: "",
  **"license"**: "ISC",
  **"dependencies"**: {
    **"finance"**: "1.0.0",
    **"bmi"**: "1.0.0"
  }
}

```

The dependency tree of our demo will now look like this:

![](/wp-content/uploads/2020/03/dependency-tree-new.png)

Now install the dependencies using npm and then run snowpack.

```
$ npm install
$ snowpack
✔ snowpack installed: finance, bmi. \[0.09s\]
$

```

You can optionally add “snowpack” as a "prepare" script to your package.json and npm/yarn will automatically run it after every new dependency install. This is recommended so that new dependencies are automatically included in your webmodules/ directory immediately.

```
/\* package.json \*/
**"scripts"**: {
  **"prepare"**: "snowpack"
}

```

After the installing and running snowpack the bundled files inside webmodules directory will be three Javascript files. One for the bmi package, one for the finance package and we now have common directory which contains the common code in the file named index-093dfa0c.js used by both the packages, which is actually the math package code.

![](/wp-content/uploads/2020/03/snowpack-run-2.png)

If you inspect the contents of the file in the webmodules folder you can see yourself that Snowpack changed both the bmi and finance package to import from the common math package bundled.

This is how the bundled bmi package will look like now.

![](/wp-content/uploads/2020/03/web-modules-bmi.png)

And this is how the bundled finance package will look like.

![](/wp-content/uploads/2020/03/web-modules-finance.png)

And if you are curious what goes inside the common index file, as I mentioned previously it just contains the code of the math package.

![](/wp-content/uploads/2020/03/web-modules-common.png)

Now we can import the bmi package into our demo application from the webmodules folder like below:

```
**import** { simpleInterest } from '../web\_modules/finance.js';
**import** { bmi } from '../web\_modules/bmi.js';

console.log('Simple Interest');
console.log(simpleInterest(10000, 3.85, 5));
console.log('Body Mass Index (BMI)');
console.log(bmi(75, 1.8));


```

### Production Builds

Snowpack is not only optimized for development environment but also for production builds. You can create compressed or minified version of your dependencies for using in production environments and deploying with Snowpack. It also generates source maps when you are bundling for production. All you need to do is to pass the –optimize flag while running Snowpack.

```
$ snowpack --optimize

```

![](/wp-content/uploads/2020/03/production-builds.png)

### Tree Shaking

Snowpack helps you to remove any unused code from your dependencies (when “Automatic Mode” is enabled via the –include flag). In order for Tree shaking to work properly we need to have ESM compatible versions for all your packages. Since our math package is based on Common JS module system, we need to have a separate ESM version for the same like below.

It is actually quite easy all you have to do is to convert them using export syntax for each methods which are exported from the math package instead of using the module.exports

```
**export** **function** add(a, b) {
  **return** a + b;
};

**export** **function** subtract(a, b) {
  **return** a - b;
};

**export** **function** multiply(a, b) {
  **return** a \* b;
};

**export** **function** divide(a, b) {
  **return** a / b;
};

**export** **function** square(a) {
  **return** a \* a;
};

```

And you also need to make some changes with the package.json of the math package by exposing the ESM version using the module field.

```
{
  **"name"**: "math",
  **"version"**: "1.0.0",
  **"description"**: "",
  **"main"**: "index.js",
  **"module"**: "index-esm.js",
  **"scripts"**: {
    **"test"**: "echo \\"Error: no test specified\\" && exit 1"
  },
  **"author"**: "",
  **"license"**: "ISC"
}

```

Now if you run Snowpack again with the –include flag with the app.js file.

```
$ snowpack --include "src/app.js"

```

You will have your math package properly tree-shaked or the unused subtract methods from the package will be removed since it is not used by any of the dependencies.

![](/wp-content/uploads/2020/03/tree-shaking.png)

That's all from this tutorial. Hope you have a better idea now about how Snowpack bundles your dependencies in your applications from the above examples. Please let me know for any issues or feedback about the article in the comments.

Cover Image by [Chris Biron](https://unsplash.com/@biron?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/snow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
