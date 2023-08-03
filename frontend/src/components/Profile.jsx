import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userCreated, setUserCreated] = useState(false); // Local state to track user creation

  useEffect(() => {
    const createUserOnLogin = async () => {
      if (isAuthenticated && !userCreated) {
        try {
          const accessToken = await getAccessTokenSilently();
          console.log('accessToken: ', accessToken);
          await fetch('/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ access_token: accessToken }),
          });

          // Set the userCreated state to true after successful user creation
          setUserCreated(true);
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
    };

    createUserOnLogin();
  }, [isAuthenticated, getAccessTokenSilently, userCreated]); // Run the effect whenever isAuthenticated, getAccessTokenSilently, or userCreated change

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
