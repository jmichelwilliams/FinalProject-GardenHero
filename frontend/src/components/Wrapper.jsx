import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = ({ children }) => <StyledWrapper>{children}</StyledWrapper>;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefae0;
  height: 100vh;

  @media (max-width: 1180px) {
    align-items: center;
    text-align: center;
    margin: 0;
  }
`;
export default Wrapper;
