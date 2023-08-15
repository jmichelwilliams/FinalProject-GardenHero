import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DenseTable from './PlannerTable';
import StyledCalendar from './StyledCalendar';
import Weather from './Weather';
import Header from './Header';
import Wrapper from './Wrapper';

const Planner = () => {
  const [date, setDate] = useState(new Date());
  const [tableData, setTableData] = useState([]);
  const handleChange = (nextDate) => {
    setDate(nextDate);
  };

  const tileDisabled = ({ date: calendarDate }) => calendarDate < new Date();

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch('/crops');
        if (!res.ok) {
          throw new Error('Failed to fetch crops');
        }
        const data = await res.json();
        if (!ignore) {
          setTableData(data.data);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <TableWrapper>
      <div>
        <h3>Available Crops</h3>
        <DenseTable data={tableData} />
        <h3>Your Garden</h3>
        <DenseTable data={tableData} />
      </div>
      <PlannerWrapper>
        <Header isOnPlannerPage />
        <Weather />
        <StyledCalendar
          onChange={handleChange}
          value={date}
          tileDisabled={tileDisabled}
        />
      </PlannerWrapper>
    </TableWrapper>
  );
};

const TableWrapper = styled(Wrapper)`
  flex-direction: row;
`;
const PlannerWrapper = styled(Wrapper)`
  display: flex;
  align-items: flex-end;
  margin-left: 70px;
`;

export default Planner;
