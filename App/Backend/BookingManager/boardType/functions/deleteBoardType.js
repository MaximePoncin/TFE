const mongoose = require('mongoose');
const dbConf = require('../../config/BookingManager.database.config');

mongoose.connect(dbConf.url);

const BoardTypeModel = require('../model');

module.exports = (identifier) => {
  return BoardTypeModel.findByIdAndRemove(identifier).exec();
}
