 const webpack = require('webpack');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 module.exports = {
   mode: 'development',
   entry: '/src/index.jsx',
   resolve: {
     extensions: ['.js', '.jsx'],
   },
   devServer: {
     static: {
       directory: '/src/index.jsx',
     },
     hot: true,
     historyApiFallback: true,
     port: 8000,
     host: '0.0.0.0',
   },
   devtool: 'eval',
   output: {
     filename: 'bundle.js',
     publicPath: '/',
   },
   module: {
     rules: [
       {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: [{
           loader: 'babel-loader',
           options: { presets: ['@babel/preset-react'] },
         }],
       },
       {
         test: /\.css$/i,
         use: [MiniCssExtractPlugin.loader, 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
     ],
   },
   plugins: [
     new HtmlWebpackPlugin({ template: 'src/public/index.html' }),
     new webpack.DefinePlugin({
       process: { env: {} },
     }),
     new MiniCssExtractPlugin(),

   ],
 };
