import { useEffect, useState } from 'react';
import * as S from './ExpertDetailModal.styled';

/**
 * ExpertDetailModal - 전문가 상세 정보 모달
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Object} props.expert - 전문가 데이터
 * @param {function} props.onClose - 닫기 콜백
 * @param {function} props.onEstimate - 상세 설명 버튼 클릭 콜백
 * @param {function} props.onToggleFavorite - 찜하기 토글 콜백
 */
const ExpertDetailModal = ({ 
  isOpen, 
  expert, 
  onClose, 
  onToggleFavorite 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('detail'); // 'detail' or 'review'

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
   * 모달이 열릴 때 선택된 이미지 인덱스 초기화
   */
  useEffect(() => {
    if (isOpen) {
      setSelectedImageIndex(0);
      setActiveTab('detail');
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
   * 찜하기 토글
   */
  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(expert.id);
    }
  };

  if (!isOpen || !expert) return null;

  // 이미지 배열 (최대 4개)
  const images = expert.images || [];
  const displayImages = [...images];
  // 4개 미만이면 빈 슬롯 추가
  while (displayImages.length < 4) {
    displayImages.push(null);
  }

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="expert-detail-title"
      >
        {/* 헤더 */}
        <S.ModalHeader>
          <div>
            <S.ModalTitle id="expert-detail-title">상세보기</S.ModalTitle>
            <S.ModalSubtitle>전문가님의 정보를 확인해보세요.</S.ModalSubtitle>
          </div>
          <S.CloseButton onClick={onClose} aria-label="닫기">
            ✕
          </S.CloseButton>
        </S.ModalHeader>

        {/* 스크롤 가능한 컨텐츠 */}
        <S.ScrollContent>
          {/* 전문가 정보 헤더 */}
          <S.ExpertHeader>
            <S.ExpertInfo>
              <S.ExpertAvatar src={expert.avatar} alt={expert.name} />
              <S.ExpertDetails>
                <S.ExpertName>{expert.name}</S.ExpertName>
                <S.RatingInfo>
                  <S.StarIcon>⭐</S.StarIcon>
                  <S.RatingText>
                    {expert.rating?.toFixed(1)} ({expert.reviewCount})
                  </S.RatingText>
                </S.RatingInfo>
              </S.ExpertDetails>
            </S.ExpertInfo>
            <S.FavoriteButton 
              onClick={handleFavoriteClick}
              $isFavorite={expert.isFavorite}
              aria-label={expert.isFavorite ? '찜 해제' : '찜하기'}
            >
              ❤️
            </S.FavoriteButton>
          </S.ExpertHeader>

          <S.Divider />

          {/* 전문가 상세 정보 */}
          <S.InfoSection>
            <S.InfoItem>
              <S.InfoIcon>🏆</S.InfoIcon>
              <S.InfoText>{expert.employmentCount}회 고용됨</S.InfoText>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoIcon>📍</S.InfoIcon>
              <S.InfoText>{expert.location}</S.InfoText>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoIcon>💼</S.InfoIcon>
              <S.InfoText>경력 {expert.career}</S.InfoText>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoIcon>🕐</S.InfoIcon>
              <S.InfoText>연락 가능 시간 : {expert.availableTime}</S.InfoText>
            </S.InfoItem>
          </S.InfoSection>

          {/* 탭 버튼 */}
          <S.TabButtons>
            <S.TabButton 
              $isActive={activeTab === 'detail'}
              onClick={() => setActiveTab('detail')}
            >
              상세 설명
            </S.TabButton>
            <S.TabButton 
              $isActive={activeTab === 'review'}
              onClick={() => setActiveTab('review')}
            >
              리뷰 {expert.reviewCount}
            </S.TabButton>
          </S.TabButtons>

          {/* 서비스 상세 설명 */}
          <S.ServiceSection>
            <S.SectionTitle>서비스 상세설명</S.SectionTitle>
            <S.ServiceDescription>{expert.description}</S.ServiceDescription>
          </S.ServiceSection>

          {/* 사진 상세보기 */}
          <S.PhotoSection>
            <S.SectionTitle>사진 상세보기</S.SectionTitle>
            
            {/* 메인 이미지 */}
            <S.MainImageContainer>
              {images.length > 0 && images[selectedImageIndex] ? (
                <S.MainImage 
                  src={images[selectedImageIndex]} 
                  alt={`전문가 작업 사진 ${selectedImageIndex + 1}`}
                />
              ) : (
                <S.NoImagePlaceholder>
                  <span>이미지 없음</span>
                </S.NoImagePlaceholder>
              )}
            </S.MainImageContainer>

            {/* 썸네일 이미지 */}
            <S.ThumbnailContainer>
              {displayImages.map((image, index) => (
                <S.ThumbnailWrapper
                  key={index}
                  onClick={() => image && setSelectedImageIndex(index)}
                  $isActive={index === selectedImageIndex}
                  $hasImage={!!image}
                >
                  {image ? (
                    <S.ThumbnailImage 
                      src={image} 
                      alt={`썸네일 ${index + 1}`}
                    />
                  ) : (
                    <S.NoImageThumbnail>
                      <span>No Image</span>
                    </S.NoImageThumbnail>
                  )}
                </S.ThumbnailWrapper>
              ))}
            </S.ThumbnailContainer>
          </S.PhotoSection>
        </S.ScrollContent>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ExpertDetailModal;
