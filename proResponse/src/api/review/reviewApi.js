import { axiosAuth } from '../reqApi';

const reviewApi = '/api/reviews';

// 리뷰 태그 전체 조회
export const getReviewTags = () =>
  axiosAuth.getActual(`${reviewApi}/tags`);

// 리뷰 조회
export const getReview = (estimateNo) =>
  axiosAuth.getActual(`${reviewApi}/${estimateNo}`);

// 리뷰 등록 (FormData 전송)
export const createReview = (formData) =>
  axiosAuth.post(reviewApi, formData);

// 리뷰 삭제
export const deleteReview = (estimateNo) =>
  axiosAuth.put(`${reviewApi}/${estimateNo}`);
