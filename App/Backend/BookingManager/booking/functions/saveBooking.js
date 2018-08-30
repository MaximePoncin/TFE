'use strict';
const mongoose = require('mongoose');
const dbConf = require('../../config/BookingManager.database.config');

mongoose.connect(dbConf.url);

const BookingModel = require('../model');

module.exports = (newBooking) => {
  return new BookingModel(newBooking).save();
}
