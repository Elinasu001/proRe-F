// CommonModal.jsx
import { useEffect } from 'react';
import * as S from './Review/Modal.styled';

const CommonModal = ({ isOpen, onClose, ariaLabelledby, children }) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!isOpen) return null;

    return (
        <S.Overlay onClick={handleOverlayClick}>
        <S.ModalContainer
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
        >
            {children}
        </S.ModalContainer>
        </S.Overlay>
    );
};

export default CommonModal;