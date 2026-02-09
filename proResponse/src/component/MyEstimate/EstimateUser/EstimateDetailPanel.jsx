import { useEffect, useState } from "react";
import { axiosAuth, axiosPublic } from "../../../api/reqApi.js";
import defaultImg from "../../../assets/images/common/default_profile.png";
import mCarerImg from "../../../assets/images/common/m_carer.png";
import mLocationImg from "../../../assets/images/common/m_location.png";
import starImg from "../../../assets/images/common/m_star.png";
import mTimeImg from "../../../assets/images/common/m_time.png";
import ExpertDetail from "../../Common/Export/ExportDetail";
import * as EC from "../../Common/ExportCards/ExportCards.styled.js";
import { MainImage, MainImageContainer, NoImagePlaceholder, NoImageThumbnail, PhotoSection, SectionTitle, ServiceDescription, ServiceSection, TabButton, TabButtons, ThumbnailContainer, ThumbnailImage, ThumbnailWrapper } from "../../Common/Modal/ExportDetail/ExpertDetailModal.styled.js";
import * as SR from "../../Common/Review/Review.styled.js";
import ExpertReviewList from "./ExpertReviewList";

const statusLabelMap = {
  QUOTED: "견적 대기",
  MATCHED: "매칭 완료",
  DONE: "진행 완료",
};

const EstimateDetailPanel = ({ estimateDetail, selectedImageIndex, setSelectedImageIndex }) => {
  const [expertFull, setExpertFull] = useState(null);
  const [expertLoading, setExpertLoading] = useState(false);
  const [subTab, setSubTab] = useState('expert');
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const nickname = estimateDetail?.nickname || estimateDetail?.nickName || "전문가";
  
  // 견적 상세용 데이터 (content, filePaths)
  const estimateContent = estimateDetail?.content || "";
  const estimateFilePaths = estimateDetail?.filePaths || [];
  
  // 전문가 이미지 (images 배열)
  const expertImages = estimateDetail?.images || [];

  // 전문가 상세 정보용 데이터 객체
  const expertData = {
    expertNo: estimateDetail?.expertNo,
    nickname: nickname,
    profileImg: estimateDetail?.profileImg || estimateDetail?.profileImage || defaultImg,
    address: estimateDetail?.address,
    starScore: estimateDetail?.starScore ?? 0,
    reviewCount: estimateDetail?.reviewCount ?? 0,
    career: estimateDetail?.career,
    startTime: estimateDetail?.startTime,
    endTime: estimateDetail?.endTime,
    content: estimateDetail?.expertContent ?? "",
    images: expertImages,
    completedJobs: estimateDetail?.completedJobs ?? 0,
  };

  useEffect(() => {
    let mounted = true;
    const expertNo = estimateDetail?.expertNo;
    if (expertNo) {
      setExpertLoading(true);
      axiosAuth
        .getList(`/api/experts/${expertNo}`)
        .then((res) => {
          if (!mounted) return;
          setExpertFull(res.data || res.data?.data || null);
        })
        .catch((err) => {
          console.error("전문가 상세 불러오기 실패:", err);
          setExpertFull(null);
        })
        .finally(() => mounted && setExpertLoading(false));
    } else {
      setExpertFull(null);
    }
    return () => {
      mounted = false;
    };
  }, [estimateDetail?.expertNo]);

  // 리뷰 탭 선택 시 리뷰 fetch
  useEffect(() => {
    if (subTab === 'review' && estimateDetail?.expertNo) {
      setLoadingReviews(true);
      axiosPublic
        .getList(`/api/reviews/expert/${estimateDetail.expertNo}`)
        .then((res) => {
          setReviews(res.data?.list || res.data || []);
        })
        .catch((err) => {
          console.error("리뷰 불러오기 실패", err);
          setReviews([]);
        })
        .finally(() => setLoadingReviews(false));
    }
  }, [subTab, estimateDetail?.expertNo]);

  if (!estimateDetail) return null;

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
            // boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
            padding: "24px",
          }}
        >
          <EC.InfoBox>
            {/* 상단 요약 정보 - 항상 고정 */}
            <EC.Top>
              <EC.Profile>
                <EC.ProfileImg
                  src={estimateDetail.profileImg || defaultImg}
                  alt="프로필"
                />
                <EC.Name>
                  <span>{nickname}</span> 전문가
                </EC.Name>
              </EC.Profile>
            </EC.Top>

            <EC.Col>
              <EC.Row>
                <EC.Icon src={mTimeImg} alt="견적 비용" />
                <EC.TextWrapper>
                  <EC.Data>견적 비용</EC.Data>
                </EC.TextWrapper>
              </EC.Row>
              <EC.Row>
                <EC.Data style={{ fontWeight: "bold" }}>
                  총 {Number(estimateDetail.price || 0).toLocaleString()}원
                </EC.Data>
              </EC.Row>
            </EC.Col>

            <EC.InfoRow style={{ marginTop: 12 }}>
              <SR.Rating>
                <SR.StarImg
                  src={starImg}
                  alt="별점"
                  style={{ width: 16, height: 16, marginRight: 4 }}
                />
                {estimateDetail.starScore ?? 0}
              </SR.Rating>
            </EC.InfoRow>

            <EC.InfoRow>
              <EC.Icon src={mLocationImg} alt="위치" />
              <EC.Data>{estimateDetail.address || "위치 정보 없음"}</EC.Data>
            </EC.InfoRow>

            <EC.InfoRow>
              <EC.Icon src={mCarerImg} alt="경력" />
              경력 &nbsp;<EC.Data>{estimateDetail.career ?? 0}</EC.Data>년
            </EC.InfoRow>

            <EC.InfoRow>
              <EC.Icon src={mTimeImg} alt="시간" />
              연락 가능 시간 : <EC.Data>{estimateDetail.startTime ?? "--"}</EC.Data> ~ <EC.Data>{estimateDetail.endTime ?? "--"}</EC.Data>
            </EC.InfoRow>

            {/* 탭 버튼 */}
            <div style={{ marginTop: 20 }}>
              <TabButtons>
                <TabButton $isActive={subTab === 'expert'} onClick={() => setSubTab('expert')}>전문가 상세 설명</TabButton>
                <TabButton $isActive={subTab === 'estimate'} onClick={() => setSubTab('estimate')}>견적 상세 설명</TabButton>
                <TabButton $isActive={subTab === 'review'} onClick={() => setSubTab('review')}>리뷰 {estimateDetail.reviewCount ?? 0}</TabButton>
              </TabButtons>

              {/* 탭 컨텐츠 */}
              <div style={{ marginTop: 12 }}>
                {subTab === 'expert' && (
                  <div>
                    {expertLoading ? (
                      <p>로딩 중...</p>
                    ) : (
                      <ExpertDetail data={expertFull || expertData} selectedImageIndex={selectedImageIndex} setSelectedImageIndex={setSelectedImageIndex} />
                    )}
                  </div>
                )}
                {subTab === 'estimate' && (
                  <>
                    {/* 견적 상세 설명 */}
                    <ServiceSection>
                      <SectionTitle>견적 상세설명</SectionTitle>
                      <ServiceDescription>{estimateContent || "견적 내용이 없습니다."}</ServiceDescription>
                    </ServiceSection>

                    {/* 첨부 이미지 */}
                    <PhotoSection>
                      <SectionTitle>첨부 이미지</SectionTitle>
                      <MainImageContainer>
                        {estimateFilePaths.length > 0 && estimateFilePaths[selectedImageIndex] ? (
                          <MainImage 
                            src={estimateFilePaths[selectedImageIndex]} 
                            alt={`첨부 이미지 ${selectedImageIndex + 1}`}
                          />
                        ) : (
                          <NoImagePlaceholder>
                            <span>이미지 없음</span>
                          </NoImagePlaceholder>
                        )}
                      </MainImageContainer>

                      <ThumbnailContainer>
                        {[...estimateFilePaths, ...Array(Math.max(0, 4 - estimateFilePaths.length)).fill(null)].slice(0, 4).map((image, index) => (
                          <ThumbnailWrapper
                            key={index}
                            onClick={() => image && setSelectedImageIndex(index)}
                            $isActive={index === selectedImageIndex}
                            $hasImage={!!image}
                          >
                            {image ? (
                              <ThumbnailImage 
                                src={image} 
                                alt={`썸네일 ${index + 1}`}
                              />
                            ) : (
                              <NoImageThumbnail>
                                <span>No Image</span>
                              </NoImageThumbnail>
                            )}
                          </ThumbnailWrapper>
                        ))}
                      </ThumbnailContainer>
                    </PhotoSection>
                  </>
                )}
                {subTab === 'review' && (
                  <ExpertReviewList reviews={reviews} loading={loadingReviews} />
                )}
              </div>
            </div>
          </EC.InfoBox>
        </div>
      </div>
    </div>
  );
};

export default EstimateDetailPanel;
