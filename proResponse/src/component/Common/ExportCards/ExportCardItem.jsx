import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAuth, axiosPublic } from "../../../api/reqApi.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import EstimateRequest from "../../EstimateRequest/EstimateRequest.jsx";
import ExportBasicInfo from "../Export/ExportBasicInfo.jsx";
import ExpertDetailModal from "../Modal/ExportDetail/ExpertDetailModal.jsx";
import useExpertDetailModal from "../Modal/ExportDetail/useExpertDetailModal.js";
import { Button, ButtonBox, Card } from "./ExportCards.styled.js";

const ExportCardItem = ({ data, categoryName, detailCategoryNo }) => {
  const { modalState, openModal, closeModal } = useExpertDetailModal();
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  //console.log(`categoryName : ${categoryName}`);
  //console.log(`detailCategoryNo : ${detailCategoryNo}`);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleDetailClick = async () => {
    try {
      const response = await axiosPublic.getList(
        `/api/experts/${data.expertNo}`,
      );
      //console.log('API 응답:', response.data);

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
        completedJobs: expertDetail.completedJobs,
        totalLikes: expertDetail.totalLike || 0,
      };

      console.log("매핑된 데이터:", mappedExpert);
      openModal(mappedExpert);
    } catch (error) {
      console.error("전문가 상세 정보 조회 실패", error);
    }
  };

  const handleRequest = () => {
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

    // 로그인/권한 OK → 실제 처리
    setIsEstimateOpen(true);

    setIsEstimateOpen(true);
  };

  const handleEstimateSubmit = async (formData) => {
    try {
      await axiosAuth.post("/api/estimate", formData, {});

      alert("견적 요청이 전송되었습니다!");
      setIsEstimateOpen(false);
    } catch (e) {
      console.error("견적 요청 실패", e);
      alert("견적 요청에 실패했습니다.");
    }
  };

  return (
    <>
      <Card>
        <ExportBasicInfo data={data} />
        <ButtonBox>
          <Button onClick={handleDetailClick}>자세히 보기</Button>
          <Button primary onClick={handleRequest}>
            견적 요청
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
      <EstimateRequest
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
        expertInfo={{
          expertNo: data.expertNo,
          expertName: data.nickName,
        }}
        categoryName={categoryName}
        detailCategoryNo={detailCategoryNo}
        onSubmit={handleEstimateSubmit}
      />
    </>
  );
};

export default ExportCardItem;
