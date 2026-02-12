// src/api/admin/adminMemberApi.js
import { api } from '../api_';

/**
 * 회원 목록 조회 (페이징 + 검색)
 */
export const getAdminMembers = async (params) => {
  const response = await api.get('/api/admin/members', { params });
  return response.data;
};

/**
 * 회원 상세 조회
 */
export const getAdminMemberDetail = async (userNo) => {
  const response = await api.get(`/api/admin/members/${userNo}`);
  return response.data;
};

/**
 * 회원 상태 변경
 */
export const updateMemberStatus = async (userNo, status) => {
  const response = await api.put(`/api/admin/members/${userNo}/status`, null, {
    params: { status }
  });
  return response.data;
};

/**
 * 회원 패널티 상태 변경
 */
export const updateMemberPenalty = async (userNo, penaltyStatus) => {
  const response = await api.put(`/api/admin/members/${userNo}/penalty`, null, {
    params: { penaltyStatus }
  });
  return response.data;
};

/**
 * 회원 권한 변경
 */
export const updateUserRole = async (userNo, userRole) => {
  const response = await api.put(`/api/admin/members/${userNo}/role`, null, {
    params: { userRole }
  });
  return response.data;
};