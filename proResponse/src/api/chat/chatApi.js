import { API_BASE_URL, createApiInstance } from '../api_.js';
import { axiosPublic } from '../reqApi';

export const chatApi = {
    getActual: (url) => axiosPublic.getActual(`/api/rooms${url}`),
    getList: (url) => axiosPublic.getList(`/api/rooms${url}`),
};

export const websocketApi = createApiInstance(`ws:${API_BASE_URL}/ws/chat/{estimateNo}`);


// 1. 채팅방 생성
export const fetchChatRoomDetails = (roomNo) => {
    return chatApi.getActual(`/${roomNo}/messages`);
}

// 2. 채팅방 생성 (POST /api/rooms)
export const createChatRoomApi = ({ estimateNo, content, type }) => {
    const form = new FormData();
    form.append('content', content);
    form.append('type', type);
    return chatApi.post(
        '',
        form,
        { params: { estimateNo } }
    );
};

// 3. 파일 메시지 전송 (POST /api/rooms/{roomNo})
export const sendFileMessage = ({ roomNo, content, type, files }) => {
    const form = new FormData();
    form.append('roomNo', roomNo);
    form.append('content', content || '');
    form.append('type', type);
    if (files && files.length > 0) {
        files.forEach((file) => form.append('files', file));
    }
    return chatApi.post(`/${roomNo}`, form);
};