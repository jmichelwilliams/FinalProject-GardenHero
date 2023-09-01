const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { getAllCrops, getCrop } = require('./crop_handlers');
const { logInUser } = require('./user_handlers');
const { getWeather } = require('./weather_handlers');
const {
  getUserPlantbox,
  addToGarden,
  removeFromGarden,
} = require('./plantbox_handlers');
const { validateAccessToken } = require('./auth0_handlers');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

const allowedOrigin = 'https://garden-hero.vercel.app';

const corsOptions = {
  origin: allowedOrigin,
};

app.use(cors(corsOptions));

// crops
app.get('/crops', getAllCrops);
app.get('/crop/:cropname', getCrop);

// login
app.post('/login', validateAccessToken, logInUser);

// weather
app.get('/weather', getWeather);

// plantbox
app.get('/plantbox/:userid', validateAccessToken, getUserPlantbox);
app.patch('/plantbox/:userid', validateAccessToken, addToGarden);
app.delete('/plantbox/:userid', validateAccessToken, removeFromGarden);

// catch-all endpoint
app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'This is obviously not what you are looking for.',
  });
});

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
