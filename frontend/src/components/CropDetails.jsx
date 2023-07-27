import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from './Wrapper';

const CropDetails = () => {
  const [cropInfo, setCropInfo] = useState();
  const { cropName } = useParams();

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

  return (
    <StyledWrapper>
      <Box>
        <ImageContainer>image</ImageContainer>
        <div>Info</div>
      </Box>
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
  flex-direction: row;
  justify-content: center;
  box-sizing: content-box;
  border: solid #606c38 10px;
  width: 70vw;
`;

const ImageContainer = styled.div`
  display: flex;
  border: solid 1px black;
`;
export default CropDetails;
