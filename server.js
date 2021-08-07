'use-strict';

// in our servers, we must use require instead of import
const express = require('express');
// use dotenv to access our .env file -- must be done BEFORE defining PORT
require('dotenv').config();
// Per the docs
const app = express();
// Allow frontend to access data from backend
const cors = require('cors');
app.use(cors());

// const axios = require('axios');
const PORT = process.env.PORT

// -------------------------------------------
// everything above this line is exactly what you need for an express (or close it)

app.get('/', (request, response) => {
  response.send('Hello, from the server! :)');
});

const weather = require('./modules/weather.js');
app.get('/weather', weather);

const movies = require('./modules/movies.js');
app.get('/movies', movies);

app.get('/*', (request, response) => {
  response.status(404).send('Path does not exists');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
