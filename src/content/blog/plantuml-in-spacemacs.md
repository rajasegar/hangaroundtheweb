---
title: 'PlantUML in Spacemacs'
description: 'How to use PlantUML in Spacemacs for UML diagramming.'
pubDate: 'Jul 10 2019'
tags: ['Articles', 'emacs', 'plantuml', 'spacemacs', 'Spacemacs']
heroImage: '/blog-placeholder-5.jpg'
---

This article is the first in the series of articles about including and using [PlantUML](http://plantuml.com) in [Spacemacs](http://spacemacs.org) to do some amazing things. In this article we will see how to setup PlantUML in Spacemacs and use it. In the upcoming posts we will see some advanced usage of PlantUML and some awesome stuff you can do with it.

### Spacemacs

Spacemacs is a community-driven [Emacs](https://www.gnu.org/software/emacs/) distribution. It is a new way to experience Emacs with a sophisticated and polished set-up focused on ergonomics, mnemonics and consistency.

### PlantUML

PlantUML is an open-source tool allowing users to create UML diagrams from a plain text language. The language of PlantUML is an example of a Domain-specific language. It uses [Graphviz](https://graphviz.org/) software to lay out its diagrams. It has been used to allow people with visual disabilities to work with UML.

It has got hundreds of ways to integrate with your text editors, code editors, command-line, browsers and so on.

### plantuml-mode

[plantuml-mode](https://github.com/skuro/plantuml-mode) is a major mode for editing PlantUML sources in Emacs developed by [Carlo Sciolla](https://github.com/skuro) from Amsterdam. It has got features like syntax highlighting, auto-completion and preview of buffer or region.

#### Installing in Emacs

```
M-x package-install plantuml-mode
```

#### Enable the major mode

You can automatically enable plantuml-mode for files with extension .plantuml by adding the following to your .emacsrc:

```
;; Enable plantuml-mode for PlantUML files
(add-to-list 'auto-mode-alist '("\\\\.plantuml\\\\'" . plantuml-mode))

```

Of course, you can always enable manually the major mode by typing **M-x plantuml-mode** once in the desired PlantUML file buffer.

### Spacemacs plantuml layer

This layer enables support for plantuml-mode in Spacemacs. To use this you have to add the **plantuml** layer to your **dotspacemacs-configuration-layer** in **.spacemacs**. You can open your .spacemacs file by pressing **Spc-fed**, and update it like below:

#### Installation

```
(setq-default dotspacemacs-configuration-layers '(plantuml))

```

Recently, plantuml-mode have rolled out a new update for an experimental feature called Execution modes. Like you can choose any of the two existing mode to render the preview of your PlantUML code. Spacemacs still hasn't updated to this change I guess. So if you are using the layer option to enable PlantUML you need to set the default execution mode to **jar**, so that you can use your local jar file to render the preview rather than using the server.

You can add this below snippet to your **dotspacemacs/user-config**

```
;; Set the default Execution mode to jar
(setq plantuml-default-exec-mode 'jar)

```

Also, to enable preview you need to tell plantuml-mode where to locate the PlantUML JAR file. By default it will look for it in ~/plantuml.jar, but you can specify any location with:

```
(setq plantuml-jar-path (expand-file-name "~/plantuml.jar"))

```

This is all you need to set up PlantUML in Spacemacs.

### Preview

Once you enabled the plantuml layer, you can start using it by creating files with **.pum** extension. Spacemacs will automatically enable the plantuml-mode for you.

To render the PlantUML diagram within Emacs, you can hit **M-x plantuml-preview.**  

Now open a new file/buffer and type the below code and save it with any name with **.pum**extension.

```
@startuml
developer -> Spacemacs:  Draw me a diagram
Spacemacs -> developer: Here you are, sir
developer -> world: Wooooohooooo!
@enduml

```

Now if you render the preview using **Spc-mcc**, you can see the below rendered image. This will run PlantUML and display the result in the **PLANTUML-Preview** buffer.  

You can save the image buffer as a PNG file using **Spc-fs** with a **.png** extension.

![](/wp-content/uploads/2019/07/puml-in-spacemacs.png)

That's it. We will how you can draw more different type of diagrams with PlantUML from your favorite editor itself. Stay Tuned!

Please let me know your feedback/queries in the comments.

### References:

*   [PlantUML](http://plantuml.com)
*   [Spacemacs](http://spacemacs.org)
*   [Spacemacs plantuml layer](https://github.com/syl20bnr/spacemacs/tree/c7a103a772d808101d7635ec10f292ab9202d9ee/layers/+lang/plantuml)
*   [plantuml-mode](https://github.com/skuro/plantuml-mode)
