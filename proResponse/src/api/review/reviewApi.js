import { axiosAuth } from '../reqApi';

const baseApi = '/api/reviews';

// 리뷰 태그 전체 조회
export const getReviewTags = () =>
  axiosAuth.getActual(`${baseApi}/tags`);

// 리뷰 조회
export const getReview = (params) =>
  axiosAuth.getActual(`${baseApi}/${params}`);

// 리뷰 등록 (FormData 전송)
export const createReview = (formData) =>
  axiosAuth.post(baseApi, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// 리뷰 삭제
export const deleteReview = (params) =>
  axiosAuth.delete(`${baseApi}/${params}`);
