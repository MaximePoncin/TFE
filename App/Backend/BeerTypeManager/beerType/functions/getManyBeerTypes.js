const mongoose = require('mongoose'),
      dbConfig = require('../../config/BeerTypeManager.database.config');

mongoose.connect(dbConfig.url);

const BeerTypeModel = require('../model');

module.exports = (ids) => {
  let mongooseObjectIdArray = new Array();

  ids.map(id => {
    mongooseObjectIdArray.push(mongoose.Types.ObjectId(id));
  })

  return BeerTypeModel.find({'_id': {$in: mongooseObjectIdArray}}).exec();
}
