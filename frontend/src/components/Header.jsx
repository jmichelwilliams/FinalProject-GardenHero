import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import styled from 'styled-components';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#606C38',
    },
    secondary: {
      main: '#BC6C25',
    },
  },
});

const Header = () => {
  console.log('header');
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 0,
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
            borderRadius: 0,
            height: '60px',
            width: '150px',
          }}
        >
          Register
        </Button>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #fefae0;
`;
export default Header;
