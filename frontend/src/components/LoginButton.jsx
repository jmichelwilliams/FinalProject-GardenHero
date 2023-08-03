import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LoginButton = () => {
  const {
    loginWithRedirect,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }
    try {
      await loginWithRedirect();

      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        console.log('accessToken: ', accessToken);
        await fetch('/create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: accessToken }),
        });
      }
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
