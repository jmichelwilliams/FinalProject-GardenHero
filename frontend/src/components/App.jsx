import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Registration from './Registration';
import Loginpage from './Loginpage';
import Planner from './Planner';
import GlobalStyle from '../GlobalStyles';

const App = () => {
  console.log('app');
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </Router>
  );
};

export default App;
