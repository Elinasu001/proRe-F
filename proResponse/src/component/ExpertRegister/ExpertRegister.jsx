import axios from "axios";
import ExpertWizard from "./ExpertWizard";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

// TODO: 너희 등록 엔드포인트로 수정
const REGISTER_URL = `${apiUrl}/api/experts/registration`;

export default function ExpertRegister() {
  // 등록: POST
  const onSubmit = (fd) => {
    return axios.post(REGISTER_URL, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <ExpertWizard
      mode="create"
      onSubmit={onSubmit}
      successRedirect="/mypage"
    />
  );
}
