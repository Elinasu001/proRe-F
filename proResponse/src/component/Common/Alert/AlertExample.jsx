import { useState } from 'react';
import Toast from '../Toast/Toast';
import useToast from '../Toast/useToast';
import Alert from './Alert';
import useAlert from './useAlert';

/**
 * Alert 사용 예제 컴포넌트
 */
const AlertExample = () => {
    // ========================================
    // 방법 1: useState로 직접 관리
    // ========================================
    const [simpleAlert, setSimpleAlert] = useState(false);
    const [confirmAlert, setConfirmAlert] = useState(false);
    const [dangerAlert, setDangerAlert] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
   
    // ========================================
    // 방법 2: useAlert 훅 사용 (권장)
    // ========================================
    const { alertState, openAlert, closeAlert } = useAlert();
    const { showToast, toastMessage, toastVariant, showToastMessage, closeToast } = useToast();

    // 간단한 알림 (확인만)
    const handleSimpleAlert = () => {
        openAlert({
            title: '알림',
            message: '작업이 완료되었습니다.',
            onConfirm: () => {
                console.log('확인 클릭됨');
                closeAlert();
            }
        });
    };

    // 확인/취소 알림
    const handleConfirmAlert = () => {
        openAlert({
            title: '리뷰 삭제 확인',
            message: '내가 작성한 리뷰를 삭제하시겠습니까?',
            confirmText: '확인',
            cancelText: '취소',
            onConfirm: () => {
                console.log('삭제 확인됨');
                // 실제 삭제 로직
                closeAlert();
            },
            onCancel: () => {
                console.log('취소됨');
                closeAlert();
            }
        });
    };

    // 위험한 작업 알림 (빨간색)
    const handleDangerAlert = () => {
        openAlert({
            title: '계정 삭제',
            message: '정말로 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.',
            variant: 'danger',
            confirmText: '삭제',
            cancelText: '취소',
            onConfirm: () => {
                console.log('계정 삭제 확인됨');
                // 실제 삭제 로직
                closeAlert();
            },
            onCancel: () => {
                console.log('취소됨');
                closeAlert();
            }
        });
    };

    // 커스텀 너비 알림
    const handleCustomWidthAlert = () => {
        openAlert({
            title: '긴 메시지',
            message: '이것은 더 넓은 Alert입니다. 긴 메시지를 표시할 때 유용합니다. 여러 줄의 텍스트를 포함할 수 있으며, 필요에 따라 너비를 조절할 수 있습니다.',
            width: '400px',
            onConfirm: closeAlert
        });
    };

    // 오버레이 클릭 방지
    const handleNoOverlayClose = () => {
        openAlert({
            title: '중요한 알림',
            message: '이 알림은 배경을 클릭해도 닫히지 않습니다.',
            closeOnOverlay: false,
            closeOnEsc: false,
            onConfirm: closeAlert
        });
    };

    // Toast 띄우기
    const handleToastOpen = () => {
        showToastMessage('토스트 메시지 예시입니다.', 'success');
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Alert 컴포넌트 사용 예제</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
            {/* useAlert 훅 사용 (권장) */}
            <h2>useAlert 훅 사용 (권장)</h2>
            <button onClick={handleSimpleAlert}>
            간단한 알림 (확인만)
            </button>
            <button onClick={handleConfirmAlert}>
            확인/취소 알림
            </button>
            <button onClick={handleDangerAlert}>
            위험한 작업 알림 (빨간색)
            </button>
            <button onClick={handleCustomWidthAlert}>
            커스텀 너비 알림
            </button>
            <button onClick={handleNoOverlayClose}>
            오버레이 클릭 방지
            </button>

            {/* useState 직접 사용 */}
            <h2 style={{ marginTop: '32px' }}>useState 직접 사용</h2>
            <button onClick={() => setSimpleAlert(true)}>
            간단한 알림 열기
            </button>
            <button onClick={() => setConfirmAlert(true)}>
            확인/취소 알림 열기
            </button>
            <button onClick={() => setDangerAlert(true)}>
            위험 알림 열기
            </button>

            {/* Toast 예시 */}
            <h2>Toast 예시</h2>
            <button onClick={handleToastOpen}>Toast 띄우기</button>
        </div>

        {/* useAlert 훅으로 관리되는 Alert */}
        <Alert {...alertState} />

        {/* useState로 직접 관리되는 Alert들 */}
        <Alert
            isOpen={simpleAlert}
            title="알림"
            message="작업이 완료되었습니다."
            onConfirm={() => setSimpleAlert(false)}
        />

        <Alert
            isOpen={confirmAlert}
            title="리뷰 삭제 확인"
            message="내가 작성한 리뷰를 삭제하시겠습니까?"
            confirmText="확인"
            cancelText="취소"
            onConfirm={() => {
            console.log('삭제 확인');
            setConfirmAlert(false);
            }}
            onCancel={() => setConfirmAlert(false)}
        />

        <Alert
            isOpen={dangerAlert}
            title="계정 삭제"
            message="정말로 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
            variant="danger"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={() => {
            console.log('계정 삭제');
            setDangerAlert(false);
            }}
            onCancel={() => setDangerAlert(false)}
        />

        <Toast
            isVisible={showToast}
            message={toastMessage}
            variant={toastVariant}
            onClose={closeToast}
        />
        </div>
    );
};

export default AlertExample;
