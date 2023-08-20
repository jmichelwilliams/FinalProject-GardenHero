import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const NavigationButton = ({ buttonText, destination }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${destination}`);
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
      {buttonText}
    </Button>
  );
};

NavigationButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};
export default NavigationButton;
