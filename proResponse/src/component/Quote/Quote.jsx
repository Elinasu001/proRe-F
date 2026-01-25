import {
    Highlight,
    LogoTitleWrapper,
    MainLine
} from './../Common/Title/Title.styled';
import NavigationHeader from './NavigationHeader';

const Quote = () => {
    return <>
        <LogoTitleWrapper>
            <MainLine>
            원하시는 <Highlight>전문가</Highlight>를 찾아
            </MainLine>
            <MainLine>
            <Highlight>견적 요청</Highlight>을 받아보세요!
            </MainLine>
        </LogoTitleWrapper>

        <NavigationHeader/>


    
    </>;
};

export default Quote;
