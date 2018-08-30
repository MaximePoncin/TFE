const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const AddressModel = require('../model');

module.exports = (identifier) => {
  return AddressModel.findById(identifier).exec();
}
