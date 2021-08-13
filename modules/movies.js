'use-strict';

const axios = require('axios');
let cache = require('./cache.js');

module.exports = getMovies;

function getMovies(city) {
  // console.log(`lat:`, latitude, `lon:`, longitude);
    const key = 'city-' + city;
    // console.log(cache);
    // console.log(key);
    // console.log(Date.now());
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  
    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7)) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data));
    }
    // console.log(cache);
    return cache[key].data;
  }
  
  function parseMovie(movieData) {
    try {
      const movieDataArr = movieData.results.map(movie => {
        return new Movie(movie);
      });
      // console.log(`movies: `, movieDataArr);
      return Promise.resolve(movieDataArr);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  class Movie {
    constructor(movie) {
      this.title = movie.original_title;
      this.overview = movie.overview ? movie.overview : 'Movie Description Unavailable';
      this.average_votes = movie.vote_average;
      this.total_votes = movie.vote_count;
      this.img_url = movie.poster_path ? `http://image.tmdb.org/t/p/w500${movie.poster_path}`: '';
      this.popularity = movie.popularity;
      this.released_on = movie.release_date;
    }
  }
