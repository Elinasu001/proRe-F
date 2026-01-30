import React from "react";
import * as SR from "../../Common/Review/Review.styled.js";
import * as EC from "../../Common/ExportCards/ExportCards.styled.js";
import mTimeImg from "../../../assets/images/common/m_time.png";
import mLocationImg from "../../../assets/images/common/m_location.png";
import mHireImg from "../../../assets/images/common/m_hire.png";
import mCarerImg from "../../../assets/images/common/m_carer.png";
import defaultImg from "../../../assets/images/common/default_profile.png";

const RequestDetailPanel = ({ selectedRequest }) => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* 헤더 */}
      <div style={{ padding: "20px", borderBottom: "1px solid #e0e0e0" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
          내 문의 상세
        </h2>
        <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "14px" }}>
          보낸 견적 요청의 상세 정보를 확인해보세요.
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
                src={selectedRequest.profileImg || defaultImg}
                alt="프로필"
              />
              <EC.Name>
                사용자 <span>{selectedRequest.nickname}</span>
              </EC.Name>
            </EC.Profile>
          </EC.Top>
          <EC.Col>
            <EC.Row>
              <EC.Icon src={mTimeImg} alt="카테고리" />
              <EC.TextWrapper>
                <EC.Data>{selectedRequest.categoryName}</EC.Data>
              </EC.TextWrapper>
            </EC.Row>
            <EC.Row>
              <EC.Icon src={mLocationImg} alt="주소" />
              <EC.TextWrapper>
                <EC.Data>{selectedRequest.address}</EC.Data>
              </EC.TextWrapper>
            </EC.Row>
          </EC.Col>
          <EC.InfoBox>
            <EC.InfoRow>
              <EC.Icon src={mHireImg} alt="요청 유형" />
              <EC.Data>{selectedRequest.requestType}</EC.Data>
            </EC.InfoRow>
            <EC.InfoRow>
              <EC.Icon src={mCarerImg} alt="서비스" />
              <EC.Data>{selectedRequest.requestService}</EC.Data>
            </EC.InfoRow>
            <EC.InfoRow>
              <EC.Icon src={mTimeImg} alt="요청 날짜" />
              <EC.Data>{selectedRequest.requestDate}</EC.Data>
            </EC.InfoRow>
            <EC.InfoRow
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <EC.Icon
                  src={mTimeImg}
                  alt="내용"
                  style={{ marginRight: "8px" }}
                />
                <strong>요청 내용</strong>
              </div>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#f9f9f9",
                  padding: "10px",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                {selectedRequest.content}
              </div>
            </EC.InfoRow>
            {selectedRequest.files && selectedRequest.files.length > 0 && (
              <EC.InfoRow
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <EC.Icon
                    src={mTimeImg}
                    alt="첨부 파일"
                    style={{ marginRight: "8px" }}
                  />
                  <strong>상세 이미지</strong>
                </div>
                <SR.ImageGallery>
                  {selectedRequest.files.map((file, idx) => (
                    <SR.ReviewImage
                      key={idx}
                      src={file.filePath}
                      alt={`첨부 이미지 ${idx + 1}`}
                    />
                  ))}
                </SR.ImageGallery>
              </EC.InfoRow>
            )}
          </EC.InfoBox>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPanel;
