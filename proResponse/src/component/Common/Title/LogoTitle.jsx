import {
    Highlight,
    LogoTitleWrapper,
    MainLine
} from './Title.styled';


const LogoTitle = () => (
  <LogoTitleWrapper>
    <MainLine>
      원하시는 <Highlight>전문가</Highlight>를 찾아
    </MainLine>
    <MainLine>
      <Highlight>견적 요청</Highlight>을 받아보세요!
    </MainLine>
  </LogoTitleWrapper>
);

export default LogoTitle;
