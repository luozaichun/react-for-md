var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: false,
    entry: [
        './_src/index'
    ],
    externals: {
        "react": 'React',
        'react-dom': 'ReactDOM',
        /*'highlight.js':'highlight.js'*/
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
    },
    /*webpack-dev-server配置*/
    /*devServer: {
        colors: true,//在cmd终端中输出彩色日志
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        port: 8080,//设置默认监听端口，如果省略，默认为"8080"
        process: true//显示合并代码进度
    }*/
};
