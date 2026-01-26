import { useCallback, useState } from 'react';

/**
 * useReviewModal - 리뷰 모달을 더 쉽게 사용하기 위한 커스텀 훅
 * 
 * @returns {Object} 리뷰 모달 제어 객체
 * 
 * @example
 * const { viewModal, writeModal, openViewModal, openWriteModal, closeModals } = useReviewModal();
 * 
 * // 리뷰 보기 모달 열기
 * openViewModal({
 *   userName: '박바라',
 *   date: '2주 전',
 *   rating: 5.0,
 *   images: ['url1', 'url2'],
 *   text: '너무 좋아요!',
 *   tags: ['친절해요', '전문가예요']
 * });
 * 
 * // 리뷰 작성 모달 열기
 * openWriteModal();
 */
const useReviewModal = () => {
  // 리뷰 조회 모달 상태
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    review: null,
    onDelete: null,
    onConfirm: null,
  });

  // 리뷰 작성 모달 상태
  const [writeModal, setWriteModal] = useState({
    isOpen: false,
    tagOptions: [],
    onSubmit: null,
  });

  /**
   * 리뷰 조회 모달 열기
   * @param {Object} review - 리뷰 데이터
   * @param {function} onDelete - 삭제 콜백
   * @param {function} onConfirm - 확인 콜백
   */
  const openViewModal = useCallback((review, onDelete, onConfirm) => {
    setViewModal({
      isOpen: true,
      review,
      onDelete,
      onConfirm,
    });
  }, []);

  /**
   * 리뷰 작성 모달 열기
   * @param {Array} tagOptions - 선택 가능한 태그 목록
   * @param {function} onSubmit - 제출 콜백
   */
  const openWriteModal = useCallback((tagOptions = [], onSubmit) => {
    setWriteModal({
      isOpen: true,
      tagOptions,
      onSubmit,
    });
  }, []);

  /**
   * 리뷰 조회 모달 닫기
   */
  const closeViewModal = useCallback(() => {
    setViewModal(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  /**
   * 리뷰 작성 모달 닫기
   */
  const closeWriteModal = useCallback(() => {
    setWriteModal(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  /**
   * 모든 모달 닫기
   */
  const closeModals = useCallback(() => {
    closeViewModal();
    closeWriteModal();
  }, [closeViewModal, closeWriteModal]);

  return {
    // 리뷰 조회 모달
    viewModal: {
      ...viewModal,
      onClose: closeViewModal,
    },
    // 리뷰 작성 모달
    writeModal: {
      ...writeModal,
      onClose: closeWriteModal,
    },
    // 헬퍼 함수들
    openViewModal,
    openWriteModal,
    closeViewModal,
    closeWriteModal,
    closeModals,
  };
};

export default useReviewModal;
