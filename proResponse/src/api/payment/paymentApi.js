import { axiosAuth } from '../reqApi';

const baseApi = '/api/payments';

// 결제 준비 API
export async function prepare(params) {
    return axiosAuth.post(`${baseApi}/prepare`, params);
}

// 결제 검증 API
export async function verify(params) {
    return axiosAuth.post(`${baseApi}/verify`, params);
}

// 결제 취소 API
export async function cancel(params) {
    return axiosAuth.post(`${baseApi}/cancel`, params);
}

export default {
    prepare,
    verify,
    cancel
};
