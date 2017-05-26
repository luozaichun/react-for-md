var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-markdown.js',
        publicPath: 'http://localhost:3000/dist'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders:[{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{
            test:/\.css$/,
            exclude: /node_modules/,
            loader: 'style-loader!css-loader'
        }]
    }
};


/*
var webpack = require('webpack');
var path = require('path');

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: ['./app/index', hotMiddlewareScript]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-markdown.js',
        publicPath: 'http://localhost:3000/dist'
    },
    module: {
        loaders:[{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{
            test:/\.css$/,
            exclude: /node_modules/,
            loader: 'style-loader!css-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = devConfig;*/
