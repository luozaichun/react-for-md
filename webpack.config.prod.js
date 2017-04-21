var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './_src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-markdown.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({//混合代码插件
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, '_src')
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            include: path.join(__dirname, '_src'),
            loader: 'style-loader!css-loader'
        }]
    }
};