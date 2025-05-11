---
title: 'Playing Music in Spacemacs with EMMS'
date: Thu, 02 Jul 2020 00:57:51 +0000
draft: false
tags: ['Articles', 'emacs', 'emms', 'music', 'spacemacs', 'Spacemacs']
---

I have been thinking about playing songs inside Spacemacs for quite a while, so that I don't have to leave my favorite editor for just playing music. After a small exploration I found out that all I need is to enable EMMS inside Spacemacs.

### Spacemacs

Spacemacs is a community-driven [Emacs](https://www.gnu.org/software/emacs/) distribution. It is a new way to experience Emacs with a sophisticated and polished set-up focused on ergonomics, mnemonics and consistency.

### EMMS

[Emms](https://www.gnu.org/software/emms/) is the Emacs Multi-Media System. It tries to be a clean and small application to play multimedia files from Emacs using external players.

### Getting EMMS

#### Clone the spacemacs-emms repo

cd into your **.emacs.d/private** directory. clone the repository into the **emms** folder

```
cd ~/.emacs.d/private/ 

git clone https://github.com/K0HAX/spacemacs-emms emms

```

**Add emms layer**

Add `emms` as a layer to your `dotspacemacs-configuration-layers` to enable emms within Spacemacs.

### mplayer

EMMS is just like the back-end to setup a music system, and we need a front-end, a player to actually play the music. We are going to use [mplayer](http://www.mplayerhq.hu/) as the player for EMMS. Add **/usr/local/bin** (where mplayer is located) to Emacs's exec-path by adding the following line to your ~/.spacemacs file in the **spacemacs/user-config** section.

```
(setq exec-path (append exec-path '("/usr/local/bin")))
```

### Setting up emms

The next thing you have to do is telling Spacemacs where Emms is located. Let’s say you have it in ~/.emacs.d/site-lisp/emms/lisp. So add this line to your .emacs:

```
(add-to-list 'load-path "~/.emacs.d/site-lisp/emms/lisp")

```

You’ll then want to load Emms into Spacemacs. To achieve this you invoke the emms-standard setup function by adding the following lines.

```
(require 'emms-setup)
(require 'emms-player-mplayer)
(emms-standard)
(emms-default-players)
```

Next you want to setup the file extensions you want to play with your player. And you specify mplayer as the emms simple player.

```
(define-emms-simple-player mplayer '(file url)
      (regexp-opt '(".ogg" ".mp3" ".wav" ".mpg" ".mpeg" ".wmv" ".wma"
                    ".mov" ".avi" ".divx" ".ogm" ".asf" ".mkv" "http://" "mms://"
                    ".rm" ".rmvb" ".mp4" ".flac" ".vob" ".m4a" ".flv" ".ogv" ".pls"))
      "mplayer" "-slave" "-quiet" "-really-quiet" "-fullscreen")

```

### Final config (full)

This is the full configuration all you need to set up EMMS in Spacemacs.

```
;; Setup emms
(setq exec-path (append exec-path '("/usr/local/bin")))
(add-to-list 'load-path "~/.emacs.d/site-lisp/emms/lisp")
(require 'emms-setup)
(require 'emms-player-mplayer)
(emms-standard)
(emms-default-players)
(define-emms-simple-player mplayer '(file url)
  (regexp-opt '(".ogg" ".mp3" ".wav" ".mpg" ".mpeg" ".wmv" ".wma"
                ".mov" ".avi" ".divx" ".ogm" ".asf" ".mkv" "http://" "mms://"
                ".rm" ".rmvb" ".mp4" ".flac" ".vob" ".m4a" ".flv" ".ogv" ".pls"))
  "mplayer" "-slave" "-quiet" "-really-quiet" "-fullscreen")

```

That's all, now you need to restart Spacemaces \`Spc-q-R\`

### Bonus content (Some helpful key-bindings)

Adding emms to Spacemacs is not enough, you need some good key bindings to control your playback within Spacemacs. So I found this keybindings [here](https://github.com/Potpourri/spacemacs-emms) and tweaked it a bit to my liking.

```
;; Setup emms key bindings
(global-set-key \[(f7)\] 'emms-smart-browse)
(spacemacs/declare-prefix "am" "music")
(spacemacs/declare-prefix "ame" "EMMS")
(spacemacs/set-leader-keys
  "amed" 'emms-play-directory
  "ameb" 'emms-browser
  "ameo" 'emms-show
  "amn" 'emms-next
  "amp" 'emms-previous
  "a SPC" 'emms-pause
  "a RET" 'emms-smart-browse
  "a e" 'emms
  )

```

#### Playing music on Spacemacs startup

And if you are like me who wants to start playing music as soon as you open your text editor you can add this little function in your **dotspacemacs/user-config**

```
(emms-play-directory "~/Music/Sia")

```

### References:

*   [https://github.com/K0HAX/spacemacs-emms](https://github.com/K0HAX/spacemacs-emms)
*   [https://github.com/Potpourri/spacemacs-emms](https://github.com/Potpourri/spacemacs-emms)
*   [https://stackoverflow.com/questions/9147823/emms-error-dont-know-how-to-play-track](https://stackoverflow.com/questions/9147823/emms-error-dont-know-how-to-play-track)
*   [https://www.emacswiki.org/emacs/EMMS](https://www.emacswiki.org/emacs/EMMS)