import { useRef, useState, useEffect } from 'react';

// 리뷰 관련 커스텀 훅 (더보기, 이미지 확대 등)
export function useReviewItemFeatures(review) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const textRef = useRef(null);
  const [needsShowMore, setNeedsShowMore] = useState(false);

  useEffect(() => {
    if (textRef.current && review) {
      const lineHeight = parseFloat(window.getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.scrollHeight;
      const lines = height / lineHeight;
      setNeedsShowMore(lines > 3);
    }
  }, [review]);

  const handleImageClick = (image) => setSelectedImage(image);
  const handleCloseLightbox = () => setSelectedImage(null);

  return {
    isExpanded,
    setIsExpanded,
    selectedImage,
    setSelectedImage,
    textRef,
    needsShowMore,
    handleImageClick,
    handleCloseLightbox,
  };
}
