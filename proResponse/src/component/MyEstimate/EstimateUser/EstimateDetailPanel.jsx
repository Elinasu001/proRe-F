import React from "react";
import * as EC from "../../Common/ExportCards/ExportCards.styled.js";
import * as SR from "../../Common/Review/Review.styled.js";
import starImg from "../../../assets/images/common/m_star.png";
import defaultImg from "../../../assets/images/common/default_profile.png";

const statusLabelMap = {
  QUOTED: "견적 대기",
  MATCHED: "매칭 완료",
  DONE: "진행 완료",
};

const EstimateDetailPanel = ({ estimateDetail }) => {
  if (!estimateDetail) return null;

  const statusLabel = statusLabelMap[estimateDetail.status] || estimateDetail.status;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* 헤더 */}
      <div style={{ padding: "20px", borderBottom: "1px solid #e0e0e0" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
          견적 상세
        </h2>
        <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "14px" }}>
          받은 견적의 상세 정보를 확인해보세요.
        </p>
      </div>

      {/* 스크롤 가능한 컨텐츠 */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <div
          style={{
            borderRadius: "16px",
            background: "#fff",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
            padding: "24px",
          }}
        >
          <EC.Top>
            <EC.Profile>
              <EC.ProfileImg
                src={estimateDetail.profileImg || defaultImg}
                alt="프로필"
              />
              <EC.Name>
                <span>{estimateDetail.nickName}</span> 전문가
              </EC.Name>
            </EC.Profile>
          </EC.Top>

          <EC.Col>
            <EC.Row>
              <EC.Data>견적 비용</EC.Data>
            </EC.Row>
            <EC.Row>
              <EC.Data style={{ fontWeight: "bold" }}>
                총 {Number(estimateDetail.price || 0).toLocaleString()}원
              </EC.Data>
            </EC.Row>
          </EC.Col>

          <EC.InfoBox>
            <EC.InfoRow>
              <EC.Data>상태</EC.Data>
              <EC.Data>{statusLabel}</EC.Data>
            </EC.InfoRow>
            <EC.InfoRow>
              <SR.Rating>
                <SR.StarImg
                  src={starImg}
                  alt="별점"
                  style={{ width: 16, height: 16, marginRight: 4 }}
                />
                {estimateDetail.starScore}
              </SR.Rating>
              <EC.Data>리뷰 {estimateDetail.reviewCount}건</EC.Data>
            </EC.InfoRow>
          </EC.InfoBox>
        </div>
      </div>
    </div>
  );
};

export default EstimateDetailPanel;
