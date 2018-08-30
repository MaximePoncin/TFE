'use strict';
const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const SalePointModel = require('../model');

module.exports = (newSalePoint) => {
  return new SalePointModel(newSalePoint).save();
}
