---
title: 'An Elementary Guide to Ember Build Performance'
date: Fri, 23 Feb 2018 03:32:25 +0000
draft: false
tags: ['Articles', 'ember', 'emberjs', 'EmberJS', 'performance', 'tips']
---

An Elementary Guide to Ember Build Performance
----------------------------------------------

When we talk about build performance, it is important to understand that there are several build phases:

*   Cold build
*   Warm build
*   Rebuild

### Cold build

Cold build is the build which happens when you boot your app up for the first time. This build is the slowest because the cache is not yet populated and the application is booting for the first time.   Build time varies and depends on the number of dependencies that application has but ballpark should be around 5 seconds for small to middle size applications and around 15 seconds for large size applications.

### Warm build

Warm build is the build which occurs while you boot your app when cache was populated. This build is faster than cold one because the cache was populated already and it takes less time re-compute dependencies.   Build time varies but ballpark should be around 2 seconds for small to middle size applications and around 10 seconds for large size applications.

### Rebuild

Rebuild is the subsequent rebuilds that happen on file change. Rebuild aims to be the fastest because it happens the most often.   App/ JavaScript Rebuild time varies but ballpark should be around 200-300ms for small to middle size applications and up to 1 second for large size applications (200kloc js + 3000 modules). The Rebuild is majorly classified into three broad categories based on the asset types like:

*   Rebuild of JS in app/
*   Rebuild of CSS/Sass/Less in app/
*   Rebuild of vendor/, bower\_components/

#### Rebuild of JS in app/

This is likely the most common type of rebuilds, since it concentrates mostly on the javascript assets under app/ folder and is one of the major concerns for the Core Team to improve the performance.

#### Rebuild of CSS

This kind of rebuilds largely depends on three factors:

*   the size of bower\_component (the Ember Core Team have plans to largely mitigate this one)
*   which preprocessor is being used (libsass vs ruby-sass vs less vs …)
*   the amount of CSS

#### Rebuild of vendor/

This kind of builds are somewhat costly still, due to how slow available sourceMap Libraries are. The Core Team have a work in progress item with a more V8/JIT friendly sourceMap lib, already showing some very nice improvements.

### Build Performance Comparison

The various builds are compared based on their characteristics and performance:

![](http://hangaroundtheweb.com/wp-content/uploads/2018/02/ember-performance.png)

> These times are based on a posix box with and SSD, win32 unfortunately tends to be slower. As the Core Team continues to improve performance, both posix and win32 will improve, hopefully future work will bring these platforms build times closer together.

If you see that application timings escape, there might be a problem. Addons known to cause a slow down (but have not yet been addressed):

*   any old non-patch based broccoli plugin
*   ember-cli-component-css
*   ember-browserify
*   … ?

Make sure to mention which type of the build seems to be the problem so we can help identify and fix issues faster.

### FAQ/Common Issues & Solutions:

#### My rebuilds are slow. (And I have anti-virus installed)

> The build-system assumes a relative fast/performant file system (although, Ember continue to reduce IO related work). It is quite common for a Anti-virus to slow down IO.

Common issues:

*   anti-virus scanning of _tmp_, oftentimes this can be avoided altogether.
*   anti-virus on-file-access re-scanning files, oftentimes this can be disabled for the app directory. or ember can be whitelisted.

#### My rebuilds are slow. (And I am using an encrypted thumb-drive to host my project)

> These sorts of drives are notoriously slow. Although Ember continue to reduce our IO overhead, you will be running at a disadvantage. Oftentimes, a much better alternative is hardware supported full-disk encryption, like on most OSX corporate laptops use. This setup is both reasonably secure, and has negligible impact on performance.

#### My JavaScript rebuilds are still slow.

Please run:

```
npm ls broccoli-funnel broccoli-merge-trees broccoli-filter broccoli-persistent-filter broccoli-concat broccoli-caching-writer

```

and ideally the following should be true (otherwise some upgrades may be required)

*   broccoli-funnel should be at ^1.0.1
*   broccoli-merge-trees should be at ^1.1.0
*   broccoli-persistent-filter should be at ^1.1.6
*   broccoli-filter often needs to be replaced with broccoli-persistent-filter (we hope to re-merge the two eventually)
*   broccoli-sourcemap-concat should be at ^2.0.2 but will soon be replace by broccoli-concat (we have just re-merged the two)
*   broccoli-caching-writer should be at ^2.2.1
*   broccoli-concat should be at ^2.0.3
*   broccoli-stew should be at ^1.2.0
*   likely more…

Up next we should check for old and deprecate plugins

```
npm ls broccoli-static-compiler

```

this should no longer be used, rather broccoli-funnel at v1.0.1 should be used Up next we should look for not-yet-fixed plugins

```
npm ls ember-component-css

```

#### npm v3 made my build slow

Well what happened is npm v3 changed the module topology, this coupled with a misbehaving plugin may result in extra files (maybe all of node\_modules) being pulled into the build. This is going to be slow.., the solution is to find the offending plugin, and upgrade (or report the issue if it is not yet fixed). One such plugin is ember-cli-ic-ajax, which has been fixed. So please be sure to upgrade. Finding such plugins, we can use a series of DEBUG flags, to gain more insight

```
DEBUG=broccoli-funnel:Funnel\*Addon\* ember s

```

> Despite of all the above scenarios and possible solutions, if the issue still persists, please report an issue in Github with ember-cli project.

Be sure to include:

*   npm version
*   npm ls (as a gist)
*   ideally a reproduction

### How to explore/debug and hopefully address performance issues

#### DEBUG logging

We can use [heimdalljs-logger](https://github.com/heimdalljs/heimdalljs-logger) for logging, which supports the same usage as the de-facto standard [debug](https://github.com/visionmedia/debug). Quite often this can be used to quickly discover obviously wrong things. **Usage**:

```
DEBUG= ember s

```

For all logging (this will be very verbose):

```
DEBUG=\* ember s 

```

For all ember-cli logging:

```
DEBUG=ember-cli\* ember s 

```

For all broccoli logging:

```
DEBUG=broccoli\* ember s 

```

For both broccoli and ember-cli logging:

```
DEBUG=broccoli\*,ember-cli\* ember s 

```

The above patterns will be very verbose. But to make them even more verbose you can set the log level via DEBUGLEVEL

```
DEBUG=\* DEBUG\_LEVEL=debug ember s

```

To make them a bit less verbose, a curated set of performance related logging flags are:

```
DEBUG=broccoli-caching-writer:\* ember s
DEBUG=broccoli-funnel:\* ember s
DEBUG=broccoli-funnel:Funnel\*Addon\* ember s
DEBUG=broccoli-merge-trees:ember s
DEBUG=broccoli-merge-trees:TreeMerger\* ember s
DEBUG=broccoli-merge-trees:Addon\* ember s
DEBUG=broccoli-merge-trees:styles ember s
DEBUG=broccoli-merge-trees:compileTemplates\* ember s
DEBUG=broccoli-merge-trees:compileTemplates\* ember s

```

Because many plugins are used repeatedly it may be difficult to see the context for log entries. By default, 3 nodes of context are shown.

```
DEBUG\_LEVEL=debug DEBUG=broccoli-merge-trees: ember build
broccoli-merge-trees: \[TreeMerger (testFiles)#777 -> ConcatWithMaps#782 -> BroccoliMergeTrees#783\] deriving patches

```

To show more (or fewer) lines of context, specify the environment variable DEBUG\_DEPTH```
DEBUG\_DEPTH=5 DEBUG\_LEVEL=debug DEBUG=broccoli-merge-trees: ember build
# => broccoli-merge-trees: \[TreeMerger (allTrees)#1 -> BroccoliMergeTrees#668 -> TreeMerger (testFiles)#777 -> ConcatWithMaps#782 -> BroccoliMergeTrees#783\]


```\[… ConcatWithMaps#782 -> BroccoliMergeTrees#783\] means that the log entry occurred in broccoli merge-trees node with id 783, whose parent was a concat with maps node with id 782. These ids are shown in the visualization graph.

#### broccoli-viz

*   Visualization
    
    To visualize build tree, we can use [graphviz](http://www.graphviz.org/). Graphviz is an open source graph visualization program. Graph visualization is a way of representing structural information as diagrams of abstract graphs and networks. It has important applications in networking, bioinformatics, software engineering, database and web design, machine learning, and in visual interfaces for other technical domains. To install it run
    
    ```
    brew install graphviz 
    
    ```
    
    or download it directly from [here](http://www.graphviz.org/Download.php). You will also need to install [broccoli-viz](https://github.com/ember-cli/broccoli-viz) version 3.0.3 or higher. broccoli-viz is a library to read/parse and produce various visualizations of broccoli.
    
    ```
    npm install -g broccoli-viz@^3.0.3.
    
    ```
    
    To generate visualization:
    
    ```
    BROCCOLI\_VIZ=1 ember build
    
    broccoli-viz instrumentation.build.0.json > instrumentation.build.0.dot
    
    dot -Tpng instrumentation.build.0.dot > instrumentation.build.0.png
    
    ```
    
    To get a better understanding, you can watch this talk: **Dissecting an ember-cli build by Estelle Deblois**   An example visualization graph should look like this, with only a subset of the whole graph cropped for clear understanding.
    
    ![](http://hangaroundtheweb.com/wp-content/uploads/2018/02/broccoli-viz.jpg)
    
    Each build will generate an additional graph, instrumentation.build..json
    
*   in-depth look
    
    in-depth tooling, aimed to provide much deeper insight into the given build
    
    *   **dot**: is the input to graphviz, allowing tree visualization
    *   **json**: more detailed counts and timings related to the corresponding build
    

### References:

*   [https://github.com/ember-cli/ember-cli/blob/master/PERF\_GUIDE.md](https://github.com/ember-cli/ember-cli/blob/master/PERF_GUIDE.md)
*   [https://www.youtube.com/watch?v=hNwgp9alwKg](https://www.youtube.com/watch?v=hNwgp9alwKg)
*   [http://www.oligriffiths.com/2017/01/26/Eat-your-greens-A-beginners-guide-to-Broccoli-js/](http://www.oligriffiths.com/2017/01/26/Eat-your-greens-A-beginners-guide-to-Broccoli-js/)
*   [https://github.com/broccolijs/broccoli](https://github.com/broccolijs/broccoli)
*   [https://github.com/broccolijs/broccoli-cli](https://github.com/broccolijs/broccoli-cli)
*   [https://www.solitr.com/blog/2014/02/broccoli-first-release/](https://www.solitr.com/blog/2014/02/broccoli-first-release/)
*   [http://blog.bguiz.com/2014/06/16/broccolijs-plugin-how-to-write/](http://blog.bguiz.com/2014/06/16/broccolijs-plugin-how-to-write/)
*   [https://hashrocket.com/blog/posts/broccoli-the-build-tool-not-the-vegetable](https://hashrocket.com/blog/posts/broccoli-the-build-tool-not-the-vegetable)
*   [http://moduscreate.com/better-builds-begin-with-broccoli/](http://moduscreate.com/better-builds-begin-with-broccoli/)
*   [https://givan.se/broccolijs-from-scratch/](https://givan.se/broccolijs-from-scratch/)
*   [http://ampersate.com/getting-started-with-broccoli-and-emberjs](http://ampersate.com/getting-started-with-broccoli-and-emberjs)
*   [http://simonwade.me/intro-to-broccoli/](http://simonwade.me/intro-to-broccoli/)
*   [https://dockyard.com/blog/2015/02/02/debugging-a-broccoli-tree](https://dockyard.com/blog/2015/02/02/debugging-a-broccoli-tree)
*   [https://ember-cli.com/user-guide/#asset-compilation](https://ember-cli.com/user-guide/#asset-compilation)
*   [https://github.com/ember-cli/ember-cli](https://github.com/ember-cli/ember-cli)
*   [http://toranbillups.com/blog/archive/2016/09/28/hot-reloading-in-the-ember-ecosystem/](http://toranbillups.com/blog/archive/2016/09/28/hot-reloading-in-the-ember-ecosystem/)
*   [https://dockyard.com/blog/2016/08/12/pieces-of-ember-part1](https://dockyard.com/blog/2016/08/12/pieces-of-ember-part1)

### Videos:

*   [https://www.youtube.com/watch?v=JTzvYJBxwyI](https://www.youtube.com/watch?v=JTzvYJBxwyI)
*   [https://vimeo.com/channels/emberlondon/96431267](https://vimeo.com/channels/emberlondon/96431267)
*   [https://www.youtube.com/watch?v=hNwgp9alwKg](https://www.youtube.com/watch?v=hNwgp9alwKg)
*   [https://www.youtube.com/watch?v=9JZ9gEVgoX4](https://www.youtube.com/watch?v=9JZ9gEVgoX4)
*   [https://www.youtube.com/watch?v=OpTQ5QeFYys](https://www.youtube.com/watch?v=OpTQ5QeFYys)
*   [https://www.youtube.com/watch?v=uJ1p6U1D800](https://www.youtube.com/watch?v=uJ1p6U1D800)

### Writing your own Broccoli plugins:

*   [https://github.com/broccolijs/broccoli-plugin](https://github.com/broccolijs/broccoli-plugin)
*   [http://blog.bguiz.com/2014/06/16/broccolijs-plugin-how-to-write/](http://blog.bguiz.com/2014/06/16/broccolijs-plugin-how-to-write/)
*   [https://github.com/stefanpenner/broccoli-plugin-kit](https://github.com/stefanpenner/broccoli-plugin-kit)

**Cover Image from Unsplash by:**

[ANDRIK LANGFIELD PETRIDES](https://unsplash.com/@the_alp_photography?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from ANDRIK LANGFIELD PETRIDES")