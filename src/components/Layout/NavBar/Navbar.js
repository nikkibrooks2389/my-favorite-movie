import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


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


const StyledLink = styled(NavLink)`
  margin: 0 1rem;
  text-decoration: none;
  color: black;

  &.active {
    font-weight: bold;
    border-bottom: 2px solid black; // or any other indication you'd like for an active link
  }
`;

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavbarContainer>
            {/* <h1 style={{ color: 'white' }}>Logo</h1> */}
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                <div />
                <div />
                <div />
            </Hamburger>
            <NavItems open={isOpen}>
                <StyledLink to="/" activeClassName="active">Search</StyledLink>
                <StyledLink to="/watchlist" activeClassName="active">Watchlist</StyledLink>
            </NavItems>
        </NavbarContainer>
    );
}

export default Navbar;