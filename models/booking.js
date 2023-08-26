const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  flight: {
    type: mongoose.Schema.ObjectId,
    ref: 'Flight',
  },
  passenger: {
    type: mongoose.Schema.ObjectId,
    ref: 'Passenger',
  },
  pnr: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
