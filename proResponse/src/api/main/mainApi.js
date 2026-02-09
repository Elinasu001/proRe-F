import { axiosAuth } from '../reqApi';



const baseApi = '/api/main';

// 메인 전문가 리스트 조회
export const getMainExperts = async () => {
  // axiosAuth.getList는 전체 응답, getActual은 data만 반환
  return axiosAuth.getActual ? axiosAuth.getActual(baseApi) : [];
};


