---
title: 'Build a Wikipedia search engine using RxJS'
date: Tue, 07 Mar 2017 18:43:10 +0000
draft: false
tags: ['RxJS', 'rxjs', 'tutorial', 'tutorials', 'web development']
---

In this tutorial, we will be building a Wikipedia search engine using RxJS

Table of Contents
-----------------

*   [1\. Build a Wikipedia search engine using RxJS](#orgf1ec3db)
    *   [1.1. What is RxJs?](#orgc68eb88)
    *   [1.2. HTML markup for the search box](#org5684268)
    *   [1.3. Capturing the keyup events in search box](#orgce22e50)
    *   [1.4. Throttle the input events](#org2edd174)
    *   [1.5. Get only distinct values by eliminating other characters](#orgdb91e5a)
    *   [1.6. Querying Wikipedia](#org635d1c1)
    *   [1.7. Subscribe to the event stream](#orga2f2045)
    *   [1.8. Links](#orgb162520)

1 Build a Wikipedia search engine using RxJS
--------------------------------------------

### 1.1 What is RxJs?

Reactive Extensions (Rx) is a library for composing asynchronous and event-based programs using observable sequences and LINQ-style query operators. Data sequences can take many forms, such as a stream of data from a file or web service, web services requests, system notifications, or a series of events such as user input. Reactive Extensions represents all these data sequences as observable sequences. An application can subscribe to these observable sequences to receive asynchronous notifications as new data arrive. RxJS has no dependencies which complements and interoperates smoothly with both synchronous data streams such as iterable objects in JavaScript and single-value asynchronous computations such as Promises.

### 1.2 HTML markup for the search box

```



```

### 1.3 Capturing the keyup events in search box

Here we capture the **keyup** events of the input element using the [fromEvent](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/fromevent.md) operator of **Rx.Observable** which creates an observable sequence by adding an event listener to the matching DOM Element

```
// Only get the values from each keyups
var keyups = Rx.Observable.fromEvent($input, 'keyup')
              .map(e => e.target.value)
              .filter(text => text.length > 2);

```

### ![](/wp-content/uploads/2017/03/wikisearch-rxjs.jpg)

### 1.4 Throttle the input events

Here we are debouncing the keyup events for about 500 milliseconds using the [throttle](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/throttle.md) operator of **Rx.Observable** which returns an Observable that emits only the first item emitted by the source Observable during sequential time windows of a specified duration

```
// Now throttle/debounce the input for 500ms
var throttled = keyups.throttle(500);

```

### 1.5 Get only distinct values by eliminating other characters

The throttled input stream is then run through the **distinctUntilChanged** operator which returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.

```
// Now only get the distinct values, so we eleminate the arrows and other control characters
var distinct = throttled.distinctUntilChanged();

```

### 1.6 Querying Wikipedia

We can now send the filtered input terms to Wikipedia for getting the search results. For that we will be defining a new function called **searchWikipedia** by passing the term as the parameter.

```
function searchWikipedia(term) {
  return $.ajax({
    url: "http://en.wikipedia.org/w/api.php",
    dataType: "jsonp",
    data: {
      action: 'opensearch',
      format: 'json',
      search: term
    }
  }).promise();
}

```

### 1.7 Subscribe to the event stream

We now got the distinct observable streams and the **flatMapLatest** transform the items emitted by an Observable into Observables, and mirror those items emitted by the most-recently transformed Observable.

```
var suggestions = distinct.flatMapLatest(searchWikipedia);

suggestions.subscribe(data => {
  var res = data\[1\];

  // Clear the results element
  $results.empty();

  $.each(res, (\_, value) => $('<li>' + value + '</li>').appendTo($results));
}, error => {
  // handle any errors
  $results.empty();

  $('<li>Error:' + error + '</li>').appendTo($results);
});

```

### 1.8 Links

*   [Github](https://github.com/rajasegar/rxjs-wiki)
*   [Demo](http://jolly-carriage.surge.sh/)
*   [RxJS](http://reactivex.io/rxjs/)
*   [Wikipedia](http://wikipedia.com/)
