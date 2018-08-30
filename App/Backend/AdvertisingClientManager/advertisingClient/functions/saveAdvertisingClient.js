'use strict';
const mongoose = require('mongoose');
const dbConf = require('../../config/AdvertisingClient.database.config');

mongoose.connect(dbConf.url);

const AdvertisingClientModel = require('../model');

module.exports = (newAdvertisingClient) => {
  return new AdvertisingClientModel(newAdvertisingClient).save();
}
