var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './_src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-markdown.js'
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
            loader: 'babel',
            include: path.join(__dirname, '_src')
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            include: path.join(__dirname, '_src'),
            loader: 'style-loader!css-loader'
        }]
    }
};