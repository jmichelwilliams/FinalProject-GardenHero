import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import NavigationButton from './NavigationButton';
import Profile from './Profile';

// Component that renders the header with user's name and login/planner buttons
const Header = ({ isPlannerPage }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      {!isAuthenticated && <LoginButton />}
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

Header.propTypes = {
  isPlannerPage: PropTypes.bool,
};
Header.defaultProps = {
  isPlannerPage: false,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #fefae0;
  margin: 8px;
`;

export default Header;
