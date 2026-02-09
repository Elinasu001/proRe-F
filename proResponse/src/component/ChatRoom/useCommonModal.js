import { useEffect } from 'react';

/**
 * useCommonModal - 모달 공통 기능(ESC 닫기, 배경 스크롤 방지)
 * @param {boolean} isOpen - 모달 열림 여부
 * @param {function} onClose - 닫기 콜백
 */
export default function useCommonModal(isOpen, onClose) {
    // 배경 스크롤 방지 및 복구
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // ESC 키로 닫기
    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);
}