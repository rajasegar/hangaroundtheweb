---
title: 'ember-csz: A CSS-in-JS solution for styling in Ember'
date: Thu, 30 Jul 2020 23:49:37 +0000
draft: false
tags: ['Articles', 'EmberJS']
---

In this article we are going to take a look at an [Ember.js](https://emberjs.com) addon called [ember-csz](https://github.com/rajasegar/ember-csz) which provides template helpers for [csz](https://github.com/lukejacksonn/csz), a Runtime CSS-Modules with SASS like pre-processing.

This is based on a [talk](https://www.youtube.com/watch?v=uZrVHGEjLhs) I gave recently at [ESNextConf](https://www.esnextconf.com/). I just wanted to experiment the same with Ember.js and it came out well. I liked it very much the idea of keeping your styles as part of your component.js just like how the React community uses other awesome CSS-in-JS solutions like [Styled Components](https://styled-components.com/) and [Emotion](https://emotion.sh/docs/introduction).

### csz

csz is a super-tiny framework agnostic CSS-in-JS solution created by [Luke Jackson](https://github.com/lukejacksonn). Luke is a front-end developer from London. He also created some other amazing tooks like [perf-link](https://perf.link/) and [servor](https://github.com/lukejacksonn/servor). csz uses [stylis](https://github.com/thysultan/stylis.js) to parse styles from tagged template literals and append them to the head of the document at runtime. Loading in stylesheets dynamically – from .css files – is supported out of the box, so you can write your styles in .css files and import them via url without having to worry about flashes of unstyled content.

And csz supports a lot of other awesome features, please checkout the project's README for more information.

### Installing ember-csz

Just like installing any other Ember.js addon, you would install ember-csz with :

```
ember install ember-csz

```

### Inline Styling

This addon exposes the default helper called `csz` which can be used directly in templates if you want to write your styles inline. But keep in mind that the styles are not applied inline with the style attribute but instead csz generates class names dynamically and append them to the head of the document at runtime and apply this class to the class attribute of your elements.

```
<h1 class={{ csz "text-align:center" }}>Hello World</h1>
```

And the dynamically generated class name will look like this:

```
.csz-wps2kyg7yn {
    text-align: center;
}
```

And the output in your html will be like:

```
<h1 class="csz-wps2kyg7yn">Hello World</h1>
```

### Example of component styling with csz

Let's begin with an example of styling a component with csz. This is the typical use case of using CSS-in-JS solution with Ember components. The first step is to import csz into your component.js file. Since the csz library is already part of the ember-csz addon, you don't have to install it separately. Once you install the ember-csz addon, it will automatically available for you to use in your Javascript files in your Ember apps.

#### hello-world.js

```
import Component from "@glimmer/component";
import csz from "csz";

const styles = csz\`
background: papayawhip;
text-align:center;
padding: 4em;
h1 {
color: palevioletred;
font-size: 2em;
}\`;

export default class HelloWorldComponent extends Component {
  styles = styles;
}
```

#### hello-world.hbs

Now we will take a look at how to use the styles in our component template. It's just as simple as applying or using any other property from your component.js. Just assign `{{this.styles}}` to your class property of the parent element.

```
<div class= {{this.styles}}>
  <h1>Hello Ember</h1>
</div>
```

#### Using the component

```
<HelloWorld />
```

![](http://hangaroundtheweb.com/wp-content/uploads/2020/07/ember-csz-simple.png)

The dynamically generated class names from the style tag will be:

```
.csz-pj0yxya1qes {
 background:papayawhip;
 text-align:center;
 padding:4em;
}
.csz-pj0yxya1qes h1 {
 color:palevioletred;
 font-size:2em;
}
```

### Adapting based on props

Next we will see how to adapt the styles of your components based on the properties you pass to them. In this example we change the background and color property of the button based on the `@primary` property of the component.

#### my-button.js

```
import Component from "@glimmer/component";
import csz from "csz";

export default class MyButtonComponent extends Component {
  styles = csz\`
    background: ${this.args.primary ? "palevioletred" : "white"};
        color: ${this.args.primary ? "white" : "palevioletred"};
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid palevioletred;
        border-radius: 3px;
\`;
}
```

#### my-button.hbs

```
<button class={{this.styles}} type="button">{{yield}}</button>
```

#### Using the button component

Next we will see how to use the \`MyButton\` component in our templates. If the \`@primary\` property is passed the button component will have \`palevioletred\` and \`white\` as the background and color attributes respectively. Otherwise it will take the default value of \`white\` and \`palevioletred\` for background and color.

```
<MyButton @primary={{true}}>Primary</MyButton>
<MyButton>Normal</MyButton>
```

![](http://hangaroundtheweb.com/wp-content/uploads/2020/07/ember-csz-adapt-props.png)

### Animation and Keyframe namespacing

Next we will take a look at how to create animations with csz. csz will automatically namespace your animations with the dynamically generated class names.

#### my-animation-component.js

```
import Component from "@glimmer/component";
import csz from "csz";

export default class MyAnimationComponent extends Component {
  styles = csz\`
 display: inline-block;
      animation: rotate 2s linear infinite;
      padding: 2rem 1rem;
      font-size: 1.2rem;
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
\`;
}
```

#### my-animation-component.html

```
<div class={{this.styles}}>
  <img src="tomster.png" alt="Ember Tomster" width="100" />
</div>
```

#### Using the animation component

```
<MyAnimation />
```

The dynamically generated class names with animation and keyframes namespacing will be like:

```
.csz-rzj7b7sdtyi {
 display:inline-block;
 -webkit-animation:rotate-csz-rzj7b7sdtyi 2s linear infinite;
 animation:rotate-csz-rzj7b7sdtyi 2s linear infinite;
 padding:2rem 1rem;
 font-size:1.2rem;
}
@-webkit-keyframes rotate-csz-rzj7b7sdtyi {
 from {
  -webkit-transform:rotate(0deg);
  -ms-transform:rotate(0deg);
  transform:rotate(0deg);
 }
 to {
  -webkit-transform:rotate(360deg);
  -ms-transform:rotate(360deg);
  transform:rotate(360deg);
 }
}
@keyframes rotate-csz-rzj7b7sdtyi {
 from {
  -webkit-transform:rotate(0deg);
  -ms-transform:rotate(0deg);
  transform:rotate(0deg);
 }
 to{
  -webkit-transform:rotate(360deg);
  -ms-transform:rotate(360deg);
  transform:rotate(360deg);
 }
}
```

As you can see from the above code, csz automatically do vendor-prefixing which is actually supported by Stylis.

### Pseudo selectors

You can also use pseudo selectors, child selectors, sibling selectors and so on with csz. It's primarily because of stylis which is the CSS preprocessor used by csz. [Stylis](https://github.com/thysultan/stylis.js) is the CSS preprocessor used by Styled Components and Emotion. It's a light weight CSS preprocessor with SASS like pre-processing. And there is no compilation or build step required to process the css because everything happens at runtime. This is way better than using plain SASS pre-processing with Ember becuase you need to install ember-cli-sass and node-sass in your projects to do the same.

### my-pseudo component.js

```
import Component from "@glimmer/component";
import csz from "csz";

export default class MyPseudoComponent extends Component {
  styles = csz\`
 color: blue;
        &:hover {
          color: red; // <Thing> when hovered
        }
        & ~ & {
          background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
        }
        & + & {
          background: lime; // <Thing> next to <Thing>
        }
        &.something {
          background: orange; // <Thing> tagged with an additional CSS class ".something"
        }
        .something-else & {
          border: 1px solid; // <Thing> inside another element labeled ".something-else"
        }
\`;
}
```

### my-pseudo.hbs

```
<div class={{this.styles}}>
{{yield}}
</div>
```

### Using the MyPseudo Component

```
<MyPseudo>Hello World!</MyPseudo>
<MyPseudo>How ya doing?</MyPseudo>
<MyPseudo class="something">The sun is shining...</MyPseudo>
<div>Pretty nice day today.</div>
<MyPseudo>Don't you think?</MyPseudo>
<div class="something-else">
  <MyPseudo>Splendid.</MyPseudo>
</div>
```

![](http://hangaroundtheweb.com/wp-content/uploads/2020/07/ember-csz-pseudo.png)

### Theming

Next we will see how we can implement themes using csz in Ember. You define your themes as simple objects with color values and then use the same in your template literals to use the values to evaluate based on the props or something. In this example we setting up a default theme with main color as `palevioletred` and if there is a theme property we will take the color from the passed-in theme property, otherwise we will use the default theme color.

#### theme-button.js

```
import Component from "@glimmer/component";
import csz from "csz";

const defaultTheme = {
  main: "palevioletred",
};

export default class ThemeButtonComponent extends Component {
  theme = this.args.theme || defaultTheme;
  styles = csz\`
 font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border-radius: 3px;
        background: white;
        color: ${this.theme.main};
        border: 2px solid ${this.theme.main};
\`;
}
```

#### theme-button.hbs

```
<button class={{this.styles}} type="button">
{{yield}}
</button>
```

#### Using the ThemeButton component

When you pass the \`@theme\` property to the component, it takes the colors from the theme object otherwise it takes the colors from the default theme.

```
<ThemeButton>Normal</ThemeButton>
<ThemeButton @theme={{this.theme}}>Primary</ThemeButton>
```

![](http://hangaroundtheweb.com/wp-content/uploads/2020/07/ember-csz-theme.png)

The class names dynamically generated at runtime in the style tag will be:

```
.csz-czjrz46d7ko {
 font-size:1em;
 margin:1em;
 padding:0.25em 1em;
 border-radius:3px;
 background:white;
 color:palevioletred;
 border:2px solid palevioletred;
}
.csz-id9d43qutq {
 font-size:1em;
 margin:1em;
 padding:0.25em 1em;
 border-radius:3px;
 background:white;
 color:mediumseagreen;
 border:2px solid mediumseagreen;
}
```

And the html markup will look something like:

```
<button class="csz-czjrz46d7ko" type="button">
Normal
</button>
<button class="csz-id9d43qutq" type="button">
Primary
</button>
```

You can also check out all the above code example inside the addons dummy app folder.

### References

*   [ember-csz](https://github.com/rajasegar/ember-csz)
*   [csz](https://github.com/lukejacksonn/csz)
*   [stylis](https://github.com/thysultan/stylis)