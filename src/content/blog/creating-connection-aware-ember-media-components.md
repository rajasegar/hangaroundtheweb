---
title: 'Creating Connection-aware Ember Media Components'
description: ''
pubDate: 'Aug 18 2018'
tags: ['Articles', 'component', 'ember', 'emberjs', 'EmberJS', 'networkinformationapi']
---

Creating Connection-aware Ember Media Components
------------------------------------------------

In this article, we will take a look at creating [Ember](https://emberjs.com) Components serving media content such as images and videos based on the network bandwidth of the users. For this, we will make use of the [Network Information API](https://wicg.github.io/netinfo/) provided by the browsers. Currently, the only browser that supports this api is Chrome, soon we are expecting that all the browsers will start supporting the network information api.

This tutorial is purely based on an existing tutorial by [Max Böck](https://mxb.at/about/), a frontend web developer based in Vienna, Austria. Max has done the components in [React](https://reactjs.org/), this is an Ember port of the same [component](https://mxb.at/blog/connection-aware-components/).

Let's get started. We will create a new Ember application for this by firing the [ember-cli](https://ember-cli.com/) to scaffold a new app.

```
\> ember new connection-aware-ember

```

Next we will create the actual component :

```
\> ember g component connection-aware-media

```

We will start working with the component code now. First we will start with the component template, since we are going to render different types of components based on the connection type, we will be using the **[{{component}}](https://www.emberjs.com/api/ember/release/classes/Ember.Templates.helpers/methods/component?anchor=component)** helper in Ember to render the appropriate component. Hence the template for the component will look something like:

```
{{component componentType 
    alt=alt 
    ogg=ogg 
    webm=webm 
    imageSrc=imageUrl
}}

 class="caption">Effection Connection Type: **{{connectionType}}**


```

First to make sure the browser supports the **Network Information API**. We are going to have a private function in the component to tell us the same.

```
hasNetworkInfoSupport() {
return navigator.connection && navigator.connection.effectiveType;
  }

```

Using the above helper function, we are going to set the effective connection type in the **component.js** file with the **init()** component life-cycle hook:

```
init() {
    this.\_super(...arguments);
    // check connection type before first render.
    if (this.hasNetworkInfoSupport()) {
      const connectionType = navigator.onLine ? navigator.connection.effectiveType : 'offline';
      console.log(connectionType); // eslint-disable-line
      this.set('connectionType', connectionType);
    }
  }

```

![](/wp-content/uploads/2018/08/ember-video.png)

Next we are going to determine the type of component to be rendered based on the **connectionType** using a computed property called **componentType** which will be used in the component template.

```
componentType: computed('connectionType', function() {
    let \_connectionType = this.get('connectionType');
    switch (\_connectionType) {
      case 'offline':
        return 'place-holder';
      case '4g':
        return 'ember-video';
      case '3g':
      case '2g':
        return 'ember-image';
      default:
        return 'place-holder';
    }
  }),


```

![](/wp-content/uploads/2018/08/ember-image-highRes.png)

As you can see, we need three more components , one for the image, one for video and one placeholder component for other stuff like offline and unknown connection types.

![](/wp-content/uploads/2018/08/ember-image-lowRes.png)

Hence we will generate the three components accordingly:

```
\> ember g component place-holder --pod
> ember g component ember-video --pod
> ember g component ember-image --pod

```

We are making use the [PODS](https://ember-cli.com/user-guide/#using-pods) structure for components here to ensure the templates and component logic are in the same folder. To know more about the [PODS](https://ember-cli.com/user-guide/#pod-structure) structure please refer to the standard Ember Guides.

Now the respective component templates for each and every component will be like the following.

![](/wp-content/uploads/2018/08/place-holder.png)

For the **place-holder** component, the template will be something like:

```


  

{{alt}}

  

(Image currently not available)




```

For the **ember-video** component, the template code contains the following markup:

```
  
```

And, finally the **ember-image** component markup will look like this:

```
![{{alt}}]({{imageSrc}})
```

Now we are determining the image url to be loaded based on the connection type, and again using one more computed property for the same task.

```
imageUrl: computed('connectionType', function() {
    let \_connectionType = this.get('connectionType');
    return (\_connectionType === '3g') ? this.get('highResImage') : this.get('lowResImage');
  }),
```

And for the **ember-video** component, we need to provide the source urls for the video files, and for this we are using two computed properties just reading the parent component properties like this.

```
ogg: computed.reads('oggVideo'),
webm: computed.reads('webmVideo'),

```

Now we are pretty much ready to use the component, so we will be providing the component in our sample application generated above in the first place and in the **application.hbs** file of the app, we will render our component like:

```
{{connection-aware-media
      highResImage=highResImage
      lowResImage=lowResImage
      oggVideo=oggVideo
      webmVideo=webmVideo
      alt="Tomster The Ember Mascot"
    }}

```

The respective urls for the image and videos are hard-coded as controller properties for the application route. For that first we need to generate a controller for our application route using the command

```
\> ember g controller application

```

And then we will provide the urls in the form of four distinct properties for low resolution image, high resolution image, ogg video url and webm video url.

```
import Controller from '@ember/controller';

export default Controller.extend({

    lowResImage: 'https://raw.githubusercontent.com/rajasegar/connection-aware-ember/master/public/assets/img/Tomster-Logo-lowRes.png',
    highResImage: 'https://raw.githubusercontent.com/rajasegar/connection-aware-ember/master/public/assets/img/Tomster-Logo.png',

    oggVideo: 'http://download.blender.org/peach/trailer/trailer\_400p.ogg',
    webmVideo: 'http://dl3.webmfiles.org/big-buck-bunny\_trailer.webm'

});

```

Now our component looks great and render properly the right content effectively based on the user's connection bandwidth. But it will take the connection information only at the initial rendering of the page or component, so if the connection quality improves in the middle of the user session, still we will be getting the same effective content rendered.

To address this, we will be passing one more property to our component called **autoUpdate**based on which the component renders the right media content as soon the connection quality is either improved or degraded in the browser.

```
{{connection-aware-media
      highResImage=highResImage
      lowResImage=lowResImage
      oggVideo=oggVideo
      webmVideo=webmVideo
      alt="Tomster The Ember Mascot"
      autoUpdate=true
    }}

```

To accommodate the **autoUpdate** functionality for our component, we need to bind event handlers for network api **change** events. We will do this in two places, one in **[didInsertElement](https://guides.emberjs.com/release/components/the-component-lifecycle/#toc_integrating-with-third-party-libraries-with-didinsertelement)** for adding the event listener and to clean up the stuff in **[willDestoryElement](https://www.emberjs.com/api/ember/release/classes/Component/events/willDestroyElement?anchor=willDestroyElement)** life-cycle hooks of the component to remove the binded event listeners.

```
didInsertElement() {
    if (this.get('autoUpdate') && this.hasNetworkInfoSupport()) {
      navigator.connection.addEventListener('change', this.setConnectionType.bind(this));
    }

  },

  willDestroyElement() {
    if (this.get('autoUpdate') && this.hasNetworkInfoSupport()) {
      navigator.connection.removeEventListener('change', this.setConnectionType.bind(this));
    }
  },

```

And we will be defining the event handler for the change event of network information api into something like this:

```
setConnectionType() {
    if (this.hasNetworkInfoSupport) {
      const connectionType = this.getConnectionType();
      console.log(connectionType); // eslint-disable-line
      this.set('connectionType', connectionType);
    }
  }
```

And in the helper function **getConnectionType** will be doing this

```
getConnectionType() {
    const connection = navigator.connection;
    // check if we're offline first...
    if (!navigator.onLine) {
      return 'offline';
    }
    // ...or if reduced data is preferred.
    if (connection.saveData) {
      return 'saveData';
    }
    return connection.effectiveType;
  }
```

### Demo & Source Code

*   [Source Code](https://github.com/rajasegar/connection-aware-ember)
*   [Demo](https://rajasegar.github.io/connection-aware-ember)
*   [Ember Addon](https://github.com/rajasegar/ember-connection-aware-media)

### References

*   [Connection-Aware Components](https://mxb.at/blog/connection-aware-components/)
*   [https://wicg.github.io/netinfo/](https://wicg.github.io/netinfo/)
*   [https://www.igvita.com/2014/12/15/capability-reporting-with-service-worker/](https://www.igvita.com/2014/12/15/capability-reporting-with-service-worker/)
*   [http://www.chromestatus.com/feature/6338383617982464](http://www.chromestatus.com/feature/6338383617982464)
*   [Official Example for Chrome](https://googlechrome.github.io/samples/network-information/index.html)
*   [https://www.sitepoint.com/use-network-information-api-improve-responsive-websites/](https://www.sitepoint.com/use-network-information-api-improve-responsive-websites/)
*   [Network Information API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)  
    

### Image credits

*   Photo by Clint Adair on Unsplash
