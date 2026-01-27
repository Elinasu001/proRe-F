import styled, { keyframes } from 'styled-components';

// ===================================
// 공통 애니메이션
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
// 공통 스타일
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
  max-width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0 16px 16px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }

  @media (max-width: 768px) {
    width: 95%;
    max-height: 90vh;
  }
`;

// 모달 헤더
export const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  position:sticky;
  top:0;
  background:#fff;
  z-index:1000;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px 20px 12px;
  }
`;

// 모달 제목
export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// 삭제 버튼
export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--default-color);
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

// ===================================
// ReviewViewModal 스타일
// ===================================

// 리뷰 내용 컨테이너
export const ReviewContent = styled.div`
  padding: 20px 24px;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

// 사용자 정보
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

// 사용자 아바타
export const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #666;
`;

// 사용자 상세 정보
export const UserDetails = styled.div`
  /* flex: 1; */
`;

// 사용자 이름
export const UserName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #000;
  margin-bottom: 4px;
`;

// 리뷰 날짜
export const ReviewDate = styled.div`
  font-size: 13px;
  color: #999;
`;

// 별점
export const Rating = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

// 이미지 갤러리
export const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 16px;
`;

// 리뷰 이미지
export const ReviewImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

// 빈 이미지 슬롯
export const EmptyImageSlot = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: 11px;
    color: #999;
  }
`;

// 리뷰 텍스트
export const ReviewText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin: 0 0 8px 0;
  white-space: pre-wrap;
  max-height: ${props => props.$collapsed ? '4.8em' : 'none'};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.$collapsed ? 3 : 'unset'};
  -webkit-box-orient: vertical;
`;

// 더보기 버튼
export const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

// 이미지 확대 모달
export const ImageLightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.2s ease-out;
  cursor: pointer;
`;

// 확대된 이미지
export const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
`;

// 이미지 닫기 버튼
export const LightboxCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  font-size: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// 태그 리스트
export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// 태그
export const Tag = styled.span`
  padding: 7px 14px;
  background: #f5f5f5;
  border-radius: 20px;
  font-size: 13px;
  color: #666;
`;

// ===================================
// ReviewWriteModal 스타일
// ===================================

// 작성 폼 컨테이너
export const WriteContent = styled.div`
  padding: 24px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// 별점 선택 섹션
export const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

// 별
export const Star = styled.button`
  background: none;
  border: none;
  width: 54px;
  cursor: pointer;
  transition: all 0.2s;
  filter: ${props => props.$filled ? 'grayscale(0%)' : 'grayscale(100%)'};
  opacity: ${props => props.$filled ? '1' : '0.2'};
  
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

export const StarImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const DelImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;


// 태그 선택 섹션
export const TagSelectSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

// 선택 가능한 태그
export const SelectableTag = styled.button`
  padding: 8px 16px;
  background: ${props => props.$selected ? 'var(--primary)' : '#f5f5f5'};
  color: ${props => props.$selected ? '#fff' : '#666'};
  border: none;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$selected ? 'var(--primary)' : '#e8e8e8'};
  }
`;

// ===================================
// 공통 버튼
// ===================================

// 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px 24px;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    padding: 12px 20px 20px;
  }
`;

// 기본 버튼 스타일
const BaseButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus-visible {
    outline: 2px solid #4a9eff;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`;

// 취소 버튼
export const CancelButton = styled(BaseButton)`
  background: #f5f5f5;
  color: #666;

  &:hover:not(:disabled) {
    background: #e8e8e8;
  }

  &:active:not(:disabled) {
    background: #ddd;
  }
`;

// 확인 버튼
export const ConfirmButton = styled(BaseButton)`
  background: var(--primary);
  color: #fff;

  &:hover:not(:disabled) {
    background: #0052cc;
  }

  &:active:not(:disabled) {
    background: #004099;
  }
`;
