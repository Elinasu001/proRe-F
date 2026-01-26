import { useCallback, useState } from 'react';

/**
 * useAlert - Alert를 더 쉽게 사용하기 위한 커스텀 훅
 * 
 * @returns {Object} Alert 제어 객체
 * @returns {boolean} alertState.isOpen - Alert 열림 상태
 * @returns {Object} alertState.config - Alert 설정
 * @returns {function} openAlert - Alert 열기
 * @returns {function} closeAlert - Alert 닫기
 * 
 * @example
 * const { alertState, openAlert, closeAlert } = useAlert();
 * 
 * // Alert 열기
 * openAlert({
 *   title: '알림',
 *   message: '작업이 완료되었습니다.',
 *   onConfirm: () => {
 *     console.log('확인 클릭');
 *     closeAlert();
 *   }
 * });
 * 
 * // JSX에서 사용
 * <Alert {...alertState} />
 */
const useAlert = () => {
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: '확인',
        cancelText: '취소',
        variant: 'default',
        onConfirm: null,
        onCancel: null,
        width: undefined,
        closeOnOverlay: true,
        closeOnEsc: true
    });

    /**
   * Alert 열기
   * @param {Object} config - Alert 설정
   */
    const openAlert = useCallback((config) => {
        setAlertState({
        isOpen: true,
        title: config.title || '',
        message: config.message || '',
        confirmText: config.confirmText || '확인',
        cancelText: config.cancelText || '취소',
        variant: config.variant || 'default',
        onConfirm: config.onConfirm || null,
        onCancel: config.onCancel || null,
        width: config.width || undefined,
        closeOnOverlay: config.closeOnOverlay !== undefined ? config.closeOnOverlay : true,
        closeOnEsc: config.closeOnEsc !== undefined ? config.closeOnEsc : true
        });
    }, []);

    /**
     * Alert 닫기
     */
    const closeAlert = useCallback(() => {
        setAlertState(prev => ({
        ...prev,
        isOpen: false
        }));
    }, []);

    return {
        alertState,
        openAlert,
        closeAlert
    };
};

export default useAlert;
