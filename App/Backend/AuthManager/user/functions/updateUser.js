const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const UserModel = require('../model');

module.exports = (identifier, update) => {
  return UserModel.findByIdAndUpdate(identifier, update).exec();
}
