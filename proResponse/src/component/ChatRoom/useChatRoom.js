import { useEffect, useRef, useState } from "react";
import { getChatWsUrl, getMessagesApi, saveMessageApi } from '../../api/chat/chatApi';
import useWebSocket from 'react-use-websocket';

export default function useChatRoom(estimateNo, userNo, navi) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

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
                console.error('메시지 조회 실패:', error);
                alert('채팅방을 불러올 수 없습니다.');
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

    // 메시지 전송
    const handleSendMessage = () => {
        if (!message.trim()) return;
        if (readyState !== WebSocket.OPEN) {
            alert('WebSocket 연결이 끊어졌습니다. 새로고침해주세요.');
            return;
        }
        const payload = {
            content: message,
            type: 'TEXT',
            userNo: userNo
        };
        sendJsonMessage(payload);
        setMessage('');
    };

    // 파일 업로드
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
        const filesArr = Array.from(files);
        const invalid = filesArr.some(file => !allowedTypes.includes(file.type));
        if (invalid) {
            alert('jpg, png, gif, bmp 이미지만 업로드할 수 있습니다.');
            return;
        }
        const tempId = `temp_${Date.now()}`;
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
        setMessages(prev => [...prev, tempMessage]);
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });
        formData.append('type', 'FILE');
        formData.append('content', files[0].name);
        formData.append('userNo', userNo);
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
            alert('파일 전송에 실패했습니다.');
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
        sendJsonMessage
    };
}
