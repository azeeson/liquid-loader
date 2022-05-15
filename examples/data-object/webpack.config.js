module.exports = {
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
              data: {
                dev_evn: NODE_ENV == "development",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.liquid",
    }),
  ],
};
