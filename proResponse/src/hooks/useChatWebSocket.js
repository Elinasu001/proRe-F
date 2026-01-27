import { useEffect, useRef } from "react";


/**
 * useChatWebSocket
 * @param {string} estimateNo - 견적 번호(채팅방 식별자)
 * @param {(msg: object) => void} onMessage - 메시지 수신 콜백
 * @returns {object} { sendMessage, disconnect }
 */

export default function useChatWebSocket(estimateNo, onMessage) {
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    const connect = () => {
        if (!estimateNo) return;

        const ws = new window.WebSocket(`ws://localhost:8080/ws/chat/${estimateNo}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('✅ WebSocket 연결됨 - estimateNo:', estimateNo);
        };
        ws.onmessage = (event) => {
            console.log('📥 WebSocket 원본 수신:', event.data);
            try {
                const data = JSON.parse(event.data);
                onMessage && onMessage(data);
            } catch (e) {
                console.error('JSON 파싱 실패:', e);
                onMessage && onMessage(event.data);
            }
        };
        ws.onerror = (err) => {
            console.error('❌ WebSocket 에러:', err);
        };
        ws.onclose = (event) => {
            console.log('🔌 WebSocket 연결 종료 - code:', event.code, 'reason:', event.reason);
            // 비정상 종료 시 3초 후 재연결
            if (event.code !== 1000) {
                console.log('🔄 3초 후 재연결 시도...');
                reconnectTimeoutRef.current = setTimeout(() => {
                    connect();
                }, 3000);
            }
        };
    };

    useEffect(() => {
        connect();
        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close(1000, 'Component unmount');
            }
        };
    }, [estimateNo]);

    // 메시지 전송 함수
    const sendMessage = (msgObj) => {
        const ws = wsRef.current;
        if (!ws) {
            console.error('❌ WebSocket 객체 없음');
            return;
        }
        console.log('📤 전송 시도 - readyState:', ws.readyState, '(0:연결중, 1:열림, 2:닫는중, 3:닫힘)');
        if (ws.readyState === 1) {
            const payload = JSON.stringify(msgObj);
            console.log('📤 WebSocket 전송:', payload);
            ws.send(payload);
        } else {
            console.error('❌ WebSocket 연결 안됨 - readyState:', ws.readyState);
        }
    };

    // 수동 연결 해제
    const disconnect = () => {
        if (wsRef.current) wsRef.current.close();
    };

    return { sendMessage, disconnect };
}
