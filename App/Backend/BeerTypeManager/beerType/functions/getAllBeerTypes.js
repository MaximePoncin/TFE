const mongoose = require('mongoose');
const dbConf = require('../../config/BeerTypeManager.database.config');

mongoose.connect(dbConf.url);

const BeerTypeModel = require('../model');

module.exports = () => {
  return BeerTypeModel.find({}).exec();
}
