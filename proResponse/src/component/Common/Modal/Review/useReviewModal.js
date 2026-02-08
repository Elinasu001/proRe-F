import { useCallback, useState } from 'react';
import { createReview, deleteReview, getReview, getReviewTags } from '../../../../api/review/reviewApi';

/**
 * 리뷰 모달 상태 관리 훅
 * - ESC 키, 스크롤 방지는 CommonModal에서 처리
 * - 리뷰 조회/작성 모달 + Alert 삭제 확인 관리
 */
export default function useReviewModal(estimateNo) {
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    data: null,
  });

  const [writeModal, setWriteModal] = useState({
    isOpen: false,
    tagOptions: [],
  });

  // 삭제 확인 Alert 상태
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '확인',
    cancelText: '취소',
    variant: 'default',
    onConfirm: null,
    onCancel: null,
  });

  const closeAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const openAlert = useCallback((config) => {
    setAlertState({
      isOpen: true,
      title: config.title || '',
      message: config.message || '',
      confirmText: config.confirmText || '확인',
      cancelText: config.cancelText || '취소',
      variant: config.variant || 'default',
      onConfirm: config.onConfirm || null,
      onCancel: config.onCancel || null,
    });
  }, []);

  // 리뷰 조회 모달 열기 (기존 리뷰 확인 후)
  const openReviewModal = useCallback(async () => {
    try {
      // 기존 리뷰가 있는지 확인
      const existingReview = await getReview(estimateNo);
      console.log('리뷰 조회 시도, existingReview:', existingReview);
      if (existingReview) {
        setViewModal({ isOpen: true, data: existingReview });
        return;
      }
    } catch {
      // 리뷰가 없으면 작성 모달 열기
    }

    // 태그 불러오기
    try {
      const res = await getReviewTags();
      const options = Array.isArray(res) ? res.map(c => ({ value: c.tagNo, label: c.tagName })) : [];
      setWriteModal({ isOpen: true, tagOptions: options });
    } catch {
      setWriteModal({ isOpen: true, tagOptions: [] });
    }
  }, [estimateNo]);

  // 리뷰 작성 제출
  const submitReview = useCallback(async (data) => {
    try {
      const formData = new FormData();
      formData.append('estimateNo', estimateNo);
      formData.append('starScore', data.starScore);
      formData.append('content', data.text);

      //console.log('리뷰 제출 데이터:', data);
      //console.log('리뷰사진', typeof data.images, data.images);

      if (data.tags && data.tags.length > 0) {
        data.tags.forEach(tag => formData.append('tagNos', tag));
      }

      if (data.images && data.images.length > 0) {
        data.images.forEach((image, index) => {
          // image가 File 객체이거나 { file: File } 구조라면
          if (image instanceof File) {
            formData.append("files", image);
          } else if (image.file instanceof File) {
            formData.append("files", image.file);
          } else {
            console.warn(`이미지 ${index}에 file 속성이 없습니다`);
          }
        });
      }

      await createReview(formData);

      // 등록 후 조회 모달 열기
      const review = await getReview(estimateNo);
      setWriteModal({ isOpen: false, tagOptions: [] });
      setViewModal({ isOpen: true, data: review });

    } catch (error) {

      console.error('리뷰 등록 실패:', error);
      openAlert({
        title: '오류',
        message: '리뷰 등록에 실패했습니다.',
        onConfirm: closeAlert
      });

    }
  }, [estimateNo, openAlert, closeAlert]);

  // 리뷰 삭제 확인 Alert 열기
  const confirmDeleteReview = useCallback(() => {
    openAlert({
      title: '리뷰 삭제',
      message: '내가 작성한 리뷰를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await deleteReview(estimateNo);
          closeAlert();
          setViewModal({ isOpen: false, data: null });
          openAlert({
            title: '알림',
            message: '리뷰가 삭제되었습니다.',
            onConfirm: closeAlert
          });
        } catch (error) {
          console.error('리뷰 삭제 실패:', error);
          closeAlert();
          openAlert({
            title: '오류',
            message: '리뷰 삭제에 실패했습니다.',
            onConfirm: closeAlert
          });
        }
      },
      onCancel: closeAlert
    });
  }, [estimateNo, openAlert, closeAlert]);

  // 모달 닫기
  const closeViewModal = useCallback(() => {
    setViewModal({ isOpen: false, data: null });
  }, []);

  const closeWriteModal = useCallback(() => {
    setWriteModal({ isOpen: false, tagOptions: [] });
  }, []);

  return {
    viewModal,
    writeModal,
    alertState,
    openReviewModal,
    submitReview,
    confirmDeleteReview,
    closeViewModal,
    closeWriteModal,
  };
}