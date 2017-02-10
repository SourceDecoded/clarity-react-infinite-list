var path = require("path");

var distribution = {
    entry: [
        "./library/main.js"
    ],
    output: {
        filename: 'main.js',
        library: "clarity-react-infinite-list",
        libraryTarget: "umd",
        path: './dist'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};

module.exports = [
    distribution
]