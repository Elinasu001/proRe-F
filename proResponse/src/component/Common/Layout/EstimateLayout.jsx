import { EstimateContent } from './EstimateLayout.styled';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';
import Header from './../Header/Header.jsx';
import {
    LayoutContainer,
    SkipLink
} from '../Layout/Layout.styled';

const EstimateLayout = ({ children }) => {
    return (
        
       <LayoutContainer>
            <SkipLink href="#main-content">
                메인 콘텐츠로 건너뛰기
            </SkipLink>
            <Header />
            <EstimateContent id="main-content" role="main">
                {children}
                <Outlet />
            </EstimateContent>
            <Footer />
        </LayoutContainer>
    );
}

export default EstimateLayout;