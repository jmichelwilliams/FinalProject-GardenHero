import React from 'react';
import { styled } from 'styled-components';
import TextField from '@mui/material/TextField';

const CropLookup = () => {
  console.log('CropLookup');
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
