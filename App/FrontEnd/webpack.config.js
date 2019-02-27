const path = require ('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// let nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(function(x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = 'commonjs' + mod;
//   });

module.exports = {
  entry: {
    app: './src/index.js'
  },
  // target: 'node',
  // node: {
  //   fs: "empty"
  // },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // externals: nodeModules,
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test:/\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhiteSpace: false
          }
        }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.svg$/,
      //   use: 'svg-loader'
      // }
    ]
  }
};
