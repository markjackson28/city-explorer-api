'use-strict';

require('dotenv').config();

const PORT = process.env.PORT

const express = require('express');
const { response } = require('express');

const app = express();

let weatherData = require('./data/weather.json');

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }
}

// allow frontend to access data from backend
const cors = require('cors');
app.use(cors());

// app.get('/weather', (request, response) => {
//   response.send(weatherData);
// });

app.get('/weather', (request, response) => {
  let searchQuery = request.query.city;
  // console.log(searchQuery);
  let weatherArr = [];
  if (searchQuery) {
    let cityWeather = weatherData.find((city) => city.city_name === searchQuery);
    // console.log(cityWeather);
    if (cityWeather) {
      cityWeather.data.map((weather) => {
        weatherArr.push(new Forecast(`Forecast for ${weather.datetime}: Low: ${weather.low_temp}, High: ${weather.high_temp} with ${weather.weather.description}`, weather.datetime)
        );
      });
      response.send(weatherArr);
    } else {
      response.status(500).send('Error from server');
    }
  }
});

app.get('/*', (request, response) => {
  response.status(404).send('Path does not exists');
});

// app.get('/', (request, response) => {
//   response.send('Hello, from the server!');
// });

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
