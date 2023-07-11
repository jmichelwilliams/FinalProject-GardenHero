import React from 'react';
import styled from 'styled-components';

const Homepage = () => {
  console.log('potato');
  return (
    <Wrapper>
      <h1>Homepage</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default Homepage;
