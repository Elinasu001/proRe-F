import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import emojiImg from '../../assets/images/common/emoji.png';
import fileImg from '../../assets/images/common/file.png';
import payImg from '../../assets/images/common/pay.png';
import reportImg from '../../assets/images/common/report.png';
import reviewImg from '../../assets/images/common/review_btn.png';
import sendImg from '../../assets/images/common/send.png';
import { useAuth } from '../../context/AuthContext.jsx';
import Alert from '../Common/Alert/Alert';
import useReviewModal from '../Common/Modal/Review/useReviewModal';
import Toast from '../Common/Toast/Toast.jsx';
import * as S from './ChatRoom.styled.js';
import PaymentModal from './Payment/PaymentModal.jsx';
import PaymentMessageCard from './Payment/PaymentMessageCard.jsx';
import ReportModal from './Report/ReportModal.jsx';
import { useReportModal, useReportTags } from './Report/useReportModal.js';
import ReviewViewModal from './Review/ReviewViewModal.jsx';
import ReviewWriteModal from './Review/ReviewWriteModal.jsx';
import useChatRoom from './useChatRoom';
const ChatRoom = () => {
    const { id:estimateNo } = useParams();
    const navi = useNavigate();
    const userNo = Number(localStorage.getItem('userNo'));
    const [showPayment, setShowPayment] = useState(false);
    const [paidAmount, setPaidAmount] = useState(null);

    const {
        message,
        setMessage,
        messages,
        showEmojiPicker,
        setShowEmojiPicker,
        messagesEndRef,
        fileInputRef,
        handleSendMessage,
        handleFileChange,
        readyState,
        // 토스트 관련 추가
        showToast,
        toastMessage,
        toastVariant,
        closeToast,
    } = useChatRoom(estimateNo, userNo, navi);
    const { currentUser } = useAuth();
    const userRole = currentUser?.userRole || '';

    const emojis = [
        '😊', '😂', '❤️', '👍', '🙏', '😍', '🎉', '👏', '🔥', '💯',
        '😢', '😭', '😅', '🤔', '😎', '🙌', '✨', '💪', '👌', '🤗'
    ];

    const { tags: reportTags } = useReportTags();

    // 리뷰 모달 훅
    const {
        viewModal: reviewViewModal,
        writeModal: reviewWriteModal,
        alertState: reviewAlertState,
        openReviewModal,
        submitReview,
        confirmDeleteReview,
        closeViewModal: closeReviewViewModal,
        closeWriteModal: closeReviewWriteModal,
    } = useReviewModal(estimateNo);

    const {
        reportModal,
        openReportModal,
        closeReportModal,
    } = useReportModal(estimateNo);

    /**
     * 신고 모달 열기
     */
    const handleOpenReportModal = () => {
        openReportModal(reportTags,
            () => alert('신고가 제출되었습니다!'),
            () => alert('신고 등록에 실패했습니다.')
        );
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

    const connectionStatus = {
        [WebSocket.CONNECTING]: '연결 중...',
        [WebSocket.OPEN]: '연결됨',
        [WebSocket.CLOSING]: '종료 중...',
        [WebSocket.CLOSED]: '연결 끊김',
    }[readyState];

    // 결제 성공 시 채팅 메시지에 결제 금액 표시
    const handlePaymentSuccess = (amount) => {
        setPaidAmount(amount);
        // 채팅 메시지에 결제 메시지 추가
        handleSendMessage({
            type: 'PAYMENT',
            content: `${amount.toLocaleString()}원 결제 완료`
        });
    };

    return (
        <>
            {/* 리뷰 Alert */}
            <Alert {...reviewAlertState} />

            {reportModal.isOpen && (
                <ReportModal
                    {...reportModal}
                    estimateNo={estimateNo}
                    onClose={closeReportModal}
                />
            )}
            {reviewWriteModal.isOpen && (
                <ReviewWriteModal
                    isOpen={reviewWriteModal.isOpen}
                    onClose={closeReviewWriteModal}
                    onSubmit={submitReview}
                    tagOptions={reviewWriteModal.tagOptions}
                />
            )}
            {reviewViewModal.isOpen && reviewViewModal.data && (
                <ReviewViewModal
                    isOpen={reviewViewModal.isOpen}
                    review={reviewViewModal.data}
                    onClose={closeReviewViewModal}
                    onDelete={confirmDeleteReview}
                    onConfirm={closeReviewViewModal}
                />
            )}
            <S.ChatPopupOverlay>
                <S.ChatPopup>
                <S.ChatHeader>
                    <div>
                        <S.ChatTitle>채팅하기</S.ChatTitle>
                        <S.ChatSubtitle>{connectionStatus}</S.ChatSubtitle>
                    </div>
                    <S.CloseButton onClick={() => navi(-1)}>✕</S.CloseButton>
                </S.ChatHeader>

                <S.ChatActions>
                    <S.ActionLightWrapper>
                        <S.ActionButton
                        onClick={handleOpenReportModal}
                        >
                            <img src={reportImg} alt="report" />
                            신고하기
                        </S.ActionButton>
                    </S.ActionLightWrapper>

                    <S.ActionRightWrapper>
                        {userRole === 'ROLE_USER' && (
                            <S.ActionLightWrapper>
                                <S.ActionButton onClick={openReviewModal}>
                                    <img src={reviewImg} alt="review" />
                                    후기쓰기
                                </S.ActionButton>
                            </S.ActionLightWrapper>
                        )}
                        <S.ActionButton onClick={() => setShowPayment(true)}>
                            <img src={payImg} alt="pay" />
                            송금하기
                        </S.ActionButton>
                    </S.ActionRightWrapper>
                </S.ChatActions>

                <S.ChatMessages>
                    {messages.map((msg, index) => (
                        <S.Message
                            key={msg.messageNo || msg.tempId || index}
                            className={msg.mine ? "message-me" : "message-other"}
                        >
                            <S.MessageBubble $sender={msg.mine ? 'me' : 'other'}>
                                {msg.type === 'TEXT' && msg.content}

                                {msg.type === 'FILE' && (
                                    <div style={{ position: 'relative' }}>
                                        <div>{msg.content}</div>

                                        {msg.status === 'UPLOADING' && (
                                            <S.UploadingBox>
                                                <S.UploadingText>업로드 중... {msg.progress}%</S.UploadingText>
                                                <S.UploadingBarWrapper>
                                                <S.UploadingBar style={{ width: `${msg.progress}%` }} />
                                                </S.UploadingBarWrapper>
                                            </S.UploadingBox>
                                            )}
                                            {msg.status === 'FAILED' && (
                                            <S.FailedBox>전송 실패</S.FailedBox>
                                            )}
                                            {msg.attachments?.map((att, i) => (
                                                <S.ChatAttachmentImage
                                                    key={i}
                                                    src={att.filePath}
                                                    alt={att.originName}
                                                    $uploading={msg.status === 'UPLOADING'}
                                                />
                                            ))}
                                    </div>
                                )}

                                {msg.type === 'PAYMENT' && (
                                    <PaymentMessageCard 
                                        amount={parseInt(msg.content.replace(/[^0-9]/g, '')) || 0}
                                        date={msg.sentDate ? new Date(msg.sentDate).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                    />
                                )}
                            </S.MessageBubble>
                        </S.Message>
                    ))}
                    <div ref={messagesEndRef} />
                </S.ChatMessages>

                <S.ChatInputContainer>
                    {showEmojiPicker && (
                        <S.EmojiPicker>
                            {emojis.map((emoji, index) => (
                                <S.EmojiItem
                                    key={index}
                                    onClick={() => handleEmojiClick(emoji)}
                                >
                                    {emoji}
                                </S.EmojiItem>
                            ))}
                        </S.EmojiPicker>
                    )}

                    <S.ChatBox>
                        <S.ChatInput
                            type="text"
                            placeholder="메시지를 입력하세요"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={readyState !== WebSocket.OPEN}
                        />

                        <S.IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            <img src={emojiImg} alt="emoji" />
                        </S.IconButton>

                        <S.IconButton onClick={() => fileInputRef.current?.click()}>
                            <img src={fileImg} alt="file" />
                        </S.IconButton>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                        />

                        <S.IconButton
                            onClick={handleSendMessage}
                            disabled={readyState !== WebSocket.OPEN}
                        >
                            <img src={sendImg} alt="send" />
                        </S.IconButton>
                    </S.ChatBox>
                </S.ChatInputContainer>
                </S.ChatPopup>
            </S.ChatPopupOverlay>
            <Toast
                isVisible={showToast}
                message={toastMessage}
                variant={toastVariant}
                onClose={closeToast}
            />
            {/* 송금하기 모달 */}
            {showPayment && (
                <PaymentModal 
                    onClose={() => setShowPayment(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}

        </>
    );
};

export default ChatRoom;
