'use-strict';

require('dotenv').config();
 
const PORT = process.env.PORT

const express = require('express');
const { response } = require('express');

const app = express();

let weatherData = require('./data/weather.json');

// allow frontend to access data from backend
const cors = require('cors');
app.use(cors());

app.get('/weather', (request, response) => {
  response.send(weatherData);
});


// app.get('/', (request, response) => {
//   response.send('Hello, from the server!');
// });

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
