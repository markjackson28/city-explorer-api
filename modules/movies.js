'use strict'

const axios = require('axios');
module.exports = getMovies;

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

async function getMovies(request, response) {
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
}
