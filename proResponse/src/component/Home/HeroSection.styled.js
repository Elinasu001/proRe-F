import styled, { keyframes } from 'styled-components';

// 떠다니는 애니메이션
export const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

export const floatSlow = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-15px) translateX(10px);
  }
`;

export const floatReverse = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
`;

// 메인 컨테이너
export const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 500px;
  background: #043873;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

    @media (max-width: 768px) {
        min-height: 400px;
    }
`;

// 배경 웨이브 SVG 컨테이너
export const WaveBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  pointer-events: none;
`;


// 배경 웨이브 이미지
export const WaveBackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
`;


// 콘텐츠 래퍼
export const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 배경 웨이브 이미지가 텍스트 영역까지 보이도록 z-index 조정 */
  z-index: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

// 텍스트 영역
export const TextContent = styled.div`
  flex: 1;
  color: white;
`;

export const MainTitle = styled.h1`
  font-size: var(--font38);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  color: white;

  @media (max-width: 768px) {
    font-size: var(--font28);
  }
`;

export const SubTitle = styled.p`
  font-size: var(--font18);
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: var(--font16);
  }
`;

export const CTAButton = styled.button`
  background: #4F9CF9;
  color: white;
  border: none;
  padding: 16px 20px;
  font-size:var(--font16);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
  gap: 8px;
  display: inline-flex;

  &:hover {
    background: #4a89ca;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(0);
  }
`;

// 비주얼 영역 (오른쪽)
export const VisualArea = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;

  @media (max-width: 768px) {
    ${'' /* margin-top: 60px; */}
   display:none;
  }
`;

// 중앙 아이콘 컨테이너 (애니메이션 제거)
export const CentralIcon = styled.div`
  position: relative;
  z-index: 10;
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    @media (max-width: 768px) {
        display:none;
    }
`;

// 아이콘 SVG
export const IconSVG = styled.svg`
  width: 60px;
  height: 60px;
  fill: #5b9adb;

`;

// 떠다니는 원형 요소들 (애니메이션 없이 고정, 반응형 위치 지원)
export const FloatingCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color || '#5b9adb'};
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  opacity: 0.8;

  @media (max-width: 768px) {
    display:none;
    ${'' /* top: ${props => props.mTop || props.top || '50%'};
    left: ${props => props.mLeft || props.left || '50%'};
    width: ${props => props.mSize || props.size || '40px'};
    height: ${props => props.mSize || props.size || '40px'}; */}
  }
`;