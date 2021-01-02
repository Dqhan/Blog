const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { readFileSync: read } = require('fs');

module.exports = {
  mode: "development",
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: 'bundle.js'
    // filename: '[name].[chunkhash:8].js',
    // chunkFilename: '[name].module.js', //非入口文件命名规则
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "less-loader" // compiles style to CSS
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: [
          "url-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: 'Index.html',
      filename: 'index.html',
      chunks: [
        'index'
      ]
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: __dirname + '/Lib/editor',
    //     to: __dirname + '/dist/editor',
    //   }
    // ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      root_path: path.resolve(__dirname, "../../")
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"]
  }
};
