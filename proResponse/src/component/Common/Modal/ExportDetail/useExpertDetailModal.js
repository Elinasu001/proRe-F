import { useCallback, useState } from 'react';

/**
 * useExpertDetailModal - 전문가 상세 모달을 더 쉽게 사용하기 위한 커스텀 훅
 * 
 * @returns {Object} 모달 제어 객체
 * 
 * @example
 * const { modalState, openModal, closeModal } = useExpertDetailModal();
 * 
 * // 모달 열기
 * openModal({
 *   id: 1,
 *   name: '홍길동 전문가',
 *   avatar: 'url',
 *   rating: 4.9,
 *   reviewCount: 230,
 *   employmentCount: 87,
 *   location: '서울특별시 강남구',
 *   career: '10년',
 *   availableTime: '오전 7시 ~ 오후 11시',
 *   description: '서비스 설명...',
 *   images: ['url1', 'url2', 'url3'],
 *   isFavorite: false
 * });
 */
const useExpertDetailModal = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    expert: null,
  });

  /**
   * 모달 열기
   * @param {Object} expertData - 전문가 데이터
   */
  const openModal = useCallback((expertData) => {
    setModalState({
      isOpen: true,
      expert: expertData,
    });
  }, []);

  /**
   * 모달 닫기
   */
  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      expert: null,
    });
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
  };
};

export default useExpertDetailModal;
