import CommonModal from '../../Common/Modal/CommonModal.jsx';
import ReviewItem from '../../Common/Review/ReviewItem.jsx';
import { useReviewItemFeatures } from '../../Common/Review/useReviewItemFeatures.js';
import * as S from '../../Common/Modal/Review/Modal.styled.js';

/**
 * ReviewViewModal - 작성된 리뷰 조회 모달
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Object} props.review - 리뷰 데이터
 * @param {function} props.onClose - 닫기 콜백
 * @param {function} props.onDelete - 삭제 콜백
 * @param {function} props.onConfirm - 확인 콜백
 */
const ReviewViewModal = ({ isOpen, review, onClose, onDelete, onConfirm }) => {
  const {
    isExpanded,
    setIsExpanded,
    selectedImage,
    textRef,
    needsShowMore,
    handleImageClick,
    handleCloseLightbox,
  } = useReviewItemFeatures(review);

  if (!isOpen || !review) return null;

  return (
    <>
      <CommonModal isOpen={isOpen} onClose={onClose} ariaLabelledby="review-title">
        {/* 헤더 */}
        <S.ModalHeader>
          <S.ModalTitle id="review-title">내가 보낸 후기</S.ModalTitle>
          {onDelete && (
            <S.DeleteButton onClick={onDelete} aria-label="삭제하기">
              <span>삭제하기</span>
            </S.DeleteButton>
          )}
        </S.ModalHeader>
        {/* 리뷰 내용 */}
        <ReviewItem
          review={review}
          handleImageClick={handleImageClick}
          textRef={textRef}
          isExpanded={isExpanded}
          needsShowMore={needsShowMore}
          setIsExpanded={setIsExpanded}
        />
        {/* 버튼 그룹 */}
        <S.ButtonGroup>
          <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
        </S.ButtonGroup>
      </CommonModal>
      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <S.ImageLightbox onClick={handleCloseLightbox}>
          <S.LightboxCloseButton onClick={handleCloseLightbox}>×</S.LightboxCloseButton>
          <S.LightboxImage src={selectedImage} alt="확대된 리뷰 이미지" onClick={e => e.stopPropagation()} />
        </S.ImageLightbox>
      )}
    </>
  );
};

export default ReviewViewModal;
