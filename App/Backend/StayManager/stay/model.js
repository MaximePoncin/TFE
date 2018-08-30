const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StayDefinition = require('./modelDefinition');

const StaySchema = new Schema(StayDefinition);

module.exports = mongoose.model('Stay', StaySchema, 'Stay');
