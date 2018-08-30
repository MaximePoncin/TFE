const Joi = require('joi'),
      addressSchema = require('./address');

module.exports = {
  arrivalDate: Joi.date().required(),
  departureDate: Joi.date().required(),
  stayStartDate: Joi.date().required(),
  stayEndDate: Joi.date().required(),
  alternativeStayStartDate: Joi.date().required(),
  alternativeStayEndDate: Joi.date().required(),
  nbPersons: Joi.number().min(1).required(),
  bookingDate: Joi.date().default(new Date()),
  // paymentDate: Joi.date().default(null),
  price: Joi.number().min(1).required(),
  boardType: Joi.string().required(),
  standing: Joi.string().required(),
  stayId: Joi.string().required(),
  userMail: Joi.string().email().required()
};
