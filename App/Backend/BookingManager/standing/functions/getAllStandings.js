const mongoose = require('mongoose');
const dbConf = require('../../config/BookingManager.database.config');

mongoose.connect(dbConf.url);

const StandingModel = require('../model');

module.exports = () => {
  return StandingModel.find({}).exec();
}
