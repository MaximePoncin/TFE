const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const SalePointModel = require('../model');

module.exports = () => {
  return SalePointModel.find({}).exec();
}
