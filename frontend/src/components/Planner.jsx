import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Wrapper from './Wrapper';

const Planner = () => {
  const { user, isAuthenticated } = useAuth0();
  const [date, setDate] = useState(new Date());

  const handleChange = (nextDate) => {
    setDate(nextDate);
  };

  const tileDisabled = ({ date: calendarDate }) => calendarDate < new Date();

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

const StyledCalendar = styled(Calendar)`
  width: 220px;
  font-size: 14px;
  margin-right: 20px;
`;

export default Planner;
