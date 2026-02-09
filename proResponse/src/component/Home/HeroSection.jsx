import { useNavigate } from 'react-router-dom';
import WaveBg from '../../assets/images/common/wave_bg.png';
import * as H from './HeroSection.styled.js';

const HeroSection = () => {
    const navigate = useNavigate();
    const handleGoQuote = () => {
        navigate('/quote');
    };
    return (
        <H.HeroContainer>
        {/* 배경 웨이브 이미지 */}
        <H.WaveBackgroundImg src={WaveBg} alt="wave background" />
        {/* 배경 웨이브 SVG (기존) */}
        <H.WaveBackground>
            <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 800"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            >
            <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                </linearGradient>
            </defs>
            {/* 웨이브 패턴 */}
            {Array.from({ length: 30 }).map((_, i) => (
                <path
                key={i}
                d={`M0,${200 + i * 10} Q360,${150 + i * 10 + Math.sin(i) * 50} 720,${200 + i * 10} T1440,${200 + i * 10}`}
                stroke="url(#waveGradient)"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
                />
            ))}
            </svg>
        </H.WaveBackground>

        {/* 메인 콘텐츠 */}
        <H.ContentWrapper>
            {/* 텍스트 영역 */}
            <H.TextContent>
                <H.MainTitle>
                    지금 필요한 견적 서비스를
                    <br />
                    받아보세요
                </H.MainTitle>
                <H.SubTitle>
                    전문가와 1:1 매칭 되어 원하시는 서비스를 받아보세요.
                </H.SubTitle>
                <H.CTAButton onClick={handleGoQuote}>
                    견적 요청 페이지
                    <span>→</span>
                </H.CTAButton>
            </H.TextContent>

            {/* 비주얼 영역 */}
            <H.VisualArea>
                {/* 중앙 아이콘 */}
                <H.CentralIcon>
                    <H.IconSVG viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    </H.IconSVG>
                </H.CentralIcon>

                {/* 떠다니는 원형 요소들 (애니메이션 없이 고정, 반응형 위치 지원) */}
                <H.FloatingCircle
                    color="#f6c667"
                    size="70px"
                    top="10%"
                    left="30%"
                    // mTop="8%"
                    // mLeft="12%"
                    // mSize="32px"
                />
                <H.FloatingCircle
                    color="#5dcea1"
                    size="60px"
                    top="20%"
                    left="60%"
                />
                <H.FloatingCircle
                    color="#6fb4e8"
                    size="80px"
                    top="15%"
                    left="85%"
                />
                <H.FloatingCircle
                    color="#ff7b7b"
                    size="55px"
                    top="45%"
                    left="5%"
                />
                <H.FloatingCircle
                    color="#6fb4e8"
                    size="65px"
                    top="50%"
                    left="20%"
                />
                <H.FloatingCircle
                    color="#5dcea1"
                    size="75px"
                    top="60%"
                    left="80%"
                />
                {/* <FloatingCircle
                    color="#5dcea1"
                    size="85px"
                    top="75%"
                    left="90%"
                /> */}
                <H.FloatingCircle
                    color="#6fb4e8"
                    size="60px"
                    top="75%"
                    left="20%"
                />
            </H.VisualArea>
        </H.ContentWrapper>
        </H.HeroContainer>
    );
};

export default HeroSection;
