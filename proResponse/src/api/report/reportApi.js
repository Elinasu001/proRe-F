import { axiosAuth } from '../reqApi';

const baseApi = '/api/reports';

// 신고 태그 전체 조회
export const getAllReportTagsApi = () =>
  axiosAuth.getActual(`${baseApi}/tags`);

// 특정 견적의 신고 내역 조회
export const getReportApi = (estimateNo) =>
  axiosAuth.getActual(`${baseApi}/${estimateNo}`);

// 신고 등록
export const saveReportApi = (reportDTO) =>
  axiosAuth.post(baseApi, reportDTO);