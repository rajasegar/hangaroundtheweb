---
title: 'Setting up Prettier on Spacemacs'
date: Sat, 30 May 2020 03:59:02 +0000
draft: false
tags: ['Articles', 'emacs', 'prettier', 'spacemacs', 'Spacemacs']
---

### What is Spacemacs?

[Spacemacs](https://spacemacs.org) is a community-driven Emacs distribution. It is a new way to experience Emacs with a sophisticated and polished set-up focused on ergonomics, mnemonics and consistency.

### What is Prettier?

[Prettier](https://prettier.io) is an opinionated code formatter which supports many languages and integrates with most editors. It can be installed through npm. It is recommended to install prettier **globally** in your system so that your editor integrates it properly and can be even made to auto formatted while saving your files.

### How to setup prettier?

Make sure you installed prettier globally on your system before following the below steps.

```
npm install -g prettier

```

If you are using [yarn](https://classic.yarnpkg.com/en/) package manager, you can install it with:

```
yarn global add prettier

```

Get the [develop](https://github.com/syl20bnr/spacemacs/tree/develop) branch of Spacemacs. Usually it will be located in your home directory under **~/.emacs.d**

```
cd ~/.emacs.d
git checkout develop
git pull origin develop

```

Add the prettier layer to `dotspacemacs-configuration-layers`

```
(defun dotspacemacs/layers ()
...
 dotspacemacs-configuration-layers
   '(
     prettier
...

```

Add/update `javascript` layer with prettier as the `javascript-fmt-tool`. We are going to set `prettier` as the value for this. This variable tells which is the formatter to format a JavaScript file. Possible values are ‘web-beautify’ and ‘prettier’.

```
(defun dotspacemacs/layers ()
...
 dotspacemacs-configuration-layers
   '(
     prettier
     (javascript :variables javascript-fmt-tool 'prettier)
...

```

Create a `js2-mode-hook` to run prettier while saving your files. We are using the `js2-mode-hook` here because that is the major mode in which javascript files are opened.

If you want to know what is the list of modes you are currently working in like the major mode and the minor mode names, you can use the `describe-mode` command to know the same. You can either use the shortcuts **C-h m** or **<Space> h d m** to run the `describe-mode` command.

We are going to make use of the `before-save-hook` for the same. It is a normal hook that is run before a buffer is saved to its file.

```
(defun dotspacemacs/user-config ()
...
  (add-hook 'js2-mode-hook
      (lambda ()
        (add-hook 'before-save-hook 'prettier-js nil 'make-it-local)))
...

```

### References:

*   [Setting up Prettier to format on save?](https://www.reddit.com/r/spacemacs/comments/bfeb39/setting_up_prettier_to_format_on_save/)
*   [Prettier](https://prettier.io/)