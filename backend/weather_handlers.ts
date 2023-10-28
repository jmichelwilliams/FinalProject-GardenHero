import { Request, Response } from 'express';
import axios from 'axios';

const API_KEY = process.env.WEATHER_API_KEY;

// Function to fetch the weather information from the API
const getWeather = async (req: Request, res: Response) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: 'Montreal',
      days: '3',
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
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

export default getWeather;
