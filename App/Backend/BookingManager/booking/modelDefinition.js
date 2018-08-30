const addressDefinition = require('../address/modelDefinition');

module.exports = {
  arrivalDate: Date,
  departureDate: Date,
  stayStartDate: Date,
  stayEndDate: Date,
  alternativeStayStartDate: Date,
  alternativeStayEndDate: Date,
  nbPersons: {type: Number, min: 1},
  bookingDate: {type: Date, default: Date.now()},
  // paymentDate: Date,
  price: {type: Number, min: 1},
  boardType: String,
  standing: String,
  stayId: String,
  userMail: String
}
