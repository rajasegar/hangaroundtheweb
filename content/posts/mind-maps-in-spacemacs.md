---
title: 'Mind maps in Spacemacs'
date: Thu, 11 Jul 2019 18:06:41 +0000
draft: false
tags: ['Articles', 'emacs', 'mindmaps', 'plantuml', 'spacemacs', 'Spacemacs']
---

This post is the second in the series of posts called **PlantUML in Spacemacs**. In this post we are going to see how we can create awesome Mind maps in [Spacemacs](http://spacemacs.org) using [PlantUML](http://plantuml.com). Mind map diagrams is the new feature recently rolled out in PlantUML and they are still in the beta\* stage.

And you will find only minimal documentation in the official site related to mind map diagrams. This post gives you some additional bonus information such as adding colors to your mind map, creating high resolution mind maps and so on. You can find all these details in the Advanced Usage section in the bottom of the post.

If you want to know how to setup PlantUML in Spacemacs, please visit our [previous](http://hangaroundtheweb.com/2019/07/plantuml-in-spacemacs/) post in this series.

### Spacemacs

Spacemacs is a community-driven [Emacs](https://www.gnu.org/software/emacs/) distribution. It is a new way to experience Emacs with a sophisticated and polished set-up focused on ergonomics, mnemonics and consistency.

### Mind maps

A mind map is a diagram used to visually organize information. A mind map is hierarchical and shows relationships among pieces of the whole. It is often created around a single concept, drawn as an image in the center of a blank page, to which associated representations of ideas such as images, words and parts of words are added. Major ideas are connected directly to the central concept, and other ideas branch out from those major ideas.

![1200px-Tennis-mindmap.png](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Tennis-mindmap.png/1200px-Tennis-mindmap.png)

Although the term "mind map" was first popularized by British popular psychology author and television personality [Tony Buzan](https://www.tonybuzan.com/), the use of diagrams that visually "map" information using branching and radial maps traces back centuries.

#### OrgMode syntax

Mind maps in PlantUML support the [org-mode](http://orgmode.org) syntax also, which means you can easily create mind maps if you know understand the standard org-mode conventions for outlining. This will be an added advantage for people who are already familiar with Emacs and org-mode syntax.

```
@startmindmap
\* Debian
\*\* Ubuntu
\*\*\* Linux Mint
\*\*\* Kubuntu
\*\*\* Lubuntu
\*\*\* KDE Neon
\*\* LMDE
\*\* SolydXK
\*\* SteamOS
\*\* Raspbian with a very long name
\*\*\* <s>Raspmbc</s> => OSMC
\*\*\* <s>Raspyfi</s> => Volumio
@endmindmap

```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-orgmode.png)

#### Removing box

You can remove the box drawing using an underscore.

```
@startmindmap
\* root node
\*\* some first level node
\*\*\*\_ second level node
\*\*\*\_ another second level node
\*\*\*\_ foo
\*\*\*\_ bar
\*\*\*\_ foobar
\*\* another first level node
@endmindmap

```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-remove-box.png)

#### Arithmetic notation

You can use the following notation to choose diagram side.

```
@startmindmap
+ OS
++ Ubuntu
+++ Linux Mint
+++ Kubuntu
+++ Lubuntu
+++ KDE Neon
++ LMDE
++ SolydXK
++ SteamOS
++ Raspbian
-- Windows 95
-- Windows 98
-- Windows NT
--- Windows 8
--- Windows 10
@endmindmap

```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-arithmetic-notation.png)

#### Markdown syntax

This syntax is compatible with Markdown.

```
@startmindmap
\* root node
  \* some first level node
    \* second level node
    \* another second level node
  \* another first level node
@endmindmap

```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-markdown.png)

#### Changing diagram direction

It is possible to use both sides of the diagram.

```
@startmindmap
\* count
\*\* 100
\*\*\* 101
\*\*\* 102
\*\* 200

left side

\*\* A
\*\*\* AA
\*\*\* AB
\*\* B
@endmindmap

```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-direction.png)

#### Complete Example

Here is the complete example of a mind map with all the options which can be provided for your mind maps like caption, title, header, footer and legends.

```
@startmindmap
caption figure 1
title My super title

\* <&flag>Debian
\*\* <&globe>Ubuntu
\*\*\* Linux Mint
\*\*\* Kubuntu
\*\*\* Lubuntu
\*\*\* KDE Neon
\*\* <&graph>LMDE
\*\* <&pulse>SolydXK
\*\* <&people>SteamOS
\*\* <&star>Raspbian with a very long name
\*\*\* <s>Raspmbc</s> => OSMC
\*\*\* <s>Raspyfi</s> => Volumio

header
  My super header
endheader

center footer My super footer

legend right
  Short
  legend
  endlegend
  @endmindmap

```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-complete.png)

### Advanced Usage

So far we have only seen the examples provided by the official docs for Mind maps in PlantUML. Now we move into more advanced usage like colors, style and other stuff which will be very helpful for people instead of boring monotonously colored mind maps.

First we will jump into the colors section which is my favorite one, because I want my mind maps to be more colorful because that was the original idea proposed by Tony Buzan in his book called [The Speed Reading Book](https://www.amazon.com/gp/product/1406610216/ref=dbs_a_def_rwt_bibl_vppi_i41).

#### Colors

With PlantUML, you can use specify a color using any one of the below methods:

*   with its standard name
*   using HEX value #AABBCC
*   using short HEX value #ABC

You can visit the [official colors](http://plantuml.com/color) page in PlantUML for the list of color names you can use.

#### Changing background color

You can also change the entire background color of your mind maps other than the default white color using **skinparam**. skinparam is a command to change colors and fonts for the drawing.

You can use this command:

*   In the diagram definition, like any other commands,
*   In an included file,
*   In a configuration file, provided in the command line or the ANT task

```
@startmindmap
skinparam backgroundColor #EEAADD
...
@endmindmap


```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-backgroundcolor.png)

#### Changing color of each node

If you want to change the color of each of the nodes in your mind map tree, you can do so by giving the color option within each node like below. Again you can use any of the three options such as color names, short and long HEX values.

Using color names:

```
@startmindmap
\*\[#Orange\] Debian
\*\*\[#Darkorange\] Ubuntu
\*\*\[#LimeGreen\] Min
@endmindmap

```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-colornodes.png)

Using HEX values:

```
@startmindmap
\*\[#FFA500\] Debian
\*\*\[#FF8C00\] Ubuntu
\*\*\[#32CD32\] Min
@endmindmap

```

Shorthand hex [notation](http://www.websiteoptimization.com/speed/tweak/hex/) abbreviates 6-character RRGGBB CSS colors into 3-character RGB shorthand. So the color value **##FF6600** becomes **#F60** in the shorthand notation.

Using short version HEX values:

```
@startmindmap
\*\[#FAB\] Debian
\*\*\[#ABC\] Ubuntu
\*\*\[#0FA\] Min
@endmindmap

```

#### Creating Monochrome Mind Map

If you are a person who cares about the environment, who don't want to waste the color inks in your printer, you can choose to generate your mind maps in monochrome version like black/white with the **monochrome** skinparam command.

```
@startmindmap
skinparam monochrome true
...
@endmindmap


```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-monochrome.png)

#### Handwritten style

If you want your mind maps to look realistic or you are not comfortable with computer-generated mind maps, or you want a natural feel to your mind maps so that they will look like they are hand drawn, then you need to configure your mind map generation with the **handwritten** skinparam.

By default this property will be false and if you want handwritten style mind maps you can set it to true.

```
@startmindmap
skinparam handwritten true
...
@endmindmap


```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-handwritten.png)

#### Disabling Shadows

You can disable shadows from your mind map items with the option called **shadowing**. Again it is a skinparam command with a Boolean value. To disable shadows you need to explicitly set them to false.

```
@startmindmap
skinparam shadowing false
...
@endmindmap


```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-no-shadows.png)

#### Creating Print resolution Mind Map

By default, the default resolution for the image generated using PlantUML will be 72 which is the default resolution for digital media and the size of your mind maps will be determined by the content it has such as how big the tree is or how many number of nodes or leafs you have in it.

This option called **dpi** will come in handy if you want to take a print out of your mind maps and hang it in your favorite place so that you can take a look at them at your convenience.

DPI or Dots per inch is a measure of spatial printing or video or image scanner dot density, in particular the number of individual dots that can be placed in a line within the span of 1 inch.

For print material, the ideal resolution needed is 300 which you can set it via the dpi skinparam command.

```
@startmindmap
skinparam dpi 300
...
@endmindmap


```

![](http://hangaroundtheweb.com/wp-content/uploads/2019/07/mm-dpi-300.png)

Hope you enjoyed the post and it will help you to create awesome Mind maps from within your favorite editor. Please let me know your feedback or queries in the comments. Stay tuned for more in this series on other cool stuff you can do with PlantUML.

### References

*   [PlantUML Guide](http://plantuml.com/guide)
*   [Mind map on Wikipedia](https://en.wikipedia.org/wiki/Mind_map)
*   [Mind Map Github Issue in PlantUML](https://github.com/plantuml/plantuml/issues/43)
*   [Colors in PlantUML](http://plantuml.com/color)
*   [Mindmap Diagram in PlantUML](http://plantuml.com/mindmap-diagram)