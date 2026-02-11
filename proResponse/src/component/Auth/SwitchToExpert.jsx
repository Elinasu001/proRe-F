import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { axiosAuth } from "../../api/reqApi.js"; // 너 공용 axios 모듈 경로에 맞게 수정

export default function SwitchToExpert() {
  const navigate = useNavigate();
  const { applyTokensAndRole } = useAuth();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // 1) 전환은 PUT 한 번으로 끝 (서비스단에서 전문가 이력 검증)
        const res = await axiosAuth.put("/api/experts/switch/expert", null);

        // ResponseData 구조: { message, data, success, timestamp }
        const data = res?.data;

        if (!data?.tokens?.accessToken) {
          throw new Error("switch/expert 응답에 tokens가 없습니다.");
        }

        // 2) 토큰/권한 즉시 반영
        if (mounted) {
          applyTokensAndRole({
            accessToken: data.tokens.accessToken,
            refreshToken: data.tokens.refreshToken,
            userRole: data.userRole || "ROLE_EXPERT",
          });
        }

        // 3) 완료 후 이동
        navigate("/", { replace: true });
      } catch (e) {
        // 공용 axios는 실패 시 throw(AxiosError). status 기준 분기
        const status = e?.response?.status;

        // 전문가 이력 없음(서비스단 검증) -> 404 -> 등록 화면으로
        if (status === 404) {
          navigate("/expert/register", { replace: true });
          return;
        }

        // 그 외(401/403은 인터셉터 정책에 따라 처리될 수 있음)
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
