const Joi = require('joi'),
      activitySchema = require('../activity/schema'),
      themeSchema = require('../theme/schema'),
      localitySchema = require('../locality/schema');

module.exports = {
  names: Joi.array().items({
    lang: Joi.string(),
    name: Joi.string()
  }).required(),
  overnightStay: Joi.number().integer().positive().required().example(3),
  activity: Joi.array().items(Joi.string().required()),
  theme: Joi.string().required(),
  startingPrice: Joi.number().precision(2).positive().required().example(325.75),
  available: Joi.boolean().required().example(true),
  locality: localitySchema,
  images: Joi.array().items(Joi.string().required())
};
