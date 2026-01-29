import { useState } from 'react';

export default function useReportModal() {
  const [reportModal, setReportModal] = useState({ isOpen: false, onClose: () => {}, onSubmit: () => {}, tagOptions: [] });

  const openReportModal = (tagOptions = [], onSubmit = () => {}) => {
    setReportModal({
      isOpen: true,
      onClose: () => setReportModal(m => ({ ...m, isOpen: false })),
      onSubmit: (data) => {
        onSubmit(data);
        setReportModal(m => ({ ...m, isOpen: false }));
      },
      tagOptions,
    });
  };

  const closeReportModal = () => setReportModal(m => ({ ...m, isOpen: false }));

  return {
    reportModal,
    openReportModal,
    closeReportModal,
  };
}
