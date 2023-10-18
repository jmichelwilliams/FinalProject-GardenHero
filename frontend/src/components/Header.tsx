import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import NavigationButton from './NavigationButton';
import Profile from './Profile';

interface HeaderProps {
  isPlannerPage: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  background-color: #fefae0;
  margin: 8px;
`;

// Component that renders the header with user's name and login/planner buttons
const Header: React.FC<HeaderProps> = ({ isPlannerPage }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      {!isAuthenticated && (
        <LoginButton buttonText="Login / Register" isSmall={false} />
      )}
      <Profile />
      {isAuthenticated && (
        <>
          {!isPlannerPage && (
            <NavigationButton buttonText="Planner" destination="/planner" />
          )}
          <LogoutButton />
        </>
      )}
    </Wrapper>
  );
};

export default Header;
