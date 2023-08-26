const mongoose = require('mongoose');
const Seat = require('./seatModel');

const flightSchema = mongoose.Schema(
  {
    origin: {
      type: String,
      required: [true, 'Please enter the origin'],
    },
    destination: {
      type: String,
      required: [true, 'Please enter the destination'],
    },
    airplane: {
      type: mongoose.Schema.ObjectId,
      ref: 'Airplane',
      required: true,
    },
    departureTime: {
      type: Date,
      default: Date.now,
    },
    pnrPrefix: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

flightSchema.virtual('seats', {
  ref: 'Seat',
  foreignField: 'flight',
  localField: '_id',
});

function getPnrClassPrefix(seatClass) {
  if (seatClass === 'First') return 'F';
  if (seatClass === 'Business') return 'B';
  if (seatClass === 'Economy') return 'E';
  return 'U'; // Unknown
}

// Define the generatePNR function
function generatePNR(pnrPrefix, pnrClassPrefix) {
  const uniqueIdentifier = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${pnrPrefix}-${pnrClassPrefix}-${uniqueIdentifier}`;
}

flightSchema.pre('save', async function (next) {
  // Find the associated airplane document
  const airplane = await this.model('Airplane').findById(this.airplane);
  for (const config of airplane.seatConfiguration) {
    for (let row = 1; row <= config.rows; row++) {
      for (let seatNum = 1; seatNum <= config.seatsPerRow; seatNum++) {
        const pnrClassPrefix = getPnrClassPrefix(config.class);
        const pnr = generatePNR(this.pnrPrefix, pnrClassPrefix);

        const seat = new Seat({
          flight: this._id,
          seatNumber: `${row}${String.fromCharCode(64 + seatNum)}`,
          seatClass: config.class,
          pnr,
          farePrice: config.farePrice,
        });
        await seat.save();
      }
    }
  }
  next();
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
