import React from 'react';
import styled from 'styled-components';
import CropLookup from './CropLookup';
import Header from './Header';
import Wrapper from './Wrapper';
import logo from '../images/GardenHeroLogo.png';

// Component that renders the homepage
const Homepage = () => (
  <StyledWrapper>
    <Header />
    <TitleBox>
      <Image src={logo} alt="GardenHero Logo" />
      <Title>Garden Hero</Title>
      <SubTitle>
        Need to keep track of your crops? Look no further. Garden hero will save
        the day!
      </SubTitle>
    </TitleBox>
    <StyledParagraph>
      Starting planning by searching our available crops!
    </StyledParagraph>
    <CropLookup />
  </StyledWrapper>
);

const StyledWrapper = styled(Wrapper)`
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
  margin-bottom: 36px;
`;

const Image = styled.img`
  height: 150px;
  width: 200px;
`;
const SubTitle = styled.h2`
  font-style: italic;
  color: #606c38;
`;

const StyledParagraph = styled.p`
  font-size: 26px;
  color: #606c38;
  text-align: center;
  margin-top: 0;
`;
export default Homepage;
