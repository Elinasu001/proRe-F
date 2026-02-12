import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../api/reqApi"; 

import Button from "../Common/Button/Button";
import Input from "../Common/Input/Input";
import Alert from "../Common/Alert/Alert";
import useAlert from "../Common/Alert/useAlert";
import styles from "./ResetPassword.module.css";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FindPassword() {
  const navigate = useNavigate();
  const { alertState, openAlert, closeAlert } = useAlert();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [issuing, setIssuing] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");

  useEffect(() => {
    setCode("");
    setCodeError("");
  }, [email]);

  const emailValid = useMemo(() => EMAIL_REGEX.test((email || "").trim()), [email]);

  const validateEmail = () => {
    const v = (email || "").trim();
    if (!v) return "이메일을 입력해주세요.";
    if (!EMAIL_REGEX.test(v)) return "이메일 형식이 올바르지 않습니다.";
    return "";
  };

  const validateCode = () => {
    const v = (code || "").trim();
    if (!v) return "인증번호를 입력해주세요.";
    return "";
  };

  const showAlert = (title, message, variant = "alert") => {
    openAlert({
      title,
      message,
      variant,
      confirmText: "확인",
      onConfirm: closeAlert,
    });
  };

  const sendVerificationCode = async () => {
    const err = validateEmail();
    if (err) {
      setEmailError(err);
      return;
    }

    setSending(true);
    setEmailError("");

    try {
      
      const res = await axiosPublic.post(`/api/members/sendcode/password`, {
        email: email.trim(),
      });

      if (res?.success) {
        showAlert("인증번호 발송", res?.message || "인증번호가 발송됐습니다.");
        return;
      }

      showAlert("안내", res?.message || "인증번호 발송에 실패했습니다.");
    } catch (e) {
      showAlert("안내", e?.response?.data?.message || "서버 오류로 인증번호 발송에 실패했습니다.");
    } finally {
      setSending(false);
    }
  };

  const issueTempPassword = async () => {
    setIssuing(true);

    try {
      
      const res = await axiosPublic.post(`/api/members/temporary-password`, {
        email: email.trim(),
      });

      if (res?.success) {
        openAlert({
          title: "임시비밀번호 발송",
          message: "임시비밀번호가 발송됐습니다. 로그인 후 비밀번호를 변경해주세요.",
          variant: "confirm",
          confirmText: "로그인으로 이동",
          cancelText: "닫기",
          onConfirm: () => {
            closeAlert();
            navigate("/auth/loginForm", { replace: true });
          },
          onCancel: closeAlert,
        });
        return;
      }

      showAlert("안내", res?.message || "임시비밀번호 발송에 실패했습니다.");
    } catch (e) {
      showAlert("안내", e?.response?.data?.message || "서버 오류로 임시비밀번호 발송에 실패했습니다.");
    } finally {
      setIssuing(false);
    }
  };

  const verifyCodeAndSendTempPassword = async () => {
    const emailErr = validateEmail();
    if (emailErr) {
      setEmailError(emailErr);
      return;
    }

    const codeErr = validateCode();
    if (codeErr) {
      setCodeError(codeErr);
      return;
    }

    setVerifying(true);
    setEmailError("");
    setCodeError("");

    try {
      
      const res = await axiosPublic.post(`/api/emails/verifications`, {
        email: email.trim(),
        code: code.trim(),
      });

      if (res?.success) {
        await issueTempPassword();
        return;
      }

      showAlert("안내", res?.message || "인증번호가 올바르지 않습니다.");
    } catch (e) {
      showAlert("안내", e?.response?.data?.message || "서버 오류로 인증에 실패했습니다.");
    } finally {
      setVerifying(false);
    }
  };

  const canSend = emailValid && !sending && !verifying && !issuing;
  const canVerify = emailValid && !!code.trim() && !sending && !verifying && !issuing;

  return (
    <>
      <Alert {...alertState} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>비밀번호 찾기</h2>
          <p className={styles.subTitle}>
            이메일 인증이 완료되면 임시비밀번호를 발송합니다.
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => navigate("/auth/loginForm")}
            >
              로그인으로 돌아가기
            </button>
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.sectionTitle}>1. 이메일 입력</div>

          <div className={styles.rowGrid}>
            <Input
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              placeholder="example@email.com"
              $error={!!emailError}
              errorMessage={emailError}
              disabled={sending || verifying || issuing}
            />

            <Button
              type="button"
              onClick={sendVerificationCode}
              disabled={!canSend}
              className={styles.rowButton}
            >
              {sending ? "전송중" : "인증번호 발송"}
            </Button>
          </div>

          <div className={styles.divider} />

          <div className={styles.sectionTitle}>2. 인증번호 확인</div>

          <div className={styles.rowGrid}>
            <Input
              label="인증번호"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (codeError) setCodeError("");
              }}
              placeholder="인증번호 입력"
              $error={!!codeError}
              errorMessage={codeError}
              disabled={!emailValid || sending || verifying || issuing}
            />

            <Button
              type="button"
              onClick={verifyCodeAndSendTempPassword}
              disabled={!canVerify}
              className={styles.rowButton}
            >
              {issuing ? "발송중" : verifying ? "확인중" : "인증번호 확인"}
            </Button>
          </div>

          <div className={styles.helpBox}>
            임시비밀번호로 로그인 후에 마이페이지에서 비밀번호를 변경해주세요.
          </div>
        </div>
      </div>
    </>
  );
}
