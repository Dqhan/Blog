const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  // mode:"production",
  entry: {
    index: "./app/Index.js"
  },
  output: {
    path: path.resolve(__dirname, "./public/"),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].module.js', //非入口文件命名规则
  },
  watchOptions: {
    aggregateTimeout: 800
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
          "less-loader" // compiles Less to CSS
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: [
          "url-loader",
          {
            loader: "image-webpack-loader",
            // options: {
            //     limit: 1000 * 100    //不加限制图片过大会直接打到build下 导致找不到图片文件
            // }
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
      // filename: "[name].[chunkhash:8].css",
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
    new CopyWebpackPlugin([
      {
        from: __dirname + '/Lib/editor',
        to: __dirname + '/public/editor',
      },
      {
        from: __dirname + '/picSrc',
        to: __dirname + '/public/picSrc',
      },
      {
        from: __dirname + '/musicSrc',
        to: __dirname + '/public/musicSrc',
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./dist_vendor/react.manifest.json')
    // }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"]
  }
};
