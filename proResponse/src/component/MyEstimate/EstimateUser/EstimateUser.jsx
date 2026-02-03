import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../Common/Layout/EstimateLayout.styled.js";
import UserCards from "./UserCards.jsx";
import { axiosAuth, axiosPublic } from "../../../api/reqApi.js";
import ExpertDetailPanel from "./ExpertDetailPanel.jsx";
import RequestDetailPanel from "./RequestDetailPanel.jsx";
import EstimateDetailPanel from "./EstimateDetailPanel.jsx";
import { createRoomApi } from "../../../api/chat/chatApi.js";
import { ImageUpload, TextArea } from "../../Common/Input/Input.jsx";

const EstimateUser = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [activeTab, setActiveTab] = useState("detail");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editModal, setEditModal] = useState({ isOpen: false, requestNo: null });
  const [editContent, setEditContent] = useState('');
  const [editImages, setEditImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedExpert) {
      setSelectedImageIndex(0);
    }
  }, [selectedExpert]);

  useEffect(() => {
    const expertNo = selectedExpert?.expertNo || selectedEstimate?.expertNo;
    if (activeTab === "review" && expertNo) {
      setLoadingReviews(true);
      axiosPublic
        .getList(`/api/reviews/expert/${expertNo}`)
        .then((res) => {
          console.log(res.data);
          setReviews(res.data.list || res.data || []);
        })
        .catch((err) => {
          console.error("리뷰 불러오기 실패", err);
          setReviews([]);
        })
        .finally(() => setLoadingReviews(false));
    }
  }, [activeTab, selectedExpert, selectedEstimate]);

  const handleExpertDetail = (expertData) => {
    setSelectedExpert(expertData);
    setSelectedRequest(null);
    setSelectedEstimate(null);
    setActiveTab("detail");
    setReviews([]);
  };

  const handleRequestDetail = async (requestNo) => {
    try {
      const response = await axiosAuth.getList(
        `/api/estimate/request/${requestNo}`,
      );
      console.log("요청 상세 데이터:", response);
      setSelectedRequest(response.data);
      setSelectedExpert(null); // 전문가 상세와 요청 상세를 동시에 표시하지 않음
      setSelectedEstimate(null);
      setActiveTab("detail");
      setReviews([]);
    } catch (error) {
      console.error("요청 상세 조회 실패:", error);
    }
  };

  const handleEstimateDetail = async (requestNo) => {
    try {
      const response = await axiosAuth.getList(
        `/api/estimate/response/${requestNo}`,
      );
      console.log("받은 견적 상세 데이터:", response);
      setSelectedEstimate(response.data || response);
      setSelectedExpert(null);
      setSelectedRequest(null);
      setActiveTab("detail");
      setReviews([]);
    } catch (error) {
      console.error("받은 견적 상세 조회 실패:", error);
    }
  };

  const handleQuoteAccept = async (estimateData) => {
    const confirmed = window.confirm('이 견적을 수락하시겠습니까?');
    if (!confirmed) return;

    try {
      const requestNo = estimateData?.requestNo;
      const response = await axiosAuth.put(
        `/api/estimate/${requestNo}/accept`,
      );
      console.log("견적 수락 결과:", response);
      alert('견적이 수락되었습니다.');
      // 약간의 딜레이 후 화면 새로고침
      setTimeout(() => {
        setRefreshKey((prev) => prev + 1);
        setSelectedEstimate(null);
      }, 500);
    } catch (error) {
      console.error("견적 수락 실패:", error);
      alert('견적 수락에 실패했습니다.');
    }
  };

  const handleChatStart = async (estimateData) => {
    try {
      const estimateNo = estimateData?.estimateNo ?? estimateData?.requestNo;
        const chatMessageDto = {
          content: "안녕하세요",
          type: "TEXT",
        };
        const response = await createRoomApi(estimateNo, chatMessageDto);
      const created = response?.data?.data;
      const enterEstimateNo = created?.estimateNo ?? estimateNo;
      navigate(`/chatRoom/${enterEstimateNo}`);
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
    }
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
      setSelectedExpert(null);
      setSelectedRequest(null);
      setSelectedEstimate(null);
    } catch (error) {
      console.error('견적 삭제 실패:', error);
      alert('견적 삭제에 실패했습니다.');
    }
  };

  const handleEditEstimate = async (requestNo) => {
    // 기존 요청 정보 가져오기
    try {
      const response = await axiosAuth.getList(`/api/estimate/request/${requestNo}`);
      const requestData = response.data || response;
      setEditContent(requestData.content || '');
      setEditImages([]);
      setEditModal({ isOpen: true, requestNo });
    } catch (error) {
      console.error('요청 정보 조회 실패:', error);
      alert('요청 정보를 불러올 수 없습니다.');
    }
  };

  const handleEditSubmit = async () => {
    if (!editContent.trim()) {
      alert('설명을 입력해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', editContent);
      editImages.forEach((image) => {
        if (image.file) {
          formData.append('images', image.file);
        }
      });

      await axiosAuth.put(`/api/estimate/${editModal.requestNo}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('견적 요청이 수정되었습니다.');
      setEditModal({ isOpen: false, requestNo: null });
      setEditContent('');
      setEditImages([]);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('견적 수정 실패:', error);
      alert('견적 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <S.LeftContent>
        <UserCards
          onExpertDetail={handleExpertDetail}
          onRequestDetail={handleRequestDetail}
          onEstimateDetail={handleEstimateDetail}
          onQuoteAccept={handleQuoteAccept}
          onChatStart={handleChatStart}
          onDeleteEstimate={handleDeleteEstimate}
          onEditEstimate={handleEditEstimate}
          refreshKey={refreshKey}
        />
      </S.LeftContent>
      <S.RightContent>
        {selectedExpert ? (
          <ExpertDetailPanel
            expert={selectedExpert}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviews={reviews}
            loading={loadingReviews}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            onClose={() => setSelectedExpert(null)}
          />
        ) : selectedEstimate ? (
          <EstimateDetailPanel
            estimateDetail={selectedEstimate}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        ) : selectedRequest ? (
          <RequestDetailPanel selectedRequest={selectedRequest} />
        ) : (
          <S.Section>내 견적 보내기 (전문가)</S.Section>
        )}
      </S.RightContent>

      {/* 견적 수정 모달 */}
      {editModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 12,
            padding: 24,
            width: '90%',
            maxWidth: 500,
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>견적 요청 수정</h3>
            
            <ImageUpload
              label="사진 첨부"
              images={editImages}
              onChange={setEditImages}
              maxImages={4}
            />

            <TextArea
              label="설명"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="수정할 내용을 입력하세요"
              maxLength={2000}
            />

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                onClick={() => {
                  setEditModal({ isOpen: false, requestNo: null });
                  setEditContent('');
                  setEditImages([]);
                }}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
              <button
                onClick={handleEditSubmit}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: 8,
                  background: '#007bff',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EstimateUser;
