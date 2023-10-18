import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import CropTable from './CropTable';
import GardenTable from './GardenTable';
import StyledCalendar from './StyledCalendar';
import Weather from './Weather';
import Header from './Header';
import Wrapper from './Wrapper';
import BACKEND_URL from '../constants';

const TableWrapper = styled(Wrapper)`
  flex-direction: row;
  height: 100vh;
`;
const PlannerWrapper = styled(Wrapper)`
  display: flex;
  align-items: flex-end;
  margin-left: 70px;
  margin-right: 16px;
  height: 100vh;
`;

const SubTitle = styled.h3`
  text-align: center;
  font-size: 28px;
  color: #606c38;
  margin-bottom: 0;
`;

// Component that renders the planner page
const Planner: React.FC = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [tableData, setTableData] = useState([]);
  const [garden, setGarden] = useState([]);
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());

  // Used to disable the past dates on the calendar
  const tileDisabled = ({ date: calendarDate }: { date: Date }): boolean =>
    calendarDate.getTime() < new Date().setHours(0, 0, 0, 0);

  // Function to change the date on the calendar
  const handleChange = (value: Date | [Date, Date] | null) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  // Function to fetch the user's garden
  const fetchGardenData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await fetch(`${BACKEND_URL}/plantbox/${user?.sub}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch garden');
      }
      const { data } = await res.json();
      setGarden(data.garden);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  // Fetch Available Crops
  useEffect(() => {
    let ignore = false;

    const fetchCrops = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/crops`);
        if (!res.ok) {
          throw new Error('Failed to fetch crops');
        }
        const { data } = await res.json();
        if (!ignore) {
          setTableData(data);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    fetchCrops();

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
    <TableWrapper className="tablewrapper">
      <div>
        <SubTitle>Available Crops</SubTitle>
        <CropTable data={tableData} onAddToGarden={handleChangeToGarden} />
        <SubTitle>Your Garden</SubTitle>
        <GardenTable data={garden} onRemoveFromGarden={handleChangeToGarden} />
      </div>
      <PlannerWrapper className="plannerwrapper">
        <Header isPlannerPage />
        <Weather />
        <StyledCalendar
          value={date}
          onChange={(value: any) => handleChange(value)}
          tileDisabled={tileDisabled}
        />
      </PlannerWrapper>
    </TableWrapper>
  );
};

export default Planner;
