const mongoose = require('mongoose');
const dbConf = require('../../config/StayManager.database.config');

mongoose.connect(dbConf.url);

const ThemeModel = require('../model');

module.exports = (identifier, update) => {
  return ThemeModel.findByIdAndUpdate(identifier, update).exec();
}
