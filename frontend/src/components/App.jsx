import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import Homepage from './Homepage';
import Registration from './Registration';
import Loginpage from './Loginpage';
import Planner from './Planner';
import GlobalStyle from '../GlobalStyles';

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

const App = () => (
  <Router>
    <GlobalStyle />
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </ThemeProvider>
    </Wrapper>
  </Router>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 85%;
  }
`;
export default App;
