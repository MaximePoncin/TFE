const multer = require('multer');

const maxSizeImg = 1000000;

//Function for checking the file type to upload
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

//Setting the storage engine for stays images
const staysImgsStorage = multer.diskStorage({
  destination: '../public/uploads/staysImgs',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init upload for a stay image
multerUploadStayImg = multer({
  storage: staysImgsStorage,
  limits: {fileSize: maxSizeImg},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('stayImage');

exports.uploadStayImg = (req, res, err) => {
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
};

//Setting the storage engine for sale points images
const salePointsImgsStorage = multer.diskStorage({
  destination: './public/uploads/salePointsImgs',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init upload for a sale point image
multerUploadSalePointImg = multer({
  storage: salePointsImgsStorage,
  limits: {fileSize: maxSizeImg},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('salePointImage');

exports.uploadSalePointImg = (req, res, err) => {
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
};

//Setting the storage engine for advertising clients images
const advClientsImgsStorage = multer.diskStorage({
  destination: './public/uploads/advClientsImgs',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init upload for an advertising client image
multerUploadAdvClientImg = multer({
  storage: advClientsImgsStorage,
  limits: {fileSize: maxSizeImg},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('advClientImage');

exports.uploadAdvClientImg = (req, res, err) => {
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
};


exports.deleteImg = (req, res, error) => {
  if(error) {
    res.send(error);
  }

  fs.unlink("public" + req.body.imgLink, (err) => {
    if(err) {
      return res.send(err);
    }

    return res.send(true);
  })
};
