const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvertisingClientDefinition = require('./modelDefinition');

const AdvertisingClientSchema = new Schema(AdvertisingClientDefinition);

module.exports = mongoose.model('AdvertisingClient', AdvertisingClientSchema, 'AdvertisingClient');
