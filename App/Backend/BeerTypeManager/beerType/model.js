const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeerTypeDefinition = require('./modelDefinition');

const BeerTypeSchema = new Schema(BeerTypeDefinition);

module.exports = mongoose.model('BeerType', BeerTypeSchema, 'BeerType');
