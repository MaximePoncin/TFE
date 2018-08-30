const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressDefinition = require('./modelDefinition');

const UserSchema = new Schema(AddressDefinition);

module.exports = mongoose.model('Address', AddressSchema, 'Address');
