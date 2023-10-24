import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

import Hamburger from "./Hamburger";
import BaseNavbar from "./BaseNavbar";
import NavLink from './NavLink';

const NavList = styled.ul`
  background: ${({ theme }) => theme.colors.background};
  padding-top: 7rem;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1001;
  list-style: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  top: ${props => (props.isOpen ? '0' : '-100%')};
  transition: top 0.5s ease; 
`;

const NavItem = styled.li`
  padding: 1.5rem 0;
  color: ${props => (props.isActive ? '#00aaff' : 'inherit')};
`;

const MobileNavbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const isActivePath = path => location.pathname === path;

    const routes = [
        { path: '/', label: 'MFM' },
        { path: '/watchlist', label: 'Watchlist' },

    ];

    return (
        <>
            <BaseNavbar setIsMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} location={location}>

                <Hamburger onClick={() => setMenuOpen(prev => !prev)} isOpen={isMenuOpen} />
            </BaseNavbar>

            <NavList isOpen={isMenuOpen}>
                {routes.map(route => (
                    <NavItem key={route.path} isActive={isActivePath(route.path)}>
                        <NavLink
                            isMobile={true}
                            to={route.path}
                            onClick={() => setMenuOpen(false)}
                            isActive={isActivePath(route.path)}
                        >
                            {route.label}
                        </NavLink>
                    </NavItem>
                ))}
            </NavList>
        </>
    );
};

export default MobileNavbar;