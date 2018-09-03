const webpack = require("webpack"),
      path = require("path"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin"),
      UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
      DashboardPlugin = require("webpack-dashboard/plugin");

let config = {
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
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new DashboardPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: "eval-source-map",
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssets()
    ]
  }
}

if(process.env.NODE_ENV === "production") {
  module.exports.plugins.push(
    new OptimizeCSSAssets()
  );
}

module.exports = config;
