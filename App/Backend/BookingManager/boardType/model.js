const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardTypeSchema = new Schema({
  names:[{
    lang: String,
    name: String
  }]
});

module.exports = mongoose.model('BoardType', BoardTypeSchema, 'BoardType');
