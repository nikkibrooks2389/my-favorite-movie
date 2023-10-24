import { Outlet } from 'react-router-dom';
import Navbar from './NavBar/Navbar';
import styled from 'styled-components';


const Main = styled.main`
   
    min-height:100vh;
    padding: 100px 20px 20px 20px;


`;
const Layout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <Main>
                <Outlet />
            </Main>
        </div>
    );
}

export default Layout
