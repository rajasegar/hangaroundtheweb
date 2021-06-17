---
title: 'Ember Octane - everything one can expect in the next Ember edition'
date: Sun, 26 Aug 2018 22:17:45 +0000
draft: false
tags: ['#EmberJS2018', 'ember', 'ember-octane', 'emberjs', 'Uncategorized']
---

Everything one can expect in Ember Octane
-----------------------------------------

A few days ago, Tom Dale opened the [Ember 2018 Roadmap RFC](https://github.com/emberjs/rfcs/blob/26c4d83fb66568e1087a05818fb39a307ebf8da8/text/0000-roadmap-2018.md) that set the goals for Ember in 2018. The RFC consisted of three major goals like:

*   Improve communication and streamline decision-making, and empower new leaders.
*   Finish the major initiatives that have already been started.
*   Ship a new edition, Ember Octane, focused on performance and productivity.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/08/ember-2018-roadmap.png)

In this article we will focus on Ember Octane which is primarily targeted to improve performance of Ember applications for low-end devices and the like.

Ember Octane will be a new edition of Ember, emphasizing its modern productivity and performance. The Core team promises to polish Ember's compatibility with new JavaScript language features like native classes, decorators, and async functions. There is also some significant emphasis to continue efforts like optional jQuery and treeshaking that reduce file size. It is also expected that the Ember team will overhaul the Ember homepage to align with Octane and tell the story of modern Ember.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/08/ember-octane.png)

Some of the primary motivations for Ember Octane came from The 2018 Community Survey, #EmberJS2018 blog posts, [Ember Discussion Forum](https://discuss.emberjs.com) and deliberations among the Ember core teams.

> The homepage looks a bit outdated and does not a very compelling job at selling Ember to new users, IMHO. This needs to change.
> 
> **— [Simon Ihmig](https://www.kaliber5.de/en/blog/ember-js-in-2018-get-better-at-marketing/)**

> When you generate a project with \`ember new\`, you get a project that is almost “legacy” by standards of the wider JavaScript community.
> 
> **— [Gaurav Munjal](https://medium.com/@gauravmunjal_86037/stability-without-stagnation-in-2018-ce2d4f519991)**

> Ember's custom object model isn't hard to learn, but it's a big reason people are turned off before learning why Ember is such a great choce. I'd like to see ES classes support finished and adopted in the Guides ASAP, followed by decorators.
> 
> **— [Michael Kaiser-Nyman](https://gist.github.com/michaelrkn/ffdd67906a724362bd8f5ccc3434db0f)**

> ES6 syntax, the new file layout, new templating etc. — the new features will land in 3.x releases as non-breaking changes, but let’s prepare to show off the sum of all those amazing parts. Sell the vision, right now! A ‘relaunch’ of Ember in the minds of those who dismiss it.
> 
> **— [Will Viles](https://medium.com/@willviles/ember-js-in-2018-lets-market-the-future-e6be9c42cf86)**

Ember releases a new, stable version every six weeks. For existing users, this reverberation of incremental improvement is easier to keep up with than splashy, big-bang releases.

However, for people not following Ember closely, it’s easy to miss the significant improvements that happen over time. As detailed in the forthcoming Ember Editions RFC (being worked on by [Dave Wasmer](https://medium.com/@davewasmer)), every year or so the team will release a new edition of the Ember, focused on a particular theme. The set of improvements related to that theme, taken together, mark a meaningful change to how people should think about Ember.

In 2018, the Ember team will release the first edition of Ember, called Ember Octane. Octane will focus on the themes of productivity and performance. Ember Octane will generally highlight how Ember excels in performance-constrained environments, particularly on mobile devices, as well as the productivity benefits of modern JavaScript features like [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841), and [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)functions when paired with Ember’s strong conventions and community.

We can also expect the team to review the new [application blueprint](https://ember-cli.com/extending/#generators-and-blueprints), to ensure that it is up-to-date with the latest Ember Octane idioms and includes the right set of addons to help new users achieve our goals of productivity and performance.

> Ember Octane is about **doing more with less**. Not only does this make Ember simpler to learn, it makes the framework smaller and faster, too.

These are some of the highlights of Ember Octane as quoted by Tom Dale in the RFC:

### 1\. No jQuery

![](http://hangaroundtheweb.com/wp-content/uploads/2018/08/no-jquery.png)

Currently available as an optional feature, this will be enabled by default. The process of making jQuery optional started with the [Make jQuery optional RFC](https://github.com/emberjs/rfcs/blob/master/text/0294-optional-jquery.md) by Robert Jackson in January this year. For the past Ember has been relying and depending on jQuery. This RFC proposes making jQuery optional and having a well defined way for users to opt-out of bundling jQuery.

Mathias Bynens has [demonstrated](https://mathiasbynens.be/demo/jquery-size) the major drawback of having jQuery, the increased bundle size, which amounts to ~29KB (minified and gzipped).

![](http://hangaroundtheweb.com/wp-content/uploads/2018/08/jquery-usage.png)

### 2\. Svelte builds

“svelte” builds of Ember, are where deprecated but unused code paths in the framework are removed during an application build. The team will get more aggressive about deprecating code that is not widely used. With the eventual introduction of Svelte builds, there will be a mechanism to say "strip out any code for deprecated features from 2.0 to 2.8".

There is an [issue](https://github.com/emberjs/ember.js/issues/15062) in the official github repository regarding svelte builds with the title \[Project Svelte\] Deprecation Introduction Hitlist opened by Chad Hietala which highlights some of the ways and approaches to find deprecations and the list of deprecation IDs.

Some preliminary explorations on svelte builds have also taken place among Ember developers some of which can be found in this [thread](https://discuss.emberjs.com/t/is-there-a-discussion-direction-around-ember-rollup-for-svelte-builds/12766) in the Ember Discussion Forum.

You can find some references to svelte builds in this official blog [post](https://www.emberjs.com/blog/2017/10/03/the-road-to-ember-3-0.html) by Matthew Beale on The Road to Ember 3.0.

### 3\. Native JavaScript classes

Ember Octane will make use of native Javascript classes which perform better and require less code, and integrate better with tools like TypeScript and ESLint.

### 4\. Glimmer Components

![](http://hangaroundtheweb.com/wp-content/uploads/2018/08/glimmer.png)

[Glimmer](https://glimmerjs.com/) is one of the fastest DOM rendering engines, delivering exceptional performance for initial renders as well as updates. Architected like a virtual machine (VM), Glimmer compiles your templates into low-level code so it can run as fast as possible—without sacrificing ease of use. With Ember Octane, Glimmer components offer a greatly simplified API and remove common slow paths.

Glimmer differentiates between static and dynamic components, thus reducing the number of elements that need to be checked when looking for changes. This differentiation can be achieved thanks to the expressiveness of Handlerbar's templates.

Another key [difference](https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/) between Glimmer and other solutions lies in the way nodes are stored and compared. Glimmer stores nodes as simple stream-like objects (that is, simple queues of values) rather than full-fledged DOM-like nodes. To find out whether a real DOM node needs updating, the final value of a Glimmer node is compared to the last known real DOM value. If the value has not changed, no further actions are taken.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/08/emberdom4.png)

### 5\. Incremental rendering and rehydration

Incremental rendering addresses problems like, to get high levels of animation performance you have to synchronize the DOM (tween stack across the entirety of the animation chain in order to minimize layout thrashing) and skipping style updating when updates would be visually imperceptible.

In React, [Fiber](https://github.com/acdlite/react-fiber-architecture) takes charge of solving problems like it. Bringing a feature named “incremental rendering” which split rendering work into chunks and spread it out over multiple frames. The new rendering logic allows a better approximation of the principles of an animation.

In traditional way React uses Stack, which is synchronous and recursive. But can’t be split in chunks, have a heavyweight context and other issues. The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. Other key features include the ability to pause, abort, or reuse work as new updates come in; the ability to assign priority to different types of updates; and new concurrency primitives.

> **Incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

Rehydration in the context of isomorphic JavaScript applications is the act of regenerating the state that was used to render the page response on the server. This could include instantiating controller and view objects, and creating an object or objects (e.g., models or POJOs) from the JSON that represents the data used to render the page. It could also include instantiating other objects, depending on your application architecture.

Rehydration is more common in frameworks like React where SSR is given an important consideration and with the advent of [Ember Fastboot](https://www.ember-fastboot.com/), the concept of rehydration is also becoming a buzzword in the framework arena.

### 6\. Treeshaking

In computing, tree shaking is a dead code elimination technique that is applied when optimizing code written in ECMAScript dialects like [Dart](https://www.dartlang.org/), JavaScript, or [TypeScript](https://www.typescriptlang.org/) into a single bundle that is loaded by a web browser. Rather than eliminating code that can never be executed, tree shaking starts from entry point and includes only the code that can ever be executed. It is succinctly described as "live code inclusion".

In Ember, tree shaking has already been part of the [JavaScript Module API RFC](https://en.wikipedia.org/wiki/Tree_shaking) which was implemented in the recent versions of Ember.

To get deep insights about tree shaking, please read this [article](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80) by Rich Harris, one of the contributors of [Rollup](http://rollupjs.org/) giving a detailed explanation of how tree shaking is done in Rollup.

### 7\. Eliminating the runloop

Ember Octane will also focus on eliminating the runloop from the programming model, replaced by async and await in tests.

### Timeline

The final timeline and feature set of Ember Octane will be determined by the Core team and are not set in stone.

Ember Octane will mostly incorporate all features that are either finished or being implemented now, keeping with the commitment to finishing what has been started by the Ember Team. It is recommended that the team will not plan for Octane to have any features that are not already close to being done today, so that they have adequate time to make sure they all work well together as part a cohesive programming model.

The process of releasing a new edition also gives the developers and users an opportunity to evaluate what it’s like to use Ember end-to-end. It is highly likely that the team will overhaul the Ember homepage, focusing on Ember Octane and how it helps solve targeted use cases.

The Ember Team will perform a holistic review of the guides, making sure that examples use the latest idioms and set new learners on a good path.

### References

*   [https://github.com/emberjs/rfcs/blob/26c4d83fb66568e1087a05818fb39a307ebf8da8/text/0000-roadmap-2018.md](https://github.com/emberjs/rfcs/blob/26c4d83fb66568e1087a05818fb39a307ebf8da8/text/0000-roadmap-2018.md)
*   [https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/](https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/)
*   [https://stackoverflow.com/questions/29824908/what-does-dehydrate-and-rehydrate-stand-for-in-fluxible](https://stackoverflow.com/questions/29824908/what-does-dehydrate-and-rehydrate-stand-for-in-fluxible)
*   Building Isomorphic Javascript Applications by Jason Strimpel & Maxime Najim
*   [https://en.wikipedia.org/wiki/Tree\_shaking](https://en.wikipedia.org/wiki/Tree_shaking)
*   [http://raphamorim.io/understanding-react-fiber-incremental-rendering-feature/](http://raphamorim.io/understanding-react-fiber-incremental-rendering-feature/)

#### Image Credits:

Photo by [chuttersnap](https://unsplash.com/photos/gts_Eh4g1lk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/speed?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)