---
title: 'Say Goodbye to Object Key Woes: A Look at JavaScript New Composites proposal'
description: ''
pubDate: 'May 15 2025'
heroImage: '/images/composites-proposal.png'
---


For frontend developers, the need to manage and identify data efficiently is a constant. Whether it's tracking unique items in a shopping cart, optimizing API interactions through caching, or maintaining the state of intricate UI components, the ability to use structured data as identifiers is paramount. In JavaScript, this often translates to using objects as keys within Map or Set data structures. However, a fundamental limitation of the language often turns this seemingly straightforward task into a source of frustration. Currently, JavaScript's equality comparison for objects hinges on their memory reference. This means that two distinct objects, even if they possess identical content, are not considered equal when used as keys in collections. This behavior can lead to unexpected outcomes and necessitates the use of workarounds that often introduce complexity and potential for errors. Fortunately, a potential solution is on the horizon: the TC39 Composites proposal, which aims to introduce a new built-in type that would finally bring value-based equality to objects used as keys in JavaScript collections.

## The Problem with Object Keys Today
To truly appreciate the potential of the Composites proposal, it's crucial to understand the underlying issue it seeks to address. JavaScript's built-in Map and Set data structures rely on the SameValueZero algorithm to determine the equality of keys. While this algorithm works predictably for primitive values like numbers and strings, its behavior with objects is quite specific. For objects, SameValueZero only considers two objects equal if they are the exact same object residing in the same memory location; in other words, they must have the same reference. This reference-based equality means that if you create two separate object instances, even if they have identical properties and values, JavaScript will treat them as distinct entities when used as keys in a Map or elements in a Set.

Consider a common scenario: managing a list of completed tasks in a task management application. Each task might be represented by an object containing properties such as id, title, and description. When a user marks a task as complete, the application might update the task's status and potentially re-fetch the data from a backend server. Even if the re-fetched task object contains the exact same id, title, and description as a previously completed task object, JavaScript will treat them as different objects because they are new instances in memory. Consequently, using these different object instances as keys in a Set designed to track completed tasks would fail to recognize them as the same task.

For example, consider the following code snippet:

```js
const task1 = { id: 1, title: 'Implement user authentication' };
const task2 = { id: 1, title: 'Implement user authentication' };
const completedTasks = new Set();
completedTasks.add(task1);
completedTasks.has(task2); // Currently returns false
```


In this example, even though `task1` and `task2` represent the same task based on their content, the `completedTasks.has(task2)` check will return false because task1 and task2 are distinct object instances in memory.
To circumvent this limitation, developers often resort to a common workaround: serializing the object into a string using `JSON.stringify() `and then using this string as the key in the Map or Set. While this approach can achieve the desired outcome of identifying objects based on their content, it introduces several drawbacks that can be problematic.


One significant issue is that this workaround is error-prone and can be quite brittle. Ensuring consistent stringification, especially when dealing with nested objects or scenarios where the order of keys might vary, can be challenging. If the order of keys in an object changes, even if the underlying data remains the same, the resulting string representation will be different, leading to incorrect key comparisons. This necessitates careful attention to detail and can introduce subtle bugs into the application.

Furthermore, the process of serializing an object to a string and then potentially parsing it back to an object later incurs a performance overhead. In performance-sensitive applications that handle frequent data updates or large datasets, this overhead can become noticeable and impact the overall responsiveness of the user interface.


Another significant drawback is the loss of type fidelity. When using strings as keys, the original structure and type information of the object are lost. Retrieving the actual object often requires parsing the string back into a JavaScript object, which can be less type-safe and more verbose than working with the original object directly. This can complicate code readability and maintainability.

Finally, relying on stringification for object keys often leads to increased code complexity. Developers might need to maintain separate collections or implement additional logic to handle the stringification and parsing steps, adding unnecessary complexity to the codebase and making it harder to understand and maintain over time. The need to manually manage this process highlights the desire for a more integrated and efficient solution within the JavaScript language itself.

## Enter Composites: Structured Equality for Your Data
The TC39 Composites proposal offers an exciting and potentially transformative solution to the challenges of using objects as keys in JavaScript: a new built-in type called 'composite values'. These composite values, created using a function named Composite, are objects that, crucially, have a well-defined, built-in mechanism for value-based equality. This means that two distinct Composite instances created with the same content will be considered equal, finally allowing developers to use structured data as reliable keys in JavaScript collections.

Despite their unique equality semantics, composites retain many familiar characteristics of regular JavaScript objects. The `typeof Composite({})` will indeed return "object", indicating that they are fundamentally objects capable of holding structured data in the familiar key-value pair format that developers are accustomed to. However, it's important to note that each call to the Composite function will return a new and distinct object instance; `Composite({})!== Composite({})` will evaluate to true. This signifies that Composite acts as a factory function, generating new composite value instances rather than returning a singleton or an interned value by default, although the possibility of interning for strict equality is a topic of ongoing discussion.

A key aspect of Composites that aligns well with modern frontend development practices is their immutability. The proposal specifies that `Composite(template)!== template` will be true, ensuring that the original object used to create the composite remains unchanged. Furthermore, composite values are frozen upon creation, as indicated by `Object.isFrozen(Composite({}))` returning true. This shallow immutability guarantees that the top-level properties of a composite cannot be modified after its creation, contributing to more predictable data flow and easier debugging in applications.

Working with composite values is designed to be intuitive for developers. Their properties can be accessed just like those of regular objects; for example, `Composite({ x: 1 }).x` will correctly return 1. Additionally, the order of properties within a composite is preserved, matching the order in the object used to construct it. This can be particularly useful in scenarios where the order of data might carry semantic meaning, such as representing ordered lists or configuration settings. Composites are also highly versatile in terms of the data they can hold, capable of containing any valid JavaScript value, including other objects, dates, and even the special value -0. The only restriction is that the argument provided to the Composite function must be an object; calling Composite(null) will result in a TypeError. It's also important to note that Composite is not a class and cannot be instantiated with the new keyword; `new Composite({})` will throw a TypeError. Their prototype is simply `Object.prototype`.

To illustrate the fundamental concept and the benefit for handling object keys, consider the earlier task management example rewritten using Composites:

```js
const task1 = Composite({ id: 1, title: 'Implement user authentication' });
const task2 = Composite({ id: 1, title: 'Implement user authentication' });
const completedTasks = new Set();
completedTasks.add(task1);
completedTasks.has(task2); // Now correctly returns true!
```


As this example demonstrates, by using Composite to create the task objects, the Set correctly recognizes `task1` and `task2` as representing the same task based on their content, finally resolving the issue of reference-based equality for object keys.

## Key Features Developers Will Love
The introduction of Composites promises to bring several key features that will be particularly beneficial and welcome for developers, streamlining common tasks and enabling more robust and efficient application development.

### Using Objects as First-Class Keys (Finally!)
The most significant advantage for developers will undoubtedly be the ability to use objects with the same structure and content as distinct and reliable keys in standard JavaScript Map and Set objects. This eliminates the need for cumbersome manual stringification or the implementation of complex custom comparison logic, leading to cleaner, more readable, and less error-prone code. Re-examining the task management scenario, the use of Composites directly addresses the core problem:

```js
const task1 = Composite({ id: 1, title: 'Implement user authentication' });
const task2 = Composite({ id: 1, title: 'Implement user authentication' });
const completedTasks = new Set();
completedTasks.add(task1);
completedTasks.has(task2); // Now correctly returns true!
```


This capability directly tackles a long-standing pain point in frontend development, offering a more intuitive and efficient way to manage collections of data based on their content rather than their memory location.

### Improved State Management in JavaScript Frameworks
Composites have the potential to significantly enhance state management within popular frameworks like React, Vue, or Angular. In many applications, the application's state is represented by complex, often nested, JavaScript objects. Composites could provide a more natural and reliable way to identify and manage distinct state configurations. For instance, a composite object representing a specific state configuration could be used as a key in a Map to store or retrieve related data or UI elements. Furthermore, the inherent immutability of Composites aligns perfectly with the principles of predictable state updates and easier debugging that are central to many modern frontend architectures. By ensuring that state configurations, when represented as composites, cannot be accidentally modified after creation, developers can build more robust and maintainable applications.


### More Reliable and Efficient Caching Mechanisms
Client-side caching is a crucial technique for optimizing the performance of frontend applications by reducing the need to repeatedly fetch data from servers. Composites can play a vital role in creating more reliable and efficient caching mechanisms. Instead of relying on stringified versions of API request parameters or data objects as cache keys, which can be fragile and prone to issues related to key order or serialization inconsistencies, developers can use Composites. This ensures that cache hits occur precisely when the underlying data or request parameters have the same content, leading to more accurate and effective caching and ultimately improving application responsiveness.


### Seamless Integration with Existing JavaScript APIs
The Composites proposal is designed with seamless integration into existing JavaScript methods and data structures as a key consideration. Developers will be pleased to know that familiar array methods will work intuitively with composite values. For example, the `Array.prototype.includes(composite)` method will correctly identify the presence of an equal composite within an array based on its content. Similarly, methods like `Array.prototype.indexOf(composite)` and `Array.prototype.lastIndexOf(composite)` will also leverage composite equality when comparing against composite values. The proposal even anticipates future JavaScript features, such as the iterator-unique proposal, potentially utilizing composite equality for more advanced data manipulation.

For explicit equality checks, the proposal introduces a static method `Composite.equal(composite1, composite2)` that allows developers to directly determine if two composite values are equal based on their content. Additionally, the `Composite.isComposite(arg)` method provides a way to programmatically check if a given value is a composite. This comprehensive integration ensures that Composites will feel like a natural and consistent addition to the JavaScript language, minimizing the learning curve and facilitating their adoption in projects.


## A Quick Look Under the Hood (For the Curious)
For developers interested in the technical details, understanding the underlying equality semantics of Composites can be beneficial. Two composite values are considered equal if and only if they share the same prototype (currently, this is always `Object.prototype`) and their properties form the exact same set of key-value pairs. The values of each corresponding property are then compared for equality using either the SameValueZero algorithm (for primitive values) or recursively using the same composite equality rules if the values are also composites. This recursive comparison ensures that nested structures within composites are also compared based on their content. 


As mentioned earlier, composite values are shallowly immutable due to the use of `Object.isFrozen` upon their creation. This means that while the top-level properties of a composite cannot be reassigned or deleted, if a composite contains nested objects or arrays, those nested structures are not automatically immutable unless they are also composites or explicitly made immutable using other techniques like `Object.freeze`. Furthermore, all keys within a composite are enumerable, meaning they will be included in `for...in` loops and `Object.keys()`, but they are non-configurable and non-writable, further reinforcing the immutable nature of the composite's structure.


## What About Performance and Immutability?
Frontend developers are often rightly concerned about the performance implications of new language features. The Composites proposal addresses these concerns by suggesting that the creation of composite values should have a performance cost comparable to that of creating regular JavaScript objects. When it comes to comparing two composite values for equality, the worst-case scenario occurs when the composites are indeed equal, requiring a comparison of all their properties and potentially their nested structures. This results in a linear time complexity relative to the number of properties. However, the proposal anticipates that JavaScript engines will implement optimizations to mitigate this cost, such as storing a hash value for each composite instance. This hashing mechanism would significantly improve the performance of equality checks, especially in common use cases like using composites as keys in Map and Set, where frequent lookups and comparisons occur.


The shallow immutability of Composites, achieved through `Object.isFrozen`, is a deliberate design choice that aligns with best practices in modern frontend development for managing state and ensuring data integrity. It's important for developers to understand that this immutability is shallow. For a composite to be deeply immutable, meaning that all nested objects and arrays within it are also immutable, those nested structures would need to be either composites themselves or explicitly made immutable using methods like `Object.freeze` or by using immutable data structures from external libraries. This aligns with common patterns and libraries used for managing immutable application state. 


A topic of ongoing discussion within the TC39 proposal is whether composite values should be eagerly "interned" or canonicalized. This would mean that if two Composite calls are made with the same content, they would result in the exact same object instance, making them strictly equal (===). Proponents of eager interning argue that it would simplify equality checks (reducing them to a simple pointer comparison) and ensure that Composites work seamlessly with existing JavaScript APIs without requiring new equality checks. However, there are also potential downsides to this approach, including a potentially higher cost for composite creation, limitations on the use of unique symbol keys, and potential implications for garbage collection and the behavior of Composites in WeakMap and WeakSet. The optimal approach to === equality for Composites is still under consideration and may evolve as the proposal progresses.


## Comparison with the Past: Records and Tuples
Frontend developers who have followed the evolution of JavaScript might recall the previous TC39 proposal for Records and Tuples, which also aimed to introduce immutable value types to the language. While the Composites proposal shares the underlying goal of enabling value-based equality, it represents a distinct approach with several key differences. 


One of the most fundamental distinctions lies in their intended type. Composites are designed to be objects, with typeof `Composite({})` returning "object". In contrast, Records and Tuples were proposed as primitive values with a custom typeof. This difference in type has significant implications for how these values interact with the rest of the JavaScript language.


Another key difference is in how equality is determined. Composites are compared for equality using the `Composite.equal()` method (and implicitly within Map and Set operations) based on their content. Records and Tuples, on the other hand, were intended to be compared using strict equality `(===)`, relying on their primitive nature for value comparison.


Furthermore, Composites have a prototype, which is Object.prototype. Records and Tuples, in their proposed form, would have had no prototype (null). This difference affects inheritance and the availability of built-in methods. Composites also support symbol keys, allowing for unique and private properties, a feature that was not intended for Records and Tuples.


Finally, in terms of mutability, Composites are shallowly immutable and can contain any JavaScript value, meaning deep immutability requires ensuring the immutability of nested values. Records and Tuples, however, were designed to be deeply immutable and could only contain primitive values. The Composites proposal, therefore, represents a reimagining of the problem space addressed by Records and Tuples, incorporating feedback and learnings from the previous discussions to offer a different set of trade-offs and capabilities. 


## The Future is Composite
It's important for developers to understand the current status of the Composites proposal. As of the latest updates, it is currently at Stage 1 of the TC39 process.4 This means that the proposal has been formally submitted and is under active discussion and refinement by the committee. While Stage 1 signifies a significant step forward, it also indicates that the proposal is still in its early stages and may undergo further changes as it progresses through the subsequent stages of the TC39 process before potentially becoming a standard feature of JavaScript.


Frontend developers interested in the future of JavaScript and how it might impact their work are encouraged to stay informed about the progress of the Composites proposal. The proposal's repository on GitHub  serves as the central hub for discussions, updates, and the official specification as it evolves. Following this repository will provide valuable insights into the ongoing design decisions and the timeline for potential adoption. 


For developers eager to experiment with the concepts introduced by the Composites proposal, a polyfill is available. A polyfill is a piece of code that provides the functionality of a newer JavaScript feature in older environments that don't natively support it. However, it's important to note that this particular polyfill has limitations due to the inherent difficulty in fully emulating internal slots, which are a core part of how Composites are intended to function. Consequently, a composite created by one instance of the polyfill might not be recognized as a composite by another instance, potentially affecting equality checks across different contexts. Nevertheless, the polyfill can still offer a valuable way to explore the basic concepts and potential use cases of Composites in projects. 


Several aspects of the Composites proposal are still under active discussion within the TC39 committee, some of which are particularly relevant to developers. One such discussion revolves around the syntax for creating composite literals. There is consideration for introducing a more concise syntax, potentially similar to object literals but with a distinct marker, such as `#{ x: 1 }`, to make the creation of composite values more visually distinct and less verbose. Another important discussion concerns how composite keys should behave within WeakMap and WeakSet. The current proposal suggests that Composites in these weak collections should behave like regular objects, using object referential keying. However, there is an ongoing debate about whether they should instead act as multi-value keys by default, similar to their behavior in regular Map and Set. This decision could have implications for how developers use Composites in scenarios involving weak references.


The possibility of creating composite values that also behave like JavaScript arrays, known as array exotic objects, is another intriguing area of discussion. This would allow for the creation of ordered, immutable collections with value-based equality, potentially opening up new ways to manage data in applications. The debate around `===` equality and the potential for eager interning also continues, with various trade-offs being weighed. Finally, a key consideration throughout the development of the proposal is ensuring that Composites can seamlessly integrate with existing JavaScript libraries and APIs, allowing them to "just work" without requiring significant updates or modifications. These ongoing discussions highlight the active and evolving nature of the Composites proposal and the opportunity for the development community to provide feedback and contribute to its final form.


## Conclusion: Embracing Value-Based Equality in JavaScript
The TC39 Composites proposal represents a significant step towards addressing a long-standing limitation in JavaScript: the lack of built-in value-based equality for objects used as keys in collections. For developers, this proposal holds the promise of simplifying common tasks, improving the reliability and efficiency of state management and caching mechanisms, and ultimately leading to cleaner and more maintainable code. The ability to finally use objects with the same content as distinct and reliable keys in Map and Set without resorting to error-prone stringification workarounds would be a welcome addition to the language. While the proposal is still in its early stages and certain aspects are still under discussion, the potential benefits for the frontend development community are substantial. As the Composites proposal progresses through the TC39 process, it offers an exciting glimpse into the future of JavaScript and the ongoing efforts to make it an even more powerful and developer-friendly language for building modern web applications. The prospect of saying goodbye to the woes of object keys and embracing value-based equality in JavaScript is indeed an optimistic one for developers everywhere.


## References
- tc39/proposal-composites - GitHub,  https://github.com/tc39/proposal-composites
- Should composites be eagerly interned (`===` equal) · Issue #15 ...,  https://github.com/tc39/proposal-composites/issues/15
- Arrays, objects... now 'composites'? - YouTube,  https://www.youtube.com/watch?v=hFenspfGLTk&vl=de
- Rob Palmer (@robpalmer.bsky.social) - Bluesky,  https://bsky.app/profile/robpalmer.bsky.social
- Why was Records & Tuples proposal withdrawn in JavaScript? - Reddit,  https://www.reddit.com/r/javascript/comments/1k7hosj/why_was_records_tuples_proposal_withdrawn_in/
- The TC39 Process,  https://tc39.es/process-document/
- TC39, ECMAScript, and the Future of JavaScript - Pony Foo,  https://ponyfoo.com/articles/tc39-ecmascript-proposals-future-of-javascript
- Issues · tc39/proposal-composites · GitHub,  https://github.com/tc39/proposal-composites/issues
 https://github.com/tc39/proposal-composites/issues/7
- Composite keys in WeakMaps and WeakSets · Issue #10 · tc39 ...,  https://github.com/tc39/proposal-composites/issues/10


