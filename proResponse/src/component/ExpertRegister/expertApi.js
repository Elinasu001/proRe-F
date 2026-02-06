import axios from "axios";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

const client = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const expertApi = {
  // 1️⃣ 전문가 등록 화면 진입 시: 카테고리 전체 트리 조회
  getRegistrationCategories: () =>
    client.get("/api/experts/registration"),

  // 2️⃣ 전문가 등록
  register: (formData) =>
    client.post("/api/experts/registration", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
