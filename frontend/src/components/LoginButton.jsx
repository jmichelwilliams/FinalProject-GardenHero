import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

// Component that renders a login button
const LoginButton = ({ buttonText, isSmall }) => {
  const { loginWithRedirect, isLoading } = useAuth0();
  const handleLogin = async () => {
    if (isLoading) {
      return;
    }
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error('Error with login:', error);
    }
  };
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogin}
      sx={{
        height: isSmall ? '36px' : '60px',
        width: '150px',
        marginRight: '8px',
      }}
    >
      {buttonText}
    </Button>
  );
};

LoginButton.propTypes = {
  buttonText: PropTypes.string,
  isSmall: PropTypes.bool,
};

LoginButton.defaultProps = {
  buttonText: 'Login / Register',
  isSmall: false,
};

export default LoginButton;
