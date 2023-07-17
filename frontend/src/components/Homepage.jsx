import React from 'react';
import styled from 'styled-components';
import CropLookup from './CropLookup';
import Header from './Header';
import Wrapper from './Wrapper';

const Homepage = () => {
  console.log('Homepage');
  return (
    <Wrapper>
      <Header />
      <TitleBox>
        <Title>Garden Hero</Title>
        <SubTitle>
          Need to keep track of your crops? Look no further. Garden hero will
          save the day!
        </SubTitle>
      </TitleBox>
      <CropLookup />
    </Wrapper>
  );
};

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
  color: #283618;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled.h2`
  font-style: italic;
  color: #606c38;
`;

export default Homepage;
