import { useState } from 'react';

/**
 * 리뷰 모달 상태 관리 훅
 * - ESC 키, 스크롤 방지는 CommonModal에서 처리
 * - 이 훅은 모달 열기/닫기 상태만 관리
 */
export default function useReviewModal() {
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    data: null,
    onDelete: null,
    onConfirm: null,
  });

  const [writeModal, setWriteModal] = useState({
    isOpen: false,
    tagOptions: [],
    onSubmit: null,
  });

  const openViewModal = (data, onDelete, onConfirm) => {
    setViewModal({ 
      isOpen: true, 
      data, 
      onDelete, 
      onConfirm 
    });
  };

  const openWriteModal = (tagOptions, onSubmit) => {
    setWriteModal({ 
      isOpen: true, 
      tagOptions, 
      onSubmit 
    });
  };

  const closeModals = () => {
    setViewModal({ 
      isOpen: false, 
      data: null, 
      onDelete: null, 
      onConfirm: null 
    });
    setWriteModal({ 
      isOpen: false, 
      tagOptions: [], 
      onSubmit: null 
    });
  };

  return {
    viewModal,
    writeModal,
    openViewModal,
    openWriteModal,
    closeModals,
  };
}