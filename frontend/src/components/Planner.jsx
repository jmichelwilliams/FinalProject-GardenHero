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

  const handleChange = (nextDate) => {
    setDate(nextDate);
  };

  const tileDisabled = ({ date: calendarDate }) => calendarDate < new Date();

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
