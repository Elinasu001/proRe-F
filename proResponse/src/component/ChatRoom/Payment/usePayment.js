import { useCallback, useState } from 'react';
import paymentApi from '../../../api/payment/paymentApi';
import { PORTONE_STORE_ID, PORTONE_CHANNEL_KEY } from '../../../api/reqApi';

/**
 * 포트원 V2 결제 커스텀 훅
 */
const usePayment = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * 결제 요청 (V2)
     */
    const requestPayment = useCallback(async (params, onSuccess, onFail) => { 
        if (isProcessing) return;
        setIsProcessing(true);
        
        try {
            // 1. 고유 merchantUid 생성
            const merchantUid = window.crypto?.randomUUID?.() || 
                `payment-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

            // 2. 결제 사전 등록
            const prepareParams = {
                merchantUid,
                amount: params.amount,
                itemName: params.itemName,
                estimateNo: Number(params.estimateNo),
            };

            console.log('[결제 준비] prepareParams:', prepareParams);

            const prepareResult = await paymentApi.prepare(prepareParams);
            if (!prepareResult.success) {
                onFail?.(prepareResult);
                setIsProcessing(false);
                return;
            }

            // 3. 환경변수 검증
            if (!PORTONE_STORE_ID || !PORTONE_CHANNEL_KEY) {
                onFail?.({ message: '포트원 설정이 올바르지 않습니다.' });
                setIsProcessing(false);
                return;
            }

            console.log('[포트원 V2] 결제 요청 - paymentId:', merchantUid);

            // 4. 포트원 V2 결제 요청 (window.PortOne)
            const response = await window.PortOne.requestPayment({
                storeId: PORTONE_STORE_ID,
                channelKey: PORTONE_CHANNEL_KEY,
                paymentId: merchantUid,
                orderName: params.itemName,
                totalAmount: params.amount,
                currency: "CURRENCY_KRW",
                payMethod: params.payMethod?.toUpperCase() || "CARD",
                customer: {
                    fullName: params.buyerName,
                    phoneNumber: params.buyerTel,
                    email: params.buyerEmail,
                },
                customData: {
                    estimateNo: params.estimateNo,
                    roomNo: params.roomNo,
                },
            });

            console.log('[포트원 V2] 결제 응답:', response);

            // 5. 결제 결과 처리
            if (response.code != null) {
                console.error('[포트원 V2] 결제 실패:', response);
                onFail?.({
                    message: response.message || '결제에 실패했습니다.',
                    code: response.code,
                });
                setIsProcessing(false);
                return;
            }

            // 6. 서버 검증
            const verifyParams = {
                merchantUid: response.paymentId,
                impUid: response.txId,
            };

            console.log('[결제 검증] verifyParams:', verifyParams);

            const verifyResult = await paymentApi.verify(verifyParams);
            
            if (verifyResult.success) {
                console.log('[결제 성공]', verifyResult);
                onSuccess?.(verifyResult);
            } else {
                console.error('[결제 검증 실패]', verifyResult);
                onFail?.(verifyResult);
            }
            
        } catch (error) {
            console.error('[결제 처리 오류]', error);
            onFail?.({ message: '결제 처리 중 오류가 발생했습니다.' });
        } finally {
            setIsProcessing(false);
        }
    }, [isProcessing]);

    /**
     * 결제 취소 (V2)
     */
    const cancelPayment = useCallback(async (merchantUid, reason, onSuccess, onFail) => {
        try {
            console.log('[결제 취소] merchantUid:', merchantUid, 'reason:', reason);

            const result = await paymentApi.cancel({ 
                merchantUid,
                reason 
            });
            
            if (result.success) {
                console.log('[결제 취소 성공]', result);
                onSuccess?.(result);
            } else {
                console.error('[결제 취소 실패]', result);
                onFail?.(result);
            }
        } catch (error) {
            console.error('[결제 취소 오류]', error);
            onFail?.({ message: '결제 취소 중 오류가 발생했습니다.' });
        }
    }, []);

    return {
        isProcessing,
        requestPayment,
        cancelPayment,
    };
};

export default usePayment;