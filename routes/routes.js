const express = require('express');
const Airplane = require('../controllers/airplaneController');
const Flight = require('../controllers/flightController');
const router = express.Router();

router.post('/createAirplane', Airplane.createAirplane);
router.get('/getAllAirplane', Airplane.getAllAirplane);
router.post('/createFlight', Flight.createFlight);
router.get('/getFlightByPNR/:pnr', Flight.getFlightByPNR);

module.exports = router;
