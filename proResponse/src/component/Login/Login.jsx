import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; 

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      
      const res = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        userPwd,
      });

      // AuthContext.login은 axios 응답(res)을 그대로 받도록 만들어둠
      login(res);

      navigate("/main");
    } catch (err) {
      // 백엔드 표준 응답 { message, data, success, timestamp } 고려
      const msg =
        err?.response?.data?.message ||
        "로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.";
      setErrorMsg(msg);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 24 }}>
      <h2>로그인</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>비밀번호</label>
          <input
            type="password"
            value={userPwd}
            onChange={(e) => setUserPwd(e.target.value)}
            placeholder="비밀번호"
            required
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </div>

        {errorMsg && (
          <p style={{ marginTop: 8 }}>
            {errorMsg}
          </p>
        )}

        <button type="submit" style={{ width: "100%", padding: 12, marginTop: 12 }}>
          로그인
        </button>
      </form>
    </div>
  );
}
