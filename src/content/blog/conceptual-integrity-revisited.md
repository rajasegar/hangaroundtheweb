---
title: 'Conceptual Integrity - Revisited'
date: Mon, 06 Aug 2018 02:04:26 +0000
draft: false
tags: ['Articles', 'conceptualintegrity', 'programming', 'software']
---

Conceptual integrity is the principle that anywhere you look in your system, you can tell that the design is part of the same overall design. This includes low-level issues such as formatting and identifier naming, but also issues such as how modules and classes are designed, etc. This is vitally important, because inevitably, unanticipated issues come up that must be resolved quickly. If there is a coherent design to the system, it can be much easier to resolve these issues by determining what would be consistent with the overall design, especially if the other designers are not present.

![](/wp-content/uploads/2018/08/conceptual-disunity.png)

Conceptual Integrity is a required ingredient for achieving the principle that **a system must have a powerful metaphor that is uniformly applied throughout a system**.

> Conceptual integrity is the most important consideration in system design. It is better to have a system omit certain anomalous features and improvements, but to reflect one set of design ideas, than to have one that contains many good but independent and uncoordinated ideas.

Conceptual integrity does not mean one shouldn't include many minds (or even the entire team for that matter) in the Analysis & Design process. This is a very important detail that shouldn't be discounted by those who wish to do away with the role of architect. Team input in Analysis and Design is absolutely essential for:

(1) establishing Team Gel,

(2) ensuring the soundness and quality of the analysis, and

(3) refactoring the design into something more polished.

In fact, the earlier the architect or design-team can include the entire team (or domain-team leads for very large teams), the higher quality the design will be. The Design Team must be open to and accept criticism, the architect(s) must be egoless (see [Egoless Programming](/2018/03/egoless-programming/)).

In this article, we will examine the consequences of this theme for programming system design:

• How is conceptual integrity to be achieved?

• Does not this argument imply an elite, or high society of architects, and a group of ordinary implementers whose creative talents and ideas are suppressed?

• How does one keep the architects from drifting off into the blue with unimplementable or costly specifications?

• How does one ensure that every trifling detail of an architectural specification gets communicated to the implementer, properly understood by him, and accurately incorporated into the product?

### Deciphering Conceptual Integrity

To appreciate the importance of conceptual integrity, we need to take a closer look at its meaning. The word **conceptual** is associated with the cognitive process of concept forming that involves the conscious recognition and identification of elements of our experience; and the word **integrity** is associated with the idea of **being integrated** or **being one**. The idea of a coherent whole is reflected in the way that **having integrity** is used to describe something that always conforms to one’s expectations – there is an implicit reference to future events. We describe something as having conceptual integrity, if the concepts formed from our experience of the thing can reliably determine the future events which are associated with the thing (there is no surprise).

In obtaining conceptual integrity, we are concerned with the emergence of concepts (representing the rational world) from experience (representing the empirical world). As the American philosopher, [William James](https://en.wikipedia.org/wiki/William_James), points out in his Essays on [Radical Empiricism](https://en.wikipedia.org/wiki/Radical_empiricism), first published in 1902:

> “Experiences come on an enormous scale, and if we take them all together, they come in a chaos of incommensurable relations that we cannot straighten out. We have to abstract different groups of them and handle these separately if we are to talk of them at all.”

Raw experiences are potentially confusing or incoherent as **“they come in a chaos of incommensurable relations”**. To make sense of them, we need to abstract groups of relations between them and study them separately. Abstracting groups of relations from experiences is the embryonic concept-forming activity. The concepts formed may conflict each other. Obtaining conceptual integrity is a process of removing conflict. To remove conflict, we need to access the raw experiences that originally informed our concepts – to explore them, to understand, to compare and to analyze. This idea is depicted in the following figure. At the left-hand-side of the figure, two groups of concepts are formed by abstracting relations from raw experiences. To obtain conceptual integrity, we need to combine the concepts into one group of unified concepts. This involves the resolution of potential conflict between concepts so that they acquire coherence.

![](/wp-content/uploads/2018/08/conceptual-integrity.png)

Significant features of the above observations that relate to the nature of conceptual integrity include:

1.  Conceptual integrity is something appreciated by an observer. This is because we cannot talk about experience without reference to the observer.
2.  To obtain conceptual integrity, we need to resolve conflicts between concepts. This involves access to the raw experiences that inform these concepts.
3.  A central issue in obtaining conceptual integrity is the potential incoherence of raw experiences.

### Achieving Conceptual Integrity

> The purpose of a programming system is to make a computer easy to use.

To do this, it furnishes languages and various facilities that are in fact programs invoked and controlled by language features. But these facilities are bought at a price: the external description of a programming system is ten to twenty times as large as the external description of the computer system itself. The user finds it far easier to specify any particular function, but there are far more to choose from, and far more options and formats to remember.

Ease of use is enhanced only if the time gained in functional specification exceeds the time lost in learning, remembering, and searching manuals. With modern programming systems this gain does exceed the cost, but in recent years the ratio of gain to cost seems to have fallen as more and more complex functions have been added.

Because ease of use is the purpose, this ratio of function to conceptual complexity is the ultimate test of system design.

> Neither function alone nor simplicity alone defines a good design.

This point is widely misunderstood.

For a given level of function, however, that system is best in which one can specify things with the most simplicity aid straightforwardness. Simplicity is not enough.

![](/wp-content/uploads/2018/08/simplicity-straightforward.png)

The expression of the things one wants to do often requires involuted and unexpected combinations of the basic facilities. It is not enough to learn the elements and rules of combination; one must also learn the idiomatic usage, a whole lore of how the elements are combined in practice. Simplicity and straightforwardness proceed from conceptual integrity. Every part must reflect the same philosophies and the same balancing of desiderata. Every part must even use the same techniques in syntax and analogous notions in semantics. Ease of use, then, dictates unity of design, conceptual integrity.

![](/wp-content/uploads/2018/08/ci-unity-of-design.png)

### Aristocracy and Democracy

Conceptual integrity in turn dictates that the design must proceed from one mind, or from a very small number of agreeing resonant minds.

Schedule pressures, however, dictate that system building needs many hands. Two techniques are available for resolving this dilemma. The first is a careful division of labor between architecture and implementation. The second is the new way of structuring programming implementation teams.

The separation of architectural effort from implementation is a very powerful way of getting conceptual integrity on very large projects.

By the architecture of a system, I mean the complete and detailed specification of the user interface. For a computer this is the programming manual. For a compiler it is the language manual. For a control program it is the manuals for the language or languages used to invoke its functions. For the entire system it is the union of the manuals the user must consult to do his entire job.

The architect of a system, like the architect of a building, is the user's agent. It is his job to bring professional and technical knowledge to bear in the unalloyed interest of the user, as opposed to the interests of the salesman, the fabricator, etc.

Architecture must be carefully distinguished from implementation.

> "Where architecture tells what happens, implementation tells how it is made to happen."
> 
> – Blaauw

Let's take a simple example a clock, whose architecture consists of the face, the hands, and the winding knob. When a child has learned this architecture, he can tell time as easily from a wristwatch as from a church tower. The implementation, however, and its realization, describe what goes on inside the case—powering by any of many mechanisms and accuracy control by any of many.

Now we can deal with the deeply emotional question of aristocracy versus democracy. Are not the architects a new aristocracy, an intellectual elite, set up to tell the poor dumb implementers what to do? Has not all the creative work been sequestered for this elite, leaving the implementers as cogs in the machine? Won't one get a better product by getting the good ideas from all the team, following a democratic philosophy, rather than by restricting the development of specifications to a few?

As to the last question, it is the easiest. Only the architects seldom have good architectural ideas. Often the fresh concept does come from an implementer or from a user. However, all my own experience convinces me, and I have tried to show, that the conceptual integrity of a system determines its ease of use. Good features and ideas that do not integrate with a system's basic concepts are best left out. If there appear many such important but incompatible ideas, one scraps the whole system and starts again on an integrated system with different basic concepts.

As to the aristocracy charge, the answer must be yes and no. Yes, in the sense that there must be few architects, their product must endure longer than that of an implementer, and the architect sits at the focus of forces which he must ultimately resolve in the user's interest. If a system is to have conceptual integrity, someone must control the concepts. That is an aristocracy that needs no apology.

No, because the setting of external specifications is not more creative work than the designing of implementations. It is just different creative work. The design of an implementation, given an architecture, requires and allows as much design creativity, as many new ideas, and as much technical brilliance as the design of the external specifications. Indeed, the cost-performance ratio of the product will depend most heavily on the implementer, just as ease of use depends most heavily on the architect.

There are many examples from other arts and crafts that lead one to believe that discipline is good for art. Indeed, an artist's aphorism asserts, **"Form is liberating."** The worst buildings are those whose budget was too great for the purposes to be served.

> The external provision of an architecture enhances, not cramps, the creative style of an implementing group.

They focus at once on the part of the problem no one has addressed, and inventions begin to flow. In an unconstrained implementing group, most thought and debate goes into architectural decisions, and implementation proper gets short shrift.

However, if there is no final word, no one-mind fighting off the democratic compromises that can reduce a vision to its lowest common denominator, then it will be difficult to achieve conceptual integrity and the system may run the risk of becoming an amorphous blob of human insensitivity. It is important to realize that you can be inclusive (or team-oriented) without being everyone-designs or anti-architect. Said another way, it is possible to have an architect and have team collaboration on a design at the same time.

It is also important to note that on a small team, the design-team may in fact be the whole product team. Another approach would have the architect role and the coach or technical/team lead role (i.e. the final say or tie-breaker) be filled by a single individual in order to ensure conceptual integrity. As is mentioned in much of the [Rational Unified Process](https://en.wikipedia.org/wiki/Rational_Unified_Process) literature, there is no requirement for a 1 to 1 or even a 1 to N cardinality between roles and people. A single person could hold many roles just as a single role could be held by many people.

### What Does the Implementer Do While Waiting?

> The lack of conceptual integrity makes the system far more costly to build and change.

When it is proposed that a small architecture team in fact write all the external specifications for a computer or a programming system, the implementers raise three objections:

• The specifications will be too rich in function and will not reflect practical cost considerations.

• The architects will get all the creative fun and shut out the inventiveness of the implementers.

• The many implementers will have to sit idly by while the specifications come through the narrow funnel that is the architecture team.

The first of these is a real danger, and it will be treated in the next chapter. The other two are illusions, pure and simple. As we have seen above, implementation is also a creative activity of the first order. The opportunity to be creative and inventive in implementation is not significantly diminished by working within a given external specification, and the order of creativity may even be enhanced by that discipline. The total product will surely be.

The last objection is one of timing and phasing. A quick answer is to refrain from hiring implementers until the specifications are complete. This is what is done when a building is constructed. In the computer systems business, however, the pace is quicker, and one wants to compress the schedule as much as possible. How much can specification and building be overlapped? As Blaauw points out, the total creative effort involves three distinct phases: architecture, implementation, and realization. It turns out that these can in fact be begun in parallel and proceed simultaneously.

![](/wp-content/uploads/2018/08/creative-effort-3-phases.png)

In computer design, for example, the implementer can start as soon as he has relatively vague assumptions about the manual, somewhat clearer ideas about the technology, and well-defined cost and performance objectives. He can begin designing data flows, control sequences, gross packaging concepts, and so on. He devises or adapts the tools he will need, especially the recordkeeping system, including the design automation system.

Meanwhile, at the realization level, circuits, cards, cables, frames, power supplies, and memories must each be designed, refined, and documented. This work proceeds in parallel with architecture and implementation.

The same thing is true in programming system design. Long before the external specifications are complete, the implementer has plenty to do. Given some rough approximations as to the function of the system that will be ultimately embodied in the external specifications, he can proceed. He must have well-defined space and time objectives. He must know the system configuration on which his product must run. Then he can begin designing module boundaries, table structures, pass or phase breakdowns, algorithms, and all kinds of tools. Some time, too, must be spent in communicating with the architect.

Meanwhile, on the realization level there is much to be done also. Programming has a technology, too. If the machine is a new one, much work must be done on subroutine conventions, supervisory techniques, searching and sorting algorithms.

> Conceptual integrity does require that a system reflect a single philosophy and that the specification as seen by the user flow from a few minds.

Because of the real division of labor into architecture, implementation, and realization, however, this does not imply that a system so designed will take longer to build. Experience shows the opposite, that the integral system goes together faster and takes less time to test. In effect, a widespread horizontal division of labor has been sharply reduced by a vertical division of labor, and the result is radically simplified communications and improved conceptual integrity.

Conceptual integrity is central to product quality. Having a system architect is the most important single step toward conceptual integrity.

The following are some of the well-known examples of Conceptual Integrity:

*   Unix (based on the notion of a "file" (e.g. directories, devices, filesystems, named pipes and sockets are all sort-of files)
*   Smalltalk ("everything is an object", and the small set of other accompanying principles)
*   SQL ("all data is in tables", with keys and constraints)
*   Lisp ("everything is a list")

If you feel you can quote any more examples of conceptual integrity, please share your views in the comments.

### References:

*   [The Mythical Man-Month by Frederick P. Brooks, Jr.](http://amzn.in/26YbgNv%20)
*   [https://cseweb.ucsd.edu/~wgg/CSE131B/Design/node6.html](https://cseweb.ucsd.edu/~wgg/CSE131B/Design/node6.html)
*   [http://wiki.c2.com/?ConceptualIntegrity](http://wiki.c2.com/?ConceptualIntegrity)
*   [http://architecture.typepad.com/architecture\_blog/2011/10/the-importance-of-conceptual-integrity.html](http://architecture.typepad.com/architecture_blog/2011/10/the-importance-of-conceptual-integrity.html)
*   [https://en.wikipedia.org/wiki/The\_Mythical\_Man-Month#Conceptual\_integrity](https://en.wikipedia.org/wiki/The_Mythical_Man-Month#Conceptual_integrity)
*   [https://en.wikipedia.org/wiki/Software\_Peter\_principle](https://en.wikipedia.org/wiki/Software_Peter_principle)
*   [https://dzone.com/articles/lean-tools-conceptual-0](https://dzone.com/articles/lean-tools-conceptual-0)
*   [https://www.dcs.warwick.ac.uk/oldmodelling/hi/theses/allan/chapter5.pdf](https://www.dcs.warwick.ac.uk/oldmodelling/hi/theses/allan/chapter5.pdf)

Image Credits

Photo by [Tim Marshall](https://unsplash.com/photos/cAtzHUz7Z8g?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/integrity?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
