import PortOne from '@portone/browser-sdk/v2';
import { useState } from 'react';
import { PORTONE_STORE_ID, PORTONE_CHANNEL_KEY } from '../../../api/reqApi.js';
import Alert from '../../Common/Alert/Alert';
import useAlert from '../../Common/Alert/useAlert';
import Input from '../../Common/Input/Input.jsx';
import * as S from '../../Common/Input/Input.styled.js';

/**
 * 결제 + 리뷰 통합 모달
 */
const PaymentModal = ({ open = true, onClose, onSuccess }) => {
    // 공통 Alert
    const { alertState, openAlert, closeAlert } = useAlert();
    // 결제 금액 입력 (문자열로 관리)
    const [amount, setAmount] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const [showPayModal, setShowPayModal] = useState(open); // 외부에서 제어 가능

    // 결제창 띄우기
    const handlePortOnePayment = async () => {
        const numAmount = Number(amount);
        if (!numAmount || numAmount <= 0) {
            openAlert({
                title: '결제 금액 오류',
                message: '결제 금액을 입력하세요.',
                onConfirm: closeAlert
            });
            return;
        }
        setIsPaying(true);
        try {
            const paymentId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
            const payment = await PortOne.requestPayment({
                storeId: PORTONE_STORE_ID,
                channelKey: PORTONE_CHANNEL_KEY,
                paymentId,
                orderName: numAmount + '원 송금',
                totalAmount: numAmount,
                currency: 'KRW',
                payMethod: 'CARD',
                customData: {},
            });
            if (payment.code !== undefined) {
                openAlert({
                    title: '결제 실패',
                    message: payment.message,
                    onConfirm: closeAlert
                });
                setIsPaying(false);
                return;
            }
            closeAlert();
            if (onSuccess) onSuccess(numAmount);
        } catch (error) {
            openAlert({
                title: '결제 오류',
                message: error?.message || '결제 중 오류가 발생했습니다.',
                onConfirm: closeAlert
            });
        } finally {
            setIsPaying(false);
        }
    };

    // 취소 버튼 클릭 시 모달 닫기
    const handleCancel = () => {
        setShowPayModal(false);
        // 외부에서 onClose prop이 있으면 호출
        if (onClose) onClose();
    };

    // 외부에서 다시 열기 위해 showPayModal 상태를 props로 제어할 수 있도록 함
    // (부모에서 <PaymentModal open={show} onClose={() => setShow(false)} /> 형태로 사용)

    return (
        <>
            <Alert
                isOpen={showPayModal}
                title="결제 테스트"
                message={
                    <div style={{ minWidth: 260 }}>
                        <div style={{ marginBottom: 16 }}>결제 금액을 입력하고 확인 버튼을 눌러주세요.</div>
                        <Input
                            type="number"
                            value={amount}
                            min={0}
                            onChange={e => {
                                // 앞자리 0 자동 제거
                                const val = e.target.value.replace(/^0+(?=\d)/, "");
                                setAmount(val);
                            }}
                            placeholder="금액을 입력하세요"
                            style={{ width: '100%', marginBottom: 16 }}
                        />
                        <S.MountText>
                            {isPaying ? '결제 진행 중...' : `${amount ? Number(amount).toLocaleString() : ''}원 결제하기`}
                        </S.MountText>
                    </div>
                }
                onConfirm={handlePortOnePayment}
                onCancel={handleCancel}
                closeOnOverlay={false}
                closeOnEsc={false}
            />
            <Alert {...alertState} />
        </>
    );
};

export default PaymentModal;
