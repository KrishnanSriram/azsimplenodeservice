const express = require('express');
const res = require('express/lib/response');
const debug = require('debug');
const log = debug('app');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));
app.get('/', (req, res) => {
  log('ROOT path invoked');
  return res.json({ message: 'Welcome to ROOT location for this API' }).status(200);
});

app.get('/about', (req, res) => {
  // throw new Error('OOPS, not sure what happened here');
  return res.json({ message: 'ABOUT request' }).status(200);
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route you are looking for does not exist. Try again later!!' });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: 'Something went WRONG!!' });
});

app.listen(PORT, () => {
  log(`Application service is up & running in port ${PORT}`);
});
