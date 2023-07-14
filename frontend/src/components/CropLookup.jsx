import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import TextField from '@mui/material/TextField';

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
      <SearchInput id="CropSearch" label="Search Crop" variant="outlined" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled(TextField)`
  width: 400px;
  background-color: white;
`;
export default CropLookup;
