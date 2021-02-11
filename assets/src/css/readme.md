# CSS

## Working with scss files

To watching the scss files and generate the main.min.css file into `assets/dist/css` run `npm run css`.

Node 8 must be used, by using [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)
`nvm install 8`
`nvm use 8`

You may need to install `node-sass` for the version 10 of node with the command:
`npm rebuild node-sass`

## Structure of the CSS folder

### Helpers

#### scss-query

This package will be used for @media queries.

#### Colors variables

All the colors used throughout the site must set as variable in that file.
These colors variables are used inside the maps to create the `color` and `background` classes.
The current variables are only an indication and must be updated with the design values.

#### Mixins

The location for the scss mixins

#### Typography

Some reset for the **font-weight** and some style for the **loading fonts**.

The scss variable for the **font-family** is set in that file.

The variable for the default **font-size** of the body is also set here.
A good practice will be to use the default font-size of the article, to avoid to set it again in the HTML (with the `text-xxx` class)

These variables are used to set the font-family & the font-size values on the body inside `base/_global.scss`

The `color` classes are generated from that file, with a mixin (imported from the mixins file) and a colors map.
The map must use the color variables coming from the color file.
The **colors map** and the **color variables** are set as an example and must be updated with the value coming from the design.
The goal of the `color-xxx` classes is to add the color to each text element inside the HTML and not as a CSS property.  Like that, we can avoid duplicating value in the CSS file and keep the colors limited.
The name will be based on the map and the output will be like `color-primary` or `color-grey-100`

From the same logic, this file will generate the `text-xxx` classes.
Based on a map of the font sized used inside the site, multiple classes will be generated.

So a text element will be like that in the HTML:   `<h1 class="color-primary text-xx-large">Title</h1>`

#### Background

This file is used to generated the different classes used to set the background color of an element.
So the element will be like:  `<section class="bg-primary">…</section>`

#### Variables

Breakpoints, Z-Index named layers, easings, transition

---

### Base

#### Global

The reset is done in that file.
The reset has been based on a recent code done by [Andy Bell](https://dev.to/hankchizljaw/a-modern-css-reset-6p3)

#### wp-core

Some default style for Wordpress are also available.

---

### Components

Components classes are prefixed with `c-`

#### logo

---

### Layouts

Layout classes are prefixed with `l-`

#### Header
