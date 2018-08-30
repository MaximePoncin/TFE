'use strict';
const mongoose = require('mongoose');
const dbConf = require('../../config/StayManager.database.config');

mongoose.connect(dbConf.url);

const ThemeModel = require('../model');

module.exports = (newTheme) => {
  return new ThemeModel(newTheme).save();
}
