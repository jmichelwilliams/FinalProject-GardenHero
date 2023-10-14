import React from 'react';
import styled from 'styled-components';

interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefae0;
  height: 100vh;

  @media (max-width: 1180px) {
    align-items: center;
    text-align: center;
    margin: 0;
    height: 100vh;
  }
`;

// Styling component used in every page.
const Wrapper: React.FC<WrapperProps> = ({ className, children }) => (
  <StyledWrapper className={className}>{children}</StyledWrapper>
);

export default Wrapper;
