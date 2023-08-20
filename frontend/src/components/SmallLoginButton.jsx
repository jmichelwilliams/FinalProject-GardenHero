import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

// Component that renders a smaller version of the login button
const SmallLoginButton = ({ buttonText }) => {
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
        height: '36px',
        width: '80px',
        marginRight: '8px',
      }}
    >
      {buttonText}
    </Button>
  );
};

SmallLoginButton.propTypes = {
  buttonText: PropTypes.string,
};

SmallLoginButton.defaultProps = {
  buttonText: 'Login / Register',
};

export default SmallLoginButton;
