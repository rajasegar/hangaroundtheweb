---
title: 'A guide to create tmux like Custom Layouts in Spacemacs'
pubDate: '2019-06-21'
description: ''
tags:
    - Articles
    - emacs
    - spacemacs
    - Spacemacs
heroImage: '/blog-placeholder-1.jpg'
---

Coming from a [vim](http://vim.org) world with [tmux](https://github.com/tmux/tmux/wiki), I had really missed the multiple split window layout in [Spacemacs](http://spacemacs.org). But after knowing how to define custom layouts this seemed to be an easy exercise for me.

So I thought, I should write a blog post about it to help others setup awesome layouts and workspaces with Spacemacs.

### Some Terminology

Here I want to make some clarifications on the terminology surrounding vim, tmux and Emacs on windows, layouts, panes and buffers.

**vim**  

**tmux**  

**Emacs**  

**Spacemacs**  

Buffers  
Windows  
Tabs  

Panes  
Windows  

Buffers  
Frames  
Windows  

Buffers  
Frames  
Windows  
Layouts  
Workspaces  

#### vim: Buffers

A buffer is the in-memory text of a file which is actually an area of Vim's memory used to hold text read from a file for editing. In addition, an empty buffer with no associated file can be created to allow the entry of text.

#### vim: Windows

A window is a viewport onto a buffer. You can use multiple windows on one buffer, or several windows on different buffers.

Vim provides multiple ways to organize your work, one of them being the ability to open multiple split windows within the same tab page of a given Vim instance. This allows you to have multiple views on the same buffer or file, or even view multiple buffers side-by-side or in any arrangement you prefer.

#### vim: Tabs

A tab page is a collection of windows.

![](/wp-content/uploads/2019/06/Tabs-windows-buffers.png)

#### Emacs: Frames

A frame is a screen object that contains one or more Emacs windows. It is the kind of object called a “window” in the terminology of graphical environments; but we can't call it a “window” here, because Emacs uses that word in a different way.

A frame initially contains a single main window and/or a minibuffer window; you can subdivide the main window vertically or horizontally into smaller windows.

#### Emacs: Windows

A window is an area of the screen that is used to display a buffer.

Windows are grouped into frames. Each frame contains at least one window; the user can subdivide it into multiple, non-overlapping windows to view several buffers at once.

![](/wp-content/uploads/2019/06/Emacs-windows-frames.png)

#### tmux

Each window displayed by tmux may be split into one or more panes; each pane takes up a certain area of the display and is a separate terminal.

#### Spacemacs: Layouts

Layouts are window configurations with buffer isolation, each layout can define several workspaces (think of them as sub-layouts) sharing the same list of buffers as their parent layout.

A layout is a window configuration associated with a list of buffers. The list of buffers can be an arbitrarily chosen set of buffers. Spacemacs provides some facilities to create meaningful sets of buffers, for instance the buffers related to a projectile project.

#### Spacemacs: Workspaces

Workspaces are sub-layouts, they allow to define multiple layouts into a given layout, those layouts share the same buffer as the parent layout.

### Layouts

A number of preset layouts are available in tmux. They are:

*   even-horizontal
*   even-vertical
*   main-horizontal
*   main-vertical
*   tiled

We will see each one in detail and also learn how to create each type of layout in Spacemacs

#### Custom Layouts

Custom layouts in Spacemacs can be defined using the macro **spacemacs|define-custom-layout**, they are accessible via **SPC l o**. You can define these custom layouts inside your**.spacemacs** file under **dotspacemacs/user-config** section.

#### Even Horizontal Layout

Panes are spread out evenly from left to right across the window.

![](/wp-content/uploads/2019/06/spacemacs-even-horizontal.jpg)

```
;; even-horizontal
(spacemacs|define-custom-layout "@EVEN-HORIZONTAL"
  :binding "1"
  :body
  (split-window-below))

```

#### Even Vertical Layout

Panes are spread evenly from top to bottom.

![](/wp-content/uploads/2019/06/spacemacs-even-vertical.jpg)

```
;; even-vertical
(spacemacs|define-custom-layout "@EVEN-VERTICAL"
  :binding "2"
  :body
  (split-window-right))

```

#### Main Horizontal Layout

A large (main) pane is shown at the top of the window and the remaining panes are spread from left to right in the leftover space at the bottom. Use the main-pane-height window option to specify the height of the top pane.

![](/wp-content/uploads/2019/06/spacemacs-main-horizontal.jpg)

```
;; main-horizontal
(spacemacs|define-custom-layout "@MAIN-HORIZONTAL"
  :binding "3"
  :body
  (split-window-below)
  (winum-select-window-2)
  (split-window-right))

```

#### Main Vertical Layout

Similar to main-horizontal but the large pane is placed on the left and the others spread from top to bottom along the right.

![](/wp-content/uploads/2019/06/spacemacs-main-vertical.jpg)

```
;; main-vertical
(spacemacs|define-custom-layout "@MAIN-VERTICAL"
  :binding "4"
  :body
  (split-window-right)
  (winum-select-window-2)
  (split-window-below))

```

#### Tiled layout

Panes are spread out as evenly as possible over the window in both rows and columns.

![](/wp-content/uploads/2019/06/spacemacs-tiled-layout.jpg)

```
;; tiled
(spacemacs|define-custom-layout "@TILED"
  :binding "5"
  :body
  (split-window-right)
  (split-window-below)
  (winum-select-window-2)
  (split-window-below))

```

### Example Custom Layout

So far we have seen how we can create custom layouts like tmux standard presets in Spacemacs. But the above examples are only skeletons, we don't load any files in the windows. Now we will see an actual example of how to create accessible custom layouts by loading the desired files, terminals and other programs inside Spacemacs.

### Custom Layout in Spacemacs

Previously, in vim, I have been using tmuxinator for managing my tmux sessions and custom layouts for my projects. Since I will be working on multiple projects simultaneously, it was really helpful to define a standard and unique layout for each project.

#### Layout definition using tmuxinator

[tmuxinator](https://github.com/tmuxinator/tmuxinator) is a tool to manage complex tmux sessions easily. It has got some layout settings gets handed down to tmux directly, so you can choose from one of the five standard layouts or specify your own.

```
windows:
  - eslint-plugin-ember:
     layout: main-vertical
     root: ~/Documents/www/emberjs/eslint-plugin-ember
     panes:
       - vim README.md
       - nvm use 10.15.0

```

The above same configuration can be easily ported to Spacemacs like below. All you need to do is to get familiar with different macros that are available in Spacemacs like _find-file_, _eshell_, _split-window-right_, etc., Once you know how these macros work, it will be an easy task to setup custom layouts like this.

```
(spacemacs|define-custom-layout "@eslint-ember-plugin"
  :binding "p"
  :body
  (find-file "~/Documents/www/emberjs/eslint-plugin-ember/README.md")
  (neotree-toggle)
  (winum-select-window-1) ;; Go to the left window
  (split-window-right) ;; Create the right side but don't move focus
  (winum-select-window-2) ;; Go to the right window
  (eshell))

```

The resultant layout will look something similar to this:

![](/wp-content/uploads/2019/06/spacemacs-custom-layout.jpg)

### References

*   [Official Guides in Spacemacs about Layouts & workspaces](http://spacemacs.org/doc/DOCUMENTATION.html#layouts-and-workspaces)
*   [How to set up custom layout for Spacemacs](https://emacs.stackexchange.com/questions/41854/how-to-set-up-custom-layout-for-spacemacs)
*   [Emacs Frames](https://www.gnu.org/software/emacs/manual/html_node/elisp/Frames.html#Frames)
*   [tmux: Windows and Panes](https://man.openbsd.org/OpenBSD-current/man1/tmux.1#WINDOWS_AND_PANES)
*   [Vim: Windows](http://vimdoc.sourceforge.net/htmldoc/windows.html#windows)
*   [The Tao of tmux: Window Layouts](https://leanpub.com/the-tao-of-tmux/read#window-layouts)
