const mongoose = require('mongoose');
const dbConf = require('../../config/StayManager.database.config');

mongoose.connect(dbConf.url);

const ActivityModel = require('../model');

module.exports = () => {
  return ActivityModel.find({}).exec();
}
