'use strict';

module.exports = function(app) {
  var img = require('../controllers/imagesCtrl');

  app.route('/upload/stayImg')
    .post(img.uploadStayImg);

  app.route('/upload/salePointImg')
    .post(img.uploadSalePointImg);

  app.route('/upload/advClientImg')
    .post(img.uploadAdvClientImg);

  app.route('/deleteImg')
    .post(img.deleteImg);
}
