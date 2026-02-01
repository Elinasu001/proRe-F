import { axiosPublic } from '../reqApi';

// /api/reviews 공통 prefix 래퍼
const reviewApi = {
  getActual: (url) => axiosPublic.getActual(`/api/reviews${url}`),
  getList: (url) => axiosPublic.getList(`/api/reviews${url}`),
  // 필요시 post, put 등 추가 가능
};

// 리뷰 태그 목록 조회
export const getReviewTags = () => reviewApi.getActual('/tags');