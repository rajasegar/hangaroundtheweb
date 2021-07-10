---
title: '24 ways for being productive with big code base'
date: Sun, 21 Apr 2019 22:30:14 +0000
draft: false
tags: ['Articles', 'bestpractices', 'productivity', 'Uncategorized']
---

In this article we will take a look at some of the guiding principles which are beneficial while working with large code base.

The whole idea of this post is to collect and come up with a checklist of significant approaches and ways to deal with large and legacy code bases.

The readers are welcome to share more tools, methods and approaches in the comments section below.

1\. Onboarding Documentation
----------------------------

Ask if there is onboarding documentation, or someone who can give you a high-level overview of the codebase. Typically finding a person with a lot of context on the code is the fastest and most thorough way to understand the responsibilities and layouts of a codebase. Ask if they can draw an ER(Entity Relationship) diagram, it's extremely valuable documentation for any additional developers.

> Show me your flowcharts and conceal your tables, and I shall continue to be mystified.
> 
> Show me your tables, and I won’t usually need your flowcharts; they’ll be obvious.
> 
> \-- **Fred Brooks**

2\. Read Documentation
----------------------

Read all the documentation possible, especially design documentation. This should hopefully give you some clues as to both function (what) and purpose (why). The discussion around this will also introduce you to the major players in the architecture of the codebase.

> **Documentation is the castor oil of programming.**
> 
> \-- Gerald Weinberg, The Psychology of Computer Programming

![](/wp-content/uploads/2019/04/design-documentation.png)

Note this does not necessarily mean formalized design docs, it could just be searching for any README's or relevant wiki pages. You're just gathering threads at this point, and documentation tends to be a lot more compact and easily digestible than foreign code.

3\. Look at the models
----------------------

Look at the models - there will be compact representations of data at some point. This gives good insight into the shared language of the code and can give a lot of clues about how things are done. They also tend to be a lot more human-readable than other pieces of code, so this is a plus.

> **The architectural model provides a Gestalt view of the system, allowing the developer to examine it as a whole.**
> 
> \-- Scott Ambler, Agile Modeling

4\. Find and Skim the largest files.
------------------------------------

Typically these files perform the majority of the work, have the most responsibility, and introduce most bugs. Knowing roughly where the major players are and what they do makes it a lot easier to read any individual file.

You need to be fully aware of the presence of any [God Class](http://wiki.c2.com/?GodClass) or components in your codebase which pose a serious threat to the long-term health of your product.

5\. Run the application
-----------------------

Run the application, find some small behavior (a single, simple endpoint) and debug it. Step through the application code so you can see how a particular request flows through the system. This can show you how a lot of different concerns within the code are tied together and also ensures that you're set up for both running and debugging the codebase.

6\. Don't plan a full rewrite
-----------------------------

Don't plan or do a full rewrite - it'll almost never work. Jeremy Burton has this wonderful [post](https://vibratingmelon.com/2011/06/10/why-you-should-almost-never-rewrite-code-a-graphical-guide/)discussing the social and economical impacts of code re-writes.

When you inevitably come across a trade off, choose the one which is easiest to change later. Everything else is just noise. Large changes in legacy systems often suffer from the [second system effect](https://en.wikipedia.org/wiki/Second-system_effect) among other problems.

7\. Learn the tools
-------------------

Learn and use tools to automate the build system and quality assurance ([Jenkins](https://jenkins.io/), [Sonarqube](https://www.sonarqube.org/),[Docker](https://docker.com), [Git](https://github.com), etc.)

Great tools let us do the impractical and the impossible. They give us super powers. The goal should be to know your tools so well that you can focus on the work at hand, without having to think — they should be second nature.

8\. Sharpen the saw
-------------------

Sharpen the Saw means preserving and enhancing the greatest asset you have--you. It means having a balanced program for self-renewal. It is the mindset to seek continuous improvement and renew yourself professionally.

> Give me six hours to chop down a tree and I will spend the first four sharpening the axe.
> 
> — Abraham Lincoln

Take the time to improve your skills and the skills of your team (coding dojos, experiments). An excuse to not sharpen the saw is an excuse for failure, burnout, and mediocrity.

9\. Spend time with your end users/customers
--------------------------------------------

If possible spend time with the main user / product owner (especially in peak periods). You're blessed to have users, who understand your system.

The team is actively encouraged to spend time with actual customers to learn more about their needs. A developer may spend time observing real users and come away with brilliant insight into what is most needed.

10\. Focus on cross cutting concerns
------------------------------------

The crosscutting concern also known as system-wide concern is a concern which is applicable throughout the application and it affects the entire application. These are the concerns representing functionalities for secondary requirements. These are typically implementation details that need to be kept separate from business logic. Do refactoring and first focus on cross cutting concerns (APIs, translations, caching, logging, database, etc.)

11\. Migrations
---------------

Migrate things to well tested isolated APIs (e.g. use REST / Graphql APIs with new endpoints in the frontend and try not to use untested code for these APIs). It is always a good idea to have a strategic plan for migrations in your development roadmap. It could be every 6 weeks or 6 months, but it should be done at regular intervals of time or else you will be incurring a large amount of tech debt in your codebase.

12\. Move fast and break things
-------------------------------

Don't be too backwards compatible (move fast and break things) This way of working usually emphasizes testing out new ideas, iterating quickly based on data, and aiming for more frequent points of learning. Allen Yang exhaustively discusses the pros and cons of this approach in this Forbes [article](https://www.forbes.com/sites/quora/2014/12/16/should-innovative-companies-really-move-fast-and-break-things/#2eefc9fa6d1d).

13\. Get the team on board
--------------------------

If there are multiple people you need their buy-in and support for whatever approaches you want to do

14\. Plan for "health by a thousand small improvements"
-------------------------------------------------------

It will be an iterative approach and you will refactor as you go.

15\. Don't assume different = bad
---------------------------------

People might have done differently, consider using their approaches. You might do it differently. But it's better if you keep a consistency within the codebase. In codebase management consistency trumps cleverness.

16\. Create space
-----------------

Consider introducing a Fix-it Friday where everyone can work on little improvements. Think about conducting a [bug-bash](https://en.wikipedia.org/wiki/Bug_bash) in your organization, at regular intervals of time so that it automatically creates a platform where all the developers, testers, program managers, usability researchers, designers, put aside their regular day-to-day duties and "pound on the product".

Because each person will use the product in slightly different (or very different) ways, and the product is getting a great deal of use in a short amount of time, this approach may reveal bugs relatively quickly.

17\. Create a Non-Blame culture
-------------------------------

Stuff will break if people risk improving things. Avoid blame shifted to them. If bug trackers ping individual people consider pinging the whole team instead.

> **If you get your ego in your way, you will only look to other people and circumstances to blame.**
> 
> Jocko Willink

18\. Consider automation
------------------------

While "development automation" is not a commonly used and recognized term of the software development industry, business people normally use it to refer to "anything that can speed up the development process and allow the organisation to bypass most, if not all, of the software development process, jumping from a simple business-level wish list to a ready-for-the-market product (writing as little code as possible and hiring as little programmers as possible)".

> Any technology/methodology that can reduce software development to the most complicated thing the average business guy can understand.

Here are some examples of development automation:

*   Automatic update of dependencies
*   Automatic build process
*   Automatic checking of style rules
*   Automatic execution of unit tests with every build
*   Automatic update of code-generated proxies
*   Automatic creation of deployment packages
*   Automatic configuration of target environments
*   Automatic deployment to development or QA environments
*   Automatic computation of metrics, such as Code Coverage
*   Automatic smoke tests
*   Automatic generation of release notes, or at least of the bug list that goes in the "Fixed in this build" section

19\. Start with the tests
-------------------------

This one is the most annoying, but worth doing. Whenever you improve a feature a bit try adding a test. Often in legacy apps there are no good tests. A lot of people recommend writing a test suite for the whole app before you do anything. If you are lucky enough to do this try it. The iterative approach more realistic as you can also do feature work while refactoring.

When doing tests focus on integration (vertical/functional/etc) and not unit tests (unless the "unit" contains critical or complex logic). Your goal is to know "**that you broke something**" - you get by if you don't always know "**what you broke**".

Write automated tests (unit, integration, acceptance) for existing code where ever possible. Write at least unit tests and integration tests for new code.

Make sure you have development and test environment available, including data transfer from production to test.

20\. Acknowledge tech debt
--------------------------

Not everything needs refactoring. If it's not critical and nobody needs to touch it consider acknowledging it as tech debt. Add larger notes above the problematic areas and explain why you aren't refactoring it, explain things worth knowing to understand the code better, etc. Whenever you leave comments remember that comments should explain "why" not "what" the code does.

21\. Read a lot of code
-----------------------

Spend time reading code in the codebase even if it does not seem to make sense, even if you don’t think you’ll need to know that part of the code. Keep reading until it starts to make sense. The trick is to just read. You can even avoid tools that automatically navigate the code because you will know eventually where things are.

22\. Debugger is your BFF
-------------------------

The first and the foremost task while working with existing code bases is you need to get debugger working. Nothing can explain the processing workflow better than tracing the execution.

Get familiar with your debugger. You may be surprised by how deep in a call stack a bug can live. It will also make you intimate with the different ways your codebase is orchestrated together. Also having any kind of schemas, protocol definitions and tests can help grasp whats happening in the system.

23\. Use the boyscout approach
------------------------------

Clean where other left dirty stuff. Sure, many here would argue that "never touch a running system" is a gold rule, but what if the running system is running in the wrong way?

> **The Boyscout rule**
> 
> Always leave the campground cleaner than you found it.

If everyone attain her/himself to this rule, there wouldn't be what we call innovation.

24\. Don't try to fix the pile of mud
-------------------------------------

Complicated software are infections of a complicated business requirements. When something is a pile of mud, don't try to fix the mud.

Fix the business requirements until it get easier to handle. This also leads, most of the time, to a massive reduction in messy code bases.

At this point you should have a fairly solid understanding of at least the most critical points of the codebase, and also be set up to run and debug it. You should also have at least one or two points of contact to ask questions. This gives you a good framework for figuring out how to modify the codebase moving forward.
