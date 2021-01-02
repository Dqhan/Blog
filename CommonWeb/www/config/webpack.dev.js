const baseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    port: 3000
  }
});
