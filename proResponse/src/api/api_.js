
/**
 * 환경 변수 설정
 */

export const API_BASE_URL = window.Env?.API_URL || import.meta.env.VITE_API_URL || "http://localhost:8080";
// export const WS_BASE_URL = window.Env?.WS_URL || import.meta.env.VITE_WS_URL || "http://localhost:8080/ws-stomp";
// export const KAKAO_REDIRECT_URI = window.Env?.KAKAO_REDIRECT_URI || import.meta.env.VITE_KAKAO_REDIRECT_URI || "";
// export const KAKAO_MAP_API_KEY = window.Env?.KAKAO_MAP_API_KEY || import.meta.env.VITE_KAKAO_MAP_API_KEY || "";
// export const KAKAO_CLIENT_ID = window.Env?.KAKAO_CLIENT_ID || import.meta.env.VITE_KAKAO_CLIENT_ID || "";

import axios from 'axios';

// 공통 Axios 인스턴스 생성 함수 (인터셉터 포함)
export function createApiInstance(baseURL) {
    
    const instance = axios.create({
        baseURL: baseURL,
    });

    // 요청 인터셉터: 모든 요청에 JWT 토큰 자동 부착
    instance.interceptors.request.use(
        (config) => {
            // 요청 전 수행할 작업
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            // 요청 오류 처리
            return Promise.reject(error)
        }
    );

    // 응답 인터셉터: 에러 공통 처리 (예: 토큰 만료 등)
    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            
            if (error.response?.status === 401) {
                console.warn('인증이 만료되었습니다. 다시 로그인해주세요.');
                
                // 필요시 로그아웃 로직 추가
                // 토큰 삭제
                //localStorage.removeItem('accessToken');
                //localStorage.removeItem('refreshToken');
                
                // 로그인 페이지로 리다이렉션
                //window.location.href = '/';
            }

             // 응답 오류 처리
            return Promise.reject(error);
        }
    );

    return instance;
}

// 기본 인스턴스 내보내기
export const api = createApiInstance(API_BASE_URL);