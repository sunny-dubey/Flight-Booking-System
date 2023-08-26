const mongoose = require('mongoose');

const passengerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  pnr: {
    type: String,
  },
  flight: {
    type: mongoose.Schema.ObjectId,
    ref: 'Flight',
    required: true,
  },
  seat: {
    type: mongoose.Schema.ObjectId,
    ref: 'Seat',
  },
  seatClass: {
    type: String,
    required: ['true', 'Please mention the seat class'],
    enum: ['First', 'Business', 'Economy'],
  },
  farePrice: Number,
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
