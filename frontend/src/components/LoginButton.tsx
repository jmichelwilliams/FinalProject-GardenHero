import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

interface LoginButtonProps {
  buttonText: string;
  isSmall: boolean;
}
// Component that renders a login button
const LoginButton: React.FC<LoginButtonProps> = ({ buttonText, isSmall }) => {
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

export default LoginButton;
