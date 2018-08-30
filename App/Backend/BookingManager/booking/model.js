const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchemaDefinition = require('./modelDefinition');

const BookingSchema = new Schema(BookingSchemaDefinition);

module.exports = mongoose.model('Booking', BookingSchema, 'Booking');
