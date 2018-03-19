/*
* @Author: chaoshuai
* @Date:   2018-03-16 18:10:19
*/

const   path = require('path'),
        ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: './src/pages/index.js'
    },
    output: {
        filename: '[name]-[hash:5].js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader:'style-loader'
                    },
                    use: [{
                        loader:'css-loader'
                    }]
                })
            },{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            }
            ]
    },
    plugins: [
        new ExtractTextPlugin('[name]-[hash:5].css')
    ],
    devServer: {
        port:2018
    }
};
