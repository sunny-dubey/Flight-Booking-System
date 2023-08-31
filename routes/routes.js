const express = require('express');
const Airplane = require('../controllers/airplaneController');
const Flight = require('../controllers/flightController');
const Passenger = require('../controllers/passengerController');
const Seat = require('../controllers/seatController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/createAirplane',
  authController.protect,
  authController.restrictTo('admin'),
  Airplane.createAirplane
);
router.get('/getAllAirplane', authController.protect, Airplane.getAllAirplane);
router.post(
  '/createFlight',
  authController.protect,
  authController.restrictTo('admin'),
  Flight.createFlight
);
router.get(
  '/getFlightByPNR/:pnr',
  authController.protect,
  Flight.getFlightByPNR
);

// create a passemger first and and then admin will allocate him  pnr and seat class
router.post(
  '/allocatePNRwithClass',
  authController.protect,
  authController.restrictTo('admin'),
  Passenger.allocatePNRwithClass
);
router.get(
  '/getPassengerById/:id',
  authController.protect,
  authController.restrictTo('admin'),
  Passenger.getPassengerById
);

router.post('/selectSeat', authController.protect, Seat.selectSeat);
router.post('/upgradeSeat', authController.protect, Seat.upgradeSeat);

module.exports = router;
