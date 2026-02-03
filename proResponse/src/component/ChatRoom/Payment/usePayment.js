import { useCallback, useState } from 'react';
import paymentApi from '../../../api/payment/paymentApi';

/**
 * 포트원 결제 커스텀 훅
 */
const usePayment = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * 결제 요청
     */
    const requestPayment = useCallback(async (paymentData, onSuccess, onFail) => {
        if (isProcessing) return;

        setIsProcessing(true);

        try {
                // 1. 결제 사전 등록
                const prepareParams = {
                    amount: paymentData.amount,
                    itemName: paymentData.itemName,
                };
                const prepareResult = await paymentApi.prepare(prepareParams);
                if (!prepareResult.success) {
                    onFail && onFail({ message: prepareResult.message });
                    setIsProcessing(false);
                    return;
                }
                const { merchantUid } = prepareResult;

        // 2. 포트원 결제 요청
        const IMP = window.IMP;
        IMP.init(process.env.REACT_APP_PORTONE_IMP_CODE);

        IMP.request_pay(
            {
            pg: 'tosspayments',
            pay_method: paymentData.payMethod || 'card',
            merchant_uid: merchantUid,
            name: paymentData.itemName,
            amount: paymentData.amount,
            buyer_email: paymentData.buyerEmail,
            buyer_name: paymentData.buyerName,
            buyer_tel: paymentData.buyerTel,
            buyer_addr: paymentData.buyerAddr || '',
            buyer_postcode: paymentData.buyerPostcode || '',
            },
            async (response) => {
            if (response.success) {
                // 3. 결제 검증
                                const verifyParams = {
                                    impUid: response.imp_uid,
                                    merchantUid: response.merchant_uid,
                                };
                                const verifyResult = await paymentApi.verify(verifyParams);
                                if (verifyResult.success) {
                                    onSuccess && onSuccess(verifyResult);
                                } else {
                                    onFail && onFail(verifyResult);
                                }
            } else {
                onFail && onFail({
                message: response.error_msg || '결제에 실패했습니다.',
                });
            }

            setIsProcessing(false);
            }
        );
        } catch (error) {
        console.error('결제 처리 실패:', error);
        onFail && onFail({ message: '결제 처리 중 오류가 발생했습니다.' });
        setIsProcessing(false);
        }
    }, [isProcessing]);

    /**
     * 결제 취소
     */
    const cancelPayment = useCallback(async (impUid, reason, onSuccess, onFail) => {
        try {
                const params = {
                    impUid,
                    reason,
                };
                const result = await paymentApi.cancel(params);
                if (result.success) {
                    onSuccess && onSuccess(result);
                } else {
                    onFail && onFail(result);
                }
        } catch (error) {
        console.error('결제 취소 실패:', error);
        onFail && onFail({ message: '결제 취소 중 오류가 발생했습니다.' });
        }
    }, []);

    return {
        isProcessing,
        requestPayment,
        cancelPayment,
    };
};

export default usePayment;