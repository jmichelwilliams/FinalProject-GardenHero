import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import StyledCalendar from './StyledCalendar';

import Header from './Header';
import Wrapper from './Wrapper';

const Planner = () => {
  const { user, isAuthenticated } = useAuth0();
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const handleChange = (nextDate) => {
    setDate(nextDate);
  };

  const tileDisabled = ({ date: calendarDate }) => calendarDate < new Date();

  useEffect(() => {
    const getWeather = async () => {
      const url =
        'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Montreal&days=3';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${apiKey}`,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setWeather(result);
      } catch (error) {
        console.error(error);
      }
    };
    getWeather();
  }, []);

  return (
    <Wrapper>
      <PlannerContainer>
        <StyledCalendar
          onChange={handleChange}
          value={date}
          tileDisabled={tileDisabled}
        />
        <Header isOnPlannerPage />
      </PlannerContainer>
    </Wrapper>
  );
};

const PlannerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Planner;
