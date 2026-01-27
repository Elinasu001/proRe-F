import { useState, useEffect, useRef } from 'react';
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
  // 더보기/접기 상태
  const [isExpanded, setIsExpanded] = useState(false);
  // 이미지 확대 상태
  const [selectedImage, setSelectedImage] = useState(null);
  // 텍스트 ref
  const textRef = useRef(null);
  // 3줄 이상인지 여부
  const [needsShowMore, setNeedsShowMore] = useState(false);

  /**
   * ESC 키로 모달 닫기
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, selectedImage]);

  /**
   * 배경 스크롤 방지
   */
  useEffect(() => {
    if (isOpen || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedImage]);

  /**
   * 텍스트가 3줄 이상인지 확인
   */
  useEffect(() => {
    if (textRef.current && review) {
      const lineHeight = parseFloat(window.getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.scrollHeight;
      const lines = height / lineHeight;
      setNeedsShowMore(lines > 3);
    }
  }, [review]);

  /**
   * 오버레이 클릭 시 닫기
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * 이미지 클릭 핸들러
   */
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  /**
   * 이미지 확대 모달 닫기
   */
  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  if (!isOpen || !review) return null;

  return (
    <>
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
                {review.profileImg
                  ? <img src={review.profileImg} alt={review.nickname} style={{width:'100%',height:'100%',borderRadius:'50%'}}/>
                  : (review.nickname?.charAt(0) || 'U')}
              </S.UserAvatar>
              <S.UserDetails>
                <S.UserName>{review.nickname}</S.UserName>
                <S.ReviewDate>{review.createdAgo}</S.ReviewDate>
              </S.UserDetails>
              <S.Rating>
                <S.StarImg src={starImg} alt="리뷰 아이콘"/> {review.starScore}
              </S.Rating>
            </S.UserInfo>

            {/* 이미지 갤러리 */}
            {review.attachments && review.attachments.length > 0 && (
              <S.ImageGallery>
                {review.attachments.map((image, index) => (
                  <S.ReviewImage
                    key={index}
                    src={image.filePath}
                    alt={`리뷰 이미지 ${index + 1}`}
                    onClick={() => handleImageClick(image.filePath)}
                  />
                ))}
                {/* 빈 슬롯 표시 (최대 4개) */}
                {[...Array(Math.max(0, 4 - review.attachments.length))].map((_, index) => (
                  <S.EmptyImageSlot key={`empty-${index}`}>
                    <span>No Image</span>
                  </S.EmptyImageSlot>
                ))}
              </S.ImageGallery>
            )}

            {/* 리뷰 텍스트 */}
            <S.ReviewText
              ref={textRef}
              $collapsed={!isExpanded && needsShowMore}
            >
              {review.content}
            </S.ReviewText>

            {/* 더보기 버튼 */}
            {needsShowMore && (
              <S.ShowMoreButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '접기' : '더보기'}
              </S.ShowMoreButton>
            )}

            {/* 태그 */}
            {review.selectedTags && review.selectedTags.length > 0 && (
              <S.TagList>
                {review.selectedTags.map((tag, index) => (
                  <S.Tag key={index}>{tag.tagName}</S.Tag>
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

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <S.ImageLightbox onClick={handleCloseLightbox}>
          <S.LightboxCloseButton onClick={handleCloseLightbox}>
            ×
          </S.LightboxCloseButton>
          <S.LightboxImage
            src={selectedImage}
            alt="확대된 리뷰 이미지"
            onClick={(e) => e.stopPropagation()}
          />
        </S.ImageLightbox>
      )}
    </>
  );
};

export default ReviewViewModal;
