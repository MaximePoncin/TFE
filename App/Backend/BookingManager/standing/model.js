const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StandingSchema = new Schema({
  names:[{
    lang: String,
    name: String
  }]
});

module.exports = mongoose.model('Standing', StandingSchema, 'Standing');
