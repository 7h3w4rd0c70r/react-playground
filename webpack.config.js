
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/index.jsx'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'src/assets'),
            helpers: path.resolve(__dirname, 'src/helpers'),
            components: path.resolve(__dirname, 'src/components')
        }
    },
    devServer: {
        port: 8090,
        historyApiFallback: {
            index: 'index.html'
        }
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
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!autoprefixer-loader!less-loader'
                })
            },
            {
                test: /\.(png|svg|jpg)$/,
                loader: 'file-loader?name=./img/[hash].[ext]'
            },
            {
                test: /\.(ttf|woff|woff2|otf|eot)$/,
                loader: 'file-loader?name=./fonts/[hash].[ext]'
            },
            {
                test: /\.pdf$/,
                loader: 'file-loader?name=./pdf/[hash].[ext]'
            }
        ]
    },
    plugins: [new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname),
        verbrose: true
    }),
    new HtmlWebpackPlugin({
        title: 'Theresa Chytilová',
        template: path.resolve(__dirname, 'src/index.html')
    }),
    new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: false
    }),
    new CopyWebpackPlugin([])]
};
