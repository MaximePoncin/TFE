const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxy = require('http-proxy-middleware');

const app = express();
const serverConf = require('./config/app.server.config');
const reverseProxyConf = require('./config/app.reverseProxy.config');
const config = require('./webpack.config.js');
const compiler = webpack(config);
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const nodemailer = require('nodemailer');
const mailerConfig = require('./config/app.mailer.config');
const transporter = nodemailer.createTransport(mailerConfig);

const maxSizeImg = 1000000;


app.use(express.static('public'));
app.use(require('body-parser').json());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

//Setting the storage engine for stays images
const staysImgsStorage = multer.diskStorage({
  destination: './public/uploads/staysImgs',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init upload for a stay image
const uploadStayImg = multer({
  storage: staysImgsStorage,
  limits: {fileSize: maxSizeImg},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('stayImage');

//Setting the storage engine for sale points images
const salePointsImgsStorage = multer.diskStorage({
  destination: './public/uploads/salePointsImgs',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init upload for a sale point image
const uploadSalePointImg = multer({
  storage: salePointsImgsStorage,
  limits: {fileSize: maxSizeImg},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('salePointImage');

//Setting the storage engine for advertising clients images
const advClientsImgsStorage = multer.diskStorage({
  destination: './public/uploads/advClientsImgs',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init upload for an advertising client image
const uploadAdvClientImg = multer({
  storage: advClientsImgsStorage,
  limits: {fileSize: maxSizeImg},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('advClientImage');

//Checking the file type to upload
function checkFileType(file, cb){
  //Allowed imgs extensions to be uploaded on the server
  const fileTypes = /jpeg|jpg|png|gif/;
  //Checking the extensions
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //Check the MIME-type
  const mimeType = fileTypes.test(file.mimetype);

  if(mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: Image only');
  }
}

//Route to upload a stay image on the server
app.post('/upload/stayImg', (req, res) => {
  uploadStayImg(req, res, (err) => {
    if(err){
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send("Error: No file selected");
      } else {
        res.send({
          msg: "img uploaded",
          file: `/uploads/staysImgs/${req.file.filename}`
        });
      }
    }
  })
})

//Route to upload a sale point image on the server
app.post('/upload/salePointImg', (req, res) => {
  uploadSalePointImg(req, res, (err) => {
    if(err){
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send("Error: No file selected");
      } else {
        res.send({
          msg: "img uploaded",
          file: `/uploads/salePointsImgs/${req.file.filename}`
        });
      }
    }
  })
})

//Route to upload an advertising client image on the server
app.post('/upload/advClientImg', (req, res) => {
  uploadAdvClientImg(req, res, (err) => {
    if(err){
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send("Error: No file selected");
      } else {
        res.send({
          msg: "img uploaded",
          file: `/uploads/advClientsImgs/${req.file.filename}`
        });
      }
    }
  })
})

app.post('/deleteImg', (req, res) => {
  fs.unlink("public" + req.body.imgLink, (err) => {
    if(err) {
      return res.send(err);
    }

    return res.send(true);
  })
});

const reverseProxy = proxy(reverseProxyConf);

app.use('/api', reverseProxy);

app.listen(
  serverConf.port,
  serverConf.host,
  () => {
  console.log('LPC app listening at: ' + serverConf.host + ':' + serverConf.port);
});
