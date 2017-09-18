# liquid-loader

Liquid template engine for Webpack loader.

Liquid Templating language (see http://github.com/shopify/liquid)

## Install

```
npm install --save-dev liquid-loader
```

## Usage

```js
// webpack.config.js 
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.html$/,
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



## Examples

**webpack.config.js**
```js 
const NODE_ENV = process.env.NODE_ENV || 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    module: {
        rules: [{
            test: /\.html$/,
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
            template: __dirname + '/src/index.html'
        })
    ]
};
```

**src/index.html**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>Document</title>
</head>
<body>
{% if dev_evn %}
    Section for development
{% else %}
    Section for production
{% endif %}
</body>
</html>
```