import * as S from '../Modal/ExportDetail/ExpertDetailModal.styled';


const ExpertDetail = ({ data, selectedImageIndex, setSelectedImageIndex }) => {

      // 이미지 배열 (최대 4개)
    const images = data.images || [];
    const displayImages = [...images];
    
    // 4개 미만이면 빈 슬롯 추가
    while (displayImages.length < 4) {
    displayImages.push(null);
    }

    return (
    <>
        {/* 서비스 상세 설명 */}
        <S.ServiceSection>
            <S.SectionTitle>서비스 상세설명</S.SectionTitle>
            <S.ServiceDescription>{data.content}</S.ServiceDescription>
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
    </>
    );
};

export default ExpertDetail;
