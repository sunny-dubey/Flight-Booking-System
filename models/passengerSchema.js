const mongoose = require('mongoose');

const passengerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  pnr: String,
  flight: {
    type: mongoose.Schema.ObjectId,
    ref: 'Flight',
    required: true,
  },
  seat: {
    type: mongoose.Schema.ObjectId,
    ref: 'Seat',
    required: true,
  },
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
