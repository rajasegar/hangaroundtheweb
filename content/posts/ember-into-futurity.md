---
title: 'Ember into Futurity'
date: Sat, 15 Jun 2019 23:30:36 +0000
draft: false
tags: ['Articles', 'ember', 'emberjs', 'EmberJS', 'EmberJS2019']
---

Nobody can predict the future, but everybody can wish for something in it. It could be for the benefit and interest of one person or a community as a whole. I am putting down my thoughts and wishes for Ember.js as both a consumer of the framework itself and producer of the supporting tools and addons for the same.

**The best way to predict the future is to invent it.**

This post is my answer to the call for blog posts for [#EmberJS2019](https://blog.emberjs.com/2019/05/20/ember-2019-roadmap-call-for-posts.html). I haven't had the slightest idea to write a post for the blog post call, but my colleagues and friends insisted me to write one. Because honestly I really don't know where to start and how to give a conclusive ending to my post. But my creative Muse never ceases to amaze me. So here it goes.

The Framework
-------------

As a framework, we need to fully achieve conceptual integrity on what we want to accomplish and how we want to move forward with it. Because instead of trying to become one "All Purpose Tool Kit", we should focus on one thing and do it well.

**Ember has the right ideas, but the wrong atomic structure.**

Component Paradigm
------------------

While Ember was ruling the MVC realms, there came a knight known as "[React](https://reactjs.org/)", armed with a simple yet profound idea, who taught us how we can build web applications using components. The [Components Model](https://en.wikipedia.org/wiki/Component-based_software_engineering) may be a new one for Web development, but it wasn't for programmers and system application developers like me who have been dealing with objects and classes for a very long time. Yet this new Knight conquered the world with his deep and extensive conceptual integrity. Ember failed to realize this threat for a very long time, even though Ember had components in it's arsenal, but it was no match for React.

Octane
------

Octane is the one thing I eagerly waited for in Ember a year ago when Tom Dale published his [Ember 2018 Roadmap RFC](https://github.com/emberjs/rfcs/blob/26c4d83fb66568e1087a05818fb39a307ebf8da8/text/0000-roadmap-2018.md). I even remember that I explored the RFC in detail in my blog [here](http://hangaroundtheweb.com/2018/08/ember-octane-everything-one-can-expect-in-the-next-ember-edition/). But still we are yet to see a full-blown Octane Edition landing in Ember. And it would be a disgrace if I fail to appreciate the effort put by the Team to make the necessary provisions for the Octane release by making the guides ready with great care and great tact.

More Flexible CLI
-----------------

One of the best things I love about Ember is the [CLI](https://cli.emberjs.com/release/). No other Javascript Framework has got it right till date. While all of the other frameworks use CLI as just an application scaffolding tool to bootstrap a project, Ember-CLI goes beyond them with [generators and blueprints](https://ember-cli.com/extending/#generators-and-blueprints). And it gets even better by giving us the flexibility to [define](https://ember-cli.com/extending/#defining-a-custom-blueprint) and generate a custom blueprint.

But the CLI is not very flexible in-terms of choosing tools and libraries for various tasks other than the standard packages shipped as part of the CLI. The Convention over Configuration is holding us back in some aspects on this front. The Web is evolving with more new tools and libraries day by day, and I think we should open up more and make provisions to allow developers to choose their own tools and libraries best suited for their projects.

We should adopt the ideas from projects like [ember-cli-create](https://github.com/gossi/ember-cli-create) which will allow the developers to choose their own tools and technologies for their projects based on the requirements, platform and other external factors.

Unified Documentation
---------------------

This is one thing I really wanted to emphasize here. Because we have so many ideas being implemented in Ember such as Server-Side Rendering ([Fastboot](http://ember-fastboot.com/)), [Ember Engines](http://ember-engines.com) and [Glimmer.js](http://glimmerjs.com). But all of them are scattered and fragmented. I wish all the above things should branch out from our main guides for Ember instead of having separate websites.  

I am not concerned more on the technical implementation rather on the conceptual mapping to give developers an overall idea of different technologies that can be used along with the framework. It could be a simple page for each one of the above within guides itself and guide the users to take them to the main website if they want to explore more on this or a more prominent place where we can have links to these projects within the guides itself.

Functional Components (Hooks)
-----------------------------

When hooks landed in React, it made a real fuzz. More of my fellow React developers were singing praises for the same, such as how it changed the way they write code and mutated their minds on how you could bring about solutions for complex problems using components. And again underneath all the fuzz, it's just a conceptual modification that the React framework brought in for writing components, which can be adapted to any framework that supports the component model for creating user interfaces for the web.

I wish Ember could have adopted it much earlier, but it's better late than never. I am very much relieved to see this has seen the light of the day, when I saw [ember-functional-component ](https://github.com/rwjblue/ember-functional-component) created by our beloved [rwjblue](https://github.com/rwjblue).

Fail Fast
---------

As a community we value "Stability without Stagnation", but that proved expensive for the framework in the long run. I personally urge that we should fail fast, because by failing fast we come to value the lessons and insights we learnt from our failures and move forward with much greater pace. We need to get out there, try out new things and find out what works and what doesn’t.

**Why do we fall? So we can learn to pick ourselves up.**

**\- Alfred, Batman**

Embroider
---------

Using [broccoli](https://broccoli.build/) as a build tool, have been a huge impediment for Ember, in adopting the best and the latest conventions from other frameworks in terms of build pipeline and tooling. Since other frameworks like React, Angular and Vue are heavily betting on cutting edge packaging technologies like [Webpack](https://webpack.js.org/), [Rollup](https://webpack.js.org/) and [Parcel](https://parceljs.org/), while Ember still fixating on broccoli proved to be a costly mistake for the community. I think [Embroider](https://github.com/embroider-build/embroider) will not suffer from the same fate, by adopting Webpack as a tool in the build pipeline.

Conclusion
----------

So instead of asking "Why didn't Ember succeed?", actually the right question to ask will be **Why is there a perception that Ember didn't "succeed"?** And I would like to conclude this post with words from my favorite author, [Henry David Thoreau](https://en.wikipedia.org/wiki/Henry_David_Thoreau).

**Read your fate, see what is before you and walk on into futurity.**