const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './app.js',
    output: {
        publicPath: '/build/',
        path: path.resolve(__dirname, './build/'),
        filename: 'demo.js'
    },
    watchOptions: {
        aggregateTimeout: 800,
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: './index.html'
    //     })
    // ],
    resolve: {
        extensions: [".js", ".jsx", ".json", ".css"]
    },
    externals: {

    }
}