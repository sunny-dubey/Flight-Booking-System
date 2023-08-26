const Seat = require('../models/seatModel');
const Passenger = require('../models/passengerSchema');

exports.bookSeat = async (req, res) => {
  try {
    const { PassengerId, seatId } = req.body;
  } catch (error) {}
};
