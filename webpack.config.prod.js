var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: false,
    entry: [
        './app/index'
    ],
    externals: {
        "react": 'React',
        'react-dom': 'ReactDOM',
       /* 'highlight.js':'highlight.js'*/
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/react-markdown.min.js',
        publicPath: '/dist/'
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
        }),
        new ExtractTextPlugin('css/react-markdown.min.css')
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel']
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap!autoprefixer-loader?browsers=last 2 versions')
        }]
    }
};
