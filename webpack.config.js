/*
* @Author: chaoshuai
* @Date:   2018-03-16 18:10:19
*/

const path = require("path"),
    cssnext = require("postcss-cssnext"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/pages/index.js"
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "dist")
    },
    module:{
        rules: [
            {
                test: /\.less$/, // less => 兼容处理 => css模块 => 插入页面 => css提取，缓存优化
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader:"style-loader"
                    },
                    use: [{
                        loader:"css-loader"
                    },{
                        loader:"postcss-loader",
                        options: {
                            plugins: [
                                cssnext({ browsers : ["> 1%","last 2 versions"]})
                            ]
                        }
                    },{
                        loader:"less-loader"
                    }]
                })
            },{
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: "/node_modules/",
                include: "/src/"
            }
            ]
    },
    plugins: [
        new ExtractTextPlugin("[name].min.css")
    ],
    devServer: {
        contentBase:path.resolve(__dirname,"dist"),
        host:"127.0.0.1",
        compress:true,
        port:2018
    }
};
