# surplus-brunch

Adds [Surplus compiler](https://github.com/adamhaile/surplus) support to [Brunch](http://brunch.io).

## Installation

Install the plugin via npm with `npm install surplus-brunch`.

Or, do manual install:

* Add `"surplus-brunch": "x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, add
`"surplus-brunch": "brunch/surplus-brunch"`.

## Configuration

```js
modules.exports = {
  // ...
  plugins: {
    surplus: {
    }
  }
};
```