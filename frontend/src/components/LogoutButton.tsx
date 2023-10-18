import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

// Component that renders a log out button
const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
      sx={{
        height: '60px',
        width: '150px',
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
