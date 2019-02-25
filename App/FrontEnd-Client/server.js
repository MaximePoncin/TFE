const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxy = require('http-proxy-middleware');

const app = express();
const serverConf = require('./config/app.server.config');
const reverseProxyConf = require('./config/app.reverseProxy.config');
const config = require('./webpack.config.js');
const compiler = webpack(config);
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');
const mailerConfig = require('./config/app.mailer.config');
const transporter = nodemailer.createTransport(mailerConfig);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

var routes = require('./routes/imagesRoutes');
routes(app);


const reverseProxy = proxy(reverseProxyConf);

app.use('/api', reverseProxy);
app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(
  serverConf.port,
  serverConf.host,
  () => {
  console.log('LPC app listening at: ' + serverConf.host + ':' + serverConf.port);
});
