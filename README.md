# Liquid Loader

Liquid template engine for Webpack loader.

Liquid Templating language (see http://github.com/shopify/liquid)

## Install

```
npm install --save-dev liquid-loader
```

## Loader options

| Option | Default | Description                                       |
| ------ | ------- | ------------------------------------------------- |
| data   | {}      | Object of function that returns the template data |

You can opt between two ways to provide your template data.

## Passing data as an object

You can provide your template data to the loader itself using the `data` option.

On your **webpack.config.js**:

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

On your **src/index.liquid**:

```liquid
  ...
  <body>
    {% if dev_evn %} Section for development {% else %} Section for production
    {% endif %}
  </body>
  ...
```

## Passing data as a Function

Another way is to pass a `function` in the `data` option.
This function must return an object containing the data for the template. This way, you you can provide different data to each template.

Function arguments

| Argument | Type   | Properties   | Description                                           |
| -------- | ------ | ------------ | ----------------------------------------------------- |
| resource | object | resourcePath | String containing the current processed template path |

On your **webpack.config.js**:

```js
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
                    data: (resourcePath) => {
                        const myTemplateData = /* Get my template data based on the resourcePath (see examples below) */
                        return myTemplateData;
                    }
                }
            }]
        }]
    },
    ...
};
```

## Examples

### Take a look at the examples folder for more detailed examples

- [Single template (data object)](https://github.com/azeeson/liquid-loader/tree/master/examples/data-object)

- [Multiple templaes (data function)](https://github.com/azeeson/liquid-loader/tree/master/examples/data-function)

## Dependencies

- https://github.com/webpack-contrib/html-loader
- https://github.com/sirlantis/liquid-node

## License

Liquid Loader is released under the [MIT license](http://www.opensource.org/licenses/MIT).
