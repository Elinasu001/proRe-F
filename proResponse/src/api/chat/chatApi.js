import { API_BASE_URL, createApiInstance } from '../api.js';

export const chatApi = createApiInstance(`${API_BASE_URL}/api/rooms`);
export const websocketApi = createApiInstance(`ws:${API_BASE_URL}/ws/chat`);


// 1. 채팅방 생성
export const fetchChatRoomDetails = (roomNo) => {
    return chatApi.get(`/${roomNo}/messages`);
}

