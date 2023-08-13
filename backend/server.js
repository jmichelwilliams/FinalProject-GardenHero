const express = require('express');
const morgan = require('morgan');

const { getAllCrops, getCrop } = require('./crop_handlers');
const { logInUser } = require('./user_handlers');
const { getWeather } = require('./weather_handlers');
const {
  getUserPlantbox,
  addToGarden,
  removeFromGarden,
} = require('./plantbox_handlers');
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

app.get('/crops', getAllCrops);
app.get('/crop/:cropname', getCrop);
app.post('/login', logInUser);
app.get('/weather', getWeather);
app.get('/plantbox/:sub', getUserPlantbox);
app.patch('/plantbox/:sub', addToGarden);
app.delete('/plantbox/:sub', removeFromGarden);
// catch all endpoint
app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'This is obviously not what you are looking for.',
  });
});

app.listen(8000, () => console.log('Listening on port 8000'));
