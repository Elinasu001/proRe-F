import React from "react";
import ExpertDetail from "../../Common/Export/ExportDetail";
import ExpertReviewList from "./ExpertReviewList";
import * as EC from "../../Common/ExportCards/ExportCards.styled.js";
import mTimeImg from "../../../assets/images/common/m_time.png";
import mLocationImg from "../../../assets/images/common/m_location.png";
import mHireImg from "../../../assets/images/common/m_hire.png";
import mCarerImg from "../../../assets/images/common/m_carer.png";
import defaultImg from "../../../assets/images/common/default_profile.png";

const ExpertDetailPanel = ({
  expert,
  activeTab,
  setActiveTab,
  reviews,
  loading,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  const reviewCount = expert?.reviewCount ?? 0;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px", borderBottom: "1px solid #e0e0e0" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>상세보기</h2>
        <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "14px" }}>전문가님의 정보를 확인해보세요.</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <div style={{ borderRadius: "16px", background: "#fff", padding: "24px" }}>
          <EC.Top>
            <EC.Profile>
              <EC.ProfileImg src={expert?.profileImg || defaultImg} alt="프로필" />
              <EC.Name><span>{expert?.nickname || "전문가"}</span> 전문가</EC.Name>
            </EC.Profile>
          </EC.Top>

          <EC.Col>
            <EC.Row>
              <EC.Icon src={mTimeImg} alt="별점" />
              <EC.TextWrapper>
                <EC.Data>★ {expert?.starScore ?? 0}</EC.Data>
                (<EC.Data>{reviewCount}</EC.Data>)
              </EC.TextWrapper>
            </EC.Row>
            <EC.Row>
              <EC.Icon src={mHireImg} alt="고용" />
              <EC.TextWrapper>
                <EC.Data>{expert?.completedJobs ?? 0}</EC.Data>
              </EC.TextWrapper>
            </EC.Row>
          </EC.Col>

          <EC.InfoBox>
            <EC.InfoRow>
              <EC.Icon src={mHireImg} alt="고용" />
              <EC.Data>{expert?.completedJobs ?? 0}</EC.Data>회 고용됨
            </EC.InfoRow>
            <EC.InfoRow>
              <EC.Icon src={mLocationImg} alt="위치" />
              <EC.Data>{expert?.address || "위치 정보 없음"}</EC.Data>
            </EC.InfoRow>
            <EC.InfoRow>
              <EC.Icon src={mCarerImg} alt="경력" />
              경력 &nbsp;<EC.Data>{expert?.career ?? 0}</EC.Data>년
            </EC.InfoRow>
            <EC.InfoRow>
              <EC.Icon src={mTimeImg} alt="시간" />
              연락 가능 시간 : <EC.Data>{expert?.startTime ?? "--"}</EC.Data> ~ <EC.Data>{expert?.endTime ?? "--"}</EC.Data>
            </EC.InfoRow>
          </EC.InfoBox>

          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button onClick={() => setActiveTab('detail')} style={{ padding: '8px 16px', borderRadius: 20, border: activeTab === 'detail' ? '1px solid #0066ff' : '1px solid #eee', background: activeTab === 'detail' ? '#0066ff' : 'transparent', color: activeTab === 'detail' ? '#fff' : '#333' }}>상세 설명</button>
            <button onClick={() => setActiveTab('review')} style={{ padding: '8px 16px', borderRadius: 20, border: activeTab === 'review' ? '1px solid #0066ff' : '1px solid #eee', background: activeTab === 'review' ? '#0066ff' : 'transparent', color: activeTab === 'review' ? '#fff' : '#333' }}>리뷰 {reviewCount}</button>
          </div>

          <div style={{ marginTop: 20 }}>
            {activeTab === "detail" ? (
              <ExpertDetail data={expert || {}} selectedImageIndex={selectedImageIndex} setSelectedImageIndex={setSelectedImageIndex} />
            ) : (
              <ExpertReviewList reviews={reviews} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailPanel;
