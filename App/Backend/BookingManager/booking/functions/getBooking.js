const mongoose = require('mongoose');
const dbConf = require('../../config/BookingManager.database.config');

mongoose.connect(dbConf.url);

const BookingModel = require('../model');

module.exports = (identifier) => {
  return BookingModel.findById(identifier).exec();
}
