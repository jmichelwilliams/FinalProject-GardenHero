import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/weather');
        if (!res.ok) {
          throw new Error('Failed to fetch weather');
        }
        const data = await res.json();
        setWeather(data.data);
      } catch (error) {
        console.log('An error occured:', error);
      }
    };

    fetchWeather();
  }, []);

  console.log('weather: ', weather);
  return <div>hello</div>;
};

export default Weather;
