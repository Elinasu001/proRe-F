import { useEffect, useState } from 'react';
import { getAllReportTagsApi, getReportApi, saveReportApi } from '../../../api/report/reportApi';
import { useAuth } from '../../../context/AuthContext.jsx';

import useToast from '../../Common/Toast/useToast';


/**
 * 특정 견적의 신고 내역 조회 훅
 */
export function useReportDetail(estimateNo) {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showToastMessage } = useToast();

    const fetchReport = async () => {
        if (!estimateNo) return;
        setLoading(true);
        try {
            const data = await getReportApi(estimateNo);
            setReport(data);
        } catch (err) {
            showToastMessage('신고 내역 불러오기 실패', err.message);
            setReport(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [estimateNo]);

    return { report, loading, refetch: fetchReport };
}



/**
 * 신고 태그 목록 조회 훅
 */
export function useReportTags() {

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showToastMessage } = useToast();

    const fetchTags = async () => {
        setLoading(true);
        try {
            const res = await getAllReportTagsApi();
            console.log('신고 태그 API 응답:', res);
            const options = res.map(c => ({
                value: c.reasonNo, label: c.reasonName
            }));
            setTags([...options]);
        } catch (err) {
            //console.error('신고 태그 조회 에러:', err);
            showToastMessage('신고 태그 불러오기 실패', err.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchTags();
    }, []);

    return { tags, loading, refetch: fetchTags };
}

/**
 * 신고 모달 상태 관리 훅
 */
export function useReportModal(estimateNo, messages) {
    const { currentUser } = useAuth();
    const userNo = currentUser?.userNo;
    const [reportModal, setReportModal] = useState({
        isOpen: false,
        tagOptions: [],
        onSubmit: null,
        existingReport: null,
    });

    const { showToastMessage } = useToast();

    const openReportModal = async (tagOptions) => {
        const targetUserNo = Array.isArray(messages)
            ? messages.find(m => m.userNo !== userNo)?.userNo || null
            : null;

        //  모달 열 때 기존 신고 조회
        let existingReport = null;
        try {
            existingReport = await getReportApi(estimateNo);
            console.log('기존 신고 내역:', existingReport);
        } catch (err) {
            // 신고 내역 없으면 null (정상)
            console.log('신고 내역 없음 (신규 작성 모드)');
        }

        setReportModal({
            isOpen: true,
            tagOptions,
            existingReport,
            onSubmit: async (reportData) => {
                try {
                    const formData = new FormData();
                    formData.append('estimateNo', estimateNo);
                    formData.append('content', reportData.text);
                    formData.append('reporterUserNo', userNo);
                    formData.append('targetUserNo', targetUserNo);
                    
                    if (reportData.tags && reportData.tags.length > 0) {
                        formData.append('reasonNo', reportData.tags[0].value);
                    } else {
                        throw new Error('신고 사유를 선택해주세요.');
                    }

                    await saveReportApi(formData);
                    showToastMessage('신고가 접수되었습니다.', 'success');

                } catch (error) {
                    showToastMessage('신고 등록에 실패했습니다.', error.message);
                    throw error;
                }
            },
        });
    };

    const closeReportModal = () => {
        setReportModal({
            isOpen: false,
            tagOptions: [],
            onSubmit: null,
            existingReport: null,
        });
    };

    return {
        reportModal,
        openReportModal,
        closeReportModal,
    };
}