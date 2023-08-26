const express = require('express');
const Airplane = require('../controllers/airplaneController');
const Flight = require('../controllers/flightController');
const Passenger = require('../controllers/passengerController');
const router = express.Router();

router.post('/createAirplane', Airplane.createAirplane);
router.get('/getAllAirplane', Airplane.getAllAirplane);
router.post('/createFlight', Flight.createFlight);
router.get('/getFlightByPNR/:pnr', Flight.getFlightByPNR);

// create a passemger first and and then admin will allocate him  pnr and seat class
router.post('/allocatePNRwithClass', Passenger.allocatePNRwithClass);
router.get('/getPassengerById/:id', Passenger.getPassengerById);

module.exports = router;
