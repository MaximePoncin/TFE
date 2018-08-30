const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ThememodelDefinition = require('./modelDefinition');
const ThemeSchema = new Schema(ThememodelDefinition);

module.exports = mongoose.model('Theme', ThemeSchema, 'Theme');
