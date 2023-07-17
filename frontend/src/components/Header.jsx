import React from 'react';

import styled from 'styled-components';
import Button from '@mui/material/Button';

const Header = () => {
  console.log('header');
  return (
    <Wrapper>
      <Button
        variant="contained"
        color="primary"
        sx={{
          height: '60px',
          width: '150px',
          marginRight: '8px',
        }}
      >
        Log in
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          height: '60px',
          width: '150px',
        }}
      >
        Register
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #fefae0;
`;
export default Header;
