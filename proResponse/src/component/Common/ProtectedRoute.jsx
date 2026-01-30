import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ roles = [], children }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // 로그인 체크
    if (!auth?.accessToken) {
      alert("로그인부터 해주세요.");
      navigate("/auth/loginForm", { replace: true });
      return;
    }

    // 권한 체크
    if (roles.length && !roles.includes(auth?.userRole)) {
      alert("접근 권한이 없습니다.");
      navigate("/", { replace: true });
      return;
    }

    setAllowed(true);
  }, [auth, roles, navigate]);

  if (!allowed) return null; // 체크 끝나기 전에는 렌더링하지 않음
  return children;
};

export default ProtectedRoute;
