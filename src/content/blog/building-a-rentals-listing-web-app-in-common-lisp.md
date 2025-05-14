---
title: 'Building a Rentals Listing web application in Common Lisp'
pubDate: '2021-07-09'
description: 'Build a simple rentals listing web app in Common Lisp.'
tags: ['common-lisp','lisp']
heroImage: '/blog-placeholder-3.jpg'
---

# Building a Rentals Listing web app in Common Lisp

In this post, we are going to build a simple Rentals listing web application with [Common Lisp](https://lisp-lang.org). The application lists different rentals on the home page with the photo of the property and the location of the property with a map. When you click one of the rentals you get to see the details in a separate page. It also got a couple of pages for About and Contact. You can search the rentals from the home page.

![Super rentals home](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/97ft2eki6ewlejhdmz1i.png)



## Project Scaffolding

   Before creating the project please ensure you have the necessary tools installed. You need a Lisp implementation like [SBCL](https://www.sbcl.org), with [Quicklisp](https://quicklisp.org/beta) installed and an editor like [Emacs](https://www.gnu.org/software/emacs/).

Please refer to my previous article [Lisp for the Web -5](https://dev.to/rajasegar/lisp-for-the-web-5-13ca)
for more detailed instructions on how to setup your development environment for Web development with
Common Lisp.


## Caveman2

   We are going to use [Caveman](https://github.com/fukamachi/caveman) for scaffolding this project. Caveman is a lightweight web application framework created by Eitaro Fukamachi for Common lisp. Caveman is available on Quicklisp, so you can install it with:

```lisp
(ql:quicklisp :caveman2)
```

Then you can create our new project with Caveman like this:

```lisp
(:caveman2:make-project #P"~/quicklisp/local-projects/super-rentals" :author "Rajasegar")
```

## Creating the Layout

Caveman offers a provision to create common layouts for our web pages in a project using a convention called layouts. Layouts are actually a construct which is part of the templating system [Djula](http://mmontone.github.io/djula/doc/build/html/index.html), which is actually used by Caveman. By default when you create a new project with Caveman, you get a default layout located in the folder `templates/layouts/` called `default.html`.

Let's open that file and fill in the details for our layout for the Rentals listing website. Our website need to have a common navbar which is visible across the site to help navigate to different pages like home, about and contact. So basically anything you want to be visible in all the pages of our site, you should put those UI elements in our layout file. And all the pages will extend from this layout and should make use of the placeholders to fill in the contents for the individual pages.

One thing to notice here is that, all the layouts and templates are just plain HTML files with some dynamic placeholders and directives which greatly help to quickly prototype our pages for the web. For someone with a Front-end background like me it feels natural to create templates quickly and efficiently with HTML being our templating language. You can reuse, copy-paste existing HTML snippets in our templates and it is very convenient.

So this is how our layout will look like for the website.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{% block title %}{% endblock %}</title>
    <link rel="stylesheet" type="text/css" media="screen" href="/css/main.css">
</head>
<body>
    <div class="container">
    <nav class="menu">
        <a href="/"> <h1>Super Rentals</h1></a>
        <div class="links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </div>
    </nav>
    <div class="body">
    {% block content %}{% endblock %}
    </div>
    </div>
</body>
</html>
```

Please watch the template placeholders like `{% block title %}` and `{% block content %}`. These are the placeholders in which we override the content for each individual pages. The `title` placeholder is to give a provision to update the page title for individual pages and the `content` placeholder for the respective content for the pages.

These placeholders are known as `tags` in Djula. Tags are used to create text in the output, some control flow by performing loops or logic, and some load external information into the template to be used by later variables.

Now let's build our home page. For that we can make use of the template which is already created by Caveman called `index.html` in the `templates` folder. This template is mapped to our default route `/` or index page in our website. The mappings are created in a separate Lisp file called `web.lisp` inside the `src` folder.

```lisp
(in-package :cl-user)
(defpackage super-rentals.web
    (:use :cl
        :caveman2
        :super-rentals.config
        :super-rentals.view
        :super-rentals.db
        :datafly
        :sxql)
    (:export :*web*))
(in-package :super-rentals.web)

;; for @route annotation
(syntax:use-syntax :annot)

;;
;; Application

(defclass <web> (<app>) ())
(defvar *web* (make-instance '<web>))
(clear-routing-rules *web*)

;;
;; Routing rules

(defroute "/" ()
    (render #P"index.html" ))

;;
;; Error pages

(defmethod on-exception ((app <web>) (code (eql 404)))
    (declare (ignore app))
    (merge-pathnames #P"_errors/404.html"
                    *template-directory*))
```

## Home page

Since Caveman already generated a route mapping for the index route and the templates is also available in the `templates` directory as `index.html`, we just need to add the respective HTML in the template.


### Hero block
First we will take a look at the hero block for our home page. Here as you can see we are extending the default layout and overriding the `title` and `content` blocks as per our liking.

```lisp
{% extends "layouts/default.html" %}
{% block title %}Home - Super Rentals{% endblock %}
{% block content %}
<div id="main">
    <div class="jumbo">
    <div class="right"></div>
    <h2>Welcome to Super Rentals!</h2>
    <p>We hope you find exactly what you're looking for in a place to stay.</p><a class="button" href="/about">About Us</a>
    </div>
    ...
    </div>
```

### Rentals search box

Next our search box for searching the rentals listing below our hero block will look like this. It is just a label and an input field.

```html
<div class="rentals">
    <label>
        <span>Where would you like to stay?</span>
        <input class="light" type="text" name="search" hx-post="/search" hx-trigger="keyup changed delay:500ms" hx-target=".results" hx-indicator=".htmx-indicator">
    </label>
    <div class="htmx-indicator"> Searching rentals...</div>
</div>
```

Notice the code for the input element with custom attributes starting with `hx-`. This is for using a special JS library called [htmx](https://htmx.org) to send AJAX requests from HTML itself without writing any boilerplate JavaScript code. 

So what we are doing here is on the `keyup` event of the input element with a delay of `500ms` we are sending a `POST` HTTP request to the url endpoint `<http://locahost:3000/search>` and put the response of the AJAX request into an element with class name `.results`, which is in our case, an unordered list (ul) element having the list of rentals and we are showing the progress of the request with a special element with a class called `.htmx-indicator`. Hence while the request in progress, the `Search rentals&#x2026;` will be displayed and once the request is complete it is hidden automatically by the htmx library.

We can include the htmx library via script tags in our default layout file, before the end of the body tag.

```html
<script src="https://unpkg.com/htmx.org@1.4.1"></script>
```


### Rentals listing

The below code shows how the rentals listing UI will look like. Basically we are iterating the rentals object and displaying the details like owner, type, location and so on. The same template will be used for our search route which I will show in a little while.

```html
<div class="rentals">
...
    <ul class="results">
    {% for rental in rentals %} 
    <li>
<article class="rental">
    <button class="image" type="button" _="on click toggle .large then if #view-caption.textContent === 'View Larger' then set #view-caption.textContent to 'View Smaller' else set #view-caption.textContent to 'View Larger'">
    <img src="{{rental.image}}" alt="An image of {{rental.title}}">
    <small id="view-caption">View Larger</small>
    </button>
    <div class="details">
    <h3><a href="/rentals/{{rental.id}}">{{rental.title}}</a></h3>
    <div class="detail owner"><span>Owner: </span>{{rental.owner}}</div>
    <div class="detail type"><span>Type: </span>{{rental.category}}</div>
    <div class="detail location"><span>Location: </span>{{rental.city}}</div>
    <div class="detail bedrooms"><span>Bedrooms: </span>{{rental.bedrooms}}</div>
    </div>
    <div class="map">
    <img alt="A map of {{rental.title}}" src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/{{rental.lng}},{{rental.lat}},9/150x150@2x?access_token=pk.eyJ1IjoicmFqYXNlZ2FyYyIsImEiOiJja2w2MzV0M2MyZHJnMzBtczA3ODJsOWZ2In0.pwUodXBD7MxNMF38fs0UsQ" width="150" height="150">
    </div>
</article>
    </li>
    {% endfor %}
    </ul>
</div>
```

One more JavaScript library I am using for this project is called [hyperscript](https://hyperscript.org) which allows to sprinkle interactive behavior via HTML attributes. As you can see from the button tag's `_` attribute, which is actually hyperscript to toggle the image to smaller and larger sizes.

```html
<button class="image" type="button" _="on click toggle .large then if #view-caption.textContent === 'View Larger' then set #view-caption.textContent to 'View Smaller' else set #view-caption.textContent to 'View Larger'">
```

We are telling hyperscript to toggle the text content of the element with id `view-caption` to toggle between `View Larger` and `View Smaller` values.


So how do we send the rentals listing to our home page. That can be done via our route definition in `src/web.lisp`. But before that we need to define the structure of our rentals listing data.


## Rentals - Data structure

For our app, we are going to make use of the simple association lists (alists) for defining our data for the rentals listing. It will be something like below:

```lisp
(defvar *rentals* '(("grand-old-mansion" . (("id" . "grand-old-mansion")
                ("title" . "Grand Old Mansion")
                ("owner" . "John McCarthy")
                ("city" . "San Francisco")
                ("lat" . "37.7749")
                ("lng" . "-122.4194")
                ("category" . "Estate")
                ("bedrooms" . "15")
                ("image" . "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg")
                ("description" . "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.")))
        ("urban-living" . (("id" . "urban-living")
                ("title" . "Urban Living")
                ("owner" . "Paul Graham")
                ("city" . "Seattle")
                ("lat" . "47.6062")
                ("lng" . "-122.3321")
                ("category" . "Condo")
                ("bedrooms" . "1")
                ("image" . "https://upload.wikimedia.org/wikipedia/commons/2/20/Seattle_-_Barnes_and_Bell_Buildings.jpg")
                ("description" . "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.")))
        ("downtown-charm" . (("id" . "downtown-charm")
            ("title" . "Downtown Charm")
                ("owner" . "Guy Steele")
                ("city" . "Portland")
                ("lat" . "45.5175")
                ("lng" . "-122.6801")
                ("category" . "Apartment")
                ("bedrooms" . "3")
                ("image" . "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg")
                ("description" . "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.")))))
```

Then we need to pass the above list `*rentals*` to our index template via the route. We should change our index route definition to something like this.

```lisp
(defroute "/" ()
    (render #P"index.html" (list :rentals (mapcar #'(lambda (r) (cdr r)) *rentals*))))
```

So what we are doing above is that we are just transforming our `*rentals*` list to only have the values sent to the template not the keys. For that we are making use of the `mapcar` function available in Lisp.


## Styling

And if you want to add some styling for your web app, you can do so by adding the CSS styles in the predefined file called `main.css` located in the `static/css` folder at the root of the project folder. The below are some styles for the rental listing web site , you can refer to the full css file at [Github](https://github.com/rajasegar/cl-super-rentals)

```css
.rental h3 a {
    display: inline;
}

.rental .detail {
    flex-basis: 50%;
    font-weight: 300;
    font-style: italic;
    white-space: nowrap;
}

.rental .detail span {
    font-weight: 400;
    font-style: normal;
}
```


## Creating Static pages

Next we are going to add some static pages for our app, like about and contact. I will show you how to create the about page, the process for contact page is pretty much similar other than the content. First we need to create a new route definition for about in `src/web.lisp`.

```lisp
(defroute "/about" ()
    (render #P"about.html"))
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z0orc3jb4xwvgl3cvc4s.png)


Then we need to create a new template file called `about.html` inside the `templates` folder with the following content. Here also we are extending the default layout and overriding the `title` and `content` placeholders.

```html
{% extends "layouts/default.html" %}
{% block title %}About - Super Rentals{% endblock %}
{% block content %}
<div id="main">
    <div class="jumbo">
    <div class="right"></div>
    <h2>About Super Rentals</h2>
    <p>The Super Rentals website is a delightful project created to explore <a href="https://lisp-lang.org">Common Lisp</a> web development. By building a property rental site, we can simultaneously imagine traveling and building Common Lisp web applications.</p><a class="button" href="/contact">Contact Us</a></div>
</div>
{% endblock %}
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a4stkc5x4rcuehkvtd3e.png)



## Rentals page

Next, we are going to build the rental details page. The url for the page will be something like `<http://localhost:3000/rentals/:id>` where id is the uniqued identifier for the rental listing. So for example the url `http://localhost:3000/rentals/urban-living` will point to a specific rental listing known as `Urban Living`.

First we define our route with a key work called `:id` to capture the id and then we will pick the rental based on that id from the `*rentals*` list using the `assoc` function.
Then we pass that rental object's value to the template to render the details.

```lisp
(defroute "/rentals/:id" (&key id)
    (render #P"rentals.html" 
            (list :rental (cdr (assoc id *rentals* :test #'string=)))))
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wrvsfudlzxt99my73t9b.png)


The template for the rentals details page will look like this. We can access the rental object passed via the route using the Djula template variable `{{rental}}` And we can access its properties using the dot notation like `{{rental.title}}`

```html
    {% extends "layouts/default.html" %}
    {% block title %}Rentals - Super Rentals{% endblock %}
    {% block content %}
    <div id="main">
      <div class="jumbo">
        <div class="right tomster"></div>
        <h2>{{rental.title}}</h2>
        <p>Nice find! This looks like a nice place to stay near San Francisco.</p>
        <a class="button share" href="#">Share on Twitter</a></div>
        <article class="rental detailed">
        <button class="image" type="button" _="on click toggle .large then if #view-caption.textContent === 'View Larger' then set #view-caption.textContent to 'View Smaller' else set #view-caption.textContent to 'View Larger'">
          <img src="{{rental.image}}" alt="An image of Grand Old Mansion">
          <small id="view-caption">View Larger</small>
        </button>
        <div class="details">
          <h3>{{rental.title}}</h3>
          <div class="detail owner"><span>Owner: </span>{{rental.owner}}</div>
          <div class="detail type"><span>Type: </span>{{rental.category}}</div>
          <div class="detail location"><span>Location: </span>{{rental.city}}</div>
          <div class="detail bedrooms"><span>Bedrooms: </span>{{rental.bedrooms}}</div>
          <div class="detail description">
            <p>{{rental.description}}</p>
          </div>
        </div>
        <div class="map"><img class="large" alt="A map of Grand Old Mansion" src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/{{rental.lng}},{{rental.lat}},12/894x600@2x?access_token=pk.eyJ1IjoicmFqYXNlZ2FyYyIsImEiOiJja2w2MzV0M2MyZHJnMzBtczA3ODJsOWZ2In0.pwUodXBD7MxNMF38fs0UsQ" width="894" height="600"></div>
      </article>
    </div>
    {% endblock %}
```


## Search

Now we are going to define our search route with the `defroute` function in `src/web.lisp` along with the other route definitions. Here we need to specify the type of the HTTP method our route will handle, since our search routes handles `POST` methods, we need to supply the `:method` keyword with the value `:POST`. 

We also need to extract the post data from the body params. In Caveman, the general convention is to use the `&key _parsed` parameter within the route definition to find our body params that has been sent along with the `POST` request.

So in order to find the value of the `search` parameter this is how we will extract from the `_parsed` key:

```lisp
(cdr (assoc "search" _parsed :test #'string=))
```

So if we typed "urban" in the search box, we would get the same value from the above Lisp expression. Because all the `POST` parameters are parsed in the form of an association list or alist like the below in Caveman, we need to use the `assoc` function to extract the value.

```lisp
(("search" . "urban"))
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fh36hxqn6opxdc7w2ttq.gif)

Next we need to pass this query value to find the list of rentals that match with the title of the rental. For that we are defining a new function called `filter-rentals` and pass the query value as the argument for the same. We also need to send only the values of the `*rentals*` list to the template, not the keys, so that they can be iterated properly and the rental details are displayed properly in the HTML.

```lisp
    (defroute ("/search" :method :POST) (&key _parsed)
      (let ((query (cdr (assoc "search" _parsed :test #'string=))))
        (render #P"search.html"
          (list :rentals
          (mapcar #'(lambda (rental)
                (cdr rental)) (filter-rentals query))))))
```

So in order to send only the values of the keys from the `*rentals*` list, we are making use of the `mapcar` function in Lisp to transform the list.

```lisp
(mapcar #'(lambda (rental) (cdr rental)) *rentals*)
```

The above expression will create a new list picking only the values from the `*rentals*` list.

Now we are going to create the function `filter-rentals` to filter only the rentals that match the title with the query string supplied. So we are iterating the `*rentals*` list here, then extracting the title of each rental and matching the query string using the `search` function in Lisp, and returning nil if the search is found, because we want to keep the rental in the list, because we are manipulating the list using the `remove-if` function. Otherwise we return `T` so that the not-matching rental will be removed from the new list.

This might confuse some people, so let me make it clear. We are creating a new list by removing all the non matching titles from the original list. That's what we are doing in the `filter-rentals` function.

Hope this is clear. If you feel this can be done better in terms of readability and clarity please let me know in the comments for any other approach.

```lisp
(defun filter-rentals (query)
    "Filter the rentals not matching query string"
    (remove-if #'(lambda (rental)
        (let ((title (cdr (assoc "title" (cdr rental) :test #'string=))))
    (if (search query title :test #'char-equal)
        nil
        t))) *rentals* ))
```

Next we are going to create our search template which is the same listing as our home page. We are going to iterate over the rentals and show the details of each rental in a list.
For iterating your lists in Djula templates, we are going to make use of the `{% for %}` tag available in Djula.

```html
{% for rental in rentals %} 
<li>
    <article class="rental">
    <button class="image" type="button" _="on click toggle .large then if #view-caption.textContent === 'View Larger' then set #view-caption.textContent to 'View Smaller' else set #view-caption.textContent to 'View Larger'">
        <img src="{{rental.image}}" alt="An image of {{rental.title}}">
        <small id="view-caption">View Larger</small>
    </button>
    <div class="details">
        <h3><a href="/rentals/{{rental.id}}">{{rental.title}}</a></h3>
        <div class="detail owner"><span>Owner: </span>{{rental.owner}}</div>
        <div class="detail type"><span>Type: </span>{{rental.category}}</div>
        <div class="detail location"><span>Location: </span>{{rental.city}}</div>
        <div class="detail bedrooms"><span>Bedrooms: </span>{{rental.bedrooms}}</div>
    </div>
    <div class="map">
        <img alt="A map of {{rental.title}}" src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/{{rental.lng}},{{rental.lat}},9/150x150@2x?access_token=pk.eyJ1IjoicmFqYXNlZ2FyYyIsImEiOiJja2w2MzV0M2MyZHJnMzBtczA3ODJsOWZ2In0.pwUodXBD7MxNMF38fs0UsQ" width="150" height="150">
    </div>
    </article>
</li>
{% endfor %}
```

That's it, we are done with all the pages and their functionalities with our web app. It's now time to deploy our application to the cloud.


## Deployment

We will be using [Heroku](https://heroku.com) as a platform to deploy our Common Lisp web applications. I have already covered a lot of ground with respect to this in my previous [post](https://dev.to/rajasegar/lisp-for-the-web-5-13ca). So it is just going to be a high level recap of the same. If you are not clear with why and how, you should check my previous [post](https://dev.to/rajasegar/lisp-for-the-web-5-13ca).

First, we have to create a new Heroku app from the command line, once you installed the [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli) in your machine, from the project root folder, invoke the command:

```
heroku apps:create cl-super-rentals --buildpack https://github.com/gos-k/heroku-buildpack-roswell
```

The same app name `cl-super-rentals` won't work for you, because it has already been take for this tutorial, so please use a different name for your app.

Add the relevant files like Procfile, .roswell-use, etc., and the necessary code changes as mentioned in my previous post, then commit and push the changes to heroku master branch.


```
git push heroku master
```

Once you app is deployed successfully, you can view the app in action in the following url: https://cl-super-rentals.herokuapp.com


## Source code

The code for this tutorial is hosted in [Github](https://github.com/rajasegar/cl-super-rentals)




