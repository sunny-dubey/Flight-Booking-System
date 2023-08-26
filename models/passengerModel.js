const mongoose = require('mongoose');

const passengerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  // pnr: {
  //   type: String,
  //   required: [true, 'Please enter the flight PNR'],
  // },
  flight: {
    type: mongoose.Schema.ObjectId,
    ref: 'Flight',
    required: true,
  },
  // seat: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Seat',
  //   required: true,
  // },
  seatClass: {
    type: String,
    required: ['true', 'Please mention the seat class'],
    enum: ['First', 'Business', 'Economy'],
  },
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
