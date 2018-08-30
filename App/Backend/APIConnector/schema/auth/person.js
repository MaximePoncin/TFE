const Joi = require('joi');

module.exports = {
  surname: Joi.string().required().example('Rabit'),
  givenName: Joi.string().required().example('Roger'),
  birthDate: Joi.date().required().example(new Date())
};
