import { useEffect, useRef, useState } from "react";
import useWebSocket from 'react-use-websocket';
import { getChatWsUrl, getMessagesApi, saveMessageApi } from '../../api/chat/chatApi';

export default function useChatRoom(estimateNo, userNo, navi) {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // 토스트 상태
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');
    const showToastMessage = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };
    const closeToast = () => setShowToast(false);

    const WS_URL = getChatWsUrl(estimateNo);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        WS_URL,
        {
            onOpen: () => console.log('WebSocket 연결 성공'),
            onClose: () => console.log('WebSocket 연결 종료'),
            onError: (error) => console.error('WebSocket 에러:', error),
            shouldReconnect: () => true,
            reconnectAttempts: 10,
            reconnectInterval: 3000,
        }
    );

    // 과거 메시지 불러오기
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await getMessagesApi(estimateNo, { size: 50 });
                if (res?.messages) {
                    const sortedMessages = [...res.messages]
                        .reverse()
                        .map(msg => ({
                            ...msg,
                            mine: Number(msg.userNo) === userNo
                        }));
                    setMessages(sortedMessages);
                }
            } catch (error) {
                //console.error('메시지 조회 실패:', error);
                showToastMessage('채팅방을 불러올 수 없습니다.', 'error');
                navi(-1);
            }
        };
        fetchMessages();
    }, [estimateNo, navi, userNo]);

    // messages가 바뀔 때마다 항상 맨 아래로 스크롤
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    // WebSocket 메시지 수신
    useEffect(() => {
        if (lastJsonMessage !== null) {
            const isMine = Number(lastJsonMessage.userNo) === userNo;
            if (lastJsonMessage.type === 'FILE' && isMine) {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.tempId === `temp_${lastJsonMessage.messageNo}`
                            ? { ...lastJsonMessage, mine: true }
                            : msg
                    )
                );
            } else {
                const newMessage = {
                    ...lastJsonMessage,
                    mine: isMine
                };
                setMessages(prev => [...prev, newMessage]);
            }
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [lastJsonMessage, userNo]);

    // 메시지 전송 (TEXT, PAYMENT 등 타입 지원)
    const handleSendMessage = (payload) => {
        let sendPayload;
        if (typeof payload === 'string' || payload === undefined) {
            // 기존 텍스트 메시지 전송 방식
            if (!message.trim()) return;
            sendPayload = {
                content: message,
                type: 'TEXT',
                userNo: userNo
            };
        } else {
            // 객체로 받은 경우 (PAYMENT 등)
            if (!payload.content?.toString().trim()) return;
            sendPayload = {
                ...payload,
                userNo: userNo
            };
        }
        if (readyState !== WebSocket.OPEN) {
            showToastMessage('WebSocket 연결이 끊어졌습니다. 새로고침해주세요.', 'error');
            return;
        }
        sendJsonMessage(sendPayload);
        if (sendPayload.type === 'TEXT') setMessage('');
    };

    // 파일 업로드
    const handleFileChange = async (e) => {

        const files = e.target.files;

        // 파일 유효성 검사
        if (!files || files.length === 0) return;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
        const filesArr = Array.from(files);
        const invalid = filesArr.some(file => !allowedTypes.includes(file.type));

        if (invalid) {
            showToastMessage('jpg, png, gif, bmp 이미지만 업로드할 수 있습니다.', 'error');
            return;
        }

        // 임시 메시지 추가 (아직 서버에 업로드가 완료되지 않은 "임시 메시지" 채팅장에 미리 표시)
        const tempId = `temp_${Date.now()}`;

        // 파일 업로드가 끝나기 전까지는 서버에서 진짜 메시지 번호(messageNo)를 받을 수 없으니 임시로 고유한 값(tempId)을 만들어서 업로드 진행 상황 표시, 메시지 상태 업데이트 등에 활용합니다.
        const tempMessage = {
            messageNo: tempId,
            tempId: tempId,
            type: 'FILE',
            content: files[0].name,
            userNo: userNo,
            mine: true,
            status: 'UPLOADING',
            progress: 0,
            sentDate: new Date().toISOString(),
            attachments: Array.from(files).map(file => ({
                originName: file.name,
                fileSize: file.size,
                filePath: URL.createObjectURL(file)
            }))
        };

        // 임시 메시지 상태로 추가
        setMessages(prev => [...prev, tempMessage]);

        // 스크롤 맨 아래로
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        // 실제 파일 업로드
        const formData = new FormData();

        // 여러 파일 처리
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });
        formData.append('type', 'FILE');
        formData.append('content', files[0].name);
        formData.append('userNo', userNo);

        // 업로드 진행 상태 추적
        try {
            const res = await saveMessageApi(
                estimateNo,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setMessages(prev =>
                            prev.map(msg =>
                                msg.tempId === tempId
                                    ? { ...msg, progress: percentCompleted }
                                    : msg
                            )
                        );
                    }
                }
            );
            
            // 임시 메시지를 서버에서 받은 정보로 정상 메시지처럼 바꾸기
            setMessages(prev =>
                prev.map(msg =>
                    msg.tempId === tempId
                        ? {
                            ...msg,
                            status: 'SENT',
                            tempId: `temp_${res.data.messageNo}`
                        }
                        : msg
                )
            );

            // 파일 업로드 성공 후 WebSocket으로 브로드캐스트
            const result = res.data;
            if (result.attachments && result.attachments.length > 0) {
                sendJsonMessage({
                    type: "FILE",
                    content: result.content,
                    attachments: result.attachments,
                    userNo: userNo,
                });
            }

        } catch (error) {
            setMessages(prev =>
                prev.map(msg =>
                    msg.tempId === tempId
                        ? { ...msg, status: 'FAILED', error: error.message }
                        : msg
                )
            );
            showToastMessage('파일 전송에 실패했습니다.', 'error');

        }
        e.target.value = '';
    };

    return {
        message,
        setMessage,
        messages,
        setMessages,
        showEmojiPicker,
        setShowEmojiPicker,
        messagesEndRef,
        fileInputRef,
        handleSendMessage,
        handleFileChange,
        readyState,
        sendJsonMessage,
        // 토스트 관련 추가
        showToast,
        toastMessage,
        toastVariant,
        closeToast,
        showToastMessage,
    };
}
