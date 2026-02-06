import { useEffect, useState } from "react";
import axios from "axios";
import ExpertWizard from "../ExpertRegister/ExpertWizard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Alert from "../Common/Alert/Alert.jsx";
import useAlert from "../Common/Alert/useAlert";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

const GET_MY_EXPERT_URL = `${apiUrl}/api/experts/me`; // 수정 초기값 조회
const UPDATE_URL = `${apiUrl}/api/experts/me`; // 수정 저장(PUT)

export default function ExpertEdit() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { alertState, openAlert, closeAlert } = useAlert();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 수정: 초기값 GET
  useEffect(() => {
    if (!currentUser) return;

    if (currentUser.userRole === "ROLE_USER") {
      openAlert({
        title: "접근 불가",
        message: "일반 회원은 접근할 수 없습니다.",
        confirmText: "홈으로 이동",
        onConfirm: () => {
          closeAlert();
          navigate("/", { replace: true });
        },
      });
      setLoading(false); // 여기서 로딩을 내려야 "불러오는 중"에 안 가림
      return;
    }

    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(GET_MY_EXPERT_URL);
        if (!mounted) return;
        setInitialData(res.data?.data ?? null);
      } catch (e) {
        console.error(e);
        openAlert({
          title: "조회 실패",
          message: "전문가 정보 조회 실패",
          onConfirm: closeAlert,
        });
        setInitialData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [currentUser, navigate]);

  // 수정: PUT
  const onSubmit = (fd) => {
    return axios.put(UPDATE_URL, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <>
      {loading && <div style={{ padding: 24 }}>불러오는 중...</div>}

      {!loading && !initialData && (
        <div style={{ padding: 24 }}></div>
      )}

      {!loading && initialData && (
        <ExpertWizard
          mode="edit"
          initialData={initialData}
          onSubmit={onSubmit}
          successRedirect="/MypageExpert"
        />
      )}

      {/* 항상 렌더 */}
      <Alert {...alertState} />
    </>
  );
}
