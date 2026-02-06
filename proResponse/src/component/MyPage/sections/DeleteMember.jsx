import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

/* 공용 UI */
import Button from "../../Common/Button/Button";
import Input, { TextArea } from "../../Common/Input/Input";
import Alert from "../../Common/Alert/Alert";
import useAlert from "../../Common/Alert/useAlert";

/* 스타일 */
import styles from "./DeleteMember.module.css";

/* API 요청 URL */
const apiUrl = window.ENV?.API_URL || "http://localhost:8080";
const DELETE_MEMBER_URL = `${apiUrl}/api/members`;

export default function DeleteMember() {
  /* 네비 */
  const navigate = useNavigate();

  /* Auth */
  const authCtx = useAuth();
  const authLogout = authCtx?.logout;

  /* 공용 Alert */
  const { alertState, openAlert, closeAlert } = useAlert();

  /* 탈퇴사유 */
  const [reasonNo, setReasonNo] = useState("");
  const [reasonDetail, setReasonDetail] = useState("");

  /* 비밀번호 */
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /* 제출 상태 */
  const [submitting, setSubmitting] = useState(false);

  /* 탈퇴사유 목록 */
  const reasons = useMemo(
    () => [
      { value: "1", label: "원하는 전문가를 찾기 어려워서" },
      { value: "2", label: "견적 또는 응답이 느리거나 매칭이 잘 안 돼서" },
      { value: "3", label: "가격이 부담돼서" },
      { value: "4", label: "서비스 이용이 불편하거나 오류가 많아서" },
      { value: "5", label: "기타" },
    ],
    []
  );

  /* 기타 선택 여부 */
  const isEtc = reasonNo === "5";

  /* 입력 검증 */
  const validate = () => {
    if (!reasonNo) {
      openAlert({
        title: "안내",
        message: "탈퇴 사유를 선택해주세요.",
        onConfirm: closeAlert,
      });
      return false;
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      return false;
    }

    if (isEtc && !reasonDetail.trim()) {
      openAlert({
        title: "안내",
        message: "기타 사유를 입력해주세요.",
        onConfirm: closeAlert,
      });
      return false;
    }

    return true;
  };

  /* 회원탈퇴 API */
  const requestDelete = async () => {
    const request = {
      password,
      reasonNo: Number(reasonNo),
      reasonDetail: isEtc ? reasonDetail : null,
    };

    try {
      setSubmitting(true);
      setPasswordError("");

      await axios.delete(DELETE_MEMBER_URL, { data: request });

      openAlert({
        title: "완료",
        message: "회원탈퇴가 완료되었습니다.",
        onConfirm: async () => {
          closeAlert();
          try {
            if (authLogout) await authLogout();
          } finally {
            navigate("/auth/loginForm", { replace: true });
          }
        },
      });
    } catch (err) {
      const status = err?.response?.status;
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "";

      if (status === 401 || errorMsg.includes("비밀번호")) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
        return;
      }

      openAlert({
        title: "실패",
        message: "회원탈퇴에 실패했습니다.",
        onConfirm: closeAlert,
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* 완료 클릭 */
  const handleSubmit = () => {
    if (!validate()) return;

    openAlert({
      title: "회원탈퇴 확인",
      message: "회원탈퇴는 되돌릴 수 없습니다. 그래도 탈퇴하시겠습니까?",
      confirmText: "탈퇴",
      cancelText: "취소",
      variant: "danger",
      onConfirm: () => {
        closeAlert();
        requestDelete();
      },
      onCancel: closeAlert,
    });
  };

  return (
    <div className={styles.page}>
      <Alert {...alertState} />

      <div className={styles.wrap}>
        <h2 className={styles.heading}>회원탈퇴</h2>

        {/* 탈퇴 사유 선택 */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>탈퇴 사유</div>

          <div className={styles.reasonList}>
            {reasons.map((r) => {
              const active = reasonNo === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  className={`${styles.reasonItem} ${
                    active ? styles.active : ""
                  }`}
                  onClick={() => {
                    setReasonNo(r.value);
                    if (r.value !== "5") setReasonDetail("");
                  }}
                  disabled={submitting}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {isEtc && (
            <TextArea
              label="기타 사유"
              value={reasonDetail}
              onChange={(e) => setReasonDetail(e.target.value)}
              maxLength={100}
              placeholder="사유를 입력해주세요 (최대 100자)"
              $error={isEtc && !reasonDetail.trim()}
              errorMessage="기타 사유를 입력해주세요."
            />
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>비밀번호 확인</div>

          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            $error={!!passwordError}
            errorMessage={passwordError}
            disabled={submitting}
          />
        </div>

        {/* 하단 버튼 */}
        <div className={styles.actions}>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            disabled={submitting}
          >
            이전
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
