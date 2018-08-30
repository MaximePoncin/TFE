  const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ActivityModelDefinition = require('./modelDefinition');

const ActivitySchema = new Schema(ActivityModelDefinition);

module.exports = mongoose.model('Activity', ActivitySchema, 'Activity');
