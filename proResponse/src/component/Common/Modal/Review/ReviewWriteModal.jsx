import { useEffect, useState } from 'react';
import { getReviewTags } from '../../../../api/review/reviewApi';
import grayStarImg from '../../../../assets/images/common/gray_star.png';
import starImg from '../../../../assets/images/common/star.png';
import { ImageUpload, TextArea } from '../../../Common/Input/Input.jsx';
import Toast from '../../Toast/Toast';
import useToast from '../../Toast/useToast';
import CommonModal from '../CommonModal';
import * as S from './Modal.styled';
import * as W from './ReviewWrite.styled.js';


/**
 * ReviewWriteModal - 리뷰 작성 모달
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {function} props.onClose - 닫기 콜백
 * @param {function} props.onSubmit - 제출 콜백
 * @param {Array} props.tagOptions - 선택 가능한 태그 목록
 */
const ReviewWriteModal = ({ isOpen, onClose = () => {}, onSubmit, tagOptions }) => {
  // 폼 상태
  const [starScore, setStarScore] = useState(0);
  const [hoveredStarScore, setHoveredStarScore] = useState(0);
  const [images, setImages] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [fetchedTags, setFetchedTags] = useState([]);
  const { showToast, toastMessage, showToastMessage, closeToast } = useToast();

  // 상수
  const MAX_IMAGES = 4;
  const MAX_TEXT_LENGTH = 1000;

  // 태그 목록 불러오기
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchTags = async () => {
        try {
            const res = await getReviewTags();
            console.log(res);
            const options = res.map(c => ({
                value: c.tagNo, label: c.tagName
            }));
            setFetchedTags(options);
        } catch (err) {
            showToastMessage('리뷰 태그 불러오기 실패');
        }
    };
    
    fetchTags();
  }, [isOpen, tagOptions]);

  // 모달이 열릴 때 폼 초기화
  useEffect(() => {
    if (isOpen) {
      setStarScore(0);
      setHoveredStarScore(0);
      setImages([]);
      setReviewText('');
      setSelectedTags([]);
    }
  }, [isOpen]);

  /**
   * 별점 클릭
   */
  const handleStarScoreClick = (value) => {
    setStarScore(value);
  };

  /**
   * 태그 토글
   */
  const handleTagToggle = (tagObj) => {
    if (selectedTags.some(t => t.value === tagObj.value)) {
      setSelectedTags(selectedTags.filter(t => t.value !== tagObj.value));
    } else {
      setSelectedTags([...selectedTags, tagObj]);
    }
  };

  /**
   * 폼 제출
   */
  const handleSubmit = () => {
    if (starScore === 0) {
      showToastMessage('별점을 선택해주세요.');
      return;
    }

    if (reviewText.trim().length === 0) {
      showToastMessage('후기를 작성해주세요.');
      return;
    }

    onSubmit({
      starScore,
      images: images.map(img => img.file), // File 객체 전달
      text: reviewText,
      tags: selectedTags.map(t => t.value), // value만 전달
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <CommonModal 
        isOpen={isOpen} 
        onClose={onClose} 
        ariaLabelledby="write-review-title"
      >
        {/* 헤더 */}
        <S.ModalHeader>
          <S.ModalTitle id="write-review-title">후기 보내기</S.ModalTitle>
        </S.ModalHeader>

        {/* 리뷰 작성 폼 */}
        <W.WriteContent>
          {/* 별점 선택 */}
          <W.RatingSection>
            {[1, 2, 3, 4, 5].map((star) => (
              <W.Star
                key={star}
                $filled={star <= (hoveredStarScore || starScore)}
                onClick={() => handleStarScoreClick(star)}
                onMouseEnter={() => setHoveredStarScore(star)}
                onMouseLeave={() => setHoveredStarScore(0)}
                aria-label={`${star}점`}
              >
                <img
                  src={star <= (hoveredStarScore || starScore) ? starImg : grayStarImg}
                  alt={`${star}점`}
                />
              </W.Star>
            ))}
          </W.RatingSection>

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
          {fetchedTags.length > 0 && (
            <W.TagSelectSection>
              {fetchedTags.map((tag) => (
                <W.SelectableTag
                  key={tag.value}
                  $selected={selectedTags.some(t => t.value === tag.value)}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag.label}
                </W.SelectableTag>
              ))}
            </W.TagSelectSection>
          )}
        </W.WriteContent>

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