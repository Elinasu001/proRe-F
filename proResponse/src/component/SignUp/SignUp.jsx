import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Common/Button/Button";
import Input from "../Common/Input/Input";
import EmailVerifySection from "../Email/EmailVerifySection";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "./signUp.css";
import { ErrorMessage } from "../Common/Input/Input.styled";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

const SIGNUP_URL = `${apiUrl}/api/members`;

export default function SignUp() {
  const navigate = useNavigate();

  /* 회원가입 단계 1 ~ 3 */
  const [step, setStep] = useState(1);

  /* 회원가입 전체 폼 상태 */
  const [form, setForm] = useState({
    /* 1단계 */
    email: "",
    emailVerified: false,
    verifyCode: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",

    /* 2단계 */
    birthday: "",
    gender: "",
    zipCode: "",
    lat: "",
    lng: "",
    address: "",
    addressDetail: "",

    /* 3단계 */
    profileImageFile: null,
    nickname: "",
  });

  /* 비밀번호 검증 메시지 (백엔드 Validation 기준) */
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  /* 비밀번호 일치(성공) 메시지 */
  const [passwordConfirmOk, setPasswordConfirmOk] = useState("");

  // @Pattern: 영문/숫자/특수문자 포함 + 공백 X
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/;

  const validatePassword = (pwd) => {
    if (!pwd || !pwd.trim()) return "비밀번호는 필수입니다.";
    if (pwd.length < 8 || pwd.length > 20) return "비밀번호는 8~20자 이내여야 합니다.";
    if (!PASSWORD_REGEX.test(pwd))
      return "비밀번호는 영문/숫자/특수문자를 모두 사용해야 하고, 공백이 없어야 합니다.";
    return "";
  };

  /* 공통 입력 변경 핸들러 */
  const updateForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* 비밀번호/비번확인 입력 변화에 따라 메시지 갱신 */
  useEffect(() => {
    const pwdErr = validatePassword(form.password);
    setPasswordError(pwdErr);

    // 비번확인 불일치: "둘 다 입력된 상태"에서만 띄우기
    if (form.passwordConfirm) {
      if (form.password !== form.passwordConfirm) {
        setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
        setPasswordConfirmOk("");
      } else {
        setPasswordConfirmError("");
        setPasswordConfirmOk("비밀번호가 일치합니다.");
      }
    } else {
      setPasswordConfirmError("");
      setPasswordConfirmOk("");
    }
  }, [form.password, form.passwordConfirm]);

  /* 단계 이동 핸들러 */
  const goNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const goPrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSearchAddress = () => {
    /*
     * - 다음/카카오 주소검색 모달 열기
     * - 선택된 주소를 updateForm("address", selectedAddress)로 저장
     */
    console.log("주소찾기 클릭");
  };

  /* 단계별 유효성 체크 */
  const canGoNext = () => {
    /* 1단계 */
    if (step === 1) {
      const pwdErr = validatePassword(form.password);
      const pwdMatch = form.password && form.passwordConfirm && form.password === form.passwordConfirm;

      return (
        form.email &&
        form.emailVerified === true &&
        form.password &&
        form.passwordConfirm &&
        pwdErr === "" &&
        pwdMatch === true &&
        form.name &&
        form.phone
      );
    }

    /* 2단계 */
    if (step === 2) {
      return (
        form.birthday.length === 8 &&
        (form.gender === "M" || form.gender === "F") &&
        form.zipCode &&
        form.address &&
        form.addressDetail &&
        form.lat && form.lng
      );
    }

    return true;
  };

  /* 회원가입 완료 처리 */
  const handleSubmit = async () => {
    // 최종 검증
    const pwdErr = validatePassword(form.password);
    if (pwdErr) {
      alert(pwdErr);
      return;
    }
    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!form.nickname.trim()) {
      alert("닉네임을 입력해 주세요.");
      return;
    }
    if (!form.zipCode || !form.address || !form.lat || !form.lng) {
      alert("주소찾기를 통해 주소와 좌표를 먼저 설정해 주세요.");
      return;
    }

    try {
      // 파일 포함 가능성이 있으니 FormData로 전송 (이미지 없으면 일반 필드만 전달됨)
      const fd = new FormData();

      // 1단계
      fd.append("email", form.email);
      fd.append("emailVerified", String(form.emailVerified));
      fd.append("verifyCode", form.verifyCode);
      fd.append("userPwd", form.password);
      fd.append("passwordConfirm", form.passwordConfirm);
      fd.append("userName", form.name);
      fd.append("phone", form.phone);

      // 2단계
      fd.append("birthday", form.birthday);
      fd.append("gender", form.gender);
      fd.append("postcode", form.zipCode);
      fd.append("address", form.address);
      fd.append("addressDetail", form.addressDetail);
      fd.append("latitude", String(form.lat));
      fd.append("longitude", String(form.lng));

      // 3단계
      fd.append("nickname", form.nickname);

      if (form.profileImageFile) {
        fd.append("profileImg", form.profileImageFile);
      }

      const res = await axios.post(SIGNUP_URL, fd);

      console.log("회원가입 응답:", res?.data);

      /*
       * 성공 시
       * - 알림
       * - 로그인 페이지 이동
       */
      alert("회원가입이 완료되었습니다.");
      navigate("/auth/loginForm");
    } catch (err) {
      console.error("회원가입 실패:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "회원가입에 실패했습니다.";
      alert(msg);
    }
  };

  /* 단계별 UI 렌더링 */
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step step-1">
            {/* Step 1 : 이메일/인증/비밀번호/이름/연락처 */}
            {/* 이메일 + 인증하기 */}
            <EmailVerifySection
              email={form.email}
              onEmailChange={(value) => updateForm("email", value)}
              verified={form.emailVerified}
              onVerifiedChange={(value) => updateForm("emailVerified", value)}
            />

            <Input
              label="비밀번호"
              type="password"
              value={form.password}
              onChange={(e) => updateForm("password", e.target.value)}
              placeholder="비밀번호 입력"
            />
            {/* 비밀번호 검증 메시지 (빨간 글씨) */}
            {form.password && passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

            <Input
              label="비밀번호 확인"
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => updateForm("passwordConfirm", e.target.value)}
              placeholder="비밀번호 다시 입력"
            />
            {/* 비밀번호 불일치 메시지 (빨간 글씨) */}
            {passwordConfirmError && <ErrorMessage>{passwordConfirmError}</ErrorMessage>}
            {/* 비밀번호 일치 메시지 (파란 글씨) */}
            {passwordConfirmOk && (
              <ErrorMessage style={{ color: "#2f6bff" }}>{passwordConfirmOk}</ErrorMessage>
            )}

            <Input
              label="이름"
              type="text"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              placeholder="이름 입력"
            />

            <Input
              label="연락처"
              type="text"
              value={form.phone}
              onChange={(e) => updateForm("phone", e.target.value)}
              placeholder="010-0000-0000"
            />
          </div>
        );

      case 2:
        return <Step2 form={form} onChange={updateForm} onSearchAddress={handleSearchAddress} />;

      case 3:
        return <Step3 form={form} onChange={updateForm} />;

      default:
        return null;
    }
  };

  /* 화면 렌더링 */
  return (
    <div className="signup-container">
      {/* 상단 안내 */}
      <h2>회원가입을 시작해보세요!</h2>
      <p>
        이미 계정이 있으신가요?{" "}
        <span onClick={() => navigate("/auth/loginForm")}>로그인하기</span>
      </p>

      {/* 단계 표시 */}
      <div className="step-indicator">{step} / 3단계</div>

      {/* 단계별 폼 */}
      {renderStep()}

      {/* 하단 버튼 영역 */}
      <div className="step-actions">
        {step > 1 && (
          <Button type="button" onClick={goPrev}>
            이전
          </Button>
        )}

        {step < 3 && (
          <Button type="button" onClick={goNext} disabled={!canGoNext()}>
            다음
          </Button>
        )}

        {step === 3 && (
          <Button type="button" onClick={handleSubmit}>
            완료
          </Button>
        )}
      </div>
    </div>
  );
}
