import styled, { keyframes } from 'styled-components';

// ===================================
// 애니메이션
// ===================================
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// ===================================
// 레이아웃
// ===================================

// 배경 오버레이
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;
`;

// 모달 컨테이너
export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    width: 95%;
    max-height: 95vh;
  }
`;

// 모달 헤더
export const ModalHeader = styled.div`
  padding: 24px 24px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 20px 20px 16px;
  }
`;

// 모달 제목
export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0 0 4px 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

// 모달 부제목
export const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

// 닫기 버튼
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

// 스크롤 가능한 컨텐츠 영역
export const ScrollContent = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// ===================================
// 전문가 정보 헤더
// ===================================

export const ExpertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ExpertInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ExpertAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  background: #f5f5f5;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const ExpertDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ExpertName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const RatingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StarIcon = styled.span`
  font-size: 16px;
`;

export const RatingText = styled.span`
  font-size: 14px;
  color: #666;
`;

// 찜하기 버튼
export const FavoriteButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s;
  filter: ${props => props.$isFavorite ? 'grayscale(0%)' : 'grayscale(100%)'};
  opacity: ${props => props.$isFavorite ? '1' : '0.3'};

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 구분선
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #E8E8E8;
  margin: 20px 0;
`;

// ===================================
// 정보 섹션
// ===================================

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const InfoIcon = styled.span`
  font-size: 18px;
  width: 24px;
  text-align: center;
`;

export const InfoText = styled.span`
  font-size: 14px;
  color: #333;
`;

// ===================================
// 탭 버튼
// ===================================

export const TabButtons = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  border-bottom: 2px solid #f0f0f0;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  color: ${props => props.$isActive ? '#0066ff' : '#999'};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.$isActive ? '#0066ff' : 'transparent'};
    transition: all 0.2s;
  }

  &:hover {
    color: ${props => props.$isActive ? '#0066ff' : '#666'};
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

// ===================================
// 서비스 설명 섹션
// ===================================

export const ServiceSection = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;
`;

export const ServiceDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin: 0;
  white-space: pre-wrap;
`;

// ===================================
// 사진 섹션
// ===================================

export const PhotoSection = styled.div`
  margin-bottom: 20px;
`;

// 메인 이미지 컨테이너
export const MainImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #f5f5f5;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;

  span {
    font-size: 14px;
    color: #999;
  }
`;

// 썸네일 컨테이너
export const ThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const ThumbnailWrapper = styled.div`
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: ${props => props.$hasImage ? 'pointer' : 'default'};
  border: 2px solid ${props => props.$isActive ? '#0066ff' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    ${props => props.$hasImage && `
      border-color: #0066ff;
      opacity: 0.8;
    `}
  }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NoImageThumbnail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;

  span {
    font-size: 11px;
    color: #999;
  }
`;
