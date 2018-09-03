const webpack = require("webpack"),
      path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin"),
      UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
      DashboardPlugin = require("webpack-dashboard/plugin");

let config = {
  mode: "development",
  entry: "./src/index.js",
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
      test: /\.scss$/,
      use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "style.css"
    // }),
    // new DashboardPlugin(),
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
  },
  devtool: "inline-source-map",
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin(),
  //     new OptimizeCSSAssets()
  //   ]
  // }
}

module.exports = config;
