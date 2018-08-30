const localityModelDef = require('../locality/modelDefinition'),
      activityModelDef = require('../activity/modelDefinition'),
      themeModelDef = require('../theme/modelDefinition');

module.exports = {
  names: [{
    lang: String,
    name: String
  }],
  overnightStay: Number,
  // activity: activityModelDef,
  // theme: themeModelDef,
  activity: [String],
  theme: String,
  startingPrice: Number,
  available: Boolean,
  locality: localityModelDef,
  images: [String]
};
