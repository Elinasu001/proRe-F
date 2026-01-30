import React from "react";
import ExportBasicInfo from "../../Common/Export/ExportBasicInfo.jsx";
import ExpertDetail from "../../Common/Export/ExportDetail.jsx";
import * as SR from "../../Common/Review/Review.styled.js";
import starImg from "../../../assets/images/common/m_star.png";

const ExpertDetailPanel = ({
  selectedExpert,
  activeTab,
  setActiveTab,
  reviews,
  loadingReviews,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* 헤더 */}
      <div style={{ padding: "20px", borderBottom: "1px solid #e0e0e0" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
          상세보기
        </h2>
        <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "14px" }}>
          전문가님의 정보를 확인해보세요.
        </p>
      </div>

      {/* 스크롤 가능한 컨텐츠 */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* 전문가 정보 헤더 */}
        <div style={{ padding: "20px", marginBottom: "0" }}>
          <ExportBasicInfo data={selectedExpert} />
        </div>

        {/* 탭 버튼 */}
        <div
          style={{
            display: "flex",
            padding: "0 20px",
            marginBottom: "20px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              border: "none",
              background: activeTab === "detail" ? "#007bff" : "transparent",
              color: activeTab === "detail" ? "white" : "#666",
              cursor: "pointer",
              borderBottom:
                activeTab === "detail" ? "2px solid #007bff" : "none",
            }}
            onClick={() => setActiveTab("detail")}
          >
            상세 설명
          </button>
          <button
            style={{
              padding: "10px 20px",
              border: "none",
              background: activeTab === "review" ? "#007bff" : "transparent",
              color: activeTab === "review" ? "white" : "#666",
              cursor: "pointer",
              borderBottom:
                activeTab === "review" ? "2px solid #007bff" : "none",
            }}
            onClick={() => setActiveTab("review")}
          >
            리뷰 {selectedExpert.reviewCount}
          </button>
        </div>

        {/* 콘텐츠 영역 */}
        <div style={{ padding: "0 20px 20px 20px" }}>
          {activeTab === "detail" ? (
            <div
              style={{
                borderRadius: "16px",
                background: "#fff",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
                padding: "24px",
              }}
            >
              <ExpertDetail
                data={selectedExpert}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
              />
            </div>
          ) : (
            <div
              style={{
                borderRadius: "16px",
                background: "#fff",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
                padding: "24px",
                maxHeight: "calc(100vh - 400px)",
                overflowY: "auto",
              }}
            >
              {loadingReviews ? (
                <p>리뷰 로딩 중...</p>
              ) : reviews.length === 0 ? (
                <p>리뷰가 없습니다.</p>
              ) : (
                reviews.map((r, idx) => (
                  <div key={idx} style={{ marginBottom: "24px" }}>
                    {/* 사용자 정보 */}
                    <SR.UserInfo>
                      <SR.UserAvatar>
                        {r.profileImg ? (
                          <img
                            src={r.profileImg}
                            alt={r.nickname}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          r.nickname?.charAt(0) || "U"
                        )}
                      </SR.UserAvatar>

                      <SR.UserDetails>
                        <SR.UserName>{r.nickname}</SR.UserName>
                        <SR.ReviewDate>{r.categoryName}</SR.ReviewDate>
                      </SR.UserDetails>
                      <SR.UserDetails>
                        <SR.Rating>
                          <SR.StarImg
                            src={starImg}
                            alt="별점"
                            style={{
                              width: 16,
                              height: 16,
                              marginRight: 4,
                            }}
                          />
                          {r.starScore}
                        </SR.Rating>
                        <SR.ReviewDate>{r.createDate}</SR.ReviewDate>
                      </SR.UserDetails>
                    </SR.UserInfo>

                    {/* 이미지 */}
                    {r.filePaths?.length > 0 && (
                      <SR.ImageGallery>
                        {r.filePaths.map((img, i) => (
                          <SR.ReviewImage
                            key={i}
                            src={img}
                            alt={`리뷰 이미지 ${i + 1}`}
                          />
                        ))}
                      </SR.ImageGallery>
                    )}

                    {/* 리뷰 내용 */}
                    <SR.ReviewText>{r.content}</SR.ReviewText>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailPanel;
