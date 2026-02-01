import usePayment from './usePayment';

/**
 * 결제 버튼 컴포넌트
 */
const PaymentButton = ({
    amount, 
    itemName, 
    buyerInfo,
    onPaymentSuccess,
    onPaymentFail,
    buttonText = '결제하기',
    style = {}
    }) => {
    const { isProcessing, requestPayment } = usePayment();

    const handlePayment = () => {
        const paymentData = {
        amount,
        itemName,
        payMethod: 'card',
        buyerEmail: buyerInfo.email,
        buyerName: buyerInfo.name,
        buyerTel: buyerInfo.tel,
        buyerAddr: buyerInfo.addr,
        buyerPostcode: buyerInfo.postcode,
        };

        requestPayment(
        paymentData,
        (result) => {
            alert('결제가 완료되었습니다!');
            onPaymentSuccess && onPaymentSuccess(result);
        },
        (error) => {
            alert(`결제 실패: ${error.message}`);
            onPaymentFail && onPaymentFail(error);
        }
        );
    };

    return (
        <button
        onClick={handlePayment}
        disabled={isProcessing}
        style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: isProcessing ? '#cccccc' : '#0066ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            ...style
        }}
        >
        {isProcessing ? '결제 처리 중...' : buttonText}
        </button>
    );
};

export default PaymentButton;