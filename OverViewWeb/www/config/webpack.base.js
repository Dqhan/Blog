const StatsPlugin = require("stats-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../index.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    filename: "[name].js",
    libraryTarget: "umd",
    publicPath: "//localhost:3005/",
    library: "OVERVIEW"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
          // 'postcss-loader'
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
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    }),
    new CleanWebpackPlugin(),
    new StatsPlugin("manifest.json", {
      chunkModules: false,
      chunks: true,
      assets: false,
      modules: false,
      children: false,
      chunksSort: false,
      assetsSort: false,
      exclude: [/node_modules/]
    }),
    new MiniCssExtractPlugin({
      filename: "common.css"
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"]
  }
};
