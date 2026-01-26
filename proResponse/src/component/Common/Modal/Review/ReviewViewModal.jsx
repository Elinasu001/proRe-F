import { useEffect } from 'react';
import delImg from '../../../../assets/images/common/del.png';
import starImg from '../../../../assets/images/common/star.png';
import * as S from './ReviewModal.styled';
/**
 * ReviewViewModal - 작성된 리뷰 조회 모달
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Object} props.review - 리뷰 데이터
 * @param {function} props.onClose - 닫기 콜백
 * @param {function} props.onDelete - 삭제 콜백
 * @param {function} props.onConfirm - 확인 콜백
 */
const ReviewViewModal = ({ isOpen, review, onClose, onDelete, onConfirm }) => {
  /**
   * ESC 키로 모달 닫기
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  /**
   * 배경 스크롤 방지
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /**
   * 오버레이 클릭 시 닫기
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !review) return null;

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
      >
        {/* 헤더 */}
        <S.ModalHeader>
          <S.ModalTitle id="review-title">내가 보낸 후기</S.ModalTitle>
          {onDelete && (
            <S.DeleteButton onClick={onDelete} aria-label="삭제하기">
              <S.DelImg src={delImg} alt="삭제하기" />
              <span>삭제하기</span>
            </S.DeleteButton>
          )}
        </S.ModalHeader>

        {/* 리뷰 내용 */}
        <S.ReviewContent>
          {/* 사용자 정보 */}
          <S.UserInfo>
            <S.UserAvatar>
              {review.userName?.charAt(0) || 'U'}
            </S.UserAvatar>
            <S.UserDetails>
              <S.UserName>{review.userName}</S.UserName>
              <S.ReviewDate>{review.date}</S.ReviewDate>
            </S.UserDetails>
            <S.Rating>
              <S.StarImg src={starImg} alt="리뷰 아이콘"/> {review.rating?.toFixed(1)}
            </S.Rating>
          </S.UserInfo>

          {/* 이미지 갤러리 */}
          {review.images && review.images.length > 0 && (
            <S.ImageGallery>
              {review.images.map((image, index) => (
                <S.ReviewImage key={index} src={image} alt={`리뷰 이미지 ${index + 1}`} />
              ))}
              {/* 빈 슬롯 표시 (최대 4개) */}
              {[...Array(Math.max(0, 4 - review.images.length))].map((_, index) => (
                <S.EmptyImageSlot key={`empty-${index}`}>
                  <span>No Image</span>
                </S.EmptyImageSlot>
              ))}
            </S.ImageGallery>
          )}

          {/* 리뷰 텍스트 */}
          <S.ReviewText>{review.text}</S.ReviewText>

          {/* 태그 */}
          {review.tags && review.tags.length > 0 && (
            <S.TagList>
              {review.tags.map((tag, index) => (
                <S.Tag key={index}>{tag}</S.Tag>
              ))}
            </S.TagList>
          )}
        </S.ReviewContent>

        {/* 버튼 그룹 */}
        <S.ButtonGroup>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
        </S.ButtonGroup>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ReviewViewModal;
