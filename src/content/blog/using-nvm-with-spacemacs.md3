---
title: 'Using nvm with Spacemacs'
date: Sun, 28 Jun 2020 21:01:00 +0000
draft: false
tags: ['Articles', 'emacs', 'node', 'nvm', 'spacemacs', 'Spacemacs']
---

[nvm](https://github.com/nvm-sh/nvm) is a version manager for [Node.js](https://nodejs.org), designed to be installed per-user, and invoked per-shell. nvm works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: Unix, Mac OS, and Windows WSL. But most of the times, it is not properly identified by eshell in [Spacemacs](https://www.spacemacs.org). Recently I found out a package called [nvm.el](https://github.com/rejeep/nvm.el) by [Johan Andersson](https://github.com/rejeep).

Let's walk you through how you can use nvm to choose different Node.js versions within Spacemacs on the fly.

### Installing nvm

To install or update nvm, you should run the install script. To do that, you may either download and run the script manually, or use the following cURL or Wget command:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

``````
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

```

### Add nvm.el to Spacemacs

Since there is not a standard layer that comes with Spacemacs to support nvm, we are going to use the nvm.el package to do the same. First add the nvm package to `dotspacemacs-additional-packages` inside your **.spacemacs** file.

```
dotspacemacs-additional-packages '(nvm)

```

### Set node version with nvm-use

Then once the nvm package is installed you can use the `nvm-use` function to set the appropriate node version inside your `dotspacemacs/user-config` function.

```
(nvm-use "v12.7.0")

```

Please note that you need the absolute node version passed as the parameter value here, otherwise you will get error such as No such version

You can find out the list of installed node versions using nvm:

```
nvm ls

```

### Choosing node versions on the fly

You can also make use of the `nvm-use` function to choose a particular node version. Using **M-x nvm-use** and then typing the node version something like "v12.7.0"

### References

*   [nvm](https://github.com/nvm-sh/nvm)
*   [nvm.el](https://github.com/rejeep/nvm.el)
*   [Using a Node repl in Emacs with nvm and npm](https://williambert.online/2014/02/using-a-node-repl-with-emacs/)