---
title: 'Building a Twitter clone app in htmx'
pubDate: '2021-04-11'
description: 'A demo Twitter clone app built using htmx.'
tags: ['Articles', 'html', 'HTML', 'html5', 'htmx']
heroImage: '/blog-placeholder-4.jpg'
---

In this post, we are going to build a Twitter clone demo application using [htmx](https://htmx.org/). Before diving into the tutorial, let me tell you the background story about why I decided to build this app using htmx.

It all started with this blog post on [A List Apart](https://alistapart.com/) by Matt E. Patterson called [The Future of Web Software Is HTML-over-WebSockets](https://alistapart.com/article/the-future-of-web-software-is-html-over-websockets/). In this article Matt talks about the advantages of sending HTML over the wire via AJAX requests or Web Sockets and the performance benefits they offer and he mentions tools and libraries like [Hotwire](https://hotwire.dev/), [StimulusReflex](https://docs.stimulusreflex.com/) and so on.

He also mentions about a [Twitter Clone](https://dev.to/julianrubisch/twitter-clone-with-stimulusreflex-gone-hybrid-native-app-17fm) app to re-inforce the benefits of sending HTML over the wire. That was a start of inspiration for me. But coming from a Javascript background and a Node.js developer, I really didn't get the motivation to build something like it with RAILS.[ ](https://dev.to/hopsoft)[Build a real-time Twitter clone in 10 mins with Rails and StimulusReflexHopsoft ・ Apr 29 '20 ・ 1 min read#webdev #tutorial #rails #javascript](https://dev.to/codefund/build-a-real-time-twitter-clone-10-mins-with-rails-and-stimulusreflex-5h5c)

So I spent the next few days searching for other similar solutions in various frameworks and languages, and that's when I found about htmx. It got my attention completely because of the fact that I am a Front-end developer and you just need less or no JavaScript to build some cool and interactive stuff with your HTML attributes itself.

What is htmx?
-------------

htmx allows you to build modern user interfaces with the simplicity and the power of hypertext. It lets you to access AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes.

It is small ~9KB (minified and gzipped), dependency-free, extendable and IE11 compatible.

Then I thought let's try building something more complex, more interactive and make use of Web sockets using htmx. This is the result of that experiment and I decided to write a blog post about it to share some of my experiences.

Setting up the project
----------------------

Let's get started setting up our project boilerplate. We are going to build an [Express.js](https://expressjs.com/) application for the server.

First create our project folders and files. Open up your terminal and issue the following commands to create the folder structure.  

```
mkdir htmx-twitter
cd htmx-twitter
mkdir views
touch views/index.pug index.js 
```

Let's install the project dependencies. We need express, pug, body-parser npm packages and nodemon for the development so that it is easy for us to watch files and re-start the server automatically.  

```
npm i --save express pug body-parser
npm i --save-dev nodemon 
```

[pug](https://pugjs.org/) is the template engine for our express app and [body-parser](https://dev.to/rajasegar/building-a-twitter-clone-app-in-htmx-42o6) is used to get the form-submitted values in our request body.

Let's add some scripts to our package.json to start and run the development server for our application.  

```
...
scripts: {
  "start": "node index.js",
  "dev": "nodemon"
}
... 
```

The Server
----------

Let's start building our server-side code in the `index.js` file which we created earlier. The following code listing shows a bare minimum express app to get started.  

```
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','pug');

app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT);
console.log('root app listening on port: 3000'); 
```

Let's take a look at our main view file, which is called `index.pug` under the `/views` folder.

index.pug
---------

```
doctype html
html(lang="en")
  head
    title Twitter clone in htmx
    link(href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css", rel="stylesheet", integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl", crossorigin="anonymous")

  body
    header.d-flex.flex-column.flex-md-row.align-items-center.p-3.px-md-4.mb-3.bg-body.border-bottom.shadow-sm
      p.h5.my-0.me-md-auto.fw-normal HTMX - Twitter
      nav.my-2.my-md-0.me-md-3
        a.p-2.text-dark(href='#') #{name}
    .container
      .row.justify-content-center
        .col-10
          p.text-center A Twitter clone in <a href="https://htmx.org">htmx</a> and Node
          div(hx-ws="connect:/tweet")
            form(hx-ws="send:submit")
              input.form-control(type="hidden", name="username", value=name, readonly)
              .mb-3.row
                textarea.form-control(rows="3", name="message", required="true")
              .d-grid.gap-2.col-3.mx-auto.mb-3
                  button.btn.btn-primary.text-center(type="submit") Tweet
          #timeline
    script(src="https://unpkg.com/htmx.org@1.3.1")
    script(src="https://unpkg.com/hyperscript.org@0.0.5") 
```

Web sockets
-----------

Now we create a new route with websockets called `/tweet` to which the sockets from the browser send the message to the server. The server then processes this socket message and create a tweet from it based on the message and username properties.

htmx has [experimental support](https://htmx.org/attributes/hx-ws) for declarative use of both WebSockets and Server Sent Events. In our case we are connecting the `/tweet` channel from our HTML by using the `hx-ws` attribute.  

```
<div hx-ws="connect:/tweet">
  <form hx-ws="send:submit">
...
  </form>
</div> 
```

The source declaration established the connection, and the send declaration tells the form to submit values to the socket on submit.

For our express backend, we can make use of the npm package [express-ws](https://github.com/HenningM/express-ws) to listen to WebSocket endpoints for Express applications. It lets you define WebSocket endpoints like any other type of route, and applies regular Express middleware.

Install the package and use it in our index.js file like below:  

```
npm install --save express-ws 
```

And use it in our index.js file like this:  

```
const expressWs = require('express-ws')(app); 
```

Then you can define an endpoint with the url `\tweet` using the `app.ws` method available on our express app object.  

```
app.ws('/tweet', function(ws, req) {
  ws.on('message', function(msg) {
    const { message, username } = JSON.parse(msg);

    const _tweet = {
        id: v4(),
        message,
        username,
        retweets: 0,
        likes: 0,
      time: new Date().toString(),
      avatar : 'https://ui-avatars.com/api/?background=random&rounded=true&name=' + username
    };

    tweets.push(_tweet);

    const posts  = pug.compileFile('views/components/post.pug', { globals: ['global'] });

    // Format time 
     _tweet.time = dayjs().to(dayjs(_tweet.time));
    const markup = posts({ t: _tweet });

    tweetChannel.clients.forEach(function (client) {
      client.send(markup);
    });
  });
}); 
```

Then the resulting tweet markup is constructed in the server from the `posts` template and the generated markup is sent back as a response to all the connected socket clients so that every one gets the updated tweet. This is done using a broadcast channel created something like below:  

```
const tweetChannel  = expressWs.getWss('/tweet'); 
```

Updating likes in real-time
---------------------------

Now whenever we click the Like button in our app, we need to update the like counts for that particular tweet. So we need a template for our Like button.

### likes.pug

```
button.btn.btn-link(id='like-' + id,type="button", hx-post="/like/" + id) Like (#{likes}) 
```

This is just a simple button which will send a POST request to the endpoint `/like/<tweet-id>` to our backend and we will handle that request in our server like below.  

```
app.post('/like/:id', (req, res) => {
const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    tweet.likes += 1;

    const likes  = pug.compileFile('views/components/likes.pug');
    const markup = likes({ id, likes: tweet.likes });
    tweetChannel.clients.forEach(function (client) {
      client.send(markup);
    });

  res.send(markup);
}); 
```

One important thing to notice here is that, we broadcast the updated likes count to all the connected clients in the `tweetChannel` we created earlier so that for every user the likes count is updated in real time using web sockets.

Updating post retweets in real-time
-----------------------------------

Similarly for the retweets we need the same kind of logic we used in our likes count. This is our retweet template for the same.

### retweets.pug

```
button.btn.btn-link(id='retweet-' + id, type="button", hx-post="/retweet/" + id) Retweet (#{retweets}) 
```

And this is the POST request end-point where we update our retweet counts.  

```
app.post('/retweet/:id', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    tweet.retweets += 1;

    const retweets  = pug.compileFile('views/components/retweets.pug');
    const markup = retweets({ id, retweets: tweet.retweets });
    tweetChannel.clients.forEach(function (client) {
      client.send(markup);
    });
  res.send(markup);
}); 
```

This is our post template for the tweet with the like and retweet button templates included. This is the markup we will send once we create a new tweet from the server, and the important thing to look out here is , it will be automatically added to the top of the `#timeline` element in the DOM by htmx, since we are using the [out-of-band](https://htmx.org/docs/#oob_swaps) swap.

If you want to swap content from a response directly into the DOM by using the id attribute you can use the `hx-swap-oob` attribute in the response html.  

```
<div id="message" hx-swap-oob="true">Swap me directly!</div>
  Additional Content 
```

htmx offers a few [different ways](https://htmx.org/docs/#swapping) to swap the HTML returned into the DOM. By default, the content replaces the innerHTML of the target element. You can modify this by using the `hx-swap` attribute.

### post.pug

```
div(hx-swap-oob="afterbegin:#timeline")
  .card.mb-2(id='tweet-' + t.id)
    .card-body
      .d-flex
        img.me-4(src=t.avatar)
        div
          h5.card-title.text-muted
            | #{t.username}
            small : #{t.time}
          .card-text.lead.mb-2
            | #{t.message}
          include retweets
          include likes 
```

And that's it. We have created our Twitter clone demo app using htmx. You can start the server using `npm start` in the terminal and the app is available at `http://localhost:3000` in your local machine. Try open two browser windows simultaneously and start creating tweets from both the windows. Also try clicking the `Retweet` and `Like` buttons to see the counts increasing in real-time in both the browser windows.

[![htmx-twitter-demo](https://res.cloudinary.com/practicaldev/image/fetch/s--EDMkSo2Z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qvrn5i3g8qlh86jz1vup.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--EDMkSo2Z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qvrn5i3g8qlh86jz1vup.gif)

This is our full and final server code for our demo application. The code is hosted in [Github](https://github.com/rajasegar/htmx-twitter-clone) and the live demo can be seen [here](https://htmx-twitter.herokuapp.com/).

### server.js

```js
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const { v4 } = require('uuid');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const Chance = require('chance');

const app = express();
const expressWs = require('express-ws')(app);
const PORT = process.env.PORT || 3000;

const tweetChannel  = expressWs.getWss('/tweet');

const tweets = [];

const chance = new Chance();
let username = '';

dayjs.extend(relativeTime);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','pug');

app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  username = chance.name();
  res.render('index', { name: username });
});


app.ws('/tweet', function(ws, req) {
  ws.on('message', function(msg) {
    const { message, username } = JSON.parse(msg);

    const _tweet = {
        id: v4(),
        message,
        username,
        retweets: 0,
        likes: 0,
      time: new Date().toString(),
      avatar : 'https://ui-avatars.com/api/?background=random&rounded=true&name=' + username
    };

    tweets.push(_tweet);

    const posts  = pug.compileFile('views/components/post.pug', { globals: ['global'] });

    // Format time 
     _tweet.time = dayjs().to(dayjs(_tweet.time));
    const markup = posts({ t: _tweet });

    tweetChannel.clients.forEach(function (client) {
      client.send(markup);
    });
  });
});

app.post('/like/:id', (req, res) => {
const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    tweet.likes += 1;

    const likes  = pug.compileFile('views/components/likes.pug');
    const markup = likes({ id, likes: tweet.likes });
    tweetChannel.clients.forEach(function (client) {
      client.send(markup);
    });

  res.send(markup);
});

app.post('/retweet/:id', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    tweet.retweets += 1;

    const retweets  = pug.compileFile('views/components/retweets.pug');
    const markup = retweets({ id, retweets: tweet.retweets });
    tweetChannel.clients.forEach(function (client) {
      client.send(markup);
    });
  res.send(markup);
});

app.listen(PORT);
console.log('root app listening on port: 3000'); 
```

Please let me know yours thoughts and feedback in the comment section about the tutorial and also let me know for any improvements that can be made in the code. I would be very glad to hear your thoughts on this.

References
----------

*   [htmx](https://htmx.org/)
*   [The Future of Web Software Is HTML-over-WebSockets](https://alistapart.com/article/the-future-of-web-software-is-html-over-websockets/)
*   [StimulusReflex](https://docs.stimulusreflex.com/)
*   [Build a real-time Twitter clone in 10 mins with Rails and StimulusReflex](https://dev.to/codefund/build-a-real-time-twitter-clone-10-mins-with-rails-and-stimulusreflex-5h5c)
