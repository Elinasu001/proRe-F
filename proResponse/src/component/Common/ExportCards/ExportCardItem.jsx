import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAuth, axiosPublic } from "../../../api/reqApi.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import EstimateRequest from "../../EstimateRequest/EstimateRequest.jsx";
import ExportBasicInfo from "../Export/ExportBasicInfo.jsx";
import ExpertDetailModal from "../Modal/ExportDetail/ExpertDetailModal.jsx";
import useExpertDetailModal from "../Modal/ExportDetail/useExpertDetailModal.js";
import { Button, ButtonBox, Card } from "./ExportCards.styled.js";

const ExportCardItem = ({ data, categoryName, detailCategoryNo, onLike }) => {
  const { modalState, openModal, closeModal } = useExpertDetailModal();
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  //console.log(`categoryName : ${categoryName}`);
  //console.log(`detailCategoryNo : ${detailCategoryNo}`);
  //console.log("견적 목록에서 받은 data:", data);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleDetailClick = async () => {
    try {
      // accessToken이 있으면 인증 API, 없으면 공개 API 사용
      const hasToken = !!auth?.accessToken;
      const response = hasToken
        ? await axiosAuth.getList(`/api/experts/${data.expertNo}`)
        : await axiosPublic.getList(`/api/experts/${data.expertNo}`);

      const expertDetail = response.data;
      const mappedExpert = {
        expertNo: expertDetail.expertNo,
        nickName: expertDetail.nickname,
        profileImg: expertDetail.profileImg,
        career: expertDetail.career,
        startTime: expertDetail.startTime,
        endTime: expertDetail.endTime,
        starScore: expertDetail.starScore,
        content: expertDetail.content,
        reviewCount: expertDetail.reviewCount,
        address: expertDetail.address,
        userLiked: expertDetail.userLiked === 1, // 0/1 → boolean
        images: expertDetail.images || [],
        completedJobs: data.completedJobs ?? expertDetail.completedJobs,
        totalLikes: data.totalLikes ?? expertDetail.totalLike ?? 0,
      };
      console.log("매핑된 데이터:", mappedExpert);
      openModal(mappedExpert);
    } catch (error) {
      console.error("전문가 상세 정보 조회 실패", error);
    }
  };

  const handleRequest = async () => {
    if (!auth?.accessToken) {
      alert("로그인부터 해주세요.");
      navigate("/auth/loginForm", { replace: true });
      return;
    }

    // 권한 체크
    if (!["ROLE_USER"].includes(auth?.userRole)) {
      alert("접근 권한이 없습니다.");
      navigate("/", { replace: true });
      return;
    }

    // categoryName이나 detailCategoryNo가 없으면 카테고리 선택 모달 표시
    if (!categoryName || !detailCategoryNo) {
      setLoadingCategories(true);
      try {
        const response = await axiosPublic.getList(`/api/experts/${data.expertNo}/categories`);
        console.log("전문가 카테고리 조회:", response);
        const categoryData = response.data || response || [];
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setShowCategoryModal(true);
      } catch (error) {
        console.error("카테고리 조회 실패:", error);
        alert("카테고리 조회에 실패했습니다.");
      } finally {
        setLoadingCategories(false);
      }
      return;
    }

    // 카테고리가 있으면 바로 견적 요청 모달 열기
    setIsEstimateOpen(true);
  };

  // 카테고리 선택 시 견적 요청 모달 표시
  const handleCategorySelect = (category) => {
    console.log("선택된 카테고리 전체:", category);
    console.log("parentCategoryName:", category.parentCategoryName);
    console.log("categoryName:", category.categoryName);
    console.log("detailCategoryName:", category.detailCategoryName);
    setShowCategoryModal(false);
    setSelectedCategory(category);
    setIsEstimateOpen(true);
  };

  const handleEstimateSubmit = async (formData) => {
    try {
      await axiosAuth.post("/api/estimate", formData, {});

      alert("견적 요청이 전송되었습니다!");

      setIsEstimateOpen(false);
      setSelectedCategory(null);
      navigate(`/estimateUser`);      
    } catch (e) {
      console.error("견적 요청 실패", e);
      alert("견적 요청에 실패했습니다.");
    }
  };

  // 실제 사용할 카테고리 정보 (props로 받은 것 또는 선택된 것)
  const finalCategoryName = categoryName || selectedCategory?.detailCategoryName || selectedCategory?.categoryName;
  const finalDetailCategoryNo = detailCategoryNo || selectedCategory?.categoryDetailNo || selectedCategory?.detailCategoryNo;

  return (
    <>
      <Card>
        <ExportBasicInfo data={data} onLike={onLike} />
        <ButtonBox>
          <Button onClick={handleDetailClick}>자세히 보기</Button>
          <Button primary onClick={handleRequest} disabled={loadingCategories}>
            {loadingCategories ? "로딩..." : "견적 요청"}
          </Button>
        </ButtonBox>
      </Card>

      {modalState?.isOpen && (
        <ExpertDetailModal
          isOpen={modalState.isOpen}
          expert={modalState.expert}
          onClose={closeModal}
        />
      )}

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
            zIndex: 1000
          }}
          onClick={() => setShowCategoryModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 24,
              maxWidth: 400,
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
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

      <EstimateRequest
        isOpen={isEstimateOpen}
        onClose={() => {
          setIsEstimateOpen(false);
          setSelectedCategory(null);
        }}
        expertInfo={{
          expertNo: data.expertNo,
          expertName: data.nickName || data.nickname,
        }}
        categoryName={finalCategoryName}
        detailCategoryNo={finalDetailCategoryNo}
        onSubmit={handleEstimateSubmit}
      />
    </>
  );
};

export default ExportCardItem;
