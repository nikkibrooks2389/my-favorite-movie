
import React from 'react';
import DesktopNavbar from './DesktopNavBar';
import MobileNavbar from './MobileNavbar';
import useWindowSize from '../../../hooks/UseWindowSize';

const Navbar = () => {
  const windowSize = useWindowSize();

  return windowSize <= 1000 ? <MobileNavbar /> : <DesktopNavbar />;
};

export default Navbar;