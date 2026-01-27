import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChatRoomDetails } from "../../api/chat/chatApi.js";
import emojiImg from '../../assets/images/common/emoji.png';
import fileImg from '../../assets/images/common/file.png';
import payImg from '../../assets/images/common/pay.png';
import reportImg from '../../assets/images/common/report.png';
import sendImg from '../../assets/images/common/send.png';
import useChatWebSocket from "../../hooks/useChatWebSocket";

import {
    ActionButton,
    ActionLightWrapper,
    ActionRightWrapper,
    ChatActions,
    ChatBox,
    ChatHeader,
    ChatImage,
    ChatInput,
    ChatInputContainer,
    ChatMessages,
    ChatPopup,
    ChatPopupOverlay,
    ChatSubtitle,
    ChatTitle,
    CloseButton,
    EmojiItem,
    EmojiPicker,
    IconButton,
    Message,
    MessageBubble
} from './ChatRoom.styled.js';

const ChatRoom = () => {

    
    const { id: roomNo } = useParams();  // URL의 id는 roomNo
    const navi = useNavigate();
    const userNo = Number(localStorage.getItem('userNo'));

    const [estimateNo, setEstimateNo] = useState(null);  // API 응답에서 가져옴
    const [roomInfo, setRoomInfo] = useState(null);
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState([]);
    const [animateIndex, setAnimateIndex] = useState(null);

    // WebSocket 연결 (estimateNo가 있을 때만)
    const { sendMessage } = useChatWebSocket(estimateNo, (msg) => {
        console.log('📩 브로드캐스트 수신:', msg);
        console.log('내 userNo:', userNo, '(type:', typeof userNo, ') / 메시지 userNo:', msg.userNo, '(type:', typeof msg.userNo, ')');

        // 숫자로 변환하여 비교 (타입 불일치 방지)
        const isMyMessage = Number(msg.userNo) === userNo;
        console.log('isMyMessage:', isMyMessage);

        if (isMyMessage) {
            console.log('✅ 내 메시지 브로드캐스트 확인됨');
            // 내 메시지: pending 상태를 sent로 변경하고 서버 데이터 병합
            setMessages((prev) =>
                prev.map((m) =>
                    m._tempId && m.content === msg.content && m.pending
                        ? {
                            ...m,           // 기존 로컬 데이터 유지
                            ...msg,         // 서버 데이터 병합 (messageNo, attachments 등)
                            mine: true,     // 명시적으로 mine 설정
                            pending: false,
                            sent: true
                        }
                        : m
                )
            );
        } else {
            console.log('📨 상대방 메시지 수신');
            // 상대방 메시지 추가 (mine: false 명시)
            setMessages((prev) => [...prev, { ...msg, mine: false }]);
            setAnimateIndex((prev) => (prev || 0) + 1);
        }
    });

    const messagesEndRef = useRef(null);
        // Ref for file input
        const fileInputRef = useRef(null);
        // Handle file button click
        const handleFileButtonClick = () => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file || !userNo) return;

        const tempId = `temp_file_${Date.now()}`;
        const reader = new FileReader();

        reader.onload = (event) => {
            const newMsg = {
                _tempId: tempId,
                estimateNo: estimateNo,
                type: 'FILE',
                content: file.name,
                mine: true,
                userNo: userNo,
                sentDate: new Date().toISOString(),
                pending: true,
                attachments: [{
                    filePath: event.target.result,  // 로컬 미리보기 URL
                    originName: file.name
                }]
            };
            setMessages((prev) => [...prev, newMsg]);
            setAnimateIndex((prev) => (prev || 0) + 1);

            // TODO: REST API로 파일 전송 후 pending -> sent 변경
        };
        reader.readAsDataURL(file);

        // 같은 파일을 연속 첨부할 수 있도록 value 초기화
        e.target.value = '';
    };
    
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const emojis = ['😊', '😂', '❤️', '👍', '🙏', '😍', '🎉', '👏', '🔥', '💯', '😢', '😭', '😅', '🤔', '😎', '🙌', '✨', '💪', '👌', '🤗'];

    useEffect(() => {
        // 채팅방 상세 정보 및 과거 메시지 불러오기
        fetchChatRoomDetails(roomNo)
            .then((res) => {
                const roomData = res?.data?.data;
                console.log('📋 API 응답 전체:', roomData);
                console.log('📋 현재 로그인 userNo:', userNo);
                if (roomData) {
                    setRoomInfo(roomData);
                    // estimateNo 설정 (WebSocket 연결에 필요)
                    if (roomData.estimateNo) {
                        setEstimateNo(roomData.estimateNo);
                    }
                    // 서버 응답 구조에 맞게 messages 배열을 setMessages에 반영
                    if (Array.isArray(roomData.messages)) {
                        console.log('📋 메시지 목록:', roomData.messages.map(m => ({
                            messageNo: m.messageNo,
                            content: m.content?.substring(0, 20),
                            userNo: m.userNo,
                            mine: m.mine,
                            mineType: typeof m.mine
                        })));
                        setMessages(roomData.messages.reverse());
                    }
                } else {
                    console.error("채팅방 정보가 없습니다.", res);
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || "채팅방 정보 불러오기 실패";
                console.log(message);
            });
    }, [roomNo]);

    const handleClose = () => {
        navi(-1); // 이전 페이지로 이동
    };

    const handleSendMessage = () => {
        if (!estimateNo) {
            console.error('❌ WebSocket 연결 대기 중 - estimateNo 없음');
            return;
        }
        if (message.trim() && userNo) {
            const tempId = `temp_${Date.now()}`;
            const newMsg = {
                content: message,
                estimateNo: estimateNo,
                type: 'TEXT',
                userNo: userNo,
                mine: true,
                sentDate: new Date().toISOString(),
                _tempId: tempId,
                pending: true  // 전송 중 상태
            };

            // 로컬에 먼저 표시 (Optimistic Update)
            setMessages((prev) => [...prev, newMsg]);
            setAnimateIndex((prev) => (prev || 0) + 1);

            // WebSocket으로 메시지 전송
            sendMessage({
                content: message,
                estimateNo: estimateNo,
                type: 'TEXT',
                userNo: userNo
            });

            // 5초 후에도 pending이면 실패 처리
            setTimeout(() => {
                setMessages((prev) => {
                    const updated = prev.map((m) => {
                        if (m._tempId === tempId && m.pending) {
                            console.error('❌ 브로드캐스트 타임아웃 - 메시지 전송 실패:', m.content);
                            return { ...m, pending: false, failed: true };
                        }
                        return m;
                    });
                    return updated;
                });
            }, 5000);

            setMessage('');
        }
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

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    useEffect(() => {
        if (animateIndex !== null) {
            const timer = setTimeout(() => setAnimateIndex(null), 400);
            return () => clearTimeout(timer);
        }
    }, [animateIndex]);

    return (
        <ChatPopupOverlay>
            <ChatPopup>
                {/* 헤더 */}
                <ChatHeader>
                    <div>
                        <ChatTitle>채팅하기</ChatTitle>
                        <ChatSubtitle>채팅으로 서비스 거래해 보세요.</ChatSubtitle>
                    </div>
                    <CloseButton onClick={handleClose}>✕</CloseButton>
                </ChatHeader>

                {/* 액션 버튼 */}
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

                {/* 메시지 영역 */}
                <ChatMessages>
                    {messages.map((msg, index) => (
                        <Message
                            key={msg._tempId || msg.messageNo || `msg_${index}`}
                            className={msg.mine ? 'message-me' : 'message-other'}
                        >
                            <MessageBubble $sender={msg.mine ? 'me' : 'other'} $animate={index === animateIndex}>
                                {/* 파일 메시지 */}
                                {msg.type === 'FILE' && Array.isArray(msg.attachments) && msg.attachments.length > 0 ? (
                                    <>
                                        {msg.attachments.map((file, fIdx) => (
                                            file.filePath ? (
                                                <ChatImage
                                                    key={file.fileNo || fIdx}
                                                    src={file.filePath}
                                                    alt={file.originName || '첨부파일'}
                                                />
                                            ) : null
                                        ))}
                                        {msg.content && <div>{msg.content}</div>}
                                    </>
                                ) : (
                                    // 텍스트 메시지
                                    msg.content
                                )}
                                {/* 내 메시지 전송 상태 표시 */}
                                {msg.mine && (
                                    <span style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.7 }}>
                                        {msg.pending ? '⏳' : msg.sent ? '✓' : msg.failed ? '❌' : ''}
                                    </span>
                                )}
                            </MessageBubble>
                        </Message>
                    ))}
                    <div ref={messagesEndRef} />
                </ChatMessages>

                {/* 입력 영역 */}
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
                        />
                        <IconButton className="emoji-button" onClick={toggleEmojiPicker}>
                            <img src={emojiImg} alt="emoji" />
                        </IconButton>
                        <IconButton className="attach-button" onClick={handleFileButtonClick}>
                            <img src={fileImg} alt="file" />
                        </IconButton>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <IconButton className="send-button" onClick={handleSendMessage}>
                            <img src={sendImg} alt="send" />
                        </IconButton>
                    </ChatBox>
                </ChatInputContainer>
            </ChatPopup>
        </ChatPopupOverlay>
    );
}

export default ChatRoom;