import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    const handleAuthenticationAndLogin = async () => {
      if (isAuthenticated) {
        try {
          await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
          });
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
    };

    handleAuthenticationAndLogin();
  }, [isAuthenticated, getAccessTokenSilently]); // Run the effect whenever isAuthenticated, getAccessTokenSilently, or userCreated change

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        {/* <img src={user.picture} alt={user.name} /> */}
        <ProfileName>{user.nickname}</ProfileName>
        {/* <p>Hello&nbsp;{user.nickname}!</p> */}
      </div>
    )
  );
};

const ProfileName = styled.h2`
  margin-right: 8px;
`;
export default Profile;
