var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');
module.exports = {
    entry:{
        main:'./src/js/main.js'
    },
    output:{
        path:path.resolve(__dirname,'./dist/js'),
        filename:'[name].bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        title:'My demo',
        filename:'./test.html',
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
    }
};

 