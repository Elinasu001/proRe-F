import { useState } from 'react';
import Alert from '../../Common/Alert/Alert';
import useAlert from '../../Common/Alert/useAlert';
import PaymentButton from './PaymentButton';

/**
 * 결제 + 리뷰 통합 예제
 */
const PaymentExample = () => {
    
    // 공통 Alert
    const { alertState, openAlert, closeAlert } = useAlert();

        // 로그인 사용자 정보 (예시)
        const user = {
            name: '홍길동', // 실제 로그인 정보로 대체
            email: 'test@example.com',
            tel: '010-1234-5678',
        };

        // 예시: 전문가가 보낸 견적 데이터
        const estimate = {
            price: 120000, // 실제 견적 금액
            expertName: '김전문가',
            serviceTitle: '에어컨 청소'
        };

        // 견적 금액으로 amount 세팅
        const [amount, setAmount] = useState(estimate.price);

    // 결제 성공 핸들러
        const handlePaymentSuccess = (result) => {
                console.log('결제 성공:', result);
                openAlert({
                        title: '결제 완료',
                        message: '결제가 성공적으로 처리되었습니다.',
                        onConfirm: () => {
                                closeAlert();
                                // 결제 성공 후 리뷰 작성 모달 열기
                                openWriteModal(
                                    [],
                                    (reviewData) => {
                                        console.log('리뷰 제출:', reviewData);
                                        openAlert({
                                            title: '리뷰 완료',
                                            message: '리뷰가 제출되었습니다!',
                                            onConfirm: closeAlert
                                        });
                                        closeModals();
                                    }
                                );
                        }
                });
        };

    // 결제 실패 핸들러
    const handlePaymentFail = (error) => {
        console.error('결제 실패:', error);
    };

    return (
                <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                    <h1>포트원 결제 + 리뷰 시스템</h1>

                    <div style={{ 
                        marginTop: '32px',
                        padding: '24px',
                        background: '#f8f9fa',
                        borderRadius: '12px'
                    }}>
                        <h2>결제 테스트</h2>
                        <label>
                            금액:
                            <input
                                type="number"
                                value={amount}
                                onChange={e => setAmount(Number(e.target.value))}
                                style={{ marginLeft: 8 }}
                            />
                        </label>
                        <div style={{ marginTop: '20px' }}>
                            <PaymentButton
                                amount={amount}
                                itemName={amount + '원 결제'}
                                buyerInfo={user}
                                onPaymentSuccess={handlePaymentSuccess}
                                onPaymentFail={handlePaymentFail}
                                buttonText={`${amount.toLocaleString()}원 결제하기`}
                            />
                        </div>
                    </div>

        {/* 공통 Alert */}
        <Alert {...alertState} />
        </div>
    );
};

export default PaymentExample;