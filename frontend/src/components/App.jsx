import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Homepage from './Homepage';
import Planner from './Planner';
import CropDetails from './CropDetails';
import GlobalStyle from '../GlobalStyles';

// Theme used throughout the app
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

// This function renders the App
const App = () => (
  <Router>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/:cropName" element={<CropDetails />} />
      </Routes>
    </ThemeProvider>
  </Router>
);

export default App;
