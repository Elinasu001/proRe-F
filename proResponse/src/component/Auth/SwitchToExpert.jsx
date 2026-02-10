import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";

const apiUrl = window.ENV?.API_URL || window.Env?.API_URL || "http://localhost:8080";

export default function SwitchToExpert() {
  const navigate = useNavigate();
  const { applyTokensAndRole } = useAuth(); //

   const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        /* 1) 전문가 이력 체크 */
        const exRes = await axios.get(
          `${apiUrl}/api/experts/checkExist`,
          { 
            headers: { Authorization: `Bearer ${accessToken}` },
            skipAuthErrorHandler: true 
        }
        );
        const exists = exRes?.data?.data;

        /* 2) 이력 없으면 등록 페이지로 */
        if (!exists) {
          navigate("/expert/register", { replace: true });
          return;
        }

        /* 3) 이력 있으면 전문가 전환 */
        const res = await axios.put(
          `${apiUrl}/api/experts/switch/expert`,
          null,
          { skipAuthErrorHandler: true }
        );

        const data = res?.data?.data;

        if (mounted) {
          applyTokensAndRole({
            accessToken: data?.tokens?.accessToken,
            refreshToken: data?.tokens?.refreshToken,
            userRole: data?.userRole || "ROLE_EXPERT",
          });
        }

        /* 4) 홈으로 */
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
