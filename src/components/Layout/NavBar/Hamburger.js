import React, { useState } from 'react';
import styled from 'styled-components';

const HamburgerMenu = styled.div`
  width: 30px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const Line = styled.div`
width: 100%;
height: 2.5px;
background-color: ${props => props.theme.colors.text};
transition: all 0.3s ease;
position: relative;

&:nth-child(1) {
  transform: ${({ open }) => (open ? 'rotate(45deg)' : 'none')};
  transform-origin: left center;
}

&:nth-child(2) {
  opacity: ${({ open }) => (open ? '0' : '1')};
}

&:nth-child(3) {
  transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'none')};
  transform-origin: left center;
}
`;
const Hamburger = ({ onClick, isOpen }) => {

  return (
    <HamburgerMenu onClick={onClick}>
      <Line open={isOpen} />
      <Line open={isOpen} />
      <Line open={isOpen} />
    </HamburgerMenu>
  );
};
export default Hamburger;