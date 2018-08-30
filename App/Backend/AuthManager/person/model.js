const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonDefinition = require('./modelDefinition');

const PersonSchema = new Schema(PersonDefinition);

module.exports = mongoose.model('Person', PersonSchema, 'Person');
