---
title: 'CSS Conical Gradients is finally gaining momentum among browser landscape'
date: Fri, 10 Aug 2018 02:39:43 +0000
draft: false
tags: ['Articles', 'conicalgradient', 'css', 'CSS', 'gradients']
---

CSS Conical Gradients is finally gaining momentum among browser landscape
-------------------------------------------------------------------------

The day I started using the [Gradient](https://helpx.adobe.com/in/photoshop/using/gradients.html) tool in [Photoshop](https://helpx.adobe.com/in/photoshop/), I was fascinated by the different types of gradient styles the tool offered, and especially i am a great fan of the angular gradient style which captivated me more than anything else.

Now it gives me great joy to share that the same style is supported in CSS gradients as part of the [official spec](https://www.w3.org/TR/css-images-4/#conic-gradients) and [Chrome 69](https://www.chromestatus.com/features/5706155347148800) is the first browser to ship it into production. While CSS Image Values and Replaced Content Module Level 4 is still in WD phase, the conic-gradient section has been approved for shipping: [w3.org/2018/03/07-css-minutes.html#item12](http://w3.org/2018/03/07-css-minutes.html#item12)

Let's take a detailed look on how this conical gradients, as known by the official standards work and how to make great use of this to accomplish astonishing designs using CSS itself.

> A conic gradient starts by specifying the center of a circle, similar to radial gradients, except that conic gradient color-stops are placed around the circumference of the circle, rather than on a line emerging from the center, causing the color to smoothly transition as you spin around the center, rather than as you progress outward from the center.

A conic gradient is specified by indicating a rotation angle, the center of the gradient, and then specifying a list of color-stops. Unlike linear and radial gradients, whose color-stops are placed by specifying a **length**, the color-stops of a conic gradient are specified with an **angle**. Rays are then drawn emerging from the center and pointing in all directions, with the color of each ray equal to the color of the gradient-line where they intersect it.

These gradients are called "conic" or "conical" because, if the color stops are chosen to be significantly lighter on one side than the other, it produces a pattern that looks like a cone observed from above. They are also known as "angle" gradients in some contexts, since they are produced by varying the rotation angle of a ray.

In various image editing programs like [Adobe Photoshop](https://www.adobe.com/in/products/photoshop.html), [GIMP](http://gimp.org), etc., this type of gradient is known by different names. In Photoshop, this type of gradient is known as **Angular Gradients**:

![](/wp-content/uploads/2018/08/angular-gradient-photoshop.png)

In GIMP, which is an open-source image editor, it is called as Conical (Symmetrical and Asymmetrical) gradients.

![](/wp-content/uploads/2018/08/conical-gradient-gimp.png)

### Visual Illustration

This example visually illustrates how **conic-gradient(at 25% 30%, white, black 60%)** would be drawn. Note that since color stop positions always resolve to angles, the only effect of the center is a 2D translation of the gradient, i.e. it does not affect how the gradient is drawn.

![](/wp-content/uploads/2018/08/conic-diagram.png)

### Syntax

```
conic-gradient() = conic-gradient(
  \[ from <angle> \]? \[ at <position> \]?,
  <angular-color-stop-list>
)

```

The arguments are defined as follows:

**angle**

The entire gradient is rotated by this angle. If omitted, defaults to **0deg**.

**position**

Determines the gradient center of the gradient. The <position> value type is defined in, and is resolved using the center-point as the object area and the gradient box as the positioning area. If this argument is omitted, it defaults to **center**.

### Placing Color Stops

Color stops are placed on a gradient line that curves around the center in a circle, with both the 0% and 100% locations at 0deg. Just like linear gradients, 0deg points to the top of the page, and increasing angles correspond to clockwise movement around the circle.

**Note:** It may be more helpful to think of the gradient line as forming a spiral, where only the segment from 0deg to 360deg is rendered. This avoids any confusion about "overlap" when you have angles outside of the rendered region.

A color-stop can be placed at a location before 0% or after 100%; though these regions are never directly consulted for rendering, color stops placed there can affect the color of color-stops within the rendered region through interpolation or repetition (see repeating gradients). For example, conic-gradient(red -50%, yellow 150%) produces a conic gradient that starts with a reddish-orange color at 0deg (specifically, #f50), and transitions to an orangish-yellow color at 360deg (specifically, #fa0).

The color of the gradient at any point is determined by first finding the unique ray anchored at the center of the gradient that passes through the given point. The point’s color is then the color of the gradient line at the location where this ray intersects it.

### Examples

#### Basic Conic Gradient

#### Basic Conic Gradient - 2

This demonstrates how even though color stops with angles outside \[0deg, 360deg) are not directly painted, they can still affect the color of the painted part of the gradient.

#### Rotated Conic Gradient

Below are two different ways of specifying the same rotated conic gradient, one with a rotation angle and one without:

#### Rotated Conic Gradient with offset

Note that offsetting every color stop by the rotation angle instead would not work and produces an entirely different gradient:

#### Hue & Saturation Wheel

A conic gradient with a radial gradient overlaid on it, to draw a hue & saturation wheel:

#### Simple Pie Chart

A conic gradient used to draw a simple pie chart. The 0deg color stop positions will be fixed up to be equal to the position of the color stop before them. This will produce infinitesimal (invisible) transitions between the color stops with different colors, effectively producing solid color segments.

### Repeating Gradients

In addition to linear-gradient(), radial-gradient(), and conic-gradient(), the official specification defines repeating-linear-gradient(), repeating-radial-gradient(), and repeating-conic-gradient() values. These notations take the same values and are interpreted the same as their respective non-repeating siblings defined previously.

#### Basic repeating conic gradient

#### Starbust-type background

Repeating color stops with abrupt transitions creates a starburst-type background:

### Gradient Color Stops

The colors in gradients are specified using color stops. A **color stop** is a combination of a color and one or two positions. (Depending on the type of gradient, that position can be a length, angle, or percentage.) While every color stop conceptually has at least one position, the position can be omitted in the syntax.

Between two color stops there can be a **color interpolation hint**, which specifies how the colors of the two color stops on either side should be interpolated in the space between them (by default, they interpolate linearly). There can only be at most one color interpolation hint between any two given color stops; using more than that makes the function invalid.

Color stops are organized into a **color stop list**, which is a list of one or more color stops. The first and last color stops in the list must have a color (though their position can be omitted).

Color stops and color hints are placed on a gradient line, which defines the colors at every point of a gradient. The gradient function defines the shape and length of the gradient line, along with its starting point and ending point.

Color stops and color hints must be specified in order. Percentages refer to the length of the gradient line between the starting point and ending point, with 0% being at the starting point and 100% being at the ending point. Lengths are measured from the starting point in the direction of the ending point along the gradient line. Angles are measured with 0deg pointing up, and positive angles corresponding to clockwise rotations from there.

Color stops and color hints are usually placed between the starting point and ending point, but that’s not required; the gradient line extends infinitely in both directions, and a color stop or color hint can be placed at any position on the gradient line.

A color stop with two locations is mostly equivalent to specifying two color stops with the same color, one for each position. Specifying two locations makes it easier to create solid-color "stripes" in a gradient, without having to repeat the color twice.

The position of a color stop can be omitted. This causes the color stop to position itself automatically between the two surrounding stops. If multiple stops in a row lack a position, they space themselves out equally.

The following steps must be applied in order to process the <color-stop-list>. After applying these rules, all color stops and color hints will have a definite position and color (if appropriate) and they will be in ascending order:

1.  If the first color stop does not have a position, set its position to 0%. If the last color stop does not have a position, set its position to 100%.
2.  If a color stop or color hint has a position that is less than the specified position of any color stop or color hint before it in the list, set its position to be equal to the largest specified position of any color stop or color hint before it.
3.  If any color stop still does not have a position, then, for each run of adjacent color stops without positions, set their positions so that they are evenly spaced between the preceding and following color stops with positions.

### Browser Support

This is the current browser support status for Conical Gradients as of today.

![](/wp-content/uploads/2018/08/conical-gradient-caniuse.png)

You can view more community examples in [Codepen](https://codepen.io/search/pens?q=conical%20gradient&page=1&order=popularity&depth=everything&show_forks=false) and also [here](https://leaverou.github.io/conic-gradient/). Please feel free to share your views/thoughts on conical gradients in the comments.

### References:

*   [Specification](https://www.w3.org/TR/css-images-4/#conic-gradients)
*   [Server-side polyfill](https://github.com/jonathantneal/postcss-conic-gradient)
*   [Client-side polyfill](https://leaverou.github.io/conic-gradient/)
*   [Gradients in Photoshop](https://helpx.adobe.com/in/photoshop/using/gradients.html)
*   [Blend Tool in GIMP](https://docs.gimp.org/en/gimp-tool-blend.html)
*   [Conical Gradients Today by Lea Verou](http://lea.verou.me/2015/06/conical-gradients-today/)
*   [https://blog.chromium.org/2018/08/chrome-69-beta-av1-video-decoder-css.html](https://blog.chromium.org/2018/08/chrome-69-beta-av1-video-decoder-css.html)
