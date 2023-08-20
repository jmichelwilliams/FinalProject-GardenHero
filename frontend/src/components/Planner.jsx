import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import CropTable from './CropTable';
import GardenTable from './GardenTable';
import StyledCalendar from './StyledCalendar';
import Weather from './Weather';
import Header from './Header';
import Wrapper from './Wrapper';

// Component that renders the planner page
const Planner = () => {
  const { user, isLoading } = useAuth0();
  const [date, setDate] = useState(new Date());
  const [tableData, setTableData] = useState([]);
  const [garden, setGarden] = useState([]);

  // Function to change the date on click of the calendar
  const handleChange = (nextDate) => {
    setDate(nextDate);
  };

  // Used to disable the past dates on the calendar
  const tileDisabled = ({ date: calendarDate }) => calendarDate < new Date();

  const fetchGardenData = async () => {
    try {
      const res = await fetch(`/plantbox/${user.sub}`);
      if (!res.ok) {
        throw new Error('Failed to fetch garden');
      }
      const data = await res.json();
      setGarden(data.data.garden);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  // Fetch Available Crops
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

  // Fetch the user's garden
  useEffect(() => {
    if (!isLoading) {
      fetchGardenData();
    }
  }, [isLoading]);

  // Callback function to re-fetch garden data
  const handleChangeToGarden = () => {
    fetchGardenData();
  };

  return (
    <TableWrapper>
      <div>
        <SubTitle>Available Crops</SubTitle>
        <CropTable data={tableData} onAddToGarden={handleChangeToGarden} />
        <SubTitle>Your Garden</SubTitle>
        <GardenTable data={garden} onRemoveFromGarden={handleChangeToGarden} />
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

const SubTitle = styled.h3`
  text-align: center;
  color: #606c38;
`;
export default Planner;
