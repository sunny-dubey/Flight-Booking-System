const Seat = require('../models/seatModel');
const Passenger = require('../models/passengerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.selectSeat = catchAsync(async (req, res, next) => {
  const { passengerId, seatId } = req.body;
  if (!passengerId || !seatId) {
    return next(new AppError('Please enter Passenger ID and seat Id', 404));
  }

  const passenger = await Passenger.findById(passengerId);
  if (!passenger) {
    return next(new AppError('Passenger not found', 404));
  }
  const seat = await Seat.findById(seatId);
  if (!seat) {
    return next(new AppError('Seat not found', 404));
  }
  if (seat.isOccupied) {
    return next(new AppError('Seat is already occupied', 400));
  }
  if (passenger.seatClass !== seat.seatClass) {
    return next(
      `You cant book this seat as this is ${seat.seatClass} class and you can only book seat of ${passenger.seatClass} class`
    );
  }
  seat.isOccupied = true;
  await seat.save();
  passenger.pnr = seat.pnr;
  passenger.seat = seatId;
  await passenger.save();

  res.status(200).json({
    message:
      'Congrats! you have successfully booked your seat succesfully booked',
  });
});
