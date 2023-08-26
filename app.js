const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const router = require('./routes/routes');

const app = express();
app.use(cors());

// middleware
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

// routes
app.use('/api', router);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
