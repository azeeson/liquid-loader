# Liquid Loader

Liquid template engine for Webpack loader.

Liquid Templating language (see http://github.com/shopify/liquid)

## Install

```
npm install --save-dev liquid-loader
```

## Options

| Option   | Example             | Default | Description                                                                                   |
| -------- | ------------------- | ------- | --------------------------------------------------------------------------------------------- |
| dataPath | 'data'              | 'data'  | String holding a path to the folder which contains your templates data files (\*.liquid.json) |
| data     | { foo: 'foo value'} | {}      | Object with your template data. Useful when you only have one template.                       |

## Usage

### Single template

---

If you have only one liquid template, you can provide your template data to the loader itself using the `data` option.

**webpack.config.js**

```js
const NODE_ENV = process.env.NODE_ENV || 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                        dev_evn: NODE_ENV == 'development'
                    }
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.liquid',
            filename: 'index.html'
        })
    ]
};
```

**src/index.liquid**

```liquid
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

If you have multiple templates, you can provide the data to your templates from data files.
Data files must be called the same as the templates of which they have data for but with a `.json` extension and they must be placed inside the data `dataPath` directory provided in the plugin configuration (`/data` by default).

For example, if your template is named `template-1.liquid`, then your data file must be: `./data/template-1.liquid.json` and would look like this:

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
