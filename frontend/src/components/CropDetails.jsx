import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from './Wrapper';

const CropDetails = () => {
  const [cropInfo, setCropInfo] = useState();
  const { cropName } = useParams();
  const imageBasePath = '/images/';
  let imageSrc = null;

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

    // Cleanup function
    return () => {
      ignore = true;
    };
  }, [cropName]);

  if (cropInfo) {
    const nameWithNoSpaces = cropInfo.name.split(' ').join('');
    imageSrc = `${imageBasePath}${nameWithNoSpaces}.jpeg`;
  }

  return (
    <StyledWrapper>
      {!cropInfo ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <ImageContainer src={imageSrc} />
          <InfoContainer>
            <Title>Crop Details</Title>
            <SubTitle>{cropInfo.name}</SubTitle>
            <InfoList>
              <ListItems>
                <BoldSpan>Soil type:&nbsp;</BoldSpan>
                {cropInfo.soil}
              </ListItems>
              <ListItems>
                <BoldSpan>Ideal Temperature:&nbsp;</BoldSpan>
                {cropInfo.temperature}ºF
              </ListItems>
              <ListItems>
                <BoldSpan>Planting Season:&nbsp;</BoldSpan>
                {cropInfo.plantingSeason}
              </ListItems>
              <ListItems>
                <BoldSpan>Days to Harvest:&nbsp;</BoldSpan>
                {cropInfo.daysToHarvest}
              </ListItems>
              <StyledLink to={cropInfo.url}>Additional Info</StyledLink>
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
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  border: solid #606c38 10px;
  width: 70vw;
  align-items: center;
  border-radius: 16px;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 1000px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 100%;
  background-position: center;
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
