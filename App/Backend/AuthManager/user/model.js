const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDefinition = require('./modelDefinition');

const UserSchema = new Schema(UserDefinition);

module.exports = mongoose.model('User', UserSchema, 'User');
