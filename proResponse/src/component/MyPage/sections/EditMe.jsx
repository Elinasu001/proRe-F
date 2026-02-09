// src/component/MyPage/pages/EditMe.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext";

/* 공용 UI */
import Button from "../../Common/Button/Button";
import Input, { AddressInput } from "../../Common/Input/Input";
import Alert from "../../Common/Alert/Alert";
import useAlert from "../../Common/Alert/useAlert";

/* 주소 검색 모달(회원가입 Step2에서 쓰는 것 그대로 재사용) */
import PostcodeModal from "../../Address/PostcodeModal";

import styles from "./EditMe.module.css";

const apiUrl = window.Env?.API_URL || "http://localhost:8080";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/;

export default function EditMe() {
  const navigate = useNavigate();

  /* AuthContext */
  const authCtx = useAuth();
  const { currentUser, updateCurrentUser } = authCtx;

  /* 이름 충돌 방지: AuthContext logout은 별도 이름으로 */
  const authLogout = authCtx?.logout;

  const { alertState, openAlert, closeAlert } = useAlert();

  /* 비밀번호 상태 */
  const [pwOpen, setPwOpen] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  const [pwErr, setPwErr] = useState({
    currentPw: "",
    newPw: "",
    newPw2: "",
    });

  /* 비밀번호 변경 모달 닫을 때 상태 초기화 */
  const resetPwForm = () => {
  setCurrentPw("");
  setNewPw("");
  setNewPw2("");
  setPwErr({ currentPw: "", newPw: "", newPw2: "" });
};  

  /* 
     - 강제 로그아웃
     - 서버 로그아웃은 "시도"만
     - 클라 정리 + navigate는 무조건 
  */
  const forceLogout = async () => {
  // 클라 정리 먼저 (여기서 이미 다음 요청은 막힘)
  localStorage.clear();
  delete axios.defaults.headers.common.Authorization;

  // 화면 이동 먼저
  navigate("/auth/loginForm", { replace: true });

  // 서버 로그아웃은 “시도만”
  try {
    await axios.post(`${apiUrl}/api/auth/logout`);
  } catch (e) {
    // 403/401 무시하기
  }
};

  /* 이메일 변경/인증 상태 */
  const [emailEditOpen, setEmailEditOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailCodeError, setEmailCodeError] = useState("");

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* 이메일 인증/변경 핸들러 */
  const handleSendEmailCode = async () => {
    const email = (newEmail || "").trim();

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      openAlert({
        title: "확인",
        message: "이메일 형식을 확인해주세요.",
        onConfirm: closeAlert,
      });
      return;
    }

    try {
      setEmailError("");
      setEmailCodeError("");
      setEmailVerified(false);

      const res = await axios.post(`${apiUrl}/api/emails/verification-requests`, { email });

      openAlert({
        title: "안내",
        message: res?.data?.message || "인증번호가 발송됐습니다.",
        onConfirm: closeAlert,
      });
    } catch (e) {
      console.error(e);
      openAlert({
        title: "오류",
        message: e?.response?.data?.message || "인증번호 발송에 실패했습니다.",
        onConfirm: closeAlert,
      });
    }
  };

  const handleVerifyEmailCode = async () => {
    const email = (newEmail || "").trim();
    const code = (emailCode || "").trim();

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!code) {
      setEmailCodeError("인증번호를 입력해주세요.");
      return;
    }

    try {
      setEmailError("");
      setEmailCodeError("");

      const res = await axios.post(`${apiUrl}/api/emails/verifications`, { email, code });

      const ok = res?.data?.data?.verified === true;
      setEmailVerified(ok);

      openAlert({
        title: ok ? "성공" : "실패",
        message: res?.data?.message || (ok ? "인증에 성공했습니다." : "인증에 실패했습니다."),
        onConfirm: closeAlert,
      });
    } catch (e) {
      console.error(e);
      setEmailVerified(false);
      openAlert({
        title: "오류",
        message: e?.response?.data?.message || "인증 확인에 실패했습니다.",
        onConfirm: closeAlert,
      });
    }
  };

  /* 
     이메일 변경 성공 시
     컨펌 → 확인 누르면 forceLogout()
   */
  const handleChangeEmail = async () => {
    const email = (newEmail || "").trim();

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!emailVerified) {
      openAlert({
        title: "확인",
        message: "이메일 인증을 먼저 완료해주세요.",
        onConfirm: closeAlert,
      });
      return;
    }

    try {
      const res = await axios.put(`${apiUrl}/api/members/me/email`, null, {
        params: { newEmail: email },
      });

      updateCurrentUser({ email });

      openAlert({
        title: "완료",
        message:
          (res?.data?.message || "이메일 변경에 성공했습니다.") +
          "\n\n보안을 위해 다시 로그인해야 합니다.\n확인을 누르면 로그아웃됩니다.",
        confirmText: "확인",
        cancelText: "나중에",
        onConfirm: async () => {
          closeAlert();

          setEmailEditOpen(false);
          setEmailCode("");
          setEmailVerified(false);
          setEmailError("");
          setEmailCodeError("");

          await forceLogout();
        },
        onCancel: () => {
          closeAlert();

          setEmailEditOpen(false);
          setEmailCode("");
          setEmailVerified(false);
          setEmailError("");
          setEmailCodeError("");
        },
      });
    } catch (e) {
      console.error(e);
      openAlert({
        title: "오류",
        message: e?.response?.data?.message || "이메일 변경에 실패했습니다.",
        onConfirm: closeAlert,
      });
    }
  };

  /* 이 화면에서 내 정보 GET */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/members/me`);
        if (!mounted) return;
        updateCurrentUser(res.data.data);
      } catch (e) {
        console.error(e);

        const status = e?.response?.status;
        if (status === 401 || status === 403) {
          openAlert({
            title: "안내",
            message: "로그인이 만료되었거나 인증 정보가 유효하지 않습니다.\n다시 로그인해주세요.",
            confirmText: "로그인",
            onConfirm: async () => {
              closeAlert();
              await forceLogout();
            },
          });
          return;
        }

        openAlert({
          title: "오류",
          message: "회원 정보를 불러오지 못했습니다.",
          onConfirm: closeAlert,
        });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []); 

  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [editing, setEditing] = useState({
    phone: false,
    address: false,
  });

  const [addrOpen, setAddrOpen] = useState(false);

  const PHONE_REGEX = /^010\d{8}$/;
  const [phoneError, setPhoneError] = useState("");

  /* 유저 정보 세팅 */
  useEffect(() => {
    if (!currentUser) return;

    setPhone(currentUser.phone || "");
    setPostcode(currentUser.postcode || "");
    setAddress(currentUser.address || "");
    setAddressDetail(currentUser.addressDetail || "");
    setLatitude(currentUser.latitude ?? null);
    setLongitude(currentUser.longitude ?? null);

    setNewEmail(currentUser.email || "");
    setEmailEditOpen(false);
    setEmailCode("");
    setEmailVerified(false);
    setEmailError("");
    setEmailCodeError("");
  }, [currentUser]);


  const changed = useMemo(() => {
    if (!currentUser) return false;

    return (
      phone !== (currentUser.phone || "") ||
      postcode !== (currentUser.postcode || "") ||
      address !== (currentUser.address || "") ||
      addressDetail !== (currentUser.addressDetail || "")
    );
  }, [phone, postcode, address, addressDetail, currentUser]);

  /* 주소 선택 + 지오코딩 API */
  const handleSelectAddress = async (data) => {
    const zipCode = data?.zipCode ?? data?.zonecode ?? "";
    const addr = (data?.address ?? data?.roadAddress ?? data?.jibunAddress ?? "").trim();

    setPostcode(zipCode);
    setAddress(addr);
    setAddressDetail("");
    setLatitude(null);
    setLongitude(null);

    if (!addr) {
      openAlert({
        title: "확인",
        message: "주소가 비어있습니다. 다시 선택해 주세요.",
        onConfirm: closeAlert,
      });
      return;
    }

    try {
      const res = await axios.get(`${apiUrl}/api/geo/geocode`, {
        params: { query: addr },
      });

      const lat = res?.data?.data?.lat ?? null;
      const lng = res?.data?.data?.lng ?? null;

      if (lat === null || lng === null) {
        console.error("지오코딩 응답:", res?.data);
        openAlert({
          title: "오류",
          message: "좌표 변환에 실패했습니다. 주소를 다시 선택해 주세요.",
          onConfirm: closeAlert,
        });
        return;
      }

      setLatitude(lat);
      setLongitude(lng);
      setAddrOpen(false);
    } catch (e) {
      console.error("지오코딩 실패:", e?.response?.data || e);
      openAlert({
        title: "오류",
        message: "좌표 변환에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        onConfirm: closeAlert,
      });
    }
  };

  const handleSearchAddress = () => {
    setAddrOpen(true);
  };

  /* 저장 (PATCH: 연락처 + 주소) */
  const handleSave = () => {
    if (editing.phone && phone && !PHONE_REGEX.test(phone)) {
      openAlert({
        title: "확인",
        message: "연락처 형식을 확인해주세요. (010으로 시작하는 11자리)",
        onConfirm: closeAlert,
      });
      return;
    }

    if (!changed) return;

    openAlert({
      title: "수정 확인",
      message: "개인 정보를 수정할까요?",
      confirmText: "확인",
      onConfirm: async () => {
        try {
          closeAlert();

          const payload = {};

          if (phone !== (currentUser?.phone || "")) payload.phone = phone;

          const addressChanged =
            postcode !== (currentUser?.postcode || "") ||
            address !== (currentUser?.address || "") ||
            addressDetail !== (currentUser?.addressDetail || "");

          if (addressChanged) {
            payload.postcode = postcode;
            payload.address = address;
            payload.addressDetail = addressDetail;

            payload.latitude = latitude;
            payload.longitude = longitude;
          }

          if (Object.keys(payload).length === 0) {
            openAlert({
              title: "안내",
              message: "변경된 내용이 없습니다.",
              onConfirm: closeAlert,
            });
            return;
          }

          const form = new FormData();
          Object.entries(payload).forEach(([k, v]) => {
            if (v !== undefined && v !== null) form.append(k, String(v));
          });

          console.log("[PATCH /api/members/me payload]", payload);

          const res = await axios.patch(`${apiUrl}/api/members/me`, form, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          updateCurrentUser(res.data.data);

          openAlert({
            title: "완료",
            message: "개인 정보가 수정되었습니다.",
            onConfirm: () => {
              closeAlert();
              navigate(-1);
            },
          });
        } catch (e) {
          console.error(e);
          openAlert({
            title: "오류",
            message: e?.response?.data?.message || "정보 수정에 실패했습니다.",
            onConfirm: closeAlert,
          });
        }
      },
    });
  };

  /* 비밀번호 변경 핸들러 */
  const handleChangePassword = async () => {
  const c = (currentPw || "").trim();
  const n = (newPw || "").trim();
  const n2 = (newPw2 || "").trim();

  const nextErr = { currentPw: "", newPw: "", newPw2: "" };

  if (!c) nextErr.currentPw = "현재 비밀번호를 입력해주세요.";
  if (!n) nextErr.newPw = "새 비밀번호를 입력해주세요.";
  if (!n2) nextErr.newPw2 = "새 비밀번호 확인을 입력해주세요.";
  if (n && n2 && n !== n2) nextErr.newPw2 = "새 비밀번호가 서로 일치하지 않습니다.";
  if (c && n && c === n) nextErr.newPw = "기존 비밀번호와 동일할 수 없습니다.";

  setPwErr(nextErr);
  if (Object.values(nextErr).some(Boolean)) return;

  try {
    const res = await axios.put(`${apiUrl}/api/members/me/password`, {
      currentPassword: c,
      newPassword: n,
    });

    openAlert({
      title: "완료",
      message: res?.data?.message || "비밀번호가 변경되었습니다.",
      onConfirm: () => {
        closeAlert();
        setPwOpen(false);
        resetPwForm();
      },
    });
  } catch (e) {
    console.error(e);
    openAlert({
      title: "오류",
      message: e?.response?.data?.message || "비밀번호를 확인해주세요.",
      onConfirm: closeAlert,
    });
  }
};

  /* UI */
  return (
    <>
      <Alert {...alertState} />

      <section className={styles.container}>
        <h2 className={styles.title}>개인정보 수정</h2>

        <div className={styles.card}>
          <div className={styles.notice}>개인정보는 상대방에게 노출되지 않습니다</div>

          {/* 이메일 */}
          <div className={styles.row}>
            <span className={styles.label}>이메일</span>

            {!emailEditOpen ? (
              <span className={styles.value}>{currentUser?.email}</span>
            ) : (
              <div className={styles.field} style={{ width: "100%" }}>
                <Input
                  value={newEmail}
                  onChange={(e) => {
                    const v = e.target.value;
                    setNewEmail(v);
                    setEmailVerified(false);

                    if (!v.trim()) setEmailError("");
                    else if (!EMAIL_REGEX.test(v.trim())) setEmailError("이메일 형식이 올바르지 않습니다.");
                    else setEmailError("");
                  }}
                  placeholder="new@email.com"
                  $error={!!emailError}
                  errorMessage={emailError}
                />

                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <Button size="sm" variant="outline" onClick={handleSendEmailCode}>
                    인증번호 발송
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleVerifyEmailCode}>
                    인증 확인
                  </Button>
                  <Button size="sm" variant="primary" onClick={handleChangeEmail} disabled={!emailVerified}>
                    이메일 변경
                  </Button>
                </div>

                <div style={{ marginTop: 8 }}>
                  <Input
                    value={emailCode}
                    onChange={(e) => {
                      const v = (e.target.value || "").replace(/\D/g, "");
                      setEmailCode(v);
                      setEmailVerified(false);
                      if (!v) setEmailCodeError("");
                      else setEmailCodeError("");
                    }}
                    placeholder="인증번호"
                    $error={!!emailCodeError}
                    errorMessage={emailCodeError}
                  />
                </div>

                {emailVerified && <div style={{ marginTop: 6, fontSize: 12 }}>인증 완료</div>}
              </div>
            )}

            {!emailEditOpen ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEmailEditOpen(true);
                  setEmailVerified(false);
                  setEmailCode("");
                  setEmailError("");
                  setEmailCodeError("");
                }}
              >
                인증하기
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEmailEditOpen(false);
                  setNewEmail(currentUser?.email || "");
                  setEmailCode("");
                  setEmailVerified(false);
                  setEmailError("");
                  setEmailCodeError("");
                }}
              >
                닫기
              </Button>
            )}
          </div>

          <div className={styles.hr} />

          {/* 비밀번호 */}
          <div className={styles.row}>
            <span className={styles.label}>비밀번호</span>
            <span className={styles.value}>••••••••</span>
            <Button
            size="sm"
            variant="outline"
            onClick={() => {
                setPwOpen((v) => !v);
                resetPwForm(); // 열 때/닫을 때 폼 초기화
            }}
            >
            변경
            </Button>
          </div>

          {/* 비밀번호 변경 폼 */}
        {pwOpen && (
        <div className={styles.pwPanel}>
            <div className={styles.pwGrid}>
            <Input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="현재 비밀번호"
                $error={!!pwErr.currentPw}
                errorMessage={pwErr.currentPw}
            />

            <Input
            type="password"
            value={newPw}
            onChange={(e) => {
                const v = e.target.value;
                setNewPw(v);

                setPwErr((prev) => {
                const next = { ...prev };

                if (!v.trim()) {
                    next.newPw = "새 비밀번호를 입력해주세요.";
                } else if (!PASSWORD_REGEX.test(v)) {
                    next.newPw = "영문, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다.";
                } else if (currentPw && v === currentPw) {
                    next.newPw = "기존 비밀번호와 동일할 수 없습니다.";
                } else {
                    next.newPw = "";
                }

                // 확인값과 일치여부 체크
                if (newPw2 && v !== newPw2) {
                    next.newPw2 = "비밀번호가 일치하지 않습니다.";
                } else if (newPw2) {
                    next.newPw2 = "";
                }

                return next;
                    });
                }}
                placeholder="새 비밀번호"
                $error={!!pwErr.newPw}
                errorMessage={pwErr.newPw}
                />

            <Input
                type="password"
                value={newPw2}
                onChange={(e) => setNewPw2(e.target.value)}
                placeholder="새 비밀번호 확인"
                $error={!!pwErr.newPw2}
                errorMessage={pwErr.newPw2}
            />
            </div>

            <div className={styles.pwActions}>
            <Button
                size="sm"
                variant="outline"
                onClick={() => {
                setPwOpen(false);
                resetPwForm();
                }}
            >
                취소
            </Button>

            <Button size="sm" variant="primary" onClick={handleChangePassword}>
                변경하기
            </Button>
            </div>
        </div>
        )}


          <div className={styles.hr} />

          {/* 연락처 */}
          <div className={styles.row}>
            <span className={styles.label}>연락처</span>

            {!editing.phone ? (
              <span className={styles.value}>{phone || "미등록"}</span>
            ) : (
              <div className={styles.field}>
                <Input
                  value={phone}
                  onChange={(e) => {
                    const v = (e.target.value || "").replace(/\D/g, "");
                    setPhone(v);

                    if (v.length === 0) setPhoneError("");
                    else if (!PHONE_REGEX.test(v)) setPhoneError("010으로 시작하는 11자리 숫자를 입력해주세요.");
                    else setPhoneError("");
                  }}
                  placeholder="01012345678"
                  $error={!!phoneError}
                  errorMessage={phoneError}
                />
              </div>
            )}

            {!editing.phone ? (
              <button className={styles.editIconBtn} type="button" onClick={() => setEditing((p) => ({ ...p, phone: true }))}>
                ✏️
              </button>
            ) : (
              <button className={styles.editIconBtn} type="button" onClick={() => setEditing((p) => ({ ...p, phone: false }))}>
                완료
              </button>
            )}
          </div>

          <div className={styles.hr} />

          {/* 주소 */}
          <div className={styles.row}>
            <span className={styles.label}>주소</span>

            {!editing.address ? (
              <span className={styles.value}>
                {(address ? `${address} ${addressDetail || ""}` : "미등록").trim()}
              </span>
            ) : (
              <div style={{ width: "100%" }}>
                <AddressInput
                  mainAddress={address}
                  detailAddress={addressDetail}
                  onMainChange={(v) => setAddress(v)}
                  onDetailChange={(e) => setAddressDetail(e.target.value)}
                  onSearchClick={handleSearchAddress}
                />
              </div>
            )}

            {!editing.address ? (
              <button className={styles.editIconBtn} type="button" onClick={() => setEditing((p) => ({ ...p, address: true }))} aria-label="주소 수정">
                ✏️
              </button>
            ) : (
              <button className={styles.editIconBtn} type="button" onClick={() => setEditing((p) => ({ ...p, address: false }))} aria-label="주소 수정 완료">
                완료
              </button>
            )}
          </div>

          {/* 버튼 */}
          <div className={styles.actions}>
            <Button variant="outline" onClick={() => navigate(-1)}>
              이전
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={!changed}>
              저장
            </Button>
          </div>
           <div className={styles.actions}>
            <Button onClick={() => navigate("/expert/edit")}>
             전문가 정보 수정
            </Button>   
          </div>
          <div className={styles.actions}>
            <Button onClick={() => navigate("/mypage/me/delete")}>
             회원탈퇴
            </Button>   
          </div>
        </div>
      </section>

      {/* 주소찾기 모달 */}
      {addrOpen && <PostcodeModal onClose={() => setAddrOpen(false)} onSelect={handleSelectAddress} />}
    </>
  );
}
