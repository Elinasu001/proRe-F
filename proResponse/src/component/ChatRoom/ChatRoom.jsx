import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWebSocket from 'react-use-websocket';
import emojiImg from '../../assets/images/common/emoji.png';
import fileImg from '../../assets/images/common/file.png';
import payImg from '../../assets/images/common/pay.png';
import reportImg from '../../assets/images/common/report.png';
import sendImg from '../../assets/images/common/send.png';
import {
    ActionButton, ActionLightWrapper, ActionRightWrapper,
    ChatActions, ChatBox, ChatHeader, ChatInput,
    ChatInputContainer, ChatMessages, ChatPopup,
    ChatPopupOverlay, ChatSubtitle, ChatTitle,
    CloseButton, EmojiItem, EmojiPicker, IconButton,
    Message, MessageBubble
} from './ChatRoom.styled.js';

const ChatRoom = () => {
    const { id:estimateNo } = useParams();
    const navi = useNavigate();
    const userNo = Number(localStorage.getItem('userNo'));
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const WS_URL = `ws://localhost:8080/ws/chat/${estimateNo}`;
    
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

    const connectionStatus = {
        [WebSocket.CONNECTING]: '연결 중...',
        [WebSocket.OPEN]: '연결됨',
        [WebSocket.CLOSING]: '종료 중...',
        [WebSocket.CLOSED]: '연결 끊김',
    }[readyState];

    // 1. 과거 메시지 불러오기
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const msgRes = await axios.get(
                    `http://localhost:8080/api/rooms/${estimateNo}/messages`,
                    { params: { size: 50 } }
                );

                const data = msgRes.data.data;
                if (data?.messages) {
                    const sortedMessages = [...data.messages]
                        .reverse()
                        .map(msg => ({
                            ...msg,
                            mine: Number(msg.userNo) === userNo
                        }));
                    
                    setMessages(sortedMessages);
                    
                    setTimeout(() => {
                        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            } catch (error) {
                console.error('메시지 조회 실패:', error);
                alert('채팅방을 불러올 수 없습니다.');
                navi(-1);
            }
        };

        fetchMessages();
    }, [estimateNo, navi, userNo]);

    // 2. WebSocket 메시지 수신
    useEffect(() => {
        if (lastJsonMessage !== null) {
            const isMine = Number(lastJsonMessage.userNo) === userNo;
            
            // [핵심] 내가 보낸 파일 메시지는 이미 UI에 있으므로 중복 방지
            if (lastJsonMessage.type === 'FILE' && isMine) {
                // 임시 메시지를 실제 메시지로 교체
                setMessages(prev => 
                    prev.map(msg => 
                        msg.tempId === `temp_${lastJsonMessage.messageNo}` 
                            ? { ...lastJsonMessage, mine: true }
                            : msg
                    )
                );
            } else {
                // 다른 사람이 보낸 메시지 또는 내 텍스트 메시지
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleEmojiClick = (emoji) => {
        setMessage(message + emoji);
        setShowEmojiPicker(false);
    };

    // [개선] 파일 업로드 (카톡 스타일)
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // [1] 임시 메시지 즉시 생성 (낙관적 UI)
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

        // [2] 즉시 UI에 표시
        setMessages(prev => [...prev, tempMessage]);
        
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        // [3] 백그라운드에서 실제 업로드
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });
        formData.append('type', 'FILE');
        formData.append('content', files[0].name);

        try {
            const response = await axios.post(
                `http://localhost:8080/api/rooms/${estimateNo}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    // [4] 진행률 실시간 업데이트
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

            console.log('파일 전송 성공:', response.data);

            // [5] 업로드 완료: 상태를 SENT로 변경
            setMessages(prev => 
                prev.map(msg => 
                    msg.tempId === tempId 
                        ? { 
                            ...msg, 
                            status: 'SENT',
                            tempId: `temp_${response.data.data.messageNo}`
                        }
                        : msg
                )
            );

        } catch (error) {
            console.error('파일 전송 실패:', error);
            
            // [6] 실패 시 재시도 버튼 표시
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

    const emojis = [
        '😊', '😂', '❤️', '👍', '🙏', '😍', '🎉', '👏', '🔥', '💯',
        '😢', '😭', '😅', '🤔', '😎', '🙌', '✨', '💪', '👌', '🤗'
    ];

    return (
        <ChatPopupOverlay>
            <ChatPopup>
                <ChatHeader>
                    <div>
                        <ChatTitle>채팅하기</ChatTitle>
                        <ChatSubtitle>{connectionStatus}</ChatSubtitle>
                    </div>
                    <CloseButton onClick={() => navi(-1)}>✕</CloseButton>
                </ChatHeader>

                <ChatActions>
                    <ActionLightWrapper>
                        <ActionButton>
                            <img src={reportImg} alt="report" />
                            신고하기
                        </ActionButton>
                    </ActionLightWrapper>
                    <ActionRightWrapper>
                        <ActionButton>
                            <img src={payImg} alt="pay" />
                            송금하기
                        </ActionButton>
                    </ActionRightWrapper>
                </ChatActions>

                <ChatMessages>
                    {messages.map((msg, index) => (
                        <Message 
                            key={msg.messageNo || msg.tempId || index} 
                            className={msg.mine ? "message-me" : "message-other"}
                        >
                            <MessageBubble $sender={msg.mine ? 'me' : 'other'}>
                                {msg.type === 'TEXT' && msg.content}
                                
                                {msg.type === 'FILE' && (
                                    <div style={{ position: 'relative' }}>
                                        <div>{msg.content}</div>
                                        
                                        {msg.status === 'UPLOADING' && (
                                            <div style={{
                                                marginTop: '8px',
                                                padding: '8px',
                                                background: 'rgba(0,0,0,0.1)',
                                                borderRadius: '4px'
                                            }}>
                                                <div style={{
                                                    fontSize: '12px',
                                                    marginBottom: '4px'
                                                }}>
                                                    업로드 중... {msg.progress}%
                                                </div>
                                                <div style={{
                                                    height: '4px',
                                                    background: '#e0e0e0',
                                                    borderRadius: '2px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${msg.progress}%`,
                                                        background: '#4CAF50',
                                                        transition: 'width 0.3s'
                                                    }} />
                                                </div>
                                            </div>
                                        )}
                                        
                                        {msg.status === 'FAILED' && (
                                            <div style={{
                                                marginTop: '8px',
                                                padding: '8px',
                                                background: 'rgba(255,0,0,0.1)',
                                                borderRadius: '4px',
                                                color: '#f44336',
                                                fontSize: '12px'
                                            }}>
                                                전송 실패
                                            </div>
                                        )}
                                        
                                        {msg.attachments?.map((att, i) => (
                                            <img 
                                                key={i}
                                                src={att.filePath}
                                                alt={att.originName}
                                                style={{ 
                                                    maxWidth: '200px',
                                                    marginTop: '8px',
                                                    borderRadius: '8px',
                                                    opacity: msg.status === 'UPLOADING' ? 0.6 : 1
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                                
                                {msg.type === 'PAYMENT' && (
                                    <div>{msg.content}</div>
                                )}
                            </MessageBubble>
                        </Message>
                    ))}
                    <div ref={messagesEndRef} />
                </ChatMessages>

                <ChatInputContainer>
                    {showEmojiPicker && (
                        <EmojiPicker>
                            {emojis.map((emoji, index) => (
                                <EmojiItem
                                    key={index}
                                    onClick={() => handleEmojiClick(emoji)}
                                >
                                    {emoji}
                                </EmojiItem>
                            ))}
                        </EmojiPicker>
                    )}
                    
                    <ChatBox>
                        <ChatInput
                            type="text"
                            placeholder="메시지를 입력하세요"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={readyState !== WebSocket.OPEN}
                        />
                        
                        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            <img src={emojiImg} alt="emoji" />
                        </IconButton>
                        
                        <IconButton onClick={() => fileInputRef.current?.click()}>
                            <img src={fileImg} alt="file" />
                        </IconButton>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                        />
                        
                        <IconButton 
                            onClick={handleSendMessage}
                            disabled={readyState !== WebSocket.OPEN}
                        >
                            <img src={sendImg} alt="send" />
                        </IconButton>
                    </ChatBox>
                </ChatInputContainer>
            </ChatPopup>
        </ChatPopupOverlay>
    );
};

export default ChatRoom;