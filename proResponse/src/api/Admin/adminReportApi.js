// src/api/admin/adminReportApi.js
import { api } from '../api_';

/**
 * 신고 목록 조회 (페이징 + 필터)
 */
export const getAdminReports = async (params) => {
  const response = await api.get('/api/admin/reports', { params });
  return response.data;
};

/**
 * 신고 상세 조회
 */
export const getAdminReportDetail = async (reportNo) => {
  const response = await api.get(`/api/admin/reports/${reportNo}`);
  return response.data;
};

/**
 * 신고 대상자별 조회
 */
export const getReportsByTarget = async (targetUserNo, params) => {
  const response = await api.get(`/api/admin/reports/target/${targetUserNo}`, { params });
  return response.data;
};

/**
 * 신고 상태 변경
 */
export const updateReportStatus = async (reportNo, status, answer) => {
  const response = await api.put(`/api/admin/reports/${reportNo}/status`, null, {
    params: { status, answer }
  });
  return response.data;
};

/**
 * 신고 답변 수정
 */
export const updateReportAnswer = async (reportNo, answer) => {
  const response = await api.put(`/api/admin/reports/${reportNo}/answer`, null, {
    params: { answer }
  });
  return response.data;
};