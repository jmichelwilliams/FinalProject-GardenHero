import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import StyledCalendar from './StyledCalendar';
import Weather from './Weather';
import Header from './Header';
import Wrapper from './Wrapper';

const Planner = () => {
  const [date, setDate] = useState(new Date());

  const handleChange = (nextDate) => {
    setDate(nextDate);
  };

  const tileDisabled = ({ date: calendarDate }) => calendarDate < new Date();

  return (
    <PlannerWrapper>
      <Header isOnPlannerPage />
      <Weather />
      <StyledCalendar
        onChange={handleChange}
        value={date}
        tileDisabled={tileDisabled}
      />
    </PlannerWrapper>
  );
};

const PlannerWrapper = styled(Wrapper)`
  display: flex;
  align-items: flex-end;
`;

export default Planner;
