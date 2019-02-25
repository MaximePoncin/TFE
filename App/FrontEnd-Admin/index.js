const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
// const proxy = require('http-proxy-middleware');

const app = express();
const serverConf = require('./config/app.server.config');
// const reverseProxyConf = require('./config/app.reverseProxy.config');
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(express.static('public'));
app.use(require('body-parser').json());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// const reverseProxy = proxy(reverseProxyConf);
//
// app.use('/api', reverseProxy);

app.listen(
  serverConf.port,
  serverConf.host,
  () => {
  console.log('LPC Admin app listening at: ' + serverConf.host + ':' + serverConf.port);
});
