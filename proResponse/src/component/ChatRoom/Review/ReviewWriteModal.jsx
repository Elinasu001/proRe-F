import useReviewWriteModal from './useReviewModal';
import CommonModal from '../../Common/Modal/CommonModal.jsx';
import Toast from '../../Common/Toast/Toast';
import * as S from '../../Common/Modal/Review/Modal.styled';
import ReviewWriteLayout from './ReviewWriteLayout';

/**
 * ReviewWriteModal - 리뷰 작성 모달
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {function} props.onClose - 닫기 콜백
 * @param {function} props.onSubmit - 제출 콜백
 */
const ReviewWriteModal = ({ isOpen, onClose = () => {}, onSubmit }) => {
  const {
    starScore,
    hoveredStarScore,
    images,
    reviewText,
    selectedTags,
    fetchedTags,
    MAX_IMAGES,
    MAX_TEXT_LENGTH,
    setStarScore,
    setHoveredStarScore,
    setImages,
    setReviewText,
    handleTagToggle,
    validateForm,
    getSubmitData,
    showToast,
    toastMessage,
    closeToast,
  } = useReviewWriteModal(isOpen);

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateForm()) return;
    await onSubmit(getSubmitData());
  };

  if (!isOpen) return null;

  return (
    <>
      <CommonModal isOpen={isOpen} onClose={onClose} ariaLabelledby="write-review-title">
        {/* 헤더 */}
        <S.ModalHeader>
          <S.ModalTitle id="write-review-title">후기 보내기</S.ModalTitle>
        </S.ModalHeader>
        {/* 리뷰 작성 폼 */}
        <ReviewWriteLayout
          starScore={starScore}
          hoveredStarScore={hoveredStarScore}
          onStarClick={setStarScore}
          onStarHover={setHoveredStarScore}
          onStarLeave={() => setHoveredStarScore(0)}
          images={images}
          onImagesChange={setImages}
          reviewText={reviewText}
          onTextChange={(e) => setReviewText(e.target.value)}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          tagOptions={fetchedTags}
          maxImages={MAX_IMAGES}
          maxTextLength={MAX_TEXT_LENGTH}
        />
        {/* 버튼 그룹 */}
        <S.ButtonGroup>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.ConfirmButton onClick={handleSubmit}>확인</S.ConfirmButton>
        </S.ButtonGroup>
      </CommonModal>

      <Toast
        isVisible={showToast}
        message={toastMessage}
        onClose={closeToast}
      />
    </>
  );
};

export default ReviewWriteModal;
