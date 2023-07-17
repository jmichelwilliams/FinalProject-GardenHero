import React from 'react';
import styled from 'styled-components';
import CropLookup from './CropLookup';
import Header from './Header';

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

      <SignUpBox>
        <CropLookup />
        {/* <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 0, height: '60px', width: '150px' }}
          >
            Sign up!
          </Button> */}
      </SignUpBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefae0;
  height: 100vh;
`;

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

const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
export default Homepage;
