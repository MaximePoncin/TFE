const mongoose = require('mongoose'),
      dbConf = require('../../config/StayManager.database.config');

mongoose.connect(dbConf.url);

const ActivityModel = require('../model');

module.exports = (ids) => {
  let mongooseObjectIdArray = new Array();

  ids.map(id => {
    mongooseObjectIdArray.push(mongoose.Types.ObjectId(id));
  })

  return ActivityModel.find({'_id': {$in: mongooseObjectIdArray}}).exec();
}
