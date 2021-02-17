# CSS

## Working with scss files

To watching the scss files and generate the main.min.css file into `assets/dist/css` run `npm run css`.

Node 8 must be used, by using [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)  
`nvm install 8`  
`nvm use 8`

You may need to install `node-sass` for the version 10 of node with the command:
`npm rebuild node-sass`

## Structure of the CSS folder

### 1-Settings

#### Colors variables

All the colors used throughout the site must set as variable in that file.  
These colors variables are used inside the maps to create the `color` and `background` classes.  
The current variables are only an indication and must be updated with the design values.

#### Variables

The colors variables are ready to be used in that file.

**Variables available**:

- Breakpoints,
- Z-Index named layers,
- default link
- body properties
- easings,
- transition

#### Typography

Some reset for the **font-weight** and some style for the **loading fonts**.

The scss variable for the **font-family** is set in that file.

The variable for the default **font-size** of the body is also set here.
A good practice will be to use the default font-size of the article, to avoid to set it again in the HTML (with the `text-xxx` class).

These variables are used to set the font-family & the font-size values on the body inside `3-elements/_body.scss`

---

### 2-Tools

#### scss-query

This package will be used for @media queries.

#### Mixins

The location for the scss mixins available

- **clearfix** hack, better to use `display: flow-root;` if we don't to support IE11
- **h-container** create a centered wrapper with min & max width.
  These values are set from the `variables` file.
- **z-index**
- **rem** transform a pixel value in rem.
- **modifiers** used to create a list of classes based on a map.
- **spacer** a function to return the grid point value, can be used with a multiplier.  
The goal is to set a vertical and horizontal rhythm.  
If the design use different values for the spacing (sometimes a multiple of 10 and a multiple of 8 too), the grid point value must be set with the designer.  
This value is set in the mixin file.

---

### 3-Elements

Some elements have a reset or a style by defaut. Feel free to comment the components that are not used in the theme.  
For example, if there is no **table** used.

#### Reset

The reset is done in that file.  
The reset has been based on a recent code done by [Andy Bell](https://dev.to/hankchizljaw/a-modern-css-reset-6p3) and Boostrap 5

#### Body

The body properties are based on the code done by [Andy Bell](https://dev.to/hankchizljaw/a-modern-css-reset-6p3) and Boostrap 5.

#### Links

Default style for the link without class, i.e. the one used in a article.  
The variables to style it are in the file.

#### Images

Default/reset style to fluid images.  
Transition for lazy images done by JS.

#### Forms

Default/reset style for form elements: input, select, button, textarea, optgroup.  
A common border is set for all the elements, the value can be changed with the variables declared at the top of the file.  
The focus style is set in that file too, with a box-shadow to respect the border-radius if there is one.  
The button got only a reset and must be style as a component.

#### Typography tags

Some reset/default style for typographic elements. The file contains the variables associated.

#### Tables

Default/reset style to table.  
If there no tables used in the theme, this file can be commented from the index file.

#### Embeds

Default/reset style to embeds elements (embed, iframe,object).

---

### 4-Blocks

WordPress Blocks

---

### 5-Components

Components classes are prefixed with `c-`.  
The CSS for a plugin can be added in that folder. In that case, there is no prefix.

By default, **Gravity form** is added, but commented to not be added to the CSS file.

---

### 6-layout

Layout classes are prefixed with `l-`.

---

### Utilities

Using the utilities classes is a choice.  
The one that you don't use must be commented in the index file, or removed from the file.

#### Background

This file is used to generated the different classes used to set the background color of an element.  
So the element will be like:  
`<section class="bg-primary">…</section>`

#### Color

The `color` classes are generated from that file, with a mixin (imported from the mixins file) and a colors map.  
The map must use the color variables coming from the color file.  
The **colors map** and the **color variables** are set as an example and must be updated with the value coming from the design.

The goal of the `color-xxx` classes is to add the color to each text element inside the HTML and not as a CSS property. Like that, we can avoid duplicating value in the CSS file and keep the colors limited.
The name will be based on the map and the output will be like `color-primary` or `color-grey-100`

#### Text

From the same logic, this file will generate the `text-xxx` classes.  
Based on a map of the font sized used inside the site, multiple classes will be generated.  
So a text element will be like that in the HTML:  
`<h1 class="color-primary text-xx-large">Title</h1>`

#### Flow

An utility to set the space between children elements.  
The goal is to style the context (parent), not the elements (children).
Could be used in any case: card, article, etc…

#### Alignment

Some classes to make some aligments, like center, full-width, text-align.  

- `container` class make a layout with `container` mixin and padding left & right based on local `gutter` variable
- `text-right`, `text-center`, `text-left` classes let you align the text.
- `align-left` class to have a left floating element with a right-margin.
- `align-right` class to have a right floating element with a left-margin.
- `align-center` class let you align a block in the middle.
- `align-full` class to take all the width of the page.

#### Hide

Hide visually and from screen readers.  
Hide visually an element (screenreader).  
Some classes to hide an element based on different breakpoints.  

---
