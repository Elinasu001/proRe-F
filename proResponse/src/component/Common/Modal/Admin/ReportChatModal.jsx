import { useState, useEffect } from "react";
import { getReportChatContext } from "../../../../api/admin/adminReportApi";
import * as S from './ReportChatModal.styled';

const ReportChatModal = ({ reportNo, onClose }) => {
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await getReportChatContext(reportNo);
        setChatData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "채팅 조회 실패");
      } finally {
        setLoading(false);
      }
    };

    if (reportNo) {
      fetchChatData();
    }
  }, [reportNo]);

  if (loading) return <S.Modal>로딩 중...</S.Modal>;
  if (error) return <S.Modal>{error}</S.Modal>;
  if (!chatData) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>신고 관련 채팅 내역</S.Title>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.Header>

        <S.Info>
          <div>신고 번호: {chatData.reportNo}</div>
          <div>견적서 번호: {chatData.estimateNo}</div>
          <div>채팅방 번호: {chatData.roomNo}</div>
        </S.Info>

        <S.ChatList>
          {chatData.messages && chatData.messages.length > 0 ? (
            chatData.messages.map((msg) => (
              <S.ChatItem key={msg.messageNo}>
                <S.ChatHeader>
                  <S.Nickname>{msg.nickname}</S.Nickname>
                  <S.Time>{msg.sentDate}</S.Time>
                </S.ChatHeader>
                <S.ChatContent>{msg.content}</S.ChatContent>
              </S.ChatItem>
            ))
          ) : (
            <S.NoData>채팅 내역이 없습니다.</S.NoData>
          )}
        </S.ChatList>
      </S.Modal>
    </S.Overlay>
  );
};

export default ReportChatModal;