const axios = require('axios');
const APIKEY = process.env.WEATHER_API_KEY;

const getWeather = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: 'Montreal',
      days: '3',
    },
    headers: {
      'X-RapidAPI-Key': APIKEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json({ status: 200, data: response.data });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

module.exports = { getWeather };
