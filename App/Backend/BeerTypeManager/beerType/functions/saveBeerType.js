'use strict';
const mongoose = require('mongoose');
const dbConf = require('../../config/BeerTypeManager.database.config');

mongoose.connect(dbConf.url);

const BeerTypeModel = require('../model');

module.exports = (newBeerType) => {
  return new BeerTypeModel(newBeerType).save();
}
