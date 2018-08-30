'use strict';
const mongoose = require('mongoose');
const dbConf = require('../../config/AuthManager.database.config');

mongoose.connect(dbConf.url);

const PersonModel = require('../model');

module.exports = (newPerson) => {
  return new PersonModel(newPerson).save();
}
