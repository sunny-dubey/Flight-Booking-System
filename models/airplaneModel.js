const mongoose = require('mongoose');
const Seat = require('./seatModel');
const airplaneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the airplane name'],
      unique: true,
    },
    seatConfiguration: [
      {
        class: {
          type: String,
          required: ['true', 'Please mention the seat class'],
          enum: ['First', 'Business', 'Economy'],
        },
        rows: {
          type: Number,
          required: true,
        },
        seatsPerRow: {
          type: Number,
          required: true,
        },
        farePrice: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

airplaneSchema.virtual('seats', {
  ref: 'Seat',
  foreignField: 'flight',
  localField: '_id',
});

// airplaneSchema.pre('save', async function (next) {
//   for (const config of this.seatConfiguration) {
//     for (let row = 1; row <= config.rows; row++) {
//       for (let seatNum = 1; seatNum <= config.seatsPerRow; seatNum++) {
//         const seat = await Seat.create({
//           airplane: this._id, // Reference to the airplane
//           seatNumber: `${row}${String.fromCharCode(64 + seatNum)}`,
//           seatClass: config.class,
//           farePrice: config.farePrice,
//         });
//       }
//     }
//   }
//   next();
// });

const Airplane = mongoose.model('Airplane', airplaneSchema);
module.exports = Airplane;
