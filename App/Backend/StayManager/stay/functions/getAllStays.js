const mongoose = require('mongoose');
const dbConf = require('../../config/StayManager.database.config');

mongoose.connect(dbConf.url);

const StayModel = require('../model');

module.exports = () => {
  return StayModel.find({}).exec();
}
