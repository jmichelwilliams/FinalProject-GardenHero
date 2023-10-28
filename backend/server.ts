import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';

import { getAllCrops, getCrop } from './crop_handlers';
import { logInUser } from './user_handlers';
import getWeather from './weather_handlers';
import {
  getUserPlantbox,
  addToGarden,
  removeFromGarden,
} from './plantbox_handlers';
import { validateAccessToken } from './auth0_handlers';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

const allowedOrigins = [
  'http://localhost:3000',
  'https://garden-hero.vercel.app',
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'This is obviously not what you are looking for.',
  });
});

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
