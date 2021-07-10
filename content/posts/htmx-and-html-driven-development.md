---
title: 'htmx and HTML Driven Development'
date: Sat, 10 Apr 2021 23:05:14 +0000
draft: false
tags: ['htmx', 'ssr']
---

In this post, I am going to share some of my experiences and the benefits of using [htmx](https://htmx.org/) to build modern, rich and interactive web applications driven by HTML which can serve as an alternative to the bloated, JavaScript heavy Single Page Application (SPA) approach.

HTML is the center of the universe
----------------------------------

HTML and CSS are the basic building blocks of the web. JavaScript was supposed to be a glue to work these two and to add some amount of interactivity and dynamism to our pages. This is how the story should have been unfolded. But, the fable of Web development took a tragic turn of events with the advent of Client-side rendering and other similar technologies. This paved way for building HTML and CSS in JavaScript and the exception became the norm. We see huge amounts of JavaScript shipped to the browser which is justified in the name of whatsoever it may be called.

Doing HTML Driven Development feels simple and natural to people like me who started as a Full-stack developer and transitioned to Front-end development, frustrated in the long run by dealing with all the complexities of client-side rendering with Javascript.

It's refreshing for me to work with htmx and hyperscript after going through a lot of front-end frameworks like Ember, React, Svelte and so on. It's getting simpler by the day. I am testing the limits of htmx approach by building a lot of [demo applications](https://github.com/rajasegar?tab=repositories&q=htmx&type=&language=&sort=) and I am yet to hit the ceiling. htmx allows you to create HTML-centric or SSR-first web apps. I am discovering more and more patterns with this. And my productivity is on the upward trend.

SSR first applications
----------------------

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--rSsoMp_Y--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m1usyomana65wzdqsruc.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--rSsoMp_Y--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m1usyomana65wzdqsruc.jpg)

With htmx, you get the incentive of building Server Side Rendering (SSR) first applications instead of reaching for it at the last stage if and only any performance improvements become a necessity. Nowadays, it is the norm to go for SSR as the last resort in most of the cases. This is not the case, if your are building your UI from the server side.

Since htmx is dependency free, framework and language agnostic you can use it with any server-side platform like Node Express, RAILS, Django, Phoenix, Laravel and so on.

Reusable components on the server
---------------------------------

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--3PH9DPPg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hfi8b3iralwdf5a8udzz.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--3PH9DPPg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hfi8b3iralwdf5a8udzz.jpg)

You can also have reusable UI components on the server side by using a more established and mature templating libraries like [pug](https://pugjs.org/) for Node. And I am quite sure that the templating libraries for other platforms like RAILS,Django also have the same or more advanced capabilities which will allow us to construct complex and dynamic HTML.

With htmx, I get to reuse a lot of UI component fragments and in pug it is very easy with partials and mixins. For example, in this [Rentals Listing](https://super-rentals-htmx.herokuapp.com/) demo application, which is built with Express.js and htmx, I am making use of the same partial to render for both static and dynamic use cases.

### views/includes/rental-list.pug

```
ul.results
  each rental in rentals
    li
      article.rental
        button.image(type="button", _="on click toggle .large then if #view-caption.textContent === 'View Larger' then set #view-caption.textContent to 'View Smaller' else set #view-caption.textContent to 'View Larger'")
          img(src=rental.attributes.image, alt='An image of ' + rental.attributes.title)
          small#view-caption View Larger
        .details
          h3
            a(href='/rentals/' + rental.id) #{rental.attributes.title}
          .detail.owner
            span Owner:
            | #{rental.attributes.owner}
          .detail.type
            span Type:
            | #{rental.attributes.category}
          .detail.location
            span Location:
            | #{rental.attributes.city}
          .detail.bedrooms
            span Bedrooms:
            | #{rental.attributes.bedrooms}
        .map
          img(alt='A map of ' + rental.attributes.title, src=rental.mapbox, width="150",height="150") 
```

For the home page listing, I am using `include` helper from pug to render the partial  

```
extends layout
block content
  .jumbo
    .right
    h2 Welcome to Super Rentals!
    p We hope you find exactly what you're looking for in a place to stay.
    a.button(href="/about") About Us
  .rentals
    label
      span Where would you like to stay?
      input.light(type="text", name="search",
       hx-post="/search" ,
       hx-trigger="keyup changed delay:500ms" ,
       hx-target=".results" ,
       hx-indicator=".htmx-indicator")

    include includes/rental-list.pug 
```

And whenever the user searches for any rental, I am using the same partial to populate the search results from an express route like this:  

```
app.post('/search', (req, res) => {
  const { search } = req.body;

  const results = _rentals.data.filter(r => {
    const _search = search.toLowerCase();
    const _title = r.attributes.title.toLowerCase();
    return _title.includes(_search);
  });

  const template  = pug.compileFile('views/includes/rental-list.pug');
  const markup = template({ rentals: results });
  res.send(markup);
}); 
```

Server side Routing
-------------------

Routing on the client-side comes with it's own set of challenges.There is always the dilemma whether to use Hash-based routing or URL based routing. Since the `history` api is not supported in older browsers like IE 11, we almost fall back to hash-based routing which is making use of the fragment identifiers in the url.

And most of the Javascript frameworks implement their own logic of client-side routing even though underneath all the frameworks use the native browser api like `window.history` and so on. This paves way to more boilerplate code to be added into the framework code and getting bundled in our application Javascript.

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--KIw9wkHN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qtksxjct0bgnmmj4gg2s.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--KIw9wkHN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qtksxjct0bgnmmj4gg2s.jpg)

Less or No JavaScript
---------------------

The biggest advantage I see with htmx is the amount of Javascript we write or send to the browser. You can almost create rich interactive web applications by just using htmx and [hyperscript](https://hyperscript.org/), without writing any client-side Javascript code for the browser.  

```
<!-- have a button POST a click via AJAX -->
<button hx-post="/clicked" hx-swap="outerHTML">
    Click Me
</button> 
```

Once we adopted JSON as our data-interchange format in the early days of SPA, we are often required to do a lot of data plumbing in the client-side to reconstruct HTML from the JSON data we get from the server through our apis. And most of the times we either under-fetch or over-fetch data in our api responses.

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--fdc83Jg0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cfxn635jq7p14e74sf2k.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--fdc83Jg0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cfxn635jq7p14e74sf2k.jpg)

This lead to the emergence of newer and more sophisticated alternatives like [GraphQL](https://graphql.org/) through which we get only the data we require from the back-end. But still we haven't got away with rendering on the client-side with data. But with htmx, you are just replacing or swapping the existing HTML with the HTML response you get from the server, no more data plumbing on the client-side.

No Build/Compilation
--------------------

One more advantage we get with using htmx is the absence of any build tooling for your web applications. htmx doesn't require any compilation or build process to create your web apps. You even can consume it via a CDN by using script tags in your html.  

```
<!-- Load from unpkg -->
<script src="https://unpkg.com/htmx.org@1.3.3"></script> 
```

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--WPiTeRPp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nh6rs6uenk7v47m56stz.jpeg)](https://res.cloudinary.com/practicaldev/image/fetch/s--WPiTeRPp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nh6rs6uenk7v47m56stz.jpeg)

With the web development arena, moving towards a [build-less](https://modern-web.dev/guides/going-buildless/getting-started/) future for applications on the web, I think this makes more sense. With the adoption of the ES Modules specification by all the browser vendors and the advent of tools like [Skypack](https://skypack.dev/), [Snowpack](https://snowpack.dev/), [Vite](https://vitejs.dev/) which piggyback on the CDN and ESM approaches, we are going to see less and less of bundling and compilation for Javascript on the client-side.

Finally you get some relief from not installing thousands of npm packages, writing and maintaining complex build configurations and all the unpleasant things that comes bundled with building web applications for the client-side.

One Code base
-------------

Having two code bases for your application brings its own set of challenges to address. You have to synchronize your deployments, setup build pipelines twice, framework upgrades, code maintenance, running test suites and so on.

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--6XZ7q3ib--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9ibs32s22ikv5zycgi9w.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--6XZ7q3ib--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9ibs32s22ikv5zycgi9w.jpg)

But with htmx, since all your rendering happens on the server-side, you don't need a separate code base for your front-end. You can get away with a lot of things, save time, effort and cost in the long run. And it is also brings a cohesive development experience for the developers since they don't have to check out two or more repositories for working in a single application and saves a lot of context-switching by jumping back and forth between back-end and front-end.

Locality of Behavior (LoB)
--------------------------

The LoB principle is a simple prescriptive formulation of the quoted statement from Richard Gabriel. In as much as it is possible, and in balance with other concerns, developers should strive to make the behaviour of a code element obvious on inspection.

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--vWXDA2ct--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nzo93k19nwoqpr95hk97.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--vWXDA2ct--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nzo93k19nwoqpr95hk97.jpg)

The principle states that "locality is the primary feature for easy maintenance". And locality is that characteristic of source code that enables a programmer to understand that source by looking at only a small portion of it.

The LoB Principle:

```
The behaviour of a code unit should be as obvious as possible by looking only at that unit of code 
``````
<div hx-get="/clicked">Click Me</div> 
```

The LoB will often conflict with other software development principles such as with Separation of Concerns, but this conflict has already been justified when React introduced HTML and CSS in Javascript. It's not really the separation of concerns but more the separation of technologies like HTML, CSS and Javascript as pointed out by none other than Pete Hunt, creator or React, in this awesome talk called [React: Rethinking best practices](https://www.youtube.com/watch?v=x7cQ3mrcKaY)

No State synchronization problems
---------------------------------

Bringing in state management on the client side or the browser has created more problems than it solved. Now you have your source of truth in two places and you have to do a lot of synchronization between the state on the client and the server. Instead you can keep your state on the server and the client just serves as a dummy placeholder for rendering state changes.

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--a_n18xV5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mtb8i8898ukk0zfpx05o.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--a_n18xV5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mtb8i8898ukk0zfpx05o.jpg)

This is more like the thin-client or dumb-client model we started in the initial days of web development. The thick-client model is often seen as an anti-pattern in the [Domain-Driven-Design(DDD)](https://en.wikipedia.org/wiki/Domain-driven_design#:~:text=Domain%2Ddriven%20design%20(DDD),should%20match%20the%20business%20domain.) methodology by Eric Evans where he says that SMART UI can be considered an "anti-pattern" in the context of DDD.

"If the architecture isolates the domain-related code in a way that allows a cohesive domain design loosely coupled to the rest of the system, then that architecture can probably support DDD"

And using htmx you can avoid your UI code getting entangled in a web of state management nightmares like two-way data binding, unidirectional data-flow, reactive data an so on.

Progressive enhancement
-----------------------

Putting emphasis on HTML first is a better and solid strategy and this technique is known as progressive enhancement. It works like this. You separate the presentation semantics from the content. The presentation can be implemented in one or more optional layers, activated based on aspects of the browser or the network of the user.

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--CtHbKoXV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a89b5mzmvdmb6ooq0cqv.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--CtHbKoXV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a89b5mzmvdmb6ooq0cqv.jpg)

This allows everyone to access the basic content and functionality of your web applications, whilst people with additional browser features or faster network access receive the enhanced version instead.

htmx supports "boosting" regular HTML anchors and forms with the `hx-boost` attribute. This attribute will convert all anchor tags and forms into AJAX requests that, by default, target the body of the page.  

```
<div hx-boost="true">
    <a href="/blog">Blog</a>
</div> 
```

The anchor tag in this div will issue an `AJAX GET` request to `/blog` and swap the response into the body tag.

This functionality is somewhat similar to [Turbolinks](https://github.com/turbolinks/turbolinks) and allows you to use htmx for progressive enhancement.

References
----------

*   [htmx](https://htmx.org/)
*   [hyperscript](https://hyperscript.org/)
*   [Progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)
