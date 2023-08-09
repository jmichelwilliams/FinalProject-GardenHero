import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LoginButton = () => {
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
        height: '60px',
        width: '150px',
        marginRight: '8px',
      }}
    >
      Log In / Register
    </Button>
  );
};

export default LoginButton;
