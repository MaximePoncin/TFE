const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const PersonModel = require('../model');

module.exports = (identifier) => {
  return PersonModel.findByIdAndRemove(identifier).exec();
}
