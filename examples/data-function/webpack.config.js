const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");

const templatesPath = "templates";

/**
 * Get all liquid template files from the templates directory
 */
const liquidTemplates = fs
  .readdirSync(templatesPath)
  .filter((file) => path.extname(file) === ".liquid");

/**
 * Pass the through an html plugin to generate an html file for each one of them
 */
const multipleHtmlPlugins = liquidTemplates.map((templateFileName) => {
  return new HtmlWebpackPlugin({
    template: path.join(templatesPath, templateFileName),
    filename: `${templateFileName}.html`,
    minify: false,
    inject: false,
  });
});

/**
 * This function is in charge of retrieving the data for a given template. It is called once for each *.liquid file.
 * @param {*} resourcePath The pathname of the processed liquid template.
 * @returns The JSON data for that template
 */
const getTemplateData = ({ resourcePath }) => {
  const processedFile = path.basename(resourcePath);
  const tempalateData = require(`./data/${processedFile}.json`);
  return tempalateData;
};

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
              data: getTemplateData,
            },
          },
        ],
      },
    ],
  },
  plugins: [...multipleHtmlPlugins],
};
