const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: {
    index: "./index.js",
    // store: "./store.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "common",
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          // 'postcss-loader'
        ],
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        inject: true,
        template: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
    ),
    new MiniCssExtractPlugin({
      filename: 'common.css',
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".less"],
  },
  node: {
    fs: "empty",
  },
  externals: {},
};
