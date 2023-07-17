import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Wrapper from './Wrapper';

const CropLookup = () => {
  const [crops, setCrops] = useState(null);

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
          setCrops(data.data);
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
    <Wrapper>
      <RowWrapper>
        <SearchInput type="text" placeholder="Search Crop" />
        <StyledButton variant="contained" color="primary">
          Search
        </StyledButton>
      </RowWrapper>
    </Wrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 1180px) {
    flex-direction: column;
    align-items: center;
  }
`;
const SearchInput = styled.input`
  width: 400px;
  background-color: white;
  height: 50px;
  margin-right: 8px;
  font-size: 24px;

  @media (max-width: 1180px) {
    font-size: 16px;
    margin: 0;
    width: 300px;
    margin-bottom: 16px;
  }
`;

const StyledButton = styled(Button)`
  height: 55px;
  width: 150px;

  @media (max-width: 1180px) {
    width: 300px;
  }
`;
export default CropLookup;
