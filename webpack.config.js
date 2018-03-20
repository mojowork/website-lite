/*
* @Author: chaoshuai
* @Date:   2018-03-16 18:10:19
*/

const   webpack = require('webpack'),
        path = require('path'),

        // plugin
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: './src/pages/index.js'
    },
    output: {
        filename: '[name]-[hash:5].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader:'style-loader'
                    },
                    use: [{
                        loader:'css-loader',
                        options: {
                            // minimize: true
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
                    },{
                        loader: 'less-loader'
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
                        useRelativePath: true,
                        publicPath: '',
                        outputPath: 'dist/'
                    }
                },{
                    loader: 'img-loader',
                    options: {
                        pngquant: {
                            quality: 80
                        }
                    }
                }]

            },{
                test: /\.(html|ejs)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }
            }]
    },
    plugins: [
        new ExtractTextPlugin('[name]-[hash:5].css'),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(), // hot
        new webpack.NamedModulesPlugin(), // out path
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/pages/index.html',
            chunks: ['index'],
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    resolve: {
        alias:{
            pages: path.resolve(__dirname, 'src/pages')
        }
    },
    devServer: {
        port: 2018,
        hot: true,
        contentBase: '/dist',
        proxy: {
            '/api': {
                target: 'locahost:3000',
                changeOrigin: true,
                // headers:{},
                logLevel: 'debug',
            }
        }
    }
};
