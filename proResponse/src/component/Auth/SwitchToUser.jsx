import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";

const apiUrl = window.ENV?.API_URL || window.Env?.API_URL || "http://localhost:8080";

export default function SwitchToUser() {
  const navigate = useNavigate();
  const { applyTokensAndRole } = useAuth(); //

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        /* 1) 전문가 -> 일반회원 전환 */
        const res = await axios.put(
          `${apiUrl}/api/experts/switch/user`,
          null,
          { skipAuthErrorHandler: true }
        );

        /* 2) ResponseData.data */
        const data = res?.data?.data;

        if (mounted) {
          applyTokensAndRole({
            accessToken: data?.tokens?.accessToken,
            refreshToken: data?.tokens?.refreshToken,
            userRole: data?.userRole || "ROLE_USER",
          });
        }

        /* 3) 홈으로 */
        navigate("/", { replace: true });
      } catch (e) {
        console.error(e);
        navigate("/", { replace: true });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigate, applyTokensAndRole]); //

  return <div style={{ padding: 24 }}>전환 처리중...</div>;
}
