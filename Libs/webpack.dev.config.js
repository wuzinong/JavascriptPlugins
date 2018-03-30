var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
module.exports = {
    entry:[
        './src/js/main.js'
    ],
    output:{
        path:path.join(__dirname,'/dist/'),
        filename:'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title:'My demo',
            template:'./index.html'
        })],
    module:{
        loaders:[
           {
             test:/\.js$/,
             exclude:/(node_modules)/,
             loaders:['babel-loader']
           },
           {
            test:/\.scss$/,
            exclude:/(node_modules)/,
            loaders:['style-loader','css-loader','sass-loader','postcss-loader']
          }
        ]
    },
    devServer:{
        port:'3001',
        host:'127.0.0.1',
        hot:true,
        inline:true,
        historyApiFallback:true,
    }
};

 