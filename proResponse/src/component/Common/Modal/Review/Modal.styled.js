
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
  max-height: 89vh;
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


// 삭제 아이콘 이미지

export const DelImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

// =============================
// 이미지 확대(라이트박스) 스타일
// =============================
export const ImageLightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12000;
`;

export const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.4);
`;

export const LightboxCloseButton = styled.button`
  position: absolute;
  top: 32px;
  right: 48px;
  font-size: 2.5rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 12001;
  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    font-size: 2rem;
  }
`;