const express = require('express');
const morgan = require('morgan');

const { getAllCrops, getCrop } = require('./crop_handlers');
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

app.get('/crops', getAllCrops);
app.get('/crop/:cropname', getCrop);

// catch all endpoint
app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'This is obviously not what you are looking for.',
  });
});

app.listen(8000, () => console.log('Listening on port 8000'));
