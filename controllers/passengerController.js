const Passenger = require('../models/passengerModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Flight = require('../models/flightModel');

exports.allocatePNRwithClass = catchAsync(async (req, res, next) => {
  const { name, flightId, seatClass } = req.body;
  if (!name || !flightId || !seatClass) {
    return next(
      new AppError('Please enter name, flightId and seat class', 404)
    );
  }
  const flight = await Flight.findById(flightId);
  if (!flight) {
    return next(new AppError('There is no such flight!', 400));
  }
  let farePrice = 3000;
  if (seatClass === 'Business') farePrice = farePrice + 1000;
  if (seatClass === 'First') farePrice = farePrice + 2000;
  const passenger = await Passenger.create({
    name,
    flight: flightId,
    pnr: flight.pnrPrefix,
    seatClass,
    farePrice: farePrice,
  });

  res.status(201).json({
    message: 'Passenger succesfully created',
    passenger,
  });
});

exports.getPassengerById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError('Please enter Id as params', 404));
  }

  const passenger = await Passenger.find({ _id: id }).populate([
    'flight',
    'seat',
  ]);
  if (!passenger) {
    return next(new AppError('Passenger not found', 404));
  }

  res.status(200).json({ passenger });
});
