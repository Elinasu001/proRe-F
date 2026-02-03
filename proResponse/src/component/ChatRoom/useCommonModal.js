import { useState } from 'react';

export default function useCommonModal() {
    const [modal, setModal] = useState({ isOpen: false, onClose: () => {}, onSubmit: () => {}, tagOptions: [] });

    const openModal = (tagOptions = [], onSubmit = () => {}) => {
        setModal({
        isOpen: true,
        onClose: () => setModal(m => ({ ...m, isOpen: false })),
        onSubmit: (data) => {
            onSubmit(data);
            setModal(m => ({ ...m, isOpen: false }));
        },
        tagOptions,
        });
    };

    const closeModal = () => setModal(m => ({ ...m, isOpen: false }));

    return {
        modal,
        openModal,
        closeModal,
    };
}