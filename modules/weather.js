'use-strict';

// Missing Things
// process.env for key
// changed lat/lon to latitude/longitude in url
// response.body to response.data


const axios = require('axios');

let cache = require('./cache.js');

module.exports = getWeather;

function getWeather(latitude, longitude) {
// console.log(`lat:`, latitude, `lon:`, longitude);
  const key = 'weather-' + latitude + longitude;
  // console.log(cache);
  // console.log(key);
  // console.log(Date.now());
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseWeather(response.data));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    // console.log(`parsed:`, weatherData);
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

