import grayStarImg from '../../../assets/images/common/gray_star.png';
import starImg from '../../../assets/images/common/star.png';
import { ImageUpload, TextArea } from '../../Common/Input/Input.jsx';
import * as W from '../../Common/Modal/Review/ReviewWrite.styled.js';

/**
 * ReviewWriteLayout - 리뷰 작성 폼 레이아웃 (순수 UI)
 *
 * @param {Object} props
 * @param {number} props.starScore - 현재 별점
 * @param {number} props.hoveredStarScore - 호버 중인 별점
 * @param {function} props.onStarClick - 별점 클릭 핸들러
 * @param {function} props.onStarHover - 별점 호버 핸들러
 * @param {function} props.onStarLeave - 별점 마우스 떠남 핸들러
 * @param {Array} props.images - 업로드된 이미지 배열
 * @param {function} props.onImagesChange - 이미지 변경 핸들러
 * @param {string} props.reviewText - 리뷰 텍스트
 * @param {function} props.onTextChange - 텍스트 변경 핸들러
 * @param {Array} props.selectedTags - 선택된 태그 배열
 * @param {function} props.onTagToggle - 태그 토글 핸들러
 * @param {Array} props.tagOptions - 선택 가능한 태그 목록
 * @param {number} props.maxImages - 최대 이미지 개수
 * @param {number} props.maxTextLength - 최대 텍스트 길이
 */
const ReviewWriteLayout = ({
    starScore,
    hoveredStarScore,
    onStarClick,
    onStarHover,
    onStarLeave,
    images,
    onImagesChange,
    reviewText,
    onTextChange,
    selectedTags,
    onTagToggle,
    tagOptions,
    maxImages = 4,
    maxTextLength = 1000,
}) => (
    <W.WriteContent>
    {/* 별점 선택 */}
    <W.RatingSection>
        {[1, 2, 3, 4, 5].map((star) => (
            <W.Star
            key={star}
            $filled={star <= (hoveredStarScore || starScore)}
            onClick={() => onStarClick(star)}
            onMouseEnter={() => onStarHover(star)}
            onMouseLeave={onStarLeave}
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
        onChange={onImagesChange}
        maxImages={maxImages}
    />

    {/* 텍스트 입력 */}
    <TextArea
        placeholder="예) 친절하고 상담이 자세해요"
        value={reviewText}
        onChange={onTextChange}
        maxLength={maxTextLength}
    />

    {/* 태그 선택 */}
    {tagOptions && tagOptions.length > 0 && (
        <W.TagSelectSection>
            {tagOptions.map((tag) => (
            <W.SelectableTag
                key={tag.value}
                $selected={selectedTags.some(t => t.value === tag.value)}
                onClick={() => onTagToggle(tag)}
            >
                {tag.label}
            </W.SelectableTag>
            ))}
        </W.TagSelectSection>
        )}
    </W.WriteContent>
);

export default ReviewWriteLayout;
