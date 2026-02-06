import { useCallback, useState } from 'react';
import paymentApi from '../../../api/payment/paymentApi';
import { PORTONE_CHANNEL_KEY } from '../../../api/reqApi';


/**
 * 포트원 결제 커스텀 훅
 */
const usePayment = () => {
    
    const [isProcessing, setIsProcessing] = useState(false);
    // const { showToastMessage } = useToast();

    /**
     * 결제 요청
     */
    const requestPayment = useCallback(async (params, onSuccess, onFail) => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            // 1. 프론트에서 고유 merchantUid 생성
            const merchantUid =
                (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
                `mid_${Date.now()}_${Math.floor(Math.random() * 100000)}`;


            // 2. 결제 사전 등록
            const prepareParams = {
                amount: params.amount,
                itemName: params.itemName,
                merchantUid, // 프론트에서 생성한 값 사용
                // roomNo: params.roomNo,
                estimateNo: Number(params.estimateNo),
            };

            console.log('[결제] amount:', prepareParams.amount);
            console.log('[결제] prepareParams:', prepareParams);
            console.log('[결제] requestPayment params:', params);
            //  결제 준비 API 호출
            const prepareResult = await paymentApi.prepare(prepareParams);
            if (!prepareResult.success) {
                onFail && onFail({ message: prepareResult.message });
                setIsProcessing(false);
                return;
            }

            // 3. 포트원 결제 요청
            const IMP = window.IMP;
            if(!IMP) {
                onFail && onFail({ message: '결제 모듈 로드에 실패했습니다.' });
                setIsProcessing(false);
                return;
            }
            console.log('PORTONE_CHANNEL_KEY:', PORTONE_CHANNEL_KEY);
            if (!PORTONE_CHANNEL_KEY) {
                onFail && onFail({ message: 'PORTONE_CHANNEL_KEY가 설정되지 않았습니다. 환경 변수 또는 config.js를 확인하세요.' });
                setIsProcessing(false);
                return;
            }
            IMP.init(PORTONE_CHANNEL_KEY);
            IMP.request_pay(
                {
                    pg: 'tosspayments',
                    pay_method: params.payMethod || 'card',
                    merchant_uid: merchantUid,
                    name: params.itemName,
                    amount: params.amount,
                    buyer_email: params.buyerEmail,
                    buyer_name: params.buyerName,
                    buyer_tel: params.buyerTel,
                    buyer_addr: params.buyerAddr || '',
                    buyer_postcode: params.buyerPostcode || '',
                },
                async (res) => {
                    if (res.success) {
                        // 4. 결제 검증
                        const verifyParams = {
                            impUid: res.imp_uid,
                            merchantUid: res.merchant_uid,
                        };
                        const verifyResult = await paymentApi.verify(verifyParams);
                        if (verifyResult.success) {
                            onSuccess && onSuccess(verifyResult);
                        } else {
                            onFail && onFail(verifyResult);
                        }
                    } else {
                        onFail && onFail({
                            message: res.error_msg || '결제에 실패했습니다.',
                        });
                    }
                    setIsProcessing(false);
                }
            );
        } catch (error) {
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