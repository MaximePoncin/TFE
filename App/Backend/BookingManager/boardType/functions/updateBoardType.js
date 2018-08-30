const mongoose = require('mongoose');
const dbConf = require('../../config/BookingManager.database.config');

mongoose.connect(dbConf.url);

const BoardTypeModel = require('../model');

module.exports = (identifier, update) => {
  return BoardTypeModel.findByIdAndUpdate(identifier, update).exec();
}
