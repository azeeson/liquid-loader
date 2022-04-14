# Liquid Loader

Liquid template engine for Webpack loader.

Liquid Templating language (see http://github.com/shopify/liquid)

## Install

```
npm install --save-dev liquid-loader
```

## Options

| Option   | Example             | Description                                                                                   |
| -------- | ------------------- | --------------------------------------------------------------------------------------------- |
| dataPath | 'data'              | String holding a path to the folder which contains your templates data files (\*.liquid.json) |
| data     | { foo: 'foo value'} | Object with your template data. Useful when you only have one template.                       |

## Usage

### Single template

---

If you have only one liquid template, you can provide your template data to the loader itself using the `data` option.

```js
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.liquid$/,
            use: [{
                loader: "html-loader"
            }, {
                loader: "liquid-loader",
                options: {
                    data: {
                        // Your variables
                    }
                }
            }]
        }]
    }
};
```

**src/index.html**

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>Document</title>
  </head>
  <body>
    {% if dev_evn %} Section for development {% else %} Section for production
    {% endif %}
  </body>
</html>
```

### Multiple templates

---

If you have multiple templates, you can provide the data to your templates from data files. They must be called the same as the templates of which they have data for but with a `.json` extension.

For example, if your template is named `template-1.liquid`, then your data file must be: `template-1.liquid.json` and would look like this:

```json
{
  "foo": "foo value"
}
```

## Examples

### Take a look at the examples folder for mor detailed examples

- https://github.com/azeeson/liquid-loader/tree/master/examples

## Dependencies

- https://github.com/webpack-contrib/html-loader
- https://github.com/sirlantis/liquid-node

## License

Liquid Loader is released under the [MIT license](http://www.opensource.org/licenses/MIT).
