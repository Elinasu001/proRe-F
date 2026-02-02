import { axiosAuth } from '../reqApi';

const reportApi = '/api/reports';

// 신고 태그 전체 조회
export const getAllReportTagsApi = () =>
  axiosAuth.getActual(`${reportApi}/tags`);

// 특정 견적의 신고 내역 조회
export const getReportApi = (estimateNo) =>
  axiosAuth.getActual(`${reportApi}/${estimateNo}`);

// 신고 등록
export const saveReportApi = (reportDTO) =>
  axiosAuth.post(reportApi, reportDTO);