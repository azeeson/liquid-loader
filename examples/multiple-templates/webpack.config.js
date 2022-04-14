const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");

const templatesPath = "templates";
const templatesExtension = ".liquid";
const dataPath = "data";

const liquidTemplates = fs
  .readdirSync(templatesPath)
  .filter((file) => path.extname(file) === templatesExtension);

const multipleHtmlPlugins = liquidTemplates.map((templateFileName) => {
  return new HtmlWebpackPlugin({
    template: path.join(templatesPath, templateFileName),
    filename: `${templateFileName}.html`,
    minify: false,
    inject: false,
  });
});

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: { clean: true },
  module: {
    rules: [
      {
        test: /\.liquid$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "liquid-loader",
            options: {
              dataPath,
            },
          },
        ],
      },
    ],
  },
  plugins: [...multipleHtmlPlugins],
};
