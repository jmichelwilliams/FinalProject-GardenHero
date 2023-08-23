import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

// Component to render the profile information
const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  // Fetch the user's login info
  useEffect(() => {
    const handleAuthenticationAndLogin = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();

          await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ user }),
          });
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
    };

    handleAuthenticationAndLogin();
  }, [isAuthenticated, getAccessTokenSilently]); // Run the effect whenever isAuthenticated, getIdTokenClaims, or userCreated change

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <ProfileName>
          Hello! <StyledProfileName>{user.nickname}</StyledProfileName>
        </ProfileName>
      </div>
    )
  );
};

const ProfileName = styled.h2`
  margin-right: 16px;
`;

const StyledProfileName = styled.span`
  color: #bc6c25;
`;
export default Profile;
