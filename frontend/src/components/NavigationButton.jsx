import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const NavigationButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/planner');
  };
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleNavigate}
      sx={{
        height: '60px',
        width: '150px',
        marginRight: '8px',
      }}
    >
      Planner
    </Button>
  );
};

export default NavigationButton;
