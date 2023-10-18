import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

interface NavigationButtonProps {
  buttonText: string;
  destination: string;
}
// Component that renders a Navigation button, can be customised using buttonText and destination
const NavigationButton: React.FC<NavigationButtonProps> = ({
  buttonText,
  destination,
}) => {
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

export default NavigationButton;
