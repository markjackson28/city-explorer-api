'use-strict';

// in our servers, we must use require instead of import
const express = require('express');
// use dotenv to access our .env file -- must be done BEFORE defining PORT
require('dotenv').config();
// how its as per the docs
const app = express();
// allow frontend to access data from backend
const cors = require('cors');
app.use(cors());

const axios = require('axios');
const PORT = process.env.PORT

// -------------------------------------------
// everything above this line is exactly what you need for an express (or close it)

app.get('/', (request, response) => {
  response.send('Hello, from the server! :)');
});

// class to get what we need from big data file
class Forecast {
  constructor(day) {
    this.description = `Low: ${day.low_temp}, High: ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

app.get('/weather', async (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  try {
  let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
  response.send(weatherResults.data.data.map((day) => new Forecast(day)));
  } catch (error) {
    // console.log(error);
    // response.send([]);
    // console.log(error.response.statusText);
    response.status(400).send(error.response.statusText);
  }
});

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.img_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

app.get('/movies', async (request, response) => {
  //                        name in url 'city=<cityname>' ex: http://localhost:3001/movies?city=chicago
  let query = request.query.city;
  // console.log(query);
  try {
  let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`);
  response.send(movieResults.data.results.map((movie) => new Movie(movie)));
  } catch (error){
    response.status(404).send('Invaild search from movie');
    // console.log(error);
    // response.send(error.reponse);
  }
});

app.get('/*', (request, response) => {
  response.status(404).send('Path does not exists');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
