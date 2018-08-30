'use strict';
const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const AddressModel = require('../model');

module.exports = (newAddress) => {
  return new AddressModel(newAddress).save();
}
