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
                        loader:'css-loader',
                        options: {
                            minimize: true
                        }
                    },{
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-sprites')({
                                    spritePath: 'dist/assets/imgs/sprites'
                                }),
                                require('autoprefixer')()
                            ]
                        }
                    }]
                })
            },{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            },{
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                        name: '[name].min.[ext]',
                        publicPath: '',
                        outputPath: '',
                        useRelativePath: true
                    }
                },{
                    loader: 'img-loader',
                    options: {
                        pngquant: {
                            quality: 80
                        }
                    }
                }]

            }]
    },
    plugins: [
        new ExtractTextPlugin('[name]-[hash:5].css')
    ],
    devServer: {
        port:2018
    }
};
