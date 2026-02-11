import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { axiosAuth } from "../../api/reqApi.js"; 

export default function SwitchToUser() {
  const navigate = useNavigate();
  const { applyTokensAndRole } = useAuth();

  const ran = useRef(false);

  useEffect(() => {
    let mounted = true;

    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        /* 전문가 -> 일반회원 전환 (공용 axiosAuth 사용) */
        const res = await axiosAuth.put("/api/experts/switch/user", null);

        /* ResponseData.data */
        const data = res?.data;

        if (mounted) {
          applyTokensAndRole({
            accessToken: data?.tokens?.accessToken,
            refreshToken: data?.tokens?.refreshToken,
            userRole: data?.userRole || "ROLE_USER",
          });
        }

        /* 홈 이동 */
        navigate("/", { replace: true });

      } catch (e) {
        console.error(e);
        navigate("/", { replace: true });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigate, applyTokensAndRole]);

  return <div style={{ padding: 24 }}>전환 처리중...</div>;
}
