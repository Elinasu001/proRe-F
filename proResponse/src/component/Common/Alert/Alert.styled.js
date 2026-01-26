import styled, { keyframes } from 'styled-components';

// 페이드인 애니메이션
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
  }
`;

// 배경 오버레이 (어두운 배경)
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

// Alert 컨테이너
export const AlertContainer = styled.div`
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    min-width: 280px;
    max-width: 90%;
    width: ${props => props.$width || '320px'};
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    animation: ${fadeIn} 0.3s ease-out;

    @media (max-width: 768px) {
        width: 90%;
        min-width: unset;
        padding: 20px;
    }
`;

// Alert 제목
export const AlertTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: #000;
    margin: 0 0 12px 0;
    text-align: center;
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 10px;
    }
`;

// Alert 메시지
export const AlertMessage = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0 0 24px 0;
    text-align: center;
    line-height: 1.6;
    white-space: pre-line; /* 줄바꿈 지원 */

    @media (max-width: 768px) {
        font-size: 13px;
        margin-bottom: 20px;
    }
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    justify-content: ${props => props.$single ? 'center' : 'space-between'};

    @media (max-width: 768px) {
        gap: 6px;
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

// 취소 버튼 (왼쪽, 회색)
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

// 확인 버튼 (오른쪽, 파란색)
export const ConfirmButton = styled(BaseButton)`
    background: ${props => props.$variant === 'danger' ? '#ff3b30' : 'var(--primary)'};
    color: #fff;

    &:hover:not(:disabled) {
        background: ${props => props.$variant === 'danger' ? '#e62e24' : '#0062cc'};
    }

    &:active:not(:disabled) {
        background: ${props => props.$variant === 'danger' ? '#cc2619' : '#004999'};
    }
`;
