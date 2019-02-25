const webpack = require("webpack"),
      path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin"),
      UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
      DashboardPlugin = require("webpack-dashboard/plugin");

let config = {
  mode: "development",
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {}
      }
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  }
}

module.exports = config;
