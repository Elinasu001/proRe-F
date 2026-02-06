import React, { useState } from 'react';
import Toast from '../../Common/Toast/Toast.jsx';
import { useNavigate } from 'react-router-dom';
import * as S from '../../Common/Layout/EstimateLayout.styled.js';
import ExpertCards from './ExpertCards.jsx';
import RequestDetailPanel from './RequestDetailPanel.jsx';
import MatchedDetailPanel from './MatchedDetailPanel.jsx';
import { axiosAuth } from '../../../api/reqApi.js';
// import { createRoomApi } from '../../../api/chat/chatApi.js';
import { createRoomApi } from "../../../api/chat/chatApi.js";

const EstimateExpert = () => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedMatched, setSelectedMatched] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  // 토스트 상태 및 함수 (useChatRoom과 동일)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const showToastMessage = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };
  const closeToast = () => setShowToast(false);
  

  const handleRequestDetail = async (requestNo) => {
    try {
      const response = await axiosAuth.getList(`/api/estimate/request/${requestNo}`);
      console.log("받은 요청 상세 데이터:", response);
      setSelectedMatched(null);
      setSelectedRequest(response.data || response);
    } catch (error) {
      console.error("받은 요청 상세 조회 실패:", error);
    }
  };

  const handleMatchedDetail = async (requestNo) => {
    try {
      let requestData = null;
      let estimateData = null;
      
      // 1. 회원의 요청 정보 조회
      try {
        const requestResponse = await axiosAuth.getList(`/api/estimate/request/${requestNo}`);
        console.log("매칭 완료 - 요청 상세 데이터:", requestResponse);
        requestData = requestResponse.data || requestResponse;
      } catch (e) {
        console.error("요청 정보 조회 실패:", e);
      }
      
      // 2. 내가 보낸 견적 정보 조회
      try {
        const estimateResponse = await axiosAuth.getList(`/api/estimate/response/${requestNo}`);
        console.log("매칭 완료 - 견적 상세 데이터:", estimateResponse);
        estimateData = estimateResponse.data || estimateResponse;
      } catch (e) {
        console.error("견적 정보 조회 실패:", e);
      }
      
      setSelectedRequest(null);
      setSelectedMatched({
        request: requestData,
        estimate: estimateData
      });
    } catch (error) {
      console.error("매칭 완료 상세 조회 실패:", error);
    }
  };

  const handleChatStart = async (data) => {
    setLoading(true);
    try {
      
      const estimateNo = data?.estimateNo;
      const chatMessageDto = {
        content: "안녕하세요",
        type: "TEXT"
      };

      const response = await createRoomApi(
        estimateNo ? Number(estimateNo) : undefined,
        chatMessageDto
      );

      const created = response?.data?.data;
      const enterEstimateNo = created?.estimateNo ?? estimateNo;
      showToastMessage('채팅방이 생성되었습니다!', 'success');
      navigate(`/chatRoom/${enterEstimateNo}`);

    } catch (error) {
      
      const msg = error?.response?.data?.message;
      if (msg && msg.includes("이미 채팅방이 존재합니다")) {
        showToastMessage('이미 채팅방이 존재합니다. 바로 입장합니다.', 'info');
        navigate(`/chatRoom/${data?.estimateNo}`);
        return;
      }

      showToastMessage(msg || "채팅방 생성 실패", 'error');

    } finally {
      setLoading(false);
    }
  };


  const handleEstimateSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteEstimate = async (requestNo) => {
    // 확인 창 표시
    if (!window.confirm('정말로 견적을 삭제 하시겠습니까?')) {
      return;
    }
    
    try {
      await axiosAuth.delete(`/api/estimate/${requestNo}`);
      alert('견적이 삭제되었습니다.');
      // 목록 새로고침
      setRefreshKey(prev => prev + 1);
      // 선택된 상세 초기화
      setSelectedRequest(null);
      setSelectedMatched(null);
    } catch (error) {
      console.error('견적 삭제 실패:', error);
      alert('견적 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          variant={toastVariant}
          onClose={closeToast}
        />
      )}
      <S.LeftContent>
        <ExpertCards 
          onRequestDetail={handleRequestDetail}
          onMatchedDetail={handleMatchedDetail}
          onChatStart={handleChatStart}
          onEstimateSuccess={handleEstimateSuccess}
          onDeleteEstimate={handleDeleteEstimate}
          refreshKey={refreshKey}
        />
      </S.LeftContent>
      <S.RightContent>
        {selectedRequest ? (
          <RequestDetailPanel 
            requestDetail={selectedRequest}
            onClose={() => setSelectedRequest(null)}
          />
        ) : selectedMatched ? (
          <MatchedDetailPanel 
            matchedDetail={selectedMatched}
            onClose={() => setSelectedMatched(null)}
          />
        ) : (
          <S.Section>내 견적 보내기 (전문가)</S.Section>
        )}
      </S.RightContent>
    </>
  );           
};

export default EstimateExpert;
