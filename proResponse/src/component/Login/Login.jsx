import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Input from "../Common/Input/Input";
import "./Login.css";


const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

  /* 이메일 & 비밀번호 정규표현식 */
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  /* 이메일 & 비밀번호 입력 */
  const [email, setEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [loading, setLoading] = useState(false);

  /* 이메일 & 비밀번호 에러 메시지 */
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");

  /* 이메일 & 비밀번호 입력값 검증 */
const validate = () => {
  let valid = true;

  setEmailError("");
  setPwdError("");

  const e = email.trim();
  const p = userPwd;

  if (!e) {
    setEmailError("이메일은 필수입니다.");
    valid = false;
  } else if (!EMAIL_REGEX.test(e)) {
    setEmailError("이메일 형식이 올바르지 않습니다.");
    valid = false;
  }

  if (!p) {
    setPwdError("비밀번호는 필수입니다.");
    valid = false;
  } else if (p.length < 8 || p.length > 20) {
    setPwdError("비밀번호는 8~20자 이내여야 합니다.");
    valid = false;
  } else if (!PASSWORD_REGEX.test(p)) {
    setPwdError("비밀번호는 영문/숫자/특수문자를 모두 사용해야 하고, 공백이 없어야 합니다.");
    valid = false;
  }

  return valid;
};

  /* 로그인 요청 처리 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      
      const res = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        userPwd,
      });

      // AuthContext에서 토큰/유저정보/스토리지/헤더 처리
      login(res);


      // userRole 가져오기
      const userRole = res.data.data?.userRole;

      // 역할에 따라 리다이렉트
      if (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_ROOT') {
      navigate('/admin');  // 관리자 대시보드
      } else {
      navigate('/');   // 일반 메인
      }

    } catch (err) {
  setPwdError("이메일 또는 비밀번호가 올바르지 않습니다.");
} finally {
      setLoading(false);
    }
  };

  return (
    <main className="main login-main">
    <div className="login-wrap">
     <h2 className="login-heading">로그인</h2>
      <div className="login-card">

        <form onSubmit={handleSubmit} className="login-form">
          {/* 이메일 */}
          <div className="field">
            <div className="label">이메일</div>
            <Input 
              type="email"
              placeholder="example@proresponse.com"
              value={email}
              onChange={(e) => {setEmail(e.target.value); if (emailError) setEmailError("");}}
              $error={!!emailError}
              errorMessage={emailError}
            />
          </div>

          {/* 비밀번호 */}
          <div className="field">
            <div className="label">비밀번호</div>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={userPwd}
              onChange={(e) => {setUserPwd(e.target.value); setPwdError("");}}
              $error={!!pwdError}
              errorMessage={pwdError}
            />
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "로그인 중..." : "이메일로 로그인"}
          </button>

          {/* 보조 링크 */}
          <div className="link-row">
            <button type="button" className="link-btn" onClick={() => navigate("/signup")}>
              회원가입
            </button>
            <button type="button" className="link-btn" onClick={() => navigate("/find-password")}>
              비밀번호 찾기
            </button>
          </div>

          {/* 소셜 로그인 */}
          <button type="button" className="btn-naver" onClick={() => alert("네이버 로그인 추후 연동")}>
             N 네이버로 시작하기
          </button>
        </form>
      </div>
    </div>
    </main>
  );
}
