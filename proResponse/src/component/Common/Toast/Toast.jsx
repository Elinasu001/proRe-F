
import { useEffect } from 'react';
import { Toast as BsToast } from 'react-bootstrap';
import { StyledToast, StyledToastContainer, ToastIcon } from './Toast.styled';


/**
 * Toast 컴포넌트
 * @param {boolean} isOpen - 토스트 표시 여부
 * @param {string} message - 토스트 메시지
 * @param {number} duration - 표시 시간(ms, 기본 2000)
 */

const Toast = ({ message, isVisible, onClose, variant = 'success' }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000); // 3초 후 자동 닫기

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const getIcon = () => {

        switch (variant) {
            case 'success':
                return 'bi-check-circle-fill';
            case 'error':
                return 'bi-x-circle-fill';
            case 'warning':
                return 'bi-exclamation-triangle-fill';
            case 'info':
                return 'bi-info-circle-fill';
            default:
                return 'bi-check-circle-fill';
        }
    };

    return (
        <StyledToastContainer>
            <StyledToast show={isVisible} onClose={onClose} delay={3000} autohide $variant={variant}>
                <BsToast.Body>
                    <ToastIcon className={`bi ${getIcon()}`} $variant={variant} />
                    <span>{message}</span>
                </BsToast.Body>
            </StyledToast>
        </StyledToastContainer>
    );
};

export default Toast;