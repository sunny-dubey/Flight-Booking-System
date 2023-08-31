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

exports.upgradeSeat = catchAsync(async (req, res, next) => {
  const { passengerId, newSeatId } = req.body;
  if (!passengerId || !newSeatId) {
    return next(new AppError('Please enter the passenger ID and newSeatID'));
  }

  const passenger = await Passenger.findById(passengerId);
  if (!passenger) {
    return next(new AppError('Passenger is not found', 404));
  }
  let upgradePrice = 0;
  let old_seatClass = passenger.seatClass;
  const newSeat = await Seat.findById(newSeatId);
  if (!newSeat) {
    return next(new AppError('New Seat not found', 404));
  }
  if (newSeat.isOccupied) {
    return next(new AppError('New Seat is already occupied', 400));
  }
  if (newSeat.seatClass === 'Economy') {
    return next(new AppError('Passenger cannot upgrade to Economy class', 400));
  }
  if (old_seatClass == 'Economy' && newSeat.seatClass === 'Business') {
    upgradePrice = 1000;
  }
  if (old_seatClass == 'Economy' && newSeat.seatClass === 'First') {
    upgradePrice = 2000;
  }
  if (old_seatClass == 'Business' && newSeat.seatClass === 'First') {
    upgradePrice = 1000;
  }

  const currentSeat = await Seat.findById(passenger.seat);
  currentSeat.isOccupied = false;
  await currentSeat.save();
  passenger.seat = newSeatId;
  passenger.seatClass = newSeat.seatClass;
  passenger.pnr = newSeat.pnr;
  passenger.farePrice += upgradePrice;
  await passenger.save();
  newSeat.isOccupied = true;
  await newSeat.save();
  res.status(200).json({
    message: `seat upgraded succesfully with upgradePrice ${upgradePrice}`,
  });
});
