import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </ThemeProvider>
  </Router>
);

export default App;
