import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Wrapper from './Wrapper';

const CropLookup = () => {
  const [crops, setCrops] = useState([]);
  const [value, setValue] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch('/crops');
        if (!res.ok) {
          throw new Error('Failed to fetch crops');
        }
        const data = await res.json();
        if (!ignore) {
          setCrops(data.data);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      ignore = true;
    };
  }, []);

  const handleSelect = () => {
    window.alert('works');
  };

  const matchedSuggestions = crops.filter(
    (crop) =>
      crop.name.toLowerCase().includes(value.toLowerCase()) &&
      value.length >= 2,
  );

  return (
    <Wrapper>
      <RowWrapper>
        <SearchInput
          type="text"
          placeholder="Search Crop"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case 'Enter': {
                if (matchedSuggestions.length >= 2) {
                  handleSelect(
                    matchedSuggestions[selectedSuggestionIndex].name,
                  );
                }
                break;
              }
              case 'ArrowUp': {
                if (matchedSuggestions.length >= 2) {
                  setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                }
                break;
              }
              case 'ArrowDown': {
                if (matchedSuggestions.length >= 2) {
                  setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                }
                break;
              }
              default:
                break;
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: '60px',
            width: '150px',
            '@media (max-width: 1180px)': {
              width: '300px',
            },
          }}
        >
          Search
        </Button>
      </RowWrapper>
      {matchedSuggestions.length > 0 && (
        <SuggestionBox>
          <StyledSuggestions>
            {matchedSuggestions.map((suggestion, index) => {
              const indexOfSuggestion = suggestion.name
                .toLowerCase()
                .indexOf(value.toLowerCase());

              const firstSegment = suggestion.name.substring(
                0,
                indexOfSuggestion + value.length,
              );

              const secondSegment = suggestion.name.substring(
                indexOfSuggestion + value.length,
              );

              const isSelected =
                matchedSuggestions.indexOf(suggestion) ===
                selectedSuggestionIndex;

              return (
                <Suggestion
                  // eslint-disable-next-line no-underscore-dangle
                  key={suggestion._id}
                  onClick={() => handleSelect(suggestion.title)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  style={{
                    background: isSelected
                      ? 'hsla(50deg, 100%,80%,0.25)'
                      : 'transparent',
                  }}
                >
                  <span>
                    {firstSegment}
                    <Prediction>{secondSegment}</Prediction>
                  </span>
                </Suggestion>
              );
            })}
          </StyledSuggestions>
        </SuggestionBox>
      )}
    </Wrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 1180px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  width: 400px;
  background-color: white;
  height: 50px;
  margin-right: 8px;
  font-size: 24px;

  @media (max-width: 1180px) {
    font-size: 16px;
    margin: 0;
    width: 300px;
    margin-bottom: 16px;
  }
`;

const StyledSuggestions = styled.ul`
  border-radius: 4px;
  border: solid 1px #d9d4d4;
  list-style: none;
  margin: 0;
  padding: 10px;
  max-height: 250px;
  width: 385px;
  box-shadow: 10px 5px 5px lightgrey;
  overflow-y: scroll;
  font-size: 24px;
`;

const Suggestion = styled.li`
  padding: 8px;
  cursor: pointer;
`;

const Prediction = styled.span`
  font-weight: 700;
`;

const SuggestionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 80px;

  @media (max-width: 1180px) {
    align-items: center;
    text-align: center;
    margin: 0;
    width: 300px;
    position: relative;
    bottom: 240px;
  }
`;
export default CropLookup;
