---
title: 'The Four Factors of a Good Program'
date: Sun, 25 Mar 2018 04:28:13 +0000
draft: false
tags: ['article', 'Articles', 'articles', 'programming']
---

The Four Factors of a Good Program
----------------------------------

If we plan to study programming as a human activity, we are going to have to develop some measures of programming performance. That is, we are going to have some idea of what we mean when we say that one programmer is better than another, or one program is better than another. Although we all have opinions on these questions, we shall find that the answers are not as simple as we might wish.

![](/wp-content/uploads/2018/03/four-factors-final.png)

> Programming is not just human behavior; it is **complex** human behavior.

By analyzing different versions of the same program, we discover that only a small portion of it – no more than **20%** – is directed at meeting the problem specifications. Of the other **80%**, much, if not most, can be eliminated not by physical change but by psychological change.

> Only 20% of a program is directed at meeting the problem specifications.

![](/wp-content/uploads/2018/03/program-composition.jpg)

In fact, even the question of a limited storage could have been dealt with by an appropriate virtual machine, so that even machine limitations can be overcome by **proper psychological design**. A small program is typical in the percentage of coding that is actually devoted to solving the given problem. Because people do not read programs, few are aware of how common this situation is. But common it is, and it gives us much scope for improvement in our programming. Still, there is more to the question of good programming than measuring the percentage of extraneous – or at least **peripheral** code. Indeed, we cannot really measure a program by itself and say whether it is good or bad. Most programmers feel that there is such a thing as good programming. Although this feeling may be valid, it does not follow that there is such a thing as a good program. Not, at least, in the sense that we can study the program out of the context in which it was developed and in which it will be used and declare it to have a goodness of 83.72 percent. Is it a good program? It is a clumsy program, perhaps, but that is only part of the mark. After all, we only knew it was clumsy because we read it, and for the ordinary program, nobody is ever going to read it, so grace is hardly an absolute measure of program goodness. Is it an efficient program? We can hardly answer this question without knowing the machine, the compiler, and the cost situation under which it will be run. Was it done on time? What did it cost? Does it meet specifications? We cannot know these things merely by looking at the code.

> Grace is hardly an absolute measure of program goodness.

In the studies of the psychology of programming, we shall be hampered by our inability to measure the goodness of programs on an absolute scale. This applies not just to programming but also to anything and everything in life as [Dan Ariely](https://en.wikipedia.org/wiki/Dan_Ariely) says in his book **[Predictably Irrational](http://amzn.in/dAFarMm)**.

> Humans rarely choose things in absolute terms. We don't have an internal value meter that tells us how much things are worth. Rather, we focus on the relative advantage of one thing over another, and estimate value accordingly. – **Dan Ariely**

But can we perhaps measure them on a relative scale – can we say that **Program A** is better or worse than **Program B**? Unfortunately, we will generally not even be able to do that, for several reasons. First of all, when is there ever another program with which to compare? And when there is, as in the case of, say a compiler, how can we agree on the relative importance of the different attributes of the program. Is a compiler that quickly compiles slow code better than one that slowly compiles quick code? But still, aren't there times when we can make relative ranking? Isn't a compiler that quickly compiles quick code better than one that slowly compiles slow code? We have to admit that sometimes such comparisons can be made – although we must not be too hasty in making them. There are dimensions of compiler performance other than speed. There are diagnostics, scope of language covered, reliability of object code, and execution time monitoring, to mention a few. Only rarely will we find two programs so sufficiently similar that they can be compared point by point – and then find one superior on all points.

![](/wp-content/uploads/2018/03/compiler-performance.png)

More often, then, we will be doing evaluation of programs not with respect to one another but with respect to a situation – a total situation – in which they are developed.

> We are never looking for the best program, seldom looking for a good one, but always looking for one that meets the requirements.

### SPECIFICATIONS

Of all the requirements that we might place on a program, first and foremost is that it be correct. In other words, it should give the correct outputs for each possible input. This is what we mean when we say that a program "works", and it is often and truly said that "any program that works is better than any program that doesn't".

> Any program that works is better than any program that doesn't.

#### A Story

An example may serve to drive home this point to those whose minds are tangled in questions of efficiency and other secondary matters. A programmer was once called to Detroit to aid in the debugging of a new program – one that was to determine the parts requirements to build a certain set of automobiles. The input to the program was a deck of cards, each card representing a purchase order for an automobile, with different punches representing the different options selected by the customer. The program embodied the specifications relating the various options to the parts that would be needed. For instance, the choice of upholstery for the rear seat might be determined by such factors as body color, body style, options for deluxe or leatherette upholstery, and whether or not the car was air conditioned. The air-conditioning options is a good example of the basic complexity of the problem, for thought to an untrained eye the choice of air conditioning might have no connection with the choice of rear seat upholstery, it might very well require spaces for extra ducts. In general, then, each option might have some effect on the choice of parts made, so the determination of parts requirements was an excellent job for the computer. Unfortunately, when this programmer arrived on the scene, the basic approach to the problem had long been settled – and settled badly. Each option – as it affected each choice – was reflected as an individually programmed test and branch in the program. In a way, the program was an enormous tree, with more than 5000 branches, representing the decisions leading to part selection. Cast in this form – and with 16 programmers working at the same time – it was impossible to debug, as each and every case had to be tested separately. To test the program, a particular card would be put in and the output would be observed. When our programmer arrived, things were so bad that typical cards were calling for the production of cars with eight tires, no engine, and three sets of upholstery. In short, a disaster. As is usual with programming disasters, nobody recognized it as such. Instead the whole crew had gone on double shift to get out the bugs, and new programmers, including our hero, were brought in from all over the country. Naturally, this led to worse confusion than ever, and our programmer, after a few days, determined that it was hopeless business – and in any case not reason enough to be away from his family and working night and day. He was roundly condemned for his uncooperative attitude but was allowed to leave. While on the plane, he had his first opportunity in a week to reflect calmly. He immediately saw the error in the approach and perceived that a much better approach would be to divide the work into two phases. The main operational program would simply loop through a set of specially constructed specifications tables, so that all decisions would be made with a single test reapplied to different parts of the table. In that way, the program was at least assured to produce the right number of tires, engines, and so forth. The tables themselves would be compiled from input written in essentially the form of the engineering specifications. This would allow the engineering personnel, rather than the programmers, to check the specifications, and also permit one part of the specification to be changed without changing all parts further down a decision tree. By the time he got off the plane, he had coded the two programs. It was a day's work to check them out, and another two days' work with the local assembly plant engineers to create the specifications in input form. After a week's testing in the plant, he was about to return to notify Detroit of the news when he got a telegram saying that the project had been cancelled – since the program was impossible to write. After a quick call and a plane trip, he was back in Detroit with his version of the program. A demonstration to the executives convinced them that the project could continue, and then he was asked to make a presentation to the rest of the programmers. Naturally, they were a rather cool audience – but they sat quietly enough through his explanation of the method. Even at the end, there was a lack of questioning – until the original creator of the old system raised his hand.

![](/wp-content/uploads/2018/03/xkcd1.jpg)

![](/wp-content/uploads/2018/03/xkcd2.jpg)

This observation – though it undoubtedly failed to win our hero any friends – contains the fundamental truth upon which all programming evaluation must be based. If a program doesn't work, measures of efficiency, of adaptability, or of cost of production have no meaning. Still, we must be realistic and acknowledge that probably no perfect program was ever written. Every really large and significant program has "just one more bug." Thus, there are degrees of meeting specifications – of "working" – and evaluation of programs must take the type of imperfection into account. Any compiler, for example, is going to have at least **pathological** programs which it will not compile correctly. What is pathological, however, depends to some extent on your point of view. If it happens in your program, you hardly classify it as pathological, even though thousands of other users have never encountered the bug. The producer of the compiler, however, must make some evaluation of the errors on the basis of the number of users who encounter them and how much cost they incur. This is not always done scientifically. Indeed, it often amounts to an evaluation of who shouts the loudest, or who writes to the highest executive. But whatever system is chosen, some bugs will remain, and some people will be unhappy with the same compiler that satisfies thousands. In effect, then, there is a difference between a program written for one user and a piece of "software". When there are multiple specifications, there are multiple definitions of when the program is working. We need to take into account the difference between programs developed for one user and programs developed for many. They will be evaluated differently, and they should be produced by different methods.

### SCHEDULE

Even after questions of meeting specifications have been set aside, the question of efficiency is still not uppermost. One of the recurring problems in programming is meeting schedules, and a program that is late is often worthless. At the very least, we have to measure the costs of not having the program against any potential savings that a more efficient program would produce. In one noteworthy case, the customer of a software firm estimated that the linear programming code being developed would save more than one million dollars per month in the company's oil refining operations. Even one month's delay in schedule would result in a loss that could not be recovered if the program were run free of charge for ten years. Losses from late delivery of programs are not always so severe, but even were the costs negligible, there seems to be, an incredible amount of annoyance when schedules are not met. In fact, the average programming manager would prefer that a project be estimated at twelve months and take twelve than that the same project be estimated at six months and take nine. This is an area where some psychological study could be rewarding, but there are indications from other situations that it is not the mean length of estimated time that annoys people but, rather, the standard deviation in the actual time taken. Thus, most people would prefer to wait a fixed ten minutes for the bus each morning than to wait one minute on four days and twenty-six minutes once a week. Even though the average wait is six minutes in the second case, the derangement caused by one long and unexpected delay more than compensates for this disadvantage.

> It is not the mean length of estimated time that annoys people but, rather, the **standard deviation** in the actual time taken.

If this observation holds true for programming, then any studies of the effect of certain programming practices should measure the effect on variability in production time – not just mean time as most studies currently do.

### ADAPTABILITY

Having disposed of the questions of meeting specifications and schedules, we might suppose that we had finally arrived at the question of efficiency as a measure of the goodness of programs. Without begging the question of relative importance of the two factors, however, it will prove advantageous first to dispose of the factor of adaptability of a program. No doubt there are programs that are used once and then thrown away. No doubt there are even more programs that should be thrown away before ever being used. Nonetheless, the great majority of programs that are written, especially by professional programmers, remain in existence for a definite life span. And during that span, most of them become modified.

> No doubt there are programs that are used once and then thrown away. No doubt there are even more programs that should be thrown away before ever being used.

Few programmers of any experience would contradict the assertion that most programs are modified in their lifetime. Why, then, when we are forced to modify programs do we find it such a Herculean task that we often decide to throw them away and start over? Reading programs gives us some insight, for we rarely find a program that contains any evidence of having been written with an eye to subsequent modification. But this is only a symptom, not a disease. Why, we should ask, do programmers, who know full well that programs will inevitably be modified, write programs with no thought to such modifications? Why, indeed, do their programs sometimes look as if they had been devilishly contrived to resist modification – protected like the Pharoahs' tomb against all intruders?

> We rarely find a program that contains any evidence of having been written with an eye to subsequent modification.

There are answers to these questions, and they lie in the direction of our psychological investigations. But our job for the moment is not to answer them, but merely to raise them and remind ourselves of their importance in any discussion of what makes good programming. A related question is of course, documentation, for why do we document a program if not to render it more easily modifiable? We would all agree that the quality of documentation and the ease of making modifications, both planned and unplanned, should count heavily in any grading of a program, or of the programmer who writes that program. We would all agree further, then, that any improvement here to be gained from psychological investigations will be well worth the effort.

### EFFICIENCY

Measuring the true efficiency of a program is not the simple task it first seems. In the first place, efficiency is not always measured simply in terms of time on the computer, for it is often possible to trade time on the computer for time before and after the computer run. For example, a commonly used measure of the speed of a compiler is the number of cards per minute it processes. If we use this measure to compare an assembly program with say, a FORTRAN compiler, the assembly is likely to appear more efficient, since each input card carries less information. Sometimes compilers are compared on the basis of number of machine instructions produced per minute, but this measure exposes us to the danger of giving credit to a compiler simply because it is verbose in the production of object code.

> Efficiency is not always measured simply in terms of time on the computer, for it is often possible to trade time on the computer for time before and after the computer run.

A compiler, ofcourse, is a special kind of beast anyway, since we must measure the efficiency of the code produced as well as that of the compilation process. Still, since compiler efficiency is a subject of much discussion, it may be worthwhile to pursue this example to illustrate how easily we can be misled on efficiency questions. Consider, for instance, the comparison of two compilers of the same language in terms of the "cards per minute" measure. The first pitfall here lies in the term "same language." Very few compilers handle exactly the same language, so if there is any difference between the two, we will have to adjust the efficient obtained from cards per minute to account for the difference in value of the two languages. The effect of slight differences in source language on compiler efficiency can be striking. Typically, if the compiler writer can choose 10% of the language which he will not implement, he can produce a 50% faster compiler. Unfortunately, which 10% is chosen differs from one machine and one compiling technique to other, so that language designers cannot simply provide "more efficient" subsets to be implemented. Similar improvements in efficiency are possible from similar relaxations of specifications in other areas. Indeed, if our primary concern in a particular application is efficiency, the first step should always be to look for areas in which the specifications can be changed to suit computer efficiency rather than user convenience. Of course, computer time is not the only cost element in a typical project. People time also costs money. Thus, we can leave certain crossfootings to be done by the recipient of a report, but we may only be saving computer time at the expense of executive time with paper and pencil. We may decide quite rationally to make this choice, but more often the choice is made without the executive having anything to say about it.

> Computer time is not the only cost element in a typical project. People time also costs money.

Trimming external specifications can even have the opposite of the intended effect on computer time used. If, for example, a great deal of manual handling of input has been left in the system to simplify the computer run, we may find ourselves paying more in returns that we saved in single-run efficiency. This effect is rather common when comparing two compilers which, even though they handle identical language, differ in the diagnostics and execution monitoring they produce. If we save 20% in raw compile time by eliminating or trimming error checking, we had better be sure that the user will not find himself making 40% more runs to get the same amount of information. As hazardous as it is to make simple measures of efficiency in a single machine, simple-scheduler environment, it is child's play compared with the difficulties of obtaining meaningful efficiency estimates in a multi-processing or multi-programming environment. Is it better, for instance, to occupy 40k bytes of main storage for one hour or 80k bytes for 30 minutes? The answer to this question depends on the situation in the computer at the time the job is run – and may change each time the job is run. For example, one day it is possible to add a 40k job to the machine load without affecting the performance of the other jobs by one second; yet the next day the same 40k job may lock out another job for the full hour. Running on systems capable of dynamic load adjustment may alleviate some of the instabilities in multiprogram performance that we often see today. It may very well be that, as with schedules for programming, what the user wants is not a small mean time to execute his program but a small standard deviation, so he can plan his work reasonably. If this is true, the entire schedule from origin to destination of the work must be considered, not just the time on the computer.

> What the user wants is not a small mean time to execute his program but a small standard deviation, so he can plan his work reasonably.

We may be moving toward a computing environment in which the best programs are those that retain the ability to be run in various sizes of main memory, on various machine configurations. Such a program may not be very efficient on any one of the configurations – considering**  [Fisher's Fundamental Theorem](https://en.wikipedia.org/wiki/Fisher's_fundamental_theorem_of_natural_selection)** applied in the inverse sense – but may lead to more consistent turnaround performance because it will never find itself waiting for just the correct slot in the day's schedule. Machines with virtual memory give us this kind of flexibility without special programming, although there are indications that performance improvements can be obtained even in this environment by taking special characteristics into account. For instance, if we know the page size of our system, we can avoid excessive paging by tailoring our program sections to fit into single pages and not to cross page boundaries except at logical breaks in the program. If we do this, however, the program becomes somewhat less well adapted for running in a system with a different page size. Similarly, we can choose an algorithm that will require no more and no less page space than is commonly allowed by our system; but again, this kind of program will fail to take advantage of extra page space and will give the worst possible performance in a system with a smaller page size. What all of this means is that efficiency is becoming a clouded issue in computing. Moreover, with cost per unit computation decreasing every year and cost per unit of programming increasing, we have long since passed the point where the typical installation spends more money on programming than it does on production work. This imbalance is even more striking when all the work improperly classified as **production** is put under the proper heading of **debugging**. But by any measure, the imbalance exists. And grows. And so we expect that with each passing year we will hear less and less about efficiency – and more and more about effectiveness.

![](/wp-content/uploads/2018/03/cpuc-cpup.png)

### Summary

The question of what makes a good program is not a simple one, and may not even be a proper question. Each program has to be considered on its own merits and in relation to its own surroundings. Some of the important factors are:

*   Does the program meet specifications? Or, rather, how well does it meet specifications?
*   Is it produced on schedule, and what is the **variability** in the schedule that we can expect from particular approaches?
*   Will it be possible to change the program when conditions change? How much will it cost to make the change?
*   How efficient is the program, and what do we mean by efficiency? Are we trading efficiency in one area for inefficiency in other?

### Questions for Managers

#### 1\. On what bases do you reward programmers?

Are certain of your criteria mutually contradictory, as in asking for efficient but general programs? How explicit are you with your programmers in indicating what you are looking for in their programs? Or do you just tell them you want the programs to be fast, small, neat, easily modifiable, error-less, and done in a week?

#### 2\. How do the programs in your installation stack up on adaptability?

Is modifying programs a major expense in your installation? If so, can you see things in your programming practices – in the original goals you set – that may lead to this kind of expense?

#### 3\. How important is making the schedule in your shop?

Is "a miss as good as a mile", or do your reward for consistency rather than the occasional lucky shot? Can you see how a programmer can choose an unreliable practices because it gives him the only hope of making the schedule, even though it may risk not finishing the program at all?

### Questions for Programmers

#### 1\. Do you have criteria explicitly in mind when you start on a project?

Are these criteria obtained from your own impression of what is important, or do you get them from your manager? Do your criteria change as the project progresses, or do you have some device for keeping them firmly in mind?

#### 2\. Future Modifications?

How many times have you ever thought, when writing a program, of some person in the future who might modify it? How many times have you ever cursed someone whose program you were modifying?

#### 3\. Efficiency or Completion?

Have you ever tried for "efficiency" at the expense of getting the job done? For "meeting the deadline" at the expense of doing it right?

### References:

*   [The Psychology of Computer Programming by Gerald M Weinberg](https://read.amazon.in/kp/embed?asin=B004R9QACC&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_E6nPAbVN5B9M4&tag=hangaroundthe-21)
*   [Dan Ariely - Predictably Irrational](http://amzn.in/76lETgQ)

Cover Photo from Unsplash by:

[Srivatsa Sreenivasarao](https://unsplash.com/@srivatsats?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from Srivatsa Sreenivasarao")
