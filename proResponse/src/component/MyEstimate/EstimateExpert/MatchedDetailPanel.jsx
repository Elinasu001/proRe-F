import React, { useState } from "react";
import * as EC from "../../Common/ExportCards/ExportCards.styled.js";
import mTimeImg from "../../../assets/images/common/m_time.png";
import mLocationImg from "../../../assets/images/common/m_location.png";
import mHireImg from "../../../assets/images/common/m_hire.png";
import mCarerImg from "../../../assets/images/common/m_carer.png";
import defaultImg from "../../../assets/images/common/default_profile.png";
import { TabButtons, TabButton, ServiceSection, SectionTitle, ServiceDescription, PhotoSection, MainImageContainer, MainImage, NoImagePlaceholder, ThumbnailContainer, ThumbnailWrapper, ThumbnailImage } from "../../Common/Modal/ExportDetail/ExpertDetailModal.styled.js";

const MatchedDetailPanel = ({ matchedDetail, onClose }) => {
  const [activeTab, setActiveTab] = useState('request'); // 'request' 또는 'estimate'
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!matchedDetail) return null;

  console.log("MatchedDetailPanel - matchedDetail:", matchedDetail);

  // matchedDetail은 {request: {...}, estimate: {...}} 구조
  const request = matchedDetail.request || {};
  const estimate = matchedDetail.estimate || {};

  // 회원 정보 (request에서 추출) - API 응답 구조에 맞게 수정
  const memberNickname = request.nickname || "회원";
  const memberProfileImg = request.profileImg || defaultImg;
  const memberAddress = request.address || "주소 정보 없음";
  const categoryName = request.categoryName || "";
  const requestType = request.requestType || "";  // 방문
  const requestService = request.requestService || "";  // 영상 편집
  const requestDate = request.requestDate || "";  // 2026-01-26
  
  // 회원 요청 정보 - API의 files 필드 사용
  const requestContent = request.content || "요청 내용이 없습니다.";
  const requestFiles = request.files || request.filePaths || [];
  
  // 견적 정보 (estimate에서 추출)
  const price = estimate.price || 0;
  const estimateContent = estimate.content || "견적 내용이 없습니다.";
  const estimateFilePaths = estimate.filePaths || [];
  const starScore = estimate.starScore || 0;
  const reviewCount = estimate.reviewCount || 0;

  // 현재 탭에 따른 이미지 배열
  const currentImages = activeTab === 'request' ? requestFiles : estimateFilePaths;
  const currentMainImage = currentImages.length > 0 
    ? (typeof currentImages[selectedImageIndex] === 'string' ? currentImages[selectedImageIndex] : currentImages[selectedImageIndex]?.filePath)
    : null;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* 헤더 */}
      <div style={{ padding: "20px", borderBottom: "1px solid #e0e0e0" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
          매칭 완료 상세
        </h2>
        <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "14px" }}>
          회원의 요청과 내가 보낸 견적을 확인하세요.
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
          <EC.InfoBox>
            {/* 상단 회원 정보 */}
            <EC.Top>
              <EC.Profile>
                <EC.ProfileImg
                  src={memberProfileImg}
                  alt="프로필"
                />
                <EC.Name>
                  <span>{memberNickname}</span> 회원
                </EC.Name>
              </EC.Profile>
            </EC.Top>

            <EC.Col style={{ marginTop: 12 }}>
              {categoryName && (
                <EC.Row>
                  <EC.Icon src={mTimeImg} alt="카테고리" />
                  <EC.TextWrapper>
                    <EC.Data>{categoryName}</EC.Data>
                  </EC.TextWrapper>
                </EC.Row>
              )}
              <EC.Row>
                <EC.Icon src={mLocationImg} alt="주소" />
                <EC.TextWrapper>
                  <EC.Data>{memberAddress}</EC.Data>
                </EC.TextWrapper>
              </EC.Row>
              {requestType && (
                <EC.Row>
                  <EC.Icon src={mHireImg} alt="방문유형" />
                  <EC.TextWrapper>
                    <EC.Data>{requestType}</EC.Data>
                  </EC.TextWrapper>
                </EC.Row>
              )}
              {requestService && (
                <EC.Row>
                  <EC.Icon src={mCarerImg} alt="서비스" />
                  <EC.TextWrapper>
                    <EC.Data>{requestService}</EC.Data>
                  </EC.TextWrapper>
                </EC.Row>
              )}
              {requestDate && (
                <EC.Row>
                  <EC.Icon src={mTimeImg} alt="날짜" />
                  <EC.TextWrapper>
                    <EC.Data>{requestDate}</EC.Data>
                  </EC.TextWrapper>
                </EC.Row>
              )}
            </EC.Col>

            {/* 탭 버튼 */}
            <div style={{ marginTop: 20 }}>
              <TabButtons>
                <TabButton 
                  $isActive={activeTab === 'request'} 
                  onClick={() => { setActiveTab('request'); setSelectedImageIndex(0); }}
                >
                  상세 설명
                </TabButton>
                <TabButton 
                  $isActive={activeTab === 'estimate'} 
                  onClick={() => { setActiveTab('estimate'); setSelectedImageIndex(0); }}
                >
                  견적 상세 설명
                </TabButton>
              </TabButtons>

              {/* 탭 컨텐츠 */}
              <div style={{ marginTop: 16 }}>
                {activeTab === 'request' && (
                  <>
                    {/* 회원 요청 서비스 상세설명 */}
                    <ServiceSection>
                      <SectionTitle>서비스 상세설명</SectionTitle>
                      <ServiceDescription>
                        {requestContent}
                      </ServiceDescription>
                    </ServiceSection>

                    {/* 요청 첨부 이미지 */}
                    <PhotoSection>
                      <SectionTitle>사진 상세보기</SectionTitle>
                      <MainImageContainer>
                        {requestFiles.length > 0 && currentMainImage ? (
                          <MainImage src={currentMainImage} alt="첨부 이미지" />
                        ) : (
                          <NoImagePlaceholder>이미지 없음</NoImagePlaceholder>
                        )}
                      </MainImageContainer>
                      {requestFiles.length > 0 ? (
                        <ThumbnailContainer>
                          {requestFiles.map((file, idx) => {
                            const imgSrc = typeof file === 'string' ? file : file?.filePath;
                            return (
                              <ThumbnailWrapper
                                key={idx}
                                $isActive={selectedImageIndex === idx}
                                onClick={() => setSelectedImageIndex(idx)}
                              >
                                <ThumbnailImage src={imgSrc} alt={`썸네일 ${idx + 1}`} />
                              </ThumbnailWrapper>
                            );
                          })}
                        </ThumbnailContainer>
                      ) : (
                        <ThumbnailContainer>
                          {[0, 1, 2, 3].map((idx) => (
                            <ThumbnailWrapper key={idx} $isActive={idx === 0}>
                              <div style={{ width: '100%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#999', border: '1px solid #e0e0e0', borderRadius: 4 }}>No Image</div>
                            </ThumbnailWrapper>
                          ))}
                        </ThumbnailContainer>
                      )}
                    </PhotoSection>
                  </>
                )}

                {activeTab === 'estimate' && (
                  <>
                    {/* 나의 견적 상세설명 */}
                    <ServiceSection>
                      <SectionTitle>견적 내용</SectionTitle>
                      <ServiceDescription>
                        {estimateContent}
                      </ServiceDescription>
                    </ServiceSection>

                    {/* 견적 금액 */}
                    <EC.Col style={{ marginTop: 12, marginBottom: 12 }}>
                      <EC.Row>
                        <EC.Icon src={mTimeImg} alt="견적 비용" />
                        <EC.TextWrapper>
                          <EC.Data>견적 비용</EC.Data>
                        </EC.TextWrapper>
                      </EC.Row>
                      <EC.Row>
                        <EC.Data style={{ fontWeight: "bold" }}>
                          총 {Number(price).toLocaleString()}원
                        </EC.Data>
                      </EC.Row>
                    </EC.Col>

                    {/* 견적 첨부 이미지 */}
                    <PhotoSection>
                      <SectionTitle>사진 상세보기</SectionTitle>
                      <MainImageContainer>
                        {estimateFilePaths.length > 0 && currentMainImage ? (
                          <MainImage src={currentMainImage} alt="견적 이미지" />
                        ) : (
                          <NoImagePlaceholder>이미지 없음</NoImagePlaceholder>
                        )}
                      </MainImageContainer>
                      {estimateFilePaths.length > 0 ? (
                        <ThumbnailContainer>
                          {estimateFilePaths.map((file, idx) => {
                            const imgSrc = typeof file === 'string' ? file : file?.filePath;
                            return (
                              <ThumbnailWrapper
                                key={idx}
                                $isActive={selectedImageIndex === idx}
                                onClick={() => setSelectedImageIndex(idx)}
                              >
                                <ThumbnailImage src={imgSrc} alt={`썸네일 ${idx + 1}`} />
                              </ThumbnailWrapper>
                            );
                          })}
                        </ThumbnailContainer>
                      ) : (
                        <ThumbnailContainer>
                          {[0, 1, 2, 3].map((idx) => (
                            <ThumbnailWrapper key={idx} $isActive={idx === 0}>
                              <div style={{ width: '100%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#999', border: '1px solid #e0e0e0', borderRadius: 4 }}>No Image</div>
                            </ThumbnailWrapper>
                          ))}
                        </ThumbnailContainer>
                      )}
                    </PhotoSection>
                  </>
                )}
              </div>
            </div>
          </EC.InfoBox>
        </div>
      </div>
    </div>
  );
};

export default MatchedDetailPanel;
