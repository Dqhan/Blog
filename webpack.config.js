var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: { index: "./app/Index.js" },
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "Index.js",
    },
    watchOptions: {
        aggregateTimeout: 800,
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']

                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                exclude: /node_modules/,
                use:  {
                    loader: 'url-loader',
                    // options: {
                    //     limit: 10240,
                    //     name: "[name].[ext]",
                    //     mimetype: 'image/png',
                    //     outputPath: 'images/'
                    // },
                }
            }
        ]
    },
    plugins: [
    ],
    resolve: {
        extensions: [".js", ".jsx", ".json", ".css"]
    },
    externals: {

    }
}