'use strict';

// added .config();
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');

// Weather
app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  // console.log(lat, lon);
  
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

// Movies
app.get('/movies', movieHandler);
function movieHandler(request, response) {
  const { city } = request.query;
  movies(city)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!')
  });
} 

// What port listening on terminal
app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));

