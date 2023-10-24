import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(Link)`
text-decoration: none;
position: relative;
color: ${props =>
        props.isActive
            ? props.theme.colors.secondary
            : props.theme.colors.text};
font-size: ${props => props.isMobile ? "3rem" : "2rem"};
cursor: pointer;
transition: color 0.3s ease;

&:hover {
  color: ${props =>
        !props.isActive && props.theme.colors.secondary};
}

&::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: ${props =>
        !props.isActive
            ? props.theme.colors.secondary
            : 'transparent'};
  transition: width 0.3s ease;
}

&:hover::after {
  width: 100%;
  background-color: ${props =>
        !props.isActive && props.theme.colors.secondary};
}
  transition: color 0.3s ease;
  }
`;

const NavLink = ({ to, isActive, onClick, children, isMobile = false }) => {

    return (
        <StyledNavLink onClick={onClick} to={to} isActive={isActive} isMobile={isMobile}>
            {children}
        </StyledNavLink>
    )

}

export default NavLink