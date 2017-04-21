var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './app/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-markdown.min.js'
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
            loaders: ['babel']
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'style-loader!css-loader'
        }]
    }
};