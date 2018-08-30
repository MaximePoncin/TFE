const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      LocalityDefinition = require('./modelDefinition'),
      LocalitySchema = new Schema(LocalitySchema);

module.exports = mongoose.model("LocalitySchema", LocalitySchema, "LocalitySchema")
