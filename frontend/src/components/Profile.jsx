import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);
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
