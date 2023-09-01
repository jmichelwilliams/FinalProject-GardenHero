import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import getTemperatureInCelsius from '../util_functions';

import Wrapper from './Wrapper';
import NavigationButton from './NavigationButton';
import LoginRequiredDialog from './LoginRequiredDialog';

const PLANNER_ROUTE = '/planner';

// Component that renders crop detail information.
const CropDetails = () => {
  const [cropInfo, setCropInfo] = useState();
  const { isAuthenticated } = useAuth0();
  const { cropName } = useParams();
  const IMAGE_BASE_PATH = '/images/';
  let imageSrc = null;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch crop data based on cropName
  useEffect(() => {
    let ignore = false;

    const fetchCropByName = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/crop/${cropName}`);
        if (!res.ok) {
          throw new Error('Failed to fetch crop');
        }
        const data = await res.json();
        if (!ignore) {
          setCropInfo(data.data);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    fetchCropByName();

    // Cleanup function to prevent setting state on an unmounted component
    return () => {
      ignore = true;
    };
  }, [cropName]);

  // Deconstructing CropInfo if available, if not an empty object is used as fallback
  const { name, soil, temperature, plantingSeason, daysToHarvest, url } =
    cropInfo || {};

  // Removes the spaces in the name of the crop
  const nameWithNoSpaces = name ? name.split(' ').join('') : '';

  // Reconstructing the filepath using IMAGE_BASE_PATH(/images/)nameWithNoSpaces.jpeg
  imageSrc = `${IMAGE_BASE_PATH}${nameWithNoSpaces}.jpeg`;

  return (
    <StyledWrapper>
      <NavigationButtonWrapper>
        <NavigationButton buttonText="Back" destination="/" />
      </NavigationButtonWrapper>
      {!cropInfo ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <ImageContainer src={imageSrc} />
          <InfoContainer>
            <Title>{name}</Title>
            <InfoList>
              <ListItems>
                <BoldSpan>Soil type:&nbsp;</BoldSpan>
                {soil}
              </ListItems>
              <ListItems>
                <BoldSpan>Ideal Temperature:&nbsp;</BoldSpan>
                {getTemperatureInCelsius(temperature)}ºC
              </ListItems>
              <ListItems>
                <BoldSpan>Planting Season:&nbsp;</BoldSpan>
                {plantingSeason}
              </ListItems>
              <ListItems>
                <BoldSpan>Days to Harvest:&nbsp;</BoldSpan>
                {daysToHarvest}
              </ListItems>
              <ListItems>
                <StyledLink to={url}>Additional Info</StyledLink>
              </ListItems>
            </InfoList>
          </InfoContainer>
          <LoginButtonWrapper>
            {!isAuthenticated ? (
              <LoginRequiredDialog />
            ) : (
              <NavigationButton
                buttonText="Go to Planner"
                destination={PLANNER_ROUTE}
              />
            )}
          </LoginButtonWrapper>
        </Box>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px;

  @media (max-width: 1180px) {
    align-items: center;
    text-align: center;
    margin: 0;
  }
`;

const NavigationButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 16px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: solid #606c38 8px;
  width: 750px;
  align-items: center;
  border-radius: 16px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 1180px) {
    align-items: center;
    text-align: center;
    margin: 0;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 700px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  border-radius: 8px;

  @media (max-width: 1180px) {
    height: 350px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top: solid #606c38 10px;
`;

const Title = styled.h2`
  font-size: 36px;
  color: #283618;
  margin-bottom: 24px;
`;

const InfoList = styled.ul`
  font-size: 22px;
`;

const BoldSpan = styled.span`
  font-weight: 700;
  color: #606c38;
`;

const ListItems = styled.li`
  margin: 24px 0px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: blue;
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 570px;
  margin-bottom: 8px;
`;
export default CropDetails;
