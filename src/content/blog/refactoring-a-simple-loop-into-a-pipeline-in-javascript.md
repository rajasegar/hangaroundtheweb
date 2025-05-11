---
title: 'Refactoring a simple loop into a pipeline in Javascript'
date: Thu, 07 Sep 2017 00:28:31 +0000
draft: false
tags: ['Articles', 'javascript', 'Javascript', 'refactoring', 'web development']
---

The loop is the typical way of processing collections, but with the greater adoption of first-class functions in Javascript the [collection pipeline](https://martinfowler.com/articles/collection-pipeline) is an appealing alternative. In this article we look at refactoring loops to collection pipelines with a small example.

Table of Contents
-----------------

*   [Refactoring a simple loop into a pipeline in Javascript](#org43a2817)
    *   [Defining our Author data type](#org6a5de8f)
    *   [Simple and plain For loop](#org473e8c3)
    *   [Using ES5 forEach](#org276ec1e)
    *   [Using a Collection Pipeline](#orgdd28fd7)
    *   [Refactor - Moving filter before map](#org6bfb793)
    *   [Refactor - Combine filters](#org310af65)
    *   [Reference](#org99a1e88)
    *   [Credits](#orgfde73da)

Refactoring a simple loop into a pipeline in Javascript
-------------------------------------------------------

The loop is the typical way of processing collections, but with the greater adoption of first-class functions in Javascript the [collection pipeline](https://martinfowler.com/articles/collection-pipeline) is an appealing alternative. In this article we look at refactoring loops to collection pipelines with a small example. This article is Part-1 of a series which deal with refactoring loops into collection pipelines in Javascript.

### Defining our Author data type

Let's imagine we have a list of authors, each of which has the following class structure.

```
class Author {
    constructor(name, twitterHandle, company) {
        this.name = name;
        this.twitterHandle = twitterHandle;
        this.company = company;
    }
}

```

And we are going to retrieve the twitter handles of authors from a particular company using a function named as **twitterHandles**. First we will try with the classical loop approach using a plain **for** loop in Javascript.

### Simple and plain For loop

```
// Simple Loop
function twitterHandles(authors, company) {
    var result = \[\];
    for(var i = 0; i < authors.length; i++) {
        if(authors\[i\].company === company) {
            var handle = a\[i\].twitterHandle;
            if(handle !== null) {
                result.push(handle);
            }
        }
    }
    return result;
}

```

### Using ES5 forEach

```
// Simple Loop
function twitterHandles(authors, company) {
    var result = \[\];
    authors.forEach(function(a) {
        if(a.company === company) {
            var handle = a.twitterHandle;
            if(handle !== null) {
                result.push(handle);
            }
        }
    });
    return result;
}

```

### Using a Collection Pipeline

We then start looking at bits of behavior in the loop. The first thing we see is a conditional check, we can move this to the pipeline with a [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) operation.

```
function twitterHandles(authors, company) {
    var result = \[\];
    authors.filter(author => author.company === company)
           .forEach(function(a) {
            var handle = a.twitterHandle;
            if(handle !== null) {
                result.push(handle);
            }
    });
    return result;
}

```

We see the next part of the loop operates on the twitter handle, rather than the author, so we can use a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) operation.

```
function twitterHandles(authors, company) {
    var result = \[\];
    authors.filter(author => author.company === company)
           .map(author => author.twitterHandle)
           .forEach(function(handle) {
            if(handle !== null) {
                result.push(handle);
            }
    });
    return result;
}

```

Next in the loop as another conditional, which again we can move to a filter operation.

```
function twitterHandles2(authors, company) {
    return authors
        .filter(a => a.company === company)
        .map(a => a.twitterHandle)
        .filter(t => t !== null);
}

```

### Refactor - Moving filter before map

If you have a map followed by a filter, you can usually move the filter before the map.

```
function twitterHandles3(authors, company) {
    return authors
        .filter(a => a.company === company)
        .filter(a => a.twitterHandle !== null)
        .map(a => a.twitterHandle);
}

```

### Refactor - Combine filters

When you have two adjacent filters, you can combine them using a conjunction.

```
function twitterHandles4(authors, company) {
    return authors
        .filter(a => a.company === company && a.twitterHandle !== null)
        .map(a => a.twitterHandle);
}

```

The best thing about collection pipelines is that we can see the flow of logic as the elements of the list pass through the pipeline. For us it reads very closely to how we'd define the outcome of the loop "take the authors, choose those who have a company, and get their twitter handles removing any null handles".

### Reference

[Refactoring with Loops and Collection Pipelines](https://martinfowler.com/articles/refactoring-pipelines.html) [Collection Pipeline](https://martinfowler.com/articles/collection-pipeline/)

### Credits

Cover Image: Photo by kazuend on Unsplash [kazuend](https://unsplash.com/@kazuend?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from kazuend") Please stay tuned for the next version of this series.