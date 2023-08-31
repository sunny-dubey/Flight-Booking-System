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
  pnrSeatClass: {
    type: String,
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

// Pre-save function to allocate pnrSeatClass
passengerSchema.pre('save', async function (next) {
  const flight = await this.model('Flight').findById(this.flight);
  if (!flight) {
    return next(new Error('Flight not found'));
  }

  const flightPnrPrefix = flight.pnrPrefix.slice(0, 6);
  const seatClassFirstLetter = this.seatClass.charAt(0).toUpperCase();

  this.pnrSeatClass = flightPnrPrefix + '-' + seatClassFirstLetter;

  next();
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
