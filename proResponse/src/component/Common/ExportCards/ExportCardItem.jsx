import { Card, ButtonBox, Button } from "./ExportCards.styled.js";
import useExpertDetailModal from "../Modal/ExportDetail/useExpertDetailModal.js";
import ExportBasicInfo from "../Export/ExportBasicInfo.jsx";
import { axiosPublic } from "../../../api/reqApi.js";
import ExpertDetailModal from "../Modal/ExportDetail/ExpertDetailModal.jsx";

const ExportCardItem = ({ data }) => {
  const { modalState, openModal, closeModal } = useExpertDetailModal();

  const handleDetailClick = async () => {
    try {
      const response = await axiosPublic.getList(`/api/experts/${data.expertNo}`);
      console.log('API 응답:', response.data);
      
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

      console.log('매핑된 데이터:', mappedExpert);
      openModal(mappedExpert);
    } catch (error) {
      console.error("전문가 상세 정보 조회 실패", error);
    }
  };

  return (
    <>
      <Card>
        <ExportBasicInfo data={data} />
        <ButtonBox>
          <Button onClick={handleDetailClick}>자세히 보기</Button>
          <Button $primary>견적 요청</Button> 
        </ButtonBox>
      </Card>

      {modalState?.isOpen && (
        <ExpertDetailModal
          isOpen={modalState.isOpen}
          expert={modalState.expert} 
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ExportCardItem;