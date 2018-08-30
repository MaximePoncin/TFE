const mongoose = require('mongoose');
const dbConf = require('../../config/AdvertisingClient.database.config');

mongoose.connect(dbConf.url);

const AdvertisingClientModel = require('../model');

module.exports = (identifier, update) => {
  return AdvertisingClientModel.findByIdAndUpdate(identifier, update).exec();
}
