const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
  // airplane: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Airplane',
  // },
  flight: {
    type: mongoose.Schema.ObjectId,
    ref: 'Flight',
  },
  seatNumber: {
    type: String,
    required: [true, 'Please enter the seat number'],
  },
  seatClass: {
    type: String,
    required: ['true', 'Please mention the seat class'],
    enum: ['First', 'Business', 'Economy'],
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  farePrice: Number,
  pnr: 'String',
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
