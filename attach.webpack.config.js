const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: "development",
  // mode:"production",
  entry: { index: "./attachApplication/Index.js" },
  output: {
    path: path.resolve(__dirname, "./build/"),
    filename: "Index.js"
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
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',// 与 MiniCssExtractPlugin.loader 冲突
          "css-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",  // creates style nodes from JS strings
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
    /**
     *  剥离CSS文件
     */
    new MiniCssExtractPlugin({
      // filename: "[name].[chunkhash:8].css",
      filename: "bundle.css",
      chunkFilename: "[id].css"
    }),
    /**
     * 缓存策略
     */
    new HardSourceWebpackPlugin({
      cacheDirectory: "node_modules/.cache/hard-source/[confighash]",
      configHash: function(webpackConfig) {
        // node-object-hash on npm can be used to build this.
        return require("node-object-hash")({ sort: false }).hash(webpackConfig);
      },
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ["package-lock.json", "yarn.lock"]
      },
      info: {
        // 'none' or 'test'.
        mode: "none",
        // 'debug', 'log', 'info', 'warn', or 'error'.
        level: "debug"
      },
      cachePrune: {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sizeThreshold: 50 * 1024 * 1024
      }
    }),
    /**
     * 开启 Scope Hoisting
     */
    new webpack.optimize.ModuleConcatenationPlugin(),
    /**
     * 动态删除多余的js css less等等
     */
    // new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
    mainFields: ["jsnext:main", "browser", "main"]
  },
  externals: {
    // react: " window.__lib.React",
    // "react-dom": " window.__lib.ReactDOM"
    react: "React",
    "react-dom": "ReactDOM"
  }
};
