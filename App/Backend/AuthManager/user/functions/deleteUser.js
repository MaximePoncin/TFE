const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const UserModel = require('../model');

module.exports = (identifier) => {
  return UserModel.findByIdAndRemove(identifier).exec();
}
