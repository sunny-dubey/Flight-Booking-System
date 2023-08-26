const Airplane = require('../models/airplaneModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createAirplane = catchAsync(async (req, res, next) => {
  const { name, seatConfiguration } = req.body;
  if (!name || !seatConfiguration) {
    return next(new AppError('Please enter the name and seat configuartion'));
  }
  const airplane = await Airplane.create({
    name,
    seatConfiguration,
  });

  res.status(201).json({
    message: 'Airplane succesfully created',
    airplane,
  });
});

exports.getAllAirplane = catchAsync(async (req, res, next) => {
  const airplane = await Airplane.find();
  res.status(200).json({
    airplane,
  });
});
