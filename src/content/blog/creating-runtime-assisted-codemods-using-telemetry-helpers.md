---
title: 'Creating runtime assisted Codemods using Telemetry helpers'
description: ''
pubDate: '2019-10-31'
tags: ['Articles', 'codemod', 'codemods', 'ember', 'emberjs', 'EmberJS', 'telemetry']
---

In this article, we are going to take a glimpse at the [ember-codemods-telemetry-helpers](https://github.com/ember-codemods/ember-codemods-telemetry-helpers) package and how it helps to create more advanced codemods for [Ember.js](https://emberjs.com/).

If you want a more in-depth introduction to codemods, you can checkout this [post](/2019/03/codemods-the-new-age-saviors-for-js-developers/) detailing the why's and how's of codemods.

### Telemetry for layman

First we will take a look at what Telemetry is all about. According to [Wikipedia](https://en.wikipedia.org/wiki/Telemetry),

> Telemetry is the collection of measurements or other data at remote or inaccessible points and their automatic transmission to receiving equipment for monitoring.

### Software Telemetry

In software, telemetry is used to gather data on the use and performance of applications and its components, e.g. how often certain features are used, measurements of start-up time and processing time, hardware, application crashes and general usage statistics and/or user behavior. In some cases, very detailed data is reported like individual window metrics, counts of used features and individual function timings.

![](/wp-content/uploads/2019/10/Telemetry-Visibility-Analytics.png)

This kind of telemetry can be essential to software developers to receive data from a wide variety of endpoints that can't possibly all be tested in-house.

### Privacy concerns

Due to concerns about privacy, since software telemetry can easily be used to profile users, telemetry in user software is often an user choice, commonly presented as an opt-in feature (requiring explicit user action to enable it) or during the software installation process.

We had enough look about what really Telemetry is about. Now it's time to look at the more specific use-case of creating codemods using telemetry helpers.

### Telemetry helpers for Codemods

Telemetry helpers runs the app, grabs basic info about all of the modules at runtime. This allows the codemod to know the names of every helper, component, route, controller, etc. in the app without guessing / relying on static analysis. They basically help you to create "runtime assisted codemods".

Below you can find the package composition of the `ember-codemods-telemetry-helpers` package.

![](/wp-content/uploads/2019/10/telemetry-package.png)

The goal of this project is to enable each codemod to manage its own type of data gathering and to provide the harness to run that custom gathering function.

This package exports six functions for gathering telemetry information which can be used in the codemods.

![](/wp-content/uploads/2019/10/ember-codemods-telemetry-helpers-module-exports.png)

### Using the telemetry helpers for codemods

Assuming you are authoring a codemod with [codemod-cli](https://github.com/rwjblue/codemod-cli), `ember-codemods-telemetry-helpers` allows you the freedom to assign your own "telemetry gathering" function while provide one of its own out of the box.

```
#!/usr/bin/env node
'use strict';

const { gatherTelemetryForUrl } = require('ember-codemods-telemetry-helpers');
const appLocation = process.argv\[2\];
const args = process.argv.slice(3);

// Gather only helpers
function findHelpers(possibleEmberObject) {
  if (
    possibleEmberObject &&
    possibleEmberObject.default &&
    possibleEmberObject.default.isHelperFactory
  ) {
    return true;
  }
}


(async () => {
  await gatherTelemetryForUrl(appLocation, findHelpers);

  require('codemod-cli').runTransform(\_\_dirname, 'my-cool-transform', args, 'hbs');
})();
```

All invocations of `gatherTelemetryForUrl` internally returns an object enumerated with properties named after all possible entries within `window.require.entries`. The values of each property is the value returned from within the gathering function. Using the example above, the output might be:

```
{
  'ember-inflector/lib/helpers/pluralize': true,
  'ember-inflector/lib/helpers/singularize': true,
  'input/helpers/app-version': true,
  'input/helpers/pluralize': true,
  'input/helpers/singularize': true,
}
```

This package provides one gathering function: `analyzeEmberObject`. This function does a "best effort" analysis of the app runtime, returning such things as Components, Helpers, Routes, etc. and their particular properties.

```
const { analyzeEmberObject } = require('ember-codemods-telemetry-helpers');
```

It parses Ember meta data object, collects the runtime information and returns the following list of properties :

![](/wp-content/uploads/2019/10/analyzeEmberObject.png)

### Gathering runtime data

Let's see how the codemods use the telemetry helpers to gather data at runtime. For that, let's take an example to see how the `ember-native-class-codemod` is invoked.

```
npx ember-native-class-codemod http://localhost:4200/path/to/server \[OPTIONS\] path/of/files/ or/some\*\*/\*glob.js
```

The first argument that you must pass to the codemod is the URL of a running instance of your application. The codemod opens up your application using the URL passed as the argument and analyzes the classes directly in order to transform them. **Any classes that were not analyzed will not be transformed.** This includes classes that are private to a module and never exported.

If you have any lazily loaded modules, such as modules from [Ember Engines](http://ember-engines.com/), you need to ensure that the URL you provide loads these modules as well. Otherwise, the codemod will not be able to detect or analyze them.

### Origins of the Telemetry helpers

This project was extracted from [ember-native-class-codemod.](https://github.com/ember-codemods/ember-native-class-codemod) That codemod uses [Puppeteer](https://github.com/GoogleChrome/puppeteer) through this package to visit the Ember app and gather telemetry necessary to convert to native classes.

![](/wp-content/uploads/2019/10/telemetry-arch.png)

The idea for the extraction was to put the harness in this package (extracted from the native class codemod), but have the actual **"telemetry gathering"** live in each individual codemod project because the things that they need are quite different, for example, for [implicit this codemod](https://github.com/ember-codemods/ember-no-implicit-this-codemod) and [angle brackets codemod](https://github.com/ember-codemods/ember-angle-brackets-codemod) all we need to know is an array of the helpers and components in the app, but for [native class codemod](https://github.com/ember-codemods/ember-native-class-codemod) it needs much more information such as names and types of methods, properties, etc on each default export.

### Codemods already using the helpers

Currently there are two codemods : [ember-native-class-codemod](https://github.com/ember-codemods/ember-native-class-codemod) and [ember-no-implicit-this-codemod](https://github.com/ember-codemods/ember-no-implicit-this-codemod), which are already making use of the telemetry helpers to gather information from the app during runtime. And there is an open [pull request](https://github.com/ember-codemods/ember-angle-brackets-codemod/pull/154) by [Ryan Mark](https://github.com/tylerturdenpants) for the [ember-angle-brackets-codemod](https://github.com/ember-codemods/ember-angle-brackets-codemod) to make use of the telemetry helpers.

### References

*   [https://en.wikipedia.org/wiki/Telemetry](https://en.wikipedia.org/wiki/Telemetry)
*   [https://github.com/ember-codemods/ember-codemods-telemetry-helpers](https://github.com/ember-codemods/ember-codemods-telemetry-helpers)
*   [https://github.com/ember-codemods/ember-native-class-codemod#gathering-runtime-data](https://github.com/ember-codemods/ember-native-class-codemod#gathering-runtime-data)
*   [https://www.pluribusnetworks.com/blog/network-telemetry-just-makes-sense/](https://www.pluribusnetworks.com/blog/network-telemetry-just-makes-sense/)
