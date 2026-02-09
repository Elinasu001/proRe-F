import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ roles = [], children }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // "checking" | "allowed" | "denied"

  useEffect(() => {
    // localStorage에서 직접 확인
    const storedToken = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("userRole");

    // 로그인 체크
    if (!storedToken) {
      setStatus("denied");
      alert("로그인부터 해주세요.");
      navigate("/auth/loginForm", { replace: true });
      return;
    }

    // 권한 체크
    if (roles.length && !roles.includes(storedRole)) {
      setStatus("denied");
      alert("접근 권한이 없습니다.");
      navigate("/", { replace: true });
      return;
    }

    setStatus("allowed");
  }, []); // 빈 의존성 배열 - 마운트 시 한 번만 실행

  if (status === "checking") return null;
  if (status === "denied") return null;
  return children;
};

export default ProtectedRoute;
