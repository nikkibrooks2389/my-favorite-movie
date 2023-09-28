import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
`;

const Hamburger = styled.div`
  width: 30px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  div {
    width: 30px;
    height: 4px;
    background-color: black;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavItems = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};

  @media (min-width: 768px) {
    display: block;
  }
`;

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavbarContainer>
            <h1 style={{ color: 'white' }}>Logo</h1>
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                <div />
                <div />
                <div />
            </Hamburger>
            <NavItems open={isOpen}>
                {/* You can add your navigation items here */}
                <p>Item 1</p>
                <p>Item 2</p>
                <p>Item 3</p>
            </NavItems>
        </NavbarContainer>
    );
}

export default Navbar;