import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';
import Header from './../Header/Header.jsx';
import {
    LayoutContainer,
    MainContent,
    SkipLink
} from './Layout.styled';

const Layout = () => {
    return (
        <LayoutContainer>
            <SkipLink href="#main-content">
                메인 콘텐츠로 건너뛰기
            </SkipLink>
            <Header />
            <MainContent id="main-content" role="main">
                <Outlet />
            </MainContent>
            <Footer />
        </LayoutContainer>
    );
};

export default Layout;