import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import NavigationButton from './NavigationButton';
import Profile from './Profile';

const Header = ({ isOnPlannerPage }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      {!isAuthenticated && <LoginButton />}
      <Profile />
      {isAuthenticated && (
        <>
          {!isOnPlannerPage && <NavigationButton />}
          <LogoutButton />
        </>
      )}
    </Wrapper>
  );
};

Header.propTypes = {
  isOnPlannerPage: PropTypes.bool,
};
Header.defaultProps = {
  isOnPlannerPage: false,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #fefae0;
  margin-bottom: 24px;
`;
export default Header;
