import React from 'react';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CropLookup from './CropLookup';

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

const Homepage = () => {
  console.log('Homepage');
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 0, height: '60px', width: '150px' }}
          >
            Log in
          </Button>
        </Header>
        <TitleBox>
          <Title>Garden Hero</Title>
          <SubTitle>
            Need to keep track of your crops? Look no further. Garden hero will
            save the day!
          </SubTitle>
        </TitleBox>
        {/* <ImageBox>Insert Preview Screenshot</ImageBox> */}
        <SignUpBox>
          <CropLookup />
          {/* <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 0, height: '60px', width: '150px' }}
          >
            Sign up!
          </Button> */}
        </SignUpBox>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefae0;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
  color: #283618;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled.h2`
  font-style: italic;
  color: #606c38;
`;

const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
export default Homepage;
