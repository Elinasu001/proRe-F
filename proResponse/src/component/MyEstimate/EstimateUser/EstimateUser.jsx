import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../Common/Layout/EstimateLayout.styled.js";
import UserCards from "./UserCards.jsx";
import { axiosAuth, axiosPublic } from "../../../api/reqApi.js";
import ExpertDetailPanel from "./ExpertDetailPanel.jsx";
import RequestDetailPanel from "./RequestDetailPanel.jsx";
import EstimateDetailPanel from "./EstimateDetailPanel.jsx";
import { createChatRoomApi } from "../../../api/chat/chatApi.js";

const EstimateUser = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [activeTab, setActiveTab] = useState("detail");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedExpert) {
      setSelectedImageIndex(0);
    }
  }, [selectedExpert]);

  useEffect(() => {
    if (activeTab === "review" && selectedExpert) {
      setLoadingReviews(true);
      axiosPublic
        .getList(`/api/reviews/expert/${selectedExpert.expertNo}`)
        .then((res) => {
          console.log(res.data);
          setReviews(res.data.list);
        })
        .catch((err) => {
          console.error("리뷰 불러오기 실패", err);
          setReviews([]);
        })
        .finally(() => setLoadingReviews(false));
    }
  }, [activeTab, selectedExpert]);

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
        `/api/estimate/receive/${requestNo}`,
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
    try {
      const requestNo = estimateData?.requestNo;
      const response = await axiosAuth.put(
        `/api/estimate/${requestNo}/accept`,
      );
      console.log("견적 수락 결과:", response);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("견적 수락 실패:", error);
    }
  };

  const handleChatStart = async (estimateData) => {
    try {
      const estimateNo = estimateData?.estimateNo ?? estimateData?.requestNo;
      const response = await createChatRoomApi({
        estimateNo: Number(estimateNo),
        content: "안녕하세요",
        type: "TEXT",
      });
      const created = response?.data?.data;
      const enterEstimateNo = created?.estimateNo ?? estimateNo;
      navigate(`/chatRoom/${enterEstimateNo}`);
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
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
          refreshKey={refreshKey}
        />
      </S.LeftContent>
      <S.RightContent>
        {selectedExpert ? (
          <ExpertDetailPanel
            selectedExpert={selectedExpert}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviews={reviews}
            loadingReviews={loadingReviews}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        ) : selectedEstimate ? (
          <EstimateDetailPanel estimateDetail={selectedEstimate} />
        ) : selectedRequest ? (
          <RequestDetailPanel selectedRequest={selectedRequest} />
        ) : (
          <S.Section>내 견적 보내기 (전문가)</S.Section>
        )}
      </S.RightContent>
    </>
  );
};

export default EstimateUser;
