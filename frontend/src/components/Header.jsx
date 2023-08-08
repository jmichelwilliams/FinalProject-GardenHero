import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import styled from 'styled-components';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import NavigationButton from './NavigationButton';
import Profile from './Profile';

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      {!isAuthenticated && <LoginButton />}
      <Profile />
      {isAuthenticated && (
        <>
          <NavigationButton />
          <LogoutButton />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #fefae0;
`;
export default Header;
