const Flight = require('../models/flightModel');
const Airplane = require('../models/airplaneModel');
const Seat = require('../models/seatModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createFlight = catchAsync(async (req, res, next) => {
  const { origin, destination, airplaneId } = req.body;
  if (!origin || !destination || !airplaneId) {
    return next(
      new AppError('Please enter origin, destination, airplane', 404)
    );
  }

  const airplane = await Airplane.findById(airplaneId);
  if (!airplane) {
    return next(new AppError('Airplane not found', 404));
  }

  const pnrPrefix =
    origin.slice(0, 3).toUpperCase() + destination.slice(0, 3).toUpperCase();

  const flight = new Flight({
    origin,
    destination,
    airplane: airplaneId,
    pnrPrefix,
  });

  await flight.save();

  res.status(201).json({
    message: 'flight created successfully',
    flight,
  });
});

exports.getFlightByPNR = catchAsync(async (req, res, next) => {
  const { pnr } = req.params;
  if (!pnr) {
    return next(new AppError('Please add PNR as params', 404));
  }
  const flight = await Flight.findOne({
    pnrPrefix: pnr.slice(0, 6),
  }).populate(['airplane', 'seats']);
  if (!flight) {
    return res.status(404).json({ message: 'Flight not found' });
  }
  res.status(200).json({
    flight,
  });
});
