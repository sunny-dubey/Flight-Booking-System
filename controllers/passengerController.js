const Passenger = require('../models/passengerModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.allocatePNRwithClass = catchAsync(async (req, res, next) => {
  const { name, flightId, seatClass } = req.body;
  if (!name || !flightId || !seatClass) {
    return next(
      new AppError('Please enter name, flightId and seat class', 404)
    );
  }
  const passenger = await Passenger.create({
    name,
    flight: flightId,
    seatClass,
  });

  res.status(201).json({
    message: 'Passenger succesfully created',
    passenger,
  });
});

exports.getPassengerById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return next(new AppError('Please enter Id as params', 404));
  }

  const passenger = await Passenger.find({ _id: id }).populate([
    'flight',
    'seat',
  ]);
  console.log(passenger);
  if (!passenger) {
    return next(new AppError('Passenger not found', 404));
  }

  res.status(200).json({ passenger });
});
