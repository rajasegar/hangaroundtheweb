---
title: 'Seven Principles of Software Development - Revisited'
date: Sun, 22 Apr 2018 20:56:05 +0000
draft: false
tags: ['Articles', 'development', 'principles', 'software']
---

Seven Principles of Software Development - Revisited
----------------------------------------------------

### Principle #1: The Reason It All Exists

A software system exists for one reason: to provide value to its users. All decisions should be made with this in mind. Before specifying a system requirement, before noting a piece of system functionality, before determining the hardware platforms or development processes, ask yourself questions such as: **Does this add real VALUE to the system?** If the answer is **no**, don't do it. All other principles support this one.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/Colosseo-Rome-photo-by-Willian-West-willianwest-on-Unsplash.jpg)

### Principle #2: KISS

Software design is not a haphazard process. There are many factors to consider in any design effort. All design should be as simple as possible, but no simpler.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/zen-rock.jpg)

> Complexity is your enemy. Any fool can make something complicated. It is hard to make something simple. – **Richard Branson**

This facilitates having a more easily understood, and easily maintained system. This is not to say that features, even internal features, should be discarded in the name of simplicity. Indeed, the more elegant designs are usually the more simple ones.

> Simplicity is the ultimate sophistication. – **Leonardo Da Vinci**

Simple also does not mean **quick and dirty.** In fact, it often takes a lot of thought and work over multiple iterations to simplify. The payoff is software that is more maintainable and less error-prone.

> That's been one of my mantras - focus & simplicity. Simple can be harder than complex; You have to work hard to get your thinking clean to make it simple. – **Steve Jobs**

### Principle #3: Maintain the vision

A clear vision is essential to the success of a software project. Without one, a project almost unfailingly ends up being "of two \[or more\] minds" about itself. Without conceptual integrity, a system threatens to become a patchwork of incompatible designs, held together by the wrong kind of screws.

> Conceptual integrity is the most important consideration in system design. – **Fred Brooks**

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/Eye-blue-pupil-and-vision-HD-photo-by-Daniil-Kuželev-kuzelevdaniil-on-Unsplash.jpg)

> Having a clean internal structure is essential to constructing a system that is understandable, can be extended and reorganized, and is maintainable and testable. – **Stroustrup**

> It is only through having a clear sense of a system s architecture that it becomes possible to discover common abstractions and mechanisms. Exploiting this commonality ultimately leads to systems that are simpler, and therefore smaller and more reliable. – **Grady Booch**

Compromising the architectural vision of a software system weakens and will eventually break even the most well designed systems. Having an empowered Architect who can hold the vision and enforce compliance helps ensure a very successful software project.

### Principle #4: What you produce others will consume

Seldom is an industrial-strength software system constructed and used in a vacuum. In some way or other, someone else will use, maintain, document, or otherwise depend on being able to understand your system. So, always specify, design, and implement knowing someone else will have to understand what you are doing. The audience for any product of software development is potentially large.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/Bread-at-a-Bakery-photo-by-Roman-Kraft-romankraft-on-Unsplash.jpg)

Specify with an eye to the users. Design, keeping the implementers in mind. Code with concern for those that must maintain and extend the system. Someone may have to debug the code you write, and that makes them a user of your code. Making their job easier adds value to the system.

### Principle #5: Be open to the future

A system with a long lifetime has more value. In today's computing environments, where specifications change on a moment's notice and hardware platforms are obsolete when just a few months old, software lifetimes are typically measured in months instead of years. However, true **industrial-strength** software systems must endure far longer. To do this successfully, these systems must be ready to adapt to these and other changes. Systems that do this successfully are those that have been designed this way from the start. Never design yourself into a corner. Always ask "what if ", and prepare for all possible answers by creating systems that solve the general problem, not just the specific one. This could very possibly lead to the reuse of an entire system.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/Keyboard-robot-instrument-and-playing-HD-photo-by-Franck-Veschi-franckveschi-on-Unsplash.jpg)

Abusing this principle is where I see many developers go wrong. One of the benefits of having both years of experience and many of them on a single project is that you learn the virtues of [YouArentGonnaNeedIt](http://wiki.c2.com/?YouArentGonnaNeedIt). As developers, we often guess wrong on how a system is going to change unless we are also domain experts.

> Systems do change but often converge so the generalized solution becomes baggage. – **Sal Mangano**

### Principle #6: Plan Ahead for Reuse

Reuse saves time and effort. Achieving a high level of reuse is arguably the hardest goal to accomplish in developing a software system. The reuse of code and designs has been proclaimed as a major benefit of using object-oriented technologies. However, the return on this investment is not automatic. To leverage the reuse possibilities that OO programming provides requires forethought and planning. There are many techniques to realize reuse at every level of the system development process. Those at the detailed design and code level are well known and documented.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/Pallets-stacked-by-garbage-photo-by-Max-Lakutin-lktnm-on-Unsplash.jpg)

New literature is addressing the reuse of design in the form of software patterns. However, this is just part of the battle. Communicating opportunities for reuse to others in the organization is paramount. How can you reuse something that you don't know exists? Planning ahead for reuse reduces the cost and increases the value of both the reusable components and the systems into which they are incorporated.

### Principle #7: Think!

This last Principle is probably the most overlooked. Placing clear, complete thought before action almost always produces better results. When you think about something, you are more likely to do it right. You also gain knowledge about how to do it right again.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/Man-by-a-brick-wall-photo-by-Andre-Hunter-dre0316-on-Unsplash.jpg)

If you do think about something and still do it wrong, it becomes valuable experience. A side effect of thinking is learning to recognize when you don t know something, at which point you can research the answer.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/think-do-knowledge.png)

When clear thought has gone into a system, value comes out. Applying the first six Principles requires intense thought, for which the potential rewards are enormous.

![](http://hangaroundtheweb.com/wp-content/uploads/2018/04/clear-thoughts.png)

### References:

*   [http://wiki.c2.com/?SevenPrinciplesOfSoftwareDevelopment](http://wiki.c2.com/?SevenPrinciplesOfSoftwareDevelopment)

### Image credits

*   Photo by Johnson Wang [https://unsplash.com/photos/qG-hPxoAnRE](https://unsplash.com/photos/qG-hPxoAnRE)
*   Photo by Willian West [https://unsplash.com/photos/YpKiwlvhOpI](https://unsplash.com/photos/YpKiwlvhOpI)
*   Photo by Roman Kraft [https://unsplash.com/photos/P8zDQz8Y2Vc](https://unsplash.com/photos/P8zDQz8Y2Vc)
*   Photo by Franck Veschi [https://unsplash.com/photos/U3sOwViXhkY](https://unsplash.com/photos/U3sOwViXhkY)
*   Photo by Max Lakutin [https://unsplash.com/photos/UTT39aMPxwg](https://unsplash.com/photos/UTT39aMPxwg)
*   Photo by Andre Hunter [https://unsplash.com/photos/k\_VgiuhGLeU](https://unsplash.com/photos/k_VgiuhGLeU)
*   Photo by [rawpixel.com](https://unsplash.com/photos/_2uxSN-8f9A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/seven?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)