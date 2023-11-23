import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  width: 100%;
  height: 80px;
  display: flex;
  transition: backdrop-filter 0.3s ease; /* Add a smooth transition effect for the blur */
  font-family: 'Bebas Neue', sans-serif;
  backdrop-filter: ${({ isScrolled }) =>
        isScrolled ? 'blur(15px)' : 'none'};
  padding: 2rem;
  z-index: 1005;
`;


const BaseNavbar = ({ children, location, setIsMenuOpen, isMenuOpen = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        setIsScrolled(window.scrollY > 0);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <NavbarContainer isMenuOpen={isMenuOpen} isScrolled={isScrolled}>
            {children}
        </NavbarContainer>
    );
};

export default BaseNavbar;