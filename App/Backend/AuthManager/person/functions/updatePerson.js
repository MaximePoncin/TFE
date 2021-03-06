const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const PersonModel = require('../model');

module.exports = (identifier, update) => {
  return PersonModel.findByIdAndUpdate(identifier, update).exec();
}
