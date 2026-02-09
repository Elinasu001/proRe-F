import { useEffect } from 'react';
import * as S from './Alert.styled';

/**
 * Alert 컴포넌트
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Alert 표시 여부
 * @param {string} props.title - Alert 제목
 * @param {string} props.message - Alert 메시지
 * @param {function} props.onConfirm - 확인 버튼 클릭 시 콜백
 * @param {function} props.onCancel - 취소 버튼 클릭 시 콜백 (선택)
 * @param {string} props.confirmText - 확인 버튼 텍스트 (기본: "확인")
 * @param {string} props.cancelText - 취소 버튼 텍스트 (기본: "취소")
 * @param {string} props.variant - 버튼 스타일 ('default' | 'danger')
 * @param {string} props.width - Alert 너비 (기본: "320px")
 * @param {boolean} props.closeOnOverlay - 오버레이 클릭 시 닫기 (기본: true)
 * @param {boolean} props.closeOnEsc - ESC 키로 닫기 (기본: true)
 * 
 * @example
 * // 기본 사용 (확인만)
 * <Alert
 *   isOpen={isOpen}
 *   title="알림"
 *   message="작업이 완료되었습니다."
 *   onConfirm={() => setIsOpen(false)}
 * />
 * 
 * @example
 * // 확인/취소 버튼
 * <Alert
 *   isOpen={isOpen}
 *   title="리뷰 삭제 확인"
 *   message="내가 작성한 리뷰를 삭제하시겠습니까?"
 *   confirmText="확인"
 *   cancelText="취소"
 *   onConfirm={handleDelete}
 *   onCancel={() => setIsOpen(false)}
 * />
 * 
 * @example
 * // 위험한 작업 (빨간색 버튼)
 * <Alert
 *   isOpen={isOpen}
 *   title="계정 삭제"
 *   message="정말로 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
 *   variant="danger"
 *   confirmText="삭제"
 *   cancelText="취소"
 *   onConfirm={handleDeleteAccount}
 *   onCancel={() => setIsOpen(false)}
 * />
 */
const Alert = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    cancelText = '취소',
    confirmText = '확인',
    variant = 'default',
    width,
    closeOnOverlay = true,
    closeOnEsc = true
    }) => {
    /**
     * ESC 키로 Alert 닫기
     */
    useEffect(() => {
        if (!isOpen || !closeOnEsc) return;

        const handleEscape = (e) => {
        if (e.key === 'Escape') {
            if (onCancel) {
            onCancel();
            } else {
            onConfirm();
            }
        }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onConfirm, onCancel, closeOnEsc]);

    /**
     * 배경 스크롤 방지
     */
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

    /**
     * 오버레이 클릭 시 닫기
     */
    const handleOverlayClick = (e) => {
        if (closeOnOverlay && e.target === e.currentTarget) {
        if (onCancel) {
            onCancel();
        } else {
            onConfirm();
        }
        }
    };

    // Alert가 열려있지 않으면 렌더링하지 않음
    if (!isOpen) return null;

    // 취소 버튼이 있는지 확인
    const hasCancel = !!onCancel;

    return (
        <S.Overlay onClick={handleOverlayClick}>
        <S.AlertContainer 
            $width={width}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            aria-describedby="alert-message"
        >
            {/* 제목 */}
            {title && (
            <S.AlertTitle id="alert-title">
                {title}
            </S.AlertTitle>
            )}

            {/* 메시지 */}
            {message && (
                typeof message === 'string' ? (
                    <S.AlertMessage id="alert-message">{message}</S.AlertMessage>
                ) : (
                    <div id="alert-message">{message}</div>
                )
            )}

            {/* 버튼 그룹 */}
            <S.ButtonGroup $single={!hasCancel}>
            {/* 취소 버튼 (있을 경우만 표시) */}
            {hasCancel && (
                <S.CancelButton 
                onClick={onCancel}
                aria-label="취소"
                >
                {cancelText}
                </S.CancelButton>
            )}

            {/* 확인 버튼 */}
            <S.ConfirmButton 
                onClick={onConfirm}
                $variant={variant}
                aria-label="확인"
            >
                {confirmText}
            </S.ConfirmButton>
            </S.ButtonGroup>
        </S.AlertContainer>
        </S.Overlay>
    );
};

export default Alert;
