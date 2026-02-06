import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Common/Button/Button";
import Input from "../Common/Input/Input";
import { ErrorMessage } from "../Common/Input/Input.styled";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

export default function EmailVerifySection({
  email,
  onEmailChange,
  verified,
  onVerifiedChange,
}) {
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  /* 메시지 타입: ok(파란색) | err(빨간색) */
  const [msgType, setMsgType] = useState(""); // ok | err

  useEffect(() => {
    setCode("");
    setInfoMsg("");
    setMsgType(""); 
    if (verified) onVerifiedChange(false);
  }, [email]);

  /* 인증코드 발송 */
  const sendCode = async () => {
    setSending(true);
    setInfoMsg("");
    setMsgType(""); 

    try {
      const res = await axios.post(`${apiUrl}/api/emails/verification-requests`, { email });

      if (res.data?.success) {
        setMsgType("ok"); 
        setInfoMsg(res.data?.message || "인증번호를 발송했습니다.");
        return;
      }

      setMsgType("err"); 
      setInfoMsg(res.data?.message || "인증번호 발송에 실패했습니다.");
    } catch (e) {
      setMsgType("err"); 
      setInfoMsg(e?.response?.data?.message || "서버 오류로 인증번호 발송에 실패했습니다.");
    } finally {
      setSending(false);
    }
  };

  /* 인증코드 확인 */
  const verifyCode = async () => {
    setVerifying(true);
    setInfoMsg("");
    setMsgType(""); 

    try {
      const res = await axios.post(`${apiUrl}/api/emails/verifications`, { email, code });

      if (res.data?.success) {
        setMsgType("ok"); 
        onVerifiedChange(true);
        setInfoMsg(res.data?.message || "이메일 인증이 완료되었습니다.");
        return;
      }

      setMsgType("err"); 
      onVerifiedChange(false);
      setInfoMsg(res.data?.message || "인증번호가 올바르지 않습니다.");
    } catch (e) {
      setMsgType("err"); 
      onVerifiedChange(false);
      setInfoMsg(e?.response?.data?.message || "서버 오류로 인증에 실패했습니다.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="email-verify-section">
      {/* 이메일 */}
      <div className="row">
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="example@email.com"
        />

        <Button
          type="button"
          onClick={sendCode}
          disabled={!email || sending || verified}
        >
          {verified ? "인증완료" : sending ? "전송중" : "인증하기"}
        </Button>
      </div>

      {/* 인증코드 */}
      <div className="row">
        <Input
          label="인증번호"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="인증번호 입력"
          disabled={!email || verified}
        />

        <Button
          type="button"
          onClick={verifyCode}
          disabled={!email || !code.trim() || verifying || verified}
        >
          {verified ? "완료" : verifying ? "확인중" : "확인"}
        </Button>
      </div>

      {/* 메시지: 성공(파란색) / 실패(빨간색) */}
      {infoMsg && (
        <ErrorMessage style={{ color: msgType === "ok" ? "#3B82F6" : "#FF4444" }}>
          {infoMsg}
        </ErrorMessage>
      )}
    </div>
  );
}
