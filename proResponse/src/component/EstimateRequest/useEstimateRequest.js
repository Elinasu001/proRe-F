import { useState } from 'react';

/**
 * 견적 요청 모달 관리 커스텀 훅
 *
 * @returns {Object} { isOpen, open, close, expertInfo, setExpertInfo }
 */
const useEstimateRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expertInfo, setExpertInfo] = useState(null);

  const open = (expert = null) => {
    if (expert) {
      setExpertInfo(expert);
    }
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
    expertInfo,
    setExpertInfo
  };
};

export default useEstimateRequest;
