import { Outlet } from 'react-router-dom';
import Navbar from './NavBar/Navbar';
import Breadcrumbs from '../common/Breadcrumbs';


const Layout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <main>
                <Breadcrumbs />
                <Outlet />
            </main>
        </div>
    );
}

export default Layout
