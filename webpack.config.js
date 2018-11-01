var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: { index: "./app.js" },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: "Index.js",
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
                }
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
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