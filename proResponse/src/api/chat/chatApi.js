

import { axiosAuth } from '../reqApi';

/**
 * 채팅방 공통 API prefix
 */
export const baseApi = '/api/rooms';



// 채팅방 생성 (FormData로 estimateNo, content, type 전달)
export const createRoomApi = (estimateNo, chatMessageDto) => {
    const formData = new FormData();
    if (estimateNo !== undefined) formData.append('estimateNo', estimateNo);
    if (chatMessageDto) {
        Object.keys(chatMessageDto).forEach(key => formData.append(key, chatMessageDto[key]));
    }
    return axiosAuth.post(baseApi, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};


/**
 * 채팅 WebSocket URL 생성 함수
 * config.js의 window.Env.CHAT_WS_URL 사용
 */
export function getChatWsUrl(estimateNo) {
    return `${window.Env.CHAT_WS_URL}/${estimateNo}`;
}


// 채팅 메시지 조회 (커서 기반 페이징)
export const getMessagesApi = (estimateNo, params) =>
    axiosAuth.getActual(`${baseApi}/${estimateNo}/messages`, { params });




// 기존 채팅방에 파일/텍스트 메시지 전송
export const saveMessageApi = (estimateNo, chatMessageDto, config = {}) => {
    const isFormData = chatMessageDto instanceof FormData;
    return axiosAuth.post(
        `${baseApi}/${estimateNo}`,
        chatMessageDto,
        {
        headers: {
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
        },
        ...config // 추가 옵션 병합
        }
    );
};