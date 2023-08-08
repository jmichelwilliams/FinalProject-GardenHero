import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from './Wrapper';

const CropDetails = () => {
  const [cropInfo, setCropInfo] = useState();
  const { cropName } = useParams();
  const imageBasePath = '/images/';
  let imageSrc = null;

  // Fetch crop data based on cropName
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch(`/crop/${cropName}`);
        if (!res.ok) {
          throw new Error('Failed to fetch crop');
        }
        const data = await res.json();
        if (!ignore) {
          setCropInfo(data.data);
        }
      } catch (error) {
        console.log('An error occured:', error);
      }
    };

    fetchData();

    // Cleanup function to prevent setting state on an unmounted component
    return () => {
      ignore = true;
    };
  }, [cropName]);

  // Deconstructing CropInfo if available, if not an empty object is used as fallback
  const { name, soil, temperature, plantingSeason, daysToHarvest, url } =
    cropInfo || {};

  const nameWithNoSpaces = name ? name.split(' ').join('') : '';

  // Reconstructing the filepath using imageBasePath(/images/)nameWithNoSpaces.jpeg
  imageSrc = `${imageBasePath}${nameWithNoSpaces}.jpeg`;

  return (
    <StyledWrapper>
      {/* If cropInfo is falsy, display Loading... */}
      {!cropInfo ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <ImageContainer src={imageSrc} />
          <InfoContainer>
            <Title>Crop Details</Title>
            <SubTitle>{name}</SubTitle>
            <InfoList>
              <ListItems>
                <BoldSpan>Soil type:&nbsp;</BoldSpan>
                {soil}
              </ListItems>
              <ListItems>
                <BoldSpan>Ideal Temperature:&nbsp;</BoldSpan>
                {temperature}ºF
              </ListItems>
              <ListItems>
                <BoldSpan>Planting Season:&nbsp;</BoldSpan>
                {plantingSeason}
              </ListItems>
              <ListItems>
                <BoldSpan>Days to Harvest:&nbsp;</BoldSpan>
                {daysToHarvest}
              </ListItems>
              <StyledLink to={url}>Additional Info</StyledLink>
            </InfoList>
          </InfoContainer>
        </Box>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 1180px) {
    align-items: center;
    text-align: center;
    margin: 0;
    height: 100vh;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: solid #606c38 10px;
  width: 50vw;
  align-items: center;
  border-radius: 16px;

  @media (max-width: 1180px) {
    align-items: center;
    text-align: center;
    margin: 0;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;

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
  border: solid 8px gray;
  border-radius: 16px;
`;

const Title = styled.h2`
  font-size: 36px;
  color: #283618;
  margin-top: 0;
  margin-bottom: 16px;
`;

const SubTitle = styled.h3`
  font-size: 28px;
  color: #606c38;
  margin-top: 0;
  margin-bottom: 16px;
`;

const InfoList = styled.ul`
  font-size: 22px;
`;

const BoldSpan = styled.span`
  font-weight: 700;
  color: #606c38;
`;

const ListItems = styled.li`
  margin: 32px 0px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: blue;
`;
export default CropDetails;
