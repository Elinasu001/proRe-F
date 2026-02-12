import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { getChatWsUrl, getMessagesApi, saveMessageApi } from "../../api/chat/chatApi";

export default function useChatRoom(estimateNo, userNo, navi) {
  
    const [message, setMessage] = useState("");                         //  입력 중인 메시지
    const [messages, setMessages] = useState([]);                       //  채팅 메시지 목록
    const [roomNo, setRoomNo] = useState(null);                         //  채팅방 번호
    const [otherUserNo, setOtherUserNo] = useState(null);               //  상대방 userNo
    const [nextCursor, setNextCursor] = useState(null);                 //  메시지 페이징 커서
    const [loading, setLoading] = useState(false);                      //  메시지 불러오기/업로드 중 여부
    const [hasMore, setHasMore] = useState(true);                       //  더 불러올 메시지 존재 여부
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);      //  이모지 선택창 표시 여부
    const messagesEndRef = useRef(null);                                //  채팅창 스크롤 제어 ref
    const fileInputRef = useRef(null);                                  //  파일 input ref
    const [showToast, setShowToast] = useState(false);                  //  토스트 알림 표시 여부
    const [toastMessage, setToastMessage] = useState("");               //  토스트 알림 메시지
    const [toastVariant, setToastVariant] = useState("success");        //  토스트 알림 종류

    const showToastMessage = (msg, variant = "success") => {
        setToastMessage(msg);
        setToastVariant(variant);
        setShowToast(true);
    };
    const closeToast = () => setShowToast(false);

    const WS_URL = getChatWsUrl(estimateNo);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => console.log("WebSocket 연결 성공"),
        onClose: () => console.log("WebSocket 연결 종료"),
        onError: (error) => console.error("WebSocket 에러:", error),
        shouldReconnect: () => true,
        reconnectAttempts: 10,
        reconnectInterval: 3000,
    });

    // 최초 메시지 불러오기
    useEffect(() => {
        setMessages([]);
        setNextCursor(null);
        setHasMore(true);
        fetchMessages(null, true);
    }, [estimateNo, userNo]);

    // 채팅방 정보 초기화
    useEffect(() => {
        const initChatRoom = async () => {
        try {
            const response = await chatApi.getRoomByEstimate(estimateNo);
            if (response.success && response.data) {
            setRoomNo(response.data.roomNo);
            }
        } catch (error) {
            console.error("채팅방 초기화 실패:", error);
        }
        };
        initChatRoom();
    }, [estimateNo]);

    // 상대방 userNo 계산
    useEffect(() => {
        const found = messages.find((m) => Number(m.userNo) !== Number(userNo))?.userNo;
        setOtherUserNo(found || null);
    }, [messages, userNo]);

    // 커서 기반 메시지 불러오기
    const fetchMessages = useCallback(
        async (cursor = null, isInit = false) => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const params = { size: 50 };
            if (cursor) params.cursor = cursor;

            const res = await getMessagesApi(estimateNo, params);
            const newMessages = (res?.messages || []).reverse();

            setMessages((prev) => (isInit ? newMessages : [...newMessages, ...prev]));
            setNextCursor(res.nextCursor);
            setHasMore(res.nextCursor !== null);
        } catch (error) {
            showToastMessage("채팅방을 불러올 수 없습니다.", "error");
            if (isInit) navi(-1);
        }

        setLoading(false);
        },
        [estimateNo, loading, hasMore]
    );

    // messages 변경 시 스크롤
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    //  WebSocket 메시지 수신 (중복 방지 + 안전 처리)
    useEffect(() => {
        if (!lastJsonMessage) return;
        const isMine = Number(lastJsonMessage.userNo) === Number(userNo);
        setMessages((prev) => {
            // 1) messageNo가 있으면: 같은 messageNo는 절대 추가하지 않음 (중복 방지 핵심)
            if (lastJsonMessage.messageNo != null) {
                const exists = prev.some((m) => String(m.messageNo) === String(lastJsonMessage.messageNo));
                if (exists) return prev;
            }
            // 2) 내 FILE 메시지라면: 가장 최근 temp FILE(UPLOADING/SENT)를 치환 시도
            if (isMine && lastJsonMessage.type === "FILE") {
                
                const tempIndex = [...prev]
                    .reverse() // 최신 메시지부터 탐색
                    .findIndex(
                        (m) =>
                            m.type === "FILE" && // 파일 메시지이면서
                            m.mine === true && // 내가 보낸 메시지이며
                            (m.status === "UPLOADING" || m.status === "SENT") && // 업로드 중이거나 업로드 완료 상태
                            String(m.content) === String(lastJsonMessage.content) // 파일명이 같을 때(구분 기준)
                    );

                // temp 메시지가 있으면 해당 위치를 실제 서버 메시지로 교체
                if (tempIndex !== -1) {
                    const realIndex = prev.length - 1 - tempIndex; // 역순 인덱스 보정
                    const updated = [...prev];
                    updated[realIndex] = { ...lastJsonMessage, mine: true, status: "SENT" }; // 서버 메시지로 확정
                    setTimeout(() => {
                        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // 스크롤 맨 아래로
                    }, 100);
                    return updated;
                }
            }
            // 3) 그냥 append (새 메시지)
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
            return [...prev, { ...lastJsonMessage, mine: isMine }];
        });
    }, [lastJsonMessage, userNo]);

    // 메시지 전송
    const handleSendMessage = (payload) => {
        let sendPayload;

        if (typeof payload === "string" || payload === undefined) {
        if (!message.trim()) return;
        sendPayload = { content: message, type: "TEXT", userNo };
        } else {
        if (!payload.content?.toString().trim()) return;
        sendPayload = { ...payload, userNo };
        }

        if (readyState !== WebSocket.OPEN) {
        showToastMessage("WebSocket 연결이 끊어졌습니다. 새로고침해주세요.", "error");
        return;
        }

        sendJsonMessage(sendPayload);
        if (sendPayload.type === "TEXT") setMessage("");
    };

    // 파일 업로드
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"];
        const filesArr = Array.from(files);
        const invalid = filesArr.some((file) => !allowedTypes.includes(file.type));
        if (invalid) {
        showToastMessage("jpg, png, gif, bmp 이미지만 업로드할 수 있습니다.", "error");
        return;
        }

        const tempId = `temp_${Date.now()}`;

        const tempMessage = {
            messageNo: tempId,
            tempId,
            type: "FILE",
            content: filesArr[0].name,
            userNo,
            mine: true,
            status: "UPLOADING",
            progress: 0,
            sentDate: new Date().toISOString(),
            attachments: filesArr.map((file) => ({
                originName: file.name,
                fileSize: file.size,
                filePath: URL.createObjectURL(file), // 미리보기
            })),
        };

        // 1. 임시 메시지 추가 (업로드 중 표시)
        setMessages(prev => [...prev, tempMessage]);
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });

        // 2. 실제 파일 업로드
        try {
            
            const formData = new FormData();
            filesArr.forEach((file) => formData.append("files", file));
            formData.append("type", "FILE");
            formData.append("content", filesArr[0].name);
            formData.append("userNo", userNo);

            const res = await saveMessageApi(estimateNo, formData, {
                onUploadProgress: (progressEvent) => {
                    // 2-1. 업로드 진행률 표시
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.tempId === tempId
                                ? { ...msg, progress: percentCompleted }
                                : msg
                        )
                    );
                }
            });
            // 3. 업로드 성공 시 임시 메시지를 서버 메시지로 확정
            setMessages(prev =>
                prev.map(msg =>
                    msg.tempId === tempId
                        ? {
                            ...msg,
                            ...res.data,
                            mine: true,
                            status: 'SENT',
                            tempId: `temp_${res.data.messageNo}`
                        }
                        : msg
                )
            );
            // 4. WebSocket 브로드캐스트 (상대방에게도 메시지 전달)
            if (res.data.attachments && res.data.attachments.length > 0 && readyState === WebSocket.OPEN) {
                sendJsonMessage({
                    ...res.data,
                    type: 'FILE',
                    userNo: userNo,
                });
            }
        } catch (error) {
            // 5. 업로드 실패 시 상태 표시
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
        showToast,
        toastMessage,
        toastVariant,
        closeToast,
        showToastMessage,
        fetchMessages,
        hasMore,
        loading,
        nextCursor,
        otherUserNo,
        roomNo,
    };
}
