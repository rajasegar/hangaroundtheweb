---
title: 'How to use Thesaurus from Spacemacs'
date: Thu, 20 Jun 2019 02:28:03 +0000
draft: false
tags: ['Articles', 'emacs', 'spacemacs', 'Spacemacs', 'thesaurus']
---

In this tutorial, we will see how we can integrate the [Merriam Webster Thesaurus](https://www.merriam-webster.com/) in to [Spacemacs](http://spacemacs.org). Having a thesaurus by your side while writing, is really a productive thing. Since you don't have to lookup every time the alternative word you want to use and that too integrating with your favorite editor is definitely a feather in your cap.

For this we are going to install an awesome package from [Ag Ibragimov](https://github.com/agzam) called [mw-thesaurus.el](https://github.com/agzam/mw-thesaurus.el) It is originally intended for [Emacs](https://www.gnu.org/software/emacs/), since Spacemacs is a community driven Emacs distribution we can utilize the same for Spacemacs also.

Merriam-Webster has been America's leading and most-trusted provider of language information, for more than 150 years, in print and now online. Each month, their Web sites offer guidance to more than 40 million visitors. In print, their publications include Merriam-Webster's Collegiate Dictionary (among the best-selling books in American history) and newly published dictionaries for English-language learners.

In order to use [Merriam Webster API](https://www.dictionaryapi.com/) it is required to register (for free) and obtain an API Key.

### Register free account at Merriam-Webster’s Developer Center

First, you need to [visit](https://dictionaryapi.com) their website and register your application to get an api key. The registration form will look like something below. You can request up to 2 keys.

![](http://hangaroundtheweb.com/wp-content/uploads/2019/06/Dictionaryapi-registration-form.png)

### Obtain a key for Merriam-Webster Thesaurus

For our thesaurus integration we need the **Collegiate Thesaurus** or the **Intermediate Thesaurus** api key.

![](http://hangaroundtheweb.com/wp-content/uploads/2019/06/Dictionaryapi-key-types.png)

Once you register and obtain the keys, you can access them from your **[Your Account](https://www.dictionaryapi.com/account/index)** page under **Your Keys** section.

### Set the variable

The best place in my opinion to set the api key is in **dotspacemacs/user-config**. Open your **.spacemacs** file by using **<Space>fed** and look for the section **dotspacemacs/user-config**and set the api like below.

```
(setq mw-thesaurus--api-key "YOUR-API-KEY")

```

### Spacemacs layer

Spacemacs users can easily add the package to **dotspacemacs-additional-packages** and start using it, or even add it to be part of a custom layer, see an [example](https://github.com/agzam/dot-spacemacs/blob/master/layers/ag-lang-tools/packages.el#L20).

```
dotspacemacs-additional-packages '(mw-thesaurus)

```

### Commands

Once you setup the keys and added the **mw-thesaurus** package to your **.spacemacs** file. You're ready to go. Open any text document and enable the **mw-thesaurus-mode** which you can access by searching using **<Space><Space>** in Spacemacs or **M-x** in Emacs.

You can see the screenshot I have taken while editing this blog post in Org-mode. In the right pane, I have opened the Merriam-Webster Thesaurus buffer.

![](http://hangaroundtheweb.com/wp-content/uploads/2019/06/Dictionaryapi-screenshot.png)

Sometimes, the buffer won't popup when you do a lookup, but you can get the same by searching in the buffers list \[ **<Space>bb** \]. It will be named like **Merriam-Webster Thesaurus**.

Hope you enjoyed the tutorial, please share your feedback and thoughts in the comments.

### References

*   [https://github.com/agzam/mw-thesaurus.el](https://github.com/agzam/mw-thesaurus.el)