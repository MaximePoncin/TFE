const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalePointDefinition = require('./modelDefinition');

const SalePointSchema = new Schema(SalePointDefinition);

module.exports = mongoose.model('SalePoint', SalePointSchema, 'SalePoint');
