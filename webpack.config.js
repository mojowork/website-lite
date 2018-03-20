/*
* @Author: chaoshuai
* @Date:   2018-03-16 18:10:19
*/

const   webpack = require('webpack'),
        path = require('path'),
        glob = require('glob-all'),
        // plugin
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        CleanWebpackPlugin = require('clean-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
    entry: {
        index: './src/pages/index.js',
        page1: './src/pages/page1/index.js',
        vendor: ['lodash']
    },
    output: {
        filename: '[name]-[hash:5].js',
        chunkFilename: '[name].chunk.js',
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

        new CleanWebpackPlugin(['dist']), //clean dist dir
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new ExtractTextPlugin('[name]-[hash:5].css'),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, './src/pages/*.html')),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            chunks: ['index','page1']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        }),

        // new webpack.optimize.UglifyJsPlugin(), // js tree shaking
        new webpack.HotModuleReplacementPlugin(), // hot loading
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
