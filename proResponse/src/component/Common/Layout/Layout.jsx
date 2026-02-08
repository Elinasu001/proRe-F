import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';
import Header from './../Header/Header.jsx';
import {
    LayoutContainer,
    MainContent,
    SkipLink
} from './Layout.styled';

const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    return (
        <LayoutContainer>
            <SkipLink href="#main-content">
                메인 콘텐츠로 건너뛰기
            </SkipLink>
            <Header />
            <MainContent id="main-content" role="main" $isHome={isHome}>
                <Outlet />
            </MainContent>
            <Footer />
        </LayoutContainer>
    );
};

export default Layout;