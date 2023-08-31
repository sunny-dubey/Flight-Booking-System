const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const movieRouter = require('./routes/routes');
const userRouter = require('./routes/userRoutes');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, 'README.md');
  fs.readFile(readmePath, 'utf-8', (err, data) => {
    if (!err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
});

// middleware
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

// routes
app.use('/api', userRouter);
app.use('/api', movieRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
