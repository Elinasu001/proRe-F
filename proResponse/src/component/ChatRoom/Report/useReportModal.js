import { useState, useEffect } from 'react';
import { getAllReportTagsApi, getReportApi, saveReportApi } from '../../../api/report/reportApi';

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
            //console.log('신고 태그 API 응답:', res);
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
export function useReportModal(estimateNo) {
    
    const [reportModal, setReportModal] = useState({
        isOpen: false,
        tagOptions: [],
        onSubmit: null,
    });

    const { showToastMessage } = useToast();

    const openReportModal = (tagOptions) => {
        setReportModal({
            isOpen: true,
            tagOptions,
            onSubmit: async (reportData) => {
                try {

                    const payload = {
                        content: reportData.text,
                        tagList: reportData.tags.map(t => t.value),
                        estimateNo: Number(estimateNo),
                    };

                    const res = await saveReportApi(payload);
                    if (res && res.success) {
                        showToastMessage('신고가 성공적으로 저장되었습니다.', res.success);
                    }
                } catch (error) {
                    showToastMessage('신고 등록에 실패했습니다.', error.message);
                }
                // 모달 닫지 않음 - ReportModal에서 refetch() 후 조회 모드로 전환됨
            },
        });
    };



    const closeReportModal = () => {
        setReportModal({
            isOpen: false,
            tagOptions: [],
            onSubmit: null,
        });
    };

    return {
        reportModal,
        openReportModal,
        closeReportModal,
    };
}
