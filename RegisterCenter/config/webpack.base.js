const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  // entry: "./src/index.js",
  entry: {
    register: "./register.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    // filename: "bundle.js",
    filename: "[name].js",
    publicPath: "/"
  },
  devtool: "source-map",
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      chunks: ["register"]
    }),
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".less"]
  },
  node: {
    fs: "empty"
  },
  externals: {},
  devServer: {
    historyApiFallback: true
  }
};
