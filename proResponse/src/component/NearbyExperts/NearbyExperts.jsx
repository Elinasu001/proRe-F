import React, { useState } from "react";
import * as S from "../Common/Layout/EstimateLayout.styled.js";
import Map from "../Common/Map/Map.jsx";
import * as EC from "../Common/ExportCards/ExportCards.styled.js";
import * as RS from "../Common/Review/Review.styled.js";
import starImg from "../../assets/images/common/m_star.png";
import reviewStarImg from "../../assets/images/common/star.png";
import mLocationImg from "../../assets/images/common/m_location.png";
import mCarerImg from "../../assets/images/common/m_carer.png";
import mTimeImg from "../../assets/images/common/m_time.png";
import mHireImg from "../../assets/images/common/m_hire.png";
import defaultImg from "../../assets/images/common/default_profile.png";
import { axiosPublic, axiosAuth } from "../../api/reqApi.js";
import ExpertDetail from "../Common/Export/ExportDetail.jsx";
import { TabButtons, TabButton } from "../Common/Modal/ExportDetail/ExpertDetailModal.styled.js";
import EstimateRequest from "../EstimateRequest/EstimateRequest.jsx";

const NearbyExperts = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [expertDetail, setExpertDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('detail');
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // 카테고리 선택 관련 state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  
  // 견적 요청 모달 관련 state
  const [showEstimateRequest, setShowEstimateRequest] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 견적 요청 버튼 클릭 시 카테고리 조회
  const handleRequestEstimate = async () => {
    if (!expertDetail?.expertNo) {
      alert('전문가 정보를 불러오는 중입니다.');
      return;
    }

    setLoadingCategories(true);
    try {
      const response = await axiosPublic.getList(`/api/experts/${expertDetail.expertNo}/categories`);
      //console.log("카테고리 조회:", response);
      const categoryData = response.data || response || [];
      setCategories(Array.isArray(categoryData) ? categoryData : []);
      setShowCategoryModal(true);
    } catch (error) {
      console.error("카테고리 조회 실패:", error);
      alert('카테고리 조회에 실패했습니다.');
    } finally {
      setLoadingCategories(false);
    }
  };

  // 카테고리 선택 시 견적 요청 모달 표시
  const handleCategorySelect = (category) => {
    //console.log("선택된 카테고리:", category);
    //console.log("parentCategoryName:", category.parentCategoryName);
    //console.log("categoryName:", category.categoryName);
    //console.log("detailCategoryName:", category.detailCategoryName);
    setShowCategoryModal(false);
    setSelectedCategory(category);
    setShowEstimateRequest(true);
  };

  // 견적 요청 제출
  const handleEstimateSubmit = async (formData) => {
    try {
      const response = await axiosAuth.post('/api/estimate', formData);
      //console.log("견적 요청 응답:", response);
      alert('견적 요청이 완료되었습니다.');
      setShowEstimateRequest(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("견적 요청 실패:", error);
      alert('견적 요청에 실패했습니다. 로그인이 필요합니다.');
    }
  };

  // 마커 클릭 시 전문가 상세 조회
  const handleExpertClick = async (expert) => {
    //console.log("선택된 전문가:", expert);
    setSelectedExpert(expert);
    setSelectedImageIndex(0);
    setActiveTab('detail');
    setReviews([]); // 전문가 변경 시 리뷰 초기화
    
    if (expert.expertNo) {
      setLoading(true);
      try {
        const response = await axiosPublic.getList(`/api/experts/${expert.expertNo}`);
        //console.log("전문가 상세:", response.data);
        setExpertDetail(response.data || response);
      } catch (error) {
        console.error("전문가 상세 조회 실패:", error);
        setExpertDetail(null);
      } finally {
        setLoading(false);
      }
    }
  };

  // 리뷰 탭 클릭 시 리뷰 조회
  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    if (tab === 'review' && expertDetail?.expertNo && reviews.length === 0) {
      setLoadingReviews(true);
      try {
        const response = await axiosPublic.getList(`/api/reviews/expert/${expertDetail.expertNo}`);
        //console.log("리뷰 응답:", response);
        // PageResponse 형태: { list: [...], totalCount, pageNo, ... }
        const reviewData = response.data?.list || response.list || response.data || [];
        setReviews(Array.isArray(reviewData) ? reviewData : []);
      } catch (error) {
        console.error("리뷰 조회 실패:", error);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    }
  };

  const displayExpert = expertDetail || selectedExpert;

  return (
    <>
      <S.LeftContent>
        <S.Section>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 20 }}>주변 전문가 찾기</h2>
          <Map onExpertClick={handleExpertClick} />
        </S.Section>
      </S.LeftContent>
      
      <S.RightContent>
        {selectedExpert ? (
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* 헤더 */}
            <div style={{ padding: "20px", borderBottom: "1px solid #e0e0e0" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                전문가 상세
              </h2>
              <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "14px" }}>
                전문가님의 정보를 확인해보세요.
              </p>
            </div>

            {/* 스크롤 가능한 컨텐츠 */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: 40 }}>로딩 중...</div>
              ) : displayExpert ? (
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
                        src={displayExpert.profileImg || defaultImg}
                        alt="프로필"
                      />
                      <EC.Name>
                        <span>{displayExpert.nickname || '전문가'}</span> 전문가
                      </EC.Name>
                    </EC.Profile>
                  </EC.Top>

                  <EC.Col>
                    <EC.Row>
                      <EC.Icon src={starImg} alt="별점" />
                      <EC.TextWrapper>
                        <EC.Data>★ {displayExpert.starScore ?? 0}</EC.Data>
                        (<EC.Data>{displayExpert.reviewCount ?? 0}</EC.Data>)
                      </EC.TextWrapper>
                    </EC.Row>
                    <EC.Row>
                      <EC.Icon src={mHireImg} alt="고용" />
                      <EC.TextWrapper>
                        <EC.Data>{displayExpert.completedJobs ?? 0}회 고용됨</EC.Data>
                      </EC.TextWrapper>
                    </EC.Row>
                  </EC.Col>

                  <EC.InfoBox>
                    {displayExpert.categoryName && (
                      <EC.InfoRow>
                        <EC.Icon src={mTimeImg} alt="카테고리" />
                        <EC.Data>{displayExpert.categoryName}</EC.Data>
                      </EC.InfoRow>
                    )}
                    <EC.InfoRow>
                      <EC.Icon src={mLocationImg} alt="위치" />
                      <EC.Data>{displayExpert.address || "위치 정보 없음"}</EC.Data>
                    </EC.InfoRow>
                    <EC.InfoRow>
                      <EC.Icon src={mCarerImg} alt="경력" />
                      경력 &nbsp;<EC.Data>{displayExpert.career ?? 0}</EC.Data>년
                    </EC.InfoRow>
                    <EC.InfoRow>
                      <EC.Icon src={mTimeImg} alt="시간" />
                      연락 가능 시간 : <EC.Data>{displayExpert.startTime ?? "--"}</EC.Data> ~ <EC.Data>{displayExpert.endTime ?? "--"}</EC.Data>
                    </EC.InfoRow>
                  </EC.InfoBox>

                  {/* 탭 버튼 */}
                  <div style={{ marginTop: 20 }}>
                    <TabButtons>
                      <TabButton 
                        $isActive={activeTab === 'detail'} 
                        onClick={() => handleTabChange('detail')}
                      >
                        상세 설명
                      </TabButton>
                      <TabButton 
                        $isActive={activeTab === 'review'} 
                        onClick={() => handleTabChange('review')}
                      >
                        리뷰 {displayExpert.reviewCount ?? 0}
                      </TabButton>
                    </TabButtons>

                    {/* 탭 컨텐츠 */}
                    <div style={{ marginTop: 16 }}>
                      {activeTab === 'detail' && (
                        <ExpertDetail 
                          data={displayExpert} 
                          selectedImageIndex={selectedImageIndex} 
                          setSelectedImageIndex={setSelectedImageIndex} 
                        />
                      )}
                      {activeTab === 'review' && (
                        <div>
                          {loadingReviews ? (
                            <div style={{ textAlign: 'center', padding: 20 }}>리뷰 로딩 중...</div>
                          ) : reviews.length > 0 ? (
                            reviews.map((review, idx) => (
                              <RS.ReviewContent key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                <RS.UserInfo>
                                  <RS.UserAvatar>
                                    {review.nickname?.charAt(0) || 'U'}
                                  </RS.UserAvatar>
                                  <RS.UserDetails>
                                    <RS.UserName>{review.nickname}</RS.UserName>
                                    <RS.ReviewDate>{review.createDate}</RS.ReviewDate>
                                  </RS.UserDetails>
                                  <RS.Rating>
                                    <RS.StarImg src={reviewStarImg} alt="별점" /> {review.starScore}
                                  </RS.Rating>
                                </RS.UserInfo>

                                {/* 이미지 갤러리 */}
                                {review.filePaths && review.filePaths.length > 0 && (
                                  <RS.ImageGallery>
                                    {review.filePaths.map((image, index) => (
                                      <RS.ReviewImage
                                        key={index}
                                        src={image}
                                        alt={`리뷰 이미지 ${index + 1}`}
                                      />
                                    ))}
                                    {[...Array(Math.max(0, 4 - review.filePaths.length))].map((_, index) => (
                                      <RS.EmptyImageSlot key={`empty-${index}`}>
                                        <span>No Image</span>
                                      </RS.EmptyImageSlot>
                                    ))}
                                  </RS.ImageGallery>
                                )}

                                {/* 리뷰 텍스트 */}
                                <RS.ReviewText>
                                  {review.content}
                                </RS.ReviewText>

                                {/* 태그 */}
                                {review.tagNames && review.tagNames.length > 0 && (
                                  <RS.TagList>
                                    {review.tagNames.map((tag, index) => (
                                      <RS.Tag key={index}>{tag}</RS.Tag>
                                    ))}
                                  </RS.TagList>
                                )}
                              </RS.ReviewContent>
                            ))
                          ) : (
                            <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
                              아직 리뷰가 없습니다.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 견적 요청 버튼 */}
                  <button
                    style={{
                      width: '100%',
                      marginTop: 24,
                      padding: '14px',
                      background: loadingCategories ? '#ccc' : '#0066ff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 'bold',
                      cursor: loadingCategories ? 'not-allowed' : 'pointer'
                    }}
                    onClick={handleRequestEstimate}
                    disabled={loadingCategories}
                  >
                    {loadingCategories ? '카테고리 조회 중...' : '견적 요청하기'}
                  </button>

                  {/* 카테고리 선택 모달 */}
                  {showCategoryModal && (
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999
                      }}
                      onClick={() => setShowCategoryModal(false)}
                    >
                      <div
                        style={{
                          background: '#fff',
                          borderRadius: 16,
                          padding: 24,
                          minWidth: 320,
                          maxWidth: 400,
                          maxHeight: '80vh',
                          overflowY: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 style={{ margin: '0 0 8px 0', fontSize: 18 }}>카테고리 선택</h3>
                        <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: 14 }}>
                          견적을 요청할 카테고리를 선택해주세요.
                        </p>
                        
                        {categories.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {categories.map((category, idx) => (
                              <button
                                key={idx}
                                style={{
                                  padding: '16px',
                                  border: '1px solid #e0e0e0',
                                  borderRadius: 12,
                                  background: '#fff',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.borderColor = '#0066ff';
                                  e.target.style.background = '#f0f7ff';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.borderColor = '#e0e0e0';
                                  e.target.style.background = '#fff';
                                }}
                                onClick={() => handleCategorySelect(category)}
                              >
                                <div style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 4 }}>
                                  {category.detailCategoryName || category.categoryName || category.name}
                                </div>
                                {category.parentCategoryName && (
                                  <div style={{ fontSize: 13, color: '#666' }}>
                                    {category.parentCategoryName}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
                            등록된 카테고리가 없습니다.
                          </div>
                        )}

                        <button
                          style={{
                            width: '100%',
                            marginTop: 20,
                            padding: '12px',
                            background: '#f5f5f5',
                            color: '#333',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: 14,
                            cursor: 'pointer'
                          }}
                          onClick={() => setShowCategoryModal(false)}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <S.Section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 16 }}>지도에서 마커를 클릭하면</p>
              <p style={{ fontSize: 16 }}>전문가 정보가 표시됩니다.</p>
            </div>
          </S.Section>
        )}
      </S.RightContent>

      {/* 견적 요청 모달 */}
      {showEstimateRequest && selectedCategory && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              maxWidth: 600,
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <EstimateRequest
              isOpen={showEstimateRequest}
              onClose={() => {
                setShowEstimateRequest(false);
                setSelectedCategory(null);
              }}
              expertInfo={{
                expertNo: expertDetail?.expertNo,
                expertName: expertDetail?.nickname || '전문가'
              }}
              categoryName={selectedCategory.parentCategoryName || selectedCategory.categoryName}
              detailCategoryNo={selectedCategory.detailCategoryNo || selectedCategory.categoryDetailNo}
              onSubmit={handleEstimateSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NearbyExperts;
