import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = ({ className, children }) => (
  <StyledWrapper className={className}>{children}</StyledWrapper>
);

Wrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Wrapper.defaultProps = {
  className: '', // set default value to empty string
};
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefae0;

  @media (max-width: 1180px) {
    align-items: center;
    text-align: center;
    margin: 0;
  }
`;
export default Wrapper;
