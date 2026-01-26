import { useEffect, useState } from 'react';
import grayStarImg from '../../../../assets/images/common/gray_star.png';
import starImg from '../../../../assets/images/common/star.png';
import { ImageUpload, TextArea } from '../../../Common/Input/Input.jsx';
import * as S from './ReviewModal.styled';

/**
 * ReviewWriteModal - 리뷰 작성 모달
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {function} props.onClose - 닫기 콜백
 * @param {function} props.onSubmit - 제출 콜백
 * @param {Array} props.tagOptions - 선택 가능한 태그 목록
 */
const ReviewWriteModal = ({ isOpen, onClose, onSubmit, tagOptions = [] }) => {
  // 폼 상태
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [images, setImages] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // 상수
  const MAX_IMAGES = 4;
  const MAX_TEXT_LENGTH = 1000;

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
   * 모달이 닫힐 때 폼 초기화
   */
  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setImages([]);
      setReviewText('');
      setSelectedTags([]);
    }
  }, [isOpen]);

  /**
   * 오버레이 클릭 시 닫기
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * 별점 클릭
   */
  const handleRatingClick = (value) => {
    setRating(value);
  };

  /**
   * 태그 토글
   */
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  /**
   * 폼 제출
   */
  const handleSubmit = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }

    if (reviewText.trim().length === 0) {
      alert('후기를 작성해주세요.');
      return;
    }

    onSubmit({
      rating,
      images: images.map(img => img.preview), // preview URL 전달
      text: reviewText,
      tags: selectedTags,
    });
  };

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-review-title"
      >
        {/* 헤더 */}
        <S.ModalHeader>
          <S.ModalTitle id="write-review-title">후기 보내기</S.ModalTitle>
        </S.ModalHeader>

        {/* 리뷰 작성 폼 */}
        <S.WriteContent>
          {/* 별점 선택 */}
          <S.RatingSection>
            {[1, 2, 3, 4, 5].map((star) => (
              <S.Star
                key={star}
                $filled={star <= (hoveredRating || rating)}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                aria-label={`${star}점`}
              >
                <img
                  src={star <= (hoveredRating || rating) ? starImg : grayStarImg}
                  alt={`${star}점`}
                />
              </S.Star>
            ))}
          </S.RatingSection>

          {/* 이미지 업로드 */}
          <ImageUpload
            label="상세 설명"
            images={images}
            onChange={setImages}
            maxImages={MAX_IMAGES}
          />

          {/* 텍스트 입력 */}
          <TextArea
            placeholder="예) 친절하고 상담이 자세해요"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={MAX_TEXT_LENGTH}
          />

          {/* 태그 선택 */}
          {tagOptions.length > 0 && (
            <S.TagSelectSection>
              {tagOptions.map((tag, index) => (
                <S.SelectableTag
                  key={index}
                  $selected={selectedTags.includes(tag)}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </S.SelectableTag>
              ))}
            </S.TagSelectSection>
          )}
        </S.WriteContent>

        {/* 버튼 그룹 */}
        <S.ButtonGroup>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.ConfirmButton onClick={handleSubmit}>확인</S.ConfirmButton>
        </S.ButtonGroup>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ReviewWriteModal;
