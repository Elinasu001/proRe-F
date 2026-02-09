import starImg from '../../../assets/images/common/star.png';
import * as S from './Review.styled.js';

// 커스텀 훅: 리뷰 더보기/접기, 3줄 이상 체크, 이미지 확대 등 리뷰 관련 로직 분리
// useReviewItemFeatures 훅은 이제 별도 파일에서 import하여 사용합니다.

const ReviewItem = ({ review, handleImageClick, textRef, isExpanded, needsShowMore, setIsExpanded }) => (
    <S.ReviewContent>
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
);

export default ReviewItem;
