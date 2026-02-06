import { useState } from 'react';
import Alert from '../../Common/Alert/Alert';
import useAlert from '../../Common/Alert/useAlert';
import Input from '../../Common/Input/Input.jsx';
import * as S from '../../Common/Input/Input.styled.js';
import usePayment from './usePayment';

const PaymentModal = ({ 
    open = true, 
    onClose, 
    onSuccess, 
    estimateNo,
    // buyerName = "고객명",
    // buyerTel = "010-0000-0000",
    // buyerEmail = "customer@example.com"
}) => {
    const { alertState, openAlert, closeAlert } = useAlert();
    const [amount, setAmount] = useState("");
    const [showPayModal, setShowPayModal] = useState(open);
    const { isProcessing, requestPayment } = usePayment();

    const handlePortOnePayment = async () => {
        const numAmount = Number(amount);
        const numEstimateNo = Number(estimateNo);

        // 유효성 검사
        if (!numAmount || numAmount <= 0) {
            openAlert({
                title: '결제 금액 오류',
                message: '결제 금액을 입력하세요.',
                onConfirm: closeAlert
            });
            return;
        }

        if (!numEstimateNo) {
            openAlert({
                title: '견적 정보 오류',
                message: '견적 번호가 올바르지 않습니다.',
                onConfirm: closeAlert
            });
            return;
        }

        // V2 결제 요청
        requestPayment(
            {
                amount: numAmount,
                itemName: `${numAmount.toLocaleString()}원 견적 결제`,
                estimateNo: numEstimateNo,
                payMethod: "card",
            },
            (result) => {
                console.log('[결제 성공]', result);
                openAlert({
                    title: '결제 완료',
                    message: `${numAmount.toLocaleString()}원 결제가 완료되었습니다.`,
                    onConfirm: () => {
                        closeAlert();
                        if (onSuccess) onSuccess(numAmount, result);
                        setShowPayModal(false);
                        if (onClose) onClose();
                    }
                });
            },
            (error) => {
                console.error('[결제 실패]', error);
                openAlert({
                    title: '결제 실패',
                    message: error?.message || '결제 중 오류가 발생했습니다.',
                    onConfirm: closeAlert
                });
            }
        );
    };

    const handleCancel = () => {
        setShowPayModal(false);
        if (onClose) onClose();
    };

    return (
        <>
            <Alert
                isOpen={showPayModal}
                title="결제하기"
                message={
                    <div style={{ minWidth: 260 }}>
                        <div style={{ marginBottom: 16 }}>
                            결제 금액을 입력하고 확인 버튼을 눌러주세요.
                        </div>
                        <Input
                            type="number"
                            value={amount}
                            min={0}
                            onChange={e => {
                                const val = e.target.value.replace(/^0+(?=\d)/, "");
                                setAmount(val);
                            }}
                            placeholder="금액을 입력하세요"
                            style={{ width: '100%', marginBottom: 16 }}
                            disabled={isProcessing}
                        />
                        <S.MountText>
                            {isProcessing 
                                ? '결제 진행 중...' 
                                : `${amount ? Number(amount).toLocaleString() : '0'}원 결제하기`
                            }
                        </S.MountText>
                    </div>
                }
                onConfirm={handlePortOnePayment}
                onCancel={handleCancel}
                confirmText={isProcessing ? "처리 중..." : "결제하기"}
                cancelText="취소"
                confirmDisabled={isProcessing}
                closeOnOverlay={!isProcessing}
                closeOnEsc={!isProcessing}
            />
            <Alert {...alertState} />
        </>
    );
};

export default PaymentModal;