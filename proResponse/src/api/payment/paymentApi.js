import { axiosPublic } from '../reqApi';

// 결제 준비 API
export async function prepare(data) {
    return axiosPublic.post('/payment/prepare', data);
}

// 결제 검증 API
export async function verify(data) {
    return axiosPublic.post('/payment/verify', data);
}

// 결제 취소 API
export async function cancel(data) {
    return axiosPublic.post('/payment/cancel', data);
}

export default {
    prepare,
    verify,
    cancel
};
