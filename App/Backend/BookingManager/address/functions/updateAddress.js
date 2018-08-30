const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const AddressModel = require('../model');

module.exports = (identifier, update) => {
  return AddressModel.findByIdAndUpdate(identifier, update).exec();
}
