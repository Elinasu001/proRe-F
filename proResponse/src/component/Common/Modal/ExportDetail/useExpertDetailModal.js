import { useCallback, useState } from 'react';

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
