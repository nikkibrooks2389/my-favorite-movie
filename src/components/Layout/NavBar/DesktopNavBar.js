import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BaseNavbar from "./BaseNavbar";
import NavLink from "./NavLink";

const NavList = styled.ul`
  align-items: center;
  list-style: none;
  font-weight: 500;
  display: flex;
  width: 80%;

  gap: 2.5rem;
  margin: 0;
  padding: 0;
`;

const DesktopNavbar = () => {
    const location = useLocation();
    const isActivePath = path => location.pathname === path;

    const routes = [
        { path: '/', label: 'MFM' },
        { path: '/watchlist', label: 'Watchlist' },

    ];

    return (
        <BaseNavbar location={location}>
            <NavList>
                {routes.map(route => (
                    <li key={route.path}>
                        <NavLink to={route.path} isActive={isActivePath(route.path)}>
                            {route.label}
                        </NavLink>
                    </li>
                ))}

            </NavList>
        </BaseNavbar>
    );
};

export default DesktopNavbar;