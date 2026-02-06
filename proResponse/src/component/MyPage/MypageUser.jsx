// src/component/MyPage/pages/MypageUser.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";
import EmailVerifySection from "../Email/EmailVerifySection";

/* 공용 UI */
import Button from "../Common/Button/Button";
import Input, { AddressInput } from "../Common/Input/Input";
import Alert from "../Common/Alert/Alert";
import useAlert from "../Common/Alert/useAlert";
import CommonModal from "../Common/Modal/CommonModal";

/* 주소 검색 모달(회원가입 Step2에서 쓰는 것 그대로 재사용) */
import PostcodeModal from "../Address/PostcodeModal";

/* 기존 스타일 재사용(필요 시 교체 가능) */
import styles from "./sections/EditMe.module.css";
import profileStyles from "./sections/ProfileSection.module.css";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";
const PHONE_REGEX = /^010\d{8}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/;

/* =========================
   ✅ (추가) 공백-only 방지 유틸
   - "   " 같은 값은 빈 값으로 취급
   - 앞뒤 공백은 trim 해서 저장/전송
========================= */
const isBlankOnly = (v) => (v ?? "").trim().length === 0;
const trimSafe = (v) => (v ?? "").trim();

export default function MypageUser() {
  const navigate = useNavigate();

  /* =========================
     1) AuthContext
     - auth.user X
     - currentUser O
  ========================= */
  const authCtx = useAuth();
  const { currentUser, updateCurrentUser } = authCtx;
  const authLogout = authCtx?.logout;

  /* =========================
     2) Alert
  ========================= */
  const { alertState, openAlert, closeAlert } = useAlert();

  /* =========================
     3) 강제 로그아웃(안전장치)
     - 서버 로그아웃은 "시도"만
     - 클라 정리 + navigate는 무조건
  ========================= */
  const forceLogout = async () => {
    localStorage.clear();
    delete axios.defaults.headers.common.Authorization;

    navigate("/auth/loginForm", { replace: true });

    try {
      await axios.post(`${apiUrl}/api/auth/logout`);
    } catch (e) {
      // 401/403 무시
    }
  };

  useEffect(() => {
  if (!currentUser) return;

  if (currentUser.userRole === "ROLE_EXPERT") {
    navigate("/mypageExpert", { replace: true });
  }
}, [currentUser, navigate]);


  /* =========================
     4) 화면 진입 시 내정보 GET
  ========================= */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/members/me`);
        if (!mounted) return;
        updateCurrentUser(res?.data?.data);
      } catch (e) {
        console.error(e);

        const status = e?.response?.status;
        if (status === 401 || status === 403) {
          openAlert({
            title: "안내",
            message:
              "로그인이 만료되었거나 인증 정보가 유효하지 않습니다.\n다시 로그인해주세요.",
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

  /* =========================
     5) 표시용 값
  ========================= */
  const nickname = currentUser?.nickname || currentUser?.userName || "사용자";
  const userName = currentUser?.userName || "";
  const email = currentUser?.email || "";

  const profileImgSrc = currentUser?.profileImgPath
    ? currentUser.profileImgPath.startsWith("http")
      ? currentUser.profileImgPath
      : `${apiUrl}${currentUser.profileImgPath}`
    : "";


    /* =========================
   (추가) 이메일 변경 상태
========================= */
const [emailEditOpen, setEmailEditOpen] = useState(false);
const [newEmail, setNewEmail] = useState("");
const [emailVerified, setEmailVerified] = useState(false);

/* =========================
   (추가) 이메일 변경(인증 완료 후)
   - EditMe.jsx에서 하던 것과 동일하게: 성공 후 forceLogout 컨펌
========================= */
const handleChangeEmail = async () => {
  const email = (newEmail || "").trim();

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
        setEmailVerified(false);
        await forceLogout();
      },
      onCancel: () => {
        closeAlert();
        setEmailEditOpen(false);
        setEmailVerified(false);
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

  /* =========================
     6) 프로필(닉네임/이미지) 수정 모달
  ========================= */
  const fileInputRef = useRef(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editNickname, setEditNickname] = useState("");
  const [editImages, setEditImages] = useState([]);
  const [editError, setEditError] = useState("");

  const openEdit = () => {
    setEditError("");
    setEditNickname(currentUser?.nickname || "");
    setEditImages([]);
    setEditOpen(true);
  };
  const closeEdit = () => setEditOpen(false);

  const originNickname = currentUser?.nickname || "";
  const nicknameChanged = editNickname.trim() !== originNickname.trim();
  const imageChanged = (editImages?.length || 0) > 0;

  const canSaveProfile = useMemo(() => {
    if (!nicknameChanged && !imageChanged) return false;
    if (!editNickname.trim()) return false;
    return true;
  }, [nicknameChanged, imageChanged, editNickname]);

  const handleSaveProfile = () => {
    setEditError("");
    if (!canSaveProfile) return;

    if (!editNickname.trim()) {
      setEditError("닉네임은 필수입니다.");
      return;
    }

    openAlert({
      title: "수정 확인",
      message: "프로필 정보를 수정할까요?",
      confirmText: "확인",
      onConfirm: async () => {
        try {
          closeAlert();

          const formData = new FormData();
          if (nicknameChanged) formData.append("nickname", editNickname.trim());
          if (imageChanged) formData.append("profileImg", editImages[0]);

          const res = await axios.patch(`${apiUrl}/api/members/me`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const updated = res?.data?.data;
          if (updated) {
            updateCurrentUser({
              nickname: updated?.nickname,
              profileImgPath:
                updated?.profileImgPath ??
                updated?.profileImg ??
                updated?.profileImage,
            });
          }

          closeEdit();

          openAlert({
            title: "완료",
            message: "프로필이 수정되었습니다.",
            onConfirm: closeAlert,
          });
        } catch (e) {
          console.error(e);
          openAlert({
            title: "오류",
            message: "프로필 수정에 실패했습니다.",
            onConfirm: closeAlert,
          });
        }
      },
    });
  };

  /* =========================
     7) 연락처/주소 상태 + 인라인 편집
  ========================= */
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [editing, setEditing] = useState({ phone: false, address: false });
  const [addrOpen, setAddrOpen] = useState(false);

  const [phoneError, setPhoneError] = useState("");

  /* ✅ (추가) 주소 공백-only 에러 메시지 */
  const [addrError, setAddrError] = useState("");
  const [addrDetailError, setAddrDetailError] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    setNewEmail(currentUser.email || "");   // 추가
    setEmailVerified(false);               // 추가(안전)
    setEmailEditOpen(false);               // 추가(원하면 유지/제거)

    setPhone(currentUser.phone || "");
    setPostcode(currentUser.postcode || "");
    setAddress(currentUser.address || "");
    setAddressDetail(currentUser.addressDetail || "");
    setLatitude(currentUser.latitude ?? null);
    setLongitude(currentUser.longitude ?? null);

    /* ✅ (추가) 로딩 시 에러 초기화 */
    setAddrError("");
    setAddrDetailError("");
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

  const handleSearchAddress = () => setAddrOpen(true);

  const handleSelectAddress = async (data) => {
    const zipCode = data?.zipCode ?? data?.zonecode ?? "";
    const addr = (data?.address ?? data?.roadAddress ?? data?.jibunAddress ?? "")
      .trim();

    setPostcode(zipCode);
    setAddress(addr);
    setAddressDetail("");
    setLatitude(null);
    setLongitude(null);

    /* ✅ (추가) 주소 선택 시 에러 초기화 */
    setAddrError("");
    setAddrDetailError("");

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

  const handleSaveContactAddress = () => {
    /* 연락처 형식 체크(기존 유지) */
    if (editing.phone && phone && !PHONE_REGEX.test(phone)) {
      openAlert({
        title: "확인",
        message: "연락처 형식을 확인해주세요. (010으로 시작하는 11자리)",
        onConfirm: closeAlert,
      });
      return;
    }

    /* ✅ (추가) 주소 편집 중일 때 공백-only 방지 */
    if (editing.address) {
      const a = trimSafe(address);
      const d = trimSafe(addressDetail);

      /* 메인 주소가 " " 같은 값이면 막기 */
      if (address && isBlankOnly(address)) {
        setAddrError("공백만 입력할 수 없습니다.");
        openAlert({
          title: "확인",
          message: "주소는 공백만 입력할 수 없습니다.",
          onConfirm: closeAlert,
        });
        return;
      }

      /* 상세주소가 " " 같은 값이면 막기(입력했을 때만) */
      if (addressDetail && isBlankOnly(addressDetail)) {
        setAddrDetailError("공백만 입력할 수 없습니다.");
        openAlert({
          title: "확인",
          message: "상세주소는 공백만 입력할 수 없습니다.",
          onConfirm: closeAlert,
        });
        return;
      }

      /* 저장 시 trim 강제(내부 상태도 정리) */
      if (address) setAddress(a);
      if (addressDetail) setAddressDetail(d);
    }

    if (!changed) return;

    openAlert({
      title: "수정 확인",
      message: "연락처/주소를 저장할까요?",
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
            /* ✅ (추가) 전송 직전에 trim 적용 */
            payload.postcode = postcode;
            payload.address = trimSafe(address);
            payload.addressDetail = trimSafe(addressDetail);
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

          const res = await axios.patch(`${apiUrl}/api/members/me`, form, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          updateCurrentUser(res?.data?.data);

          openAlert({
            title: "완료",
            message: "저장되었습니다.",
            onConfirm: closeAlert,
          });
        } catch (e) {
          console.error(e);
          openAlert({
            title: "오류",
            message: e?.response?.data?.message || "저장에 실패했습니다.",
            onConfirm: closeAlert,
          });
        }
      },
    });
  };

  /* =========================
     8) 비밀번호 변경 패널
  ========================= */
  const [pwOpen, setPwOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [pwErr, setPwErr] = useState({ currentPw: "", newPw: "", newPw2: "" });

  const resetPwForm = () => {
    setCurrentPw("");
    setNewPw("");
    setNewPw2("");
    setPwErr({ currentPw: "", newPw: "", newPw2: "" });
  };

  const handleChangePassword = async () => {
    const c = (currentPw || "").trim();
    const n = (newPw || "").trim();
    const n2 = (newPw2 || "").trim();

    const nextErr = { currentPw: "", newPw: "", newPw2: "" };

    if (!c) nextErr.currentPw = "현재 비밀번호를 입력해주세요.";
    if (!n) nextErr.newPw = "새 비밀번호를 입력해주세요.";
    if (!n2) nextErr.newPw2 = "새 비밀번호 확인을 입력해주세요.";
    if (n && n2 && n !== n2)
      nextErr.newPw2 = "새 비밀번호가 서로 일치하지 않습니다.";
    if (c && n && c === n) nextErr.newPw = "기존 비밀번호와 동일할 수 없습니다.";
    if (n && !PASSWORD_REGEX.test(n))
      nextErr.newPw = "영문, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다.";

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

  /* =========================
     9) UI
  ========================= */
  return (
    <>
      {/* 알럿이 모달 뒤로 깔릴 수 있어서 최상단 레이어 */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          pointerEvents: "none",
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          <Alert {...alertState} />
        </div>
      </div>

      <section className={styles.container}>
        <h2 className={styles.title}>마이페이지</h2>

        <div className={styles.card}>
          <div className={styles.notice}>개인정보는 상대방에게 노출되지 않습니다</div>

          {/* 프로필 카드 */}
          <section className={profileStyles.card} style={{ marginBottom: 16 }}>
            <div className={profileStyles.avatar}>
              {profileImgSrc ? (
                <img
                  src={profileImgSrc}
                  alt="프로필"
                  className={profileStyles.avatarImg}
                />
              ) : (
                <span className={profileStyles.noImage}>NO IMAGE</span>
              )}
            </div>

            <div className={profileStyles.info}>
              <div className={profileStyles.nameRow}>
                <h3 className={profileStyles.name}>{nickname}</h3>
                <button className={profileStyles.editBtn} onClick={openEdit}>
                  ✏️ 수정
                </button>
              </div>
              <p className={profileStyles.email}>{email}</p>
            </div>
          </section>

          <div className={styles.hr} />

          {/* 이름 */}
          <div className={styles.row}>
            <span className={styles.label}>이름</span>
            <span className={styles.value}>{userName || "미등록"}</span>
            <span />
          </div>

          <div className={styles.hr} />

          {/* 이메일 */}
<div className={styles.row}>
  <span className={styles.label}>이메일</span>

  {!emailEditOpen ? (
    <span className={styles.value}>{currentUser?.email || "미등록"}</span>
  ) : (
    <div className={styles.field} style={{ width: "100%" }}>
      <EmailVerifySection
        email={newEmail}
        onEmailChange={(v) => setNewEmail(v)}
        verified={emailVerified}
        onVerifiedChange={(v) => setEmailVerified(v)}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <Button
          size="sm"
          variant="primary"
          onClick={handleChangeEmail}
          disabled={!emailVerified}
        >
          이메일 변경
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setEmailEditOpen(false);
            setNewEmail(currentUser?.email || "");
            setEmailVerified(false);
          }}
        >
          닫기
        </Button>
      </div>
    </div>
  )}

  {!emailEditOpen ? (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        setEmailEditOpen(true);
        setNewEmail(currentUser?.email || "");
        setEmailVerified(false);
      }}
    >
      변경
    </Button>
  ) : (
    <span />
  )}
</div>

<div className={styles.hr} />

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
                resetPwForm();
              }}
            >
              변경
            </Button>
          </div>

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

                      if (!v.trim()) next.newPw = "새 비밀번호를 입력해주세요.";
                      else if (!PASSWORD_REGEX.test(v))
                        next.newPw =
                          "영문, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다.";
                      else if (currentPw && v === currentPw)
                        next.newPw = "기존 비밀번호와 동일할 수 없습니다.";
                      else next.newPw = "";

                      if (newPw2 && v !== newPw2)
                        next.newPw2 = "비밀번호가 일치하지 않습니다.";
                      else if (newPw2) next.newPw2 = "";

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
                    else if (!PHONE_REGEX.test(v))
                      setPhoneError("010으로 시작하는 11자리 숫자를 입력해주세요.");
                    else setPhoneError("");
                  }}
                  placeholder="01012345678"
                  $error={!!phoneError}
                  errorMessage={phoneError}
                />
              </div>
            )}

            {!editing.phone ? (
              <button
                className={styles.editIconBtn}
                type="button"
                onClick={() => setEditing((p) => ({ ...p, phone: true }))}
              >
                ✏️
              </button>
            ) : (
              <button
                className={styles.editIconBtn}
                type="button"
                onClick={() => setEditing((p) => ({ ...p, phone: false }))}
              >
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
                  /* ✅ (추가) 공백-only 방지 + 에러 초기화 */
                  onMainChange={(v) => {
                    setAddress(v);
                    if (!v) setAddrError("");
                    else if (isBlankOnly(v)) setAddrError("공백만 입력할 수 없습니다.");
                    else setAddrError("");
                  }}
                  onDetailChange={(e) => {
                    const v = e.target.value;
                    setAddressDetail(v);

                    if (!v) setAddrDetailError("");
                    else if (isBlankOnly(v))
                      setAddrDetailError("공백만 입력할 수 없습니다.");
                    else setAddrDetailError("");
                  }}
                  onSearchClick={handleSearchAddress}
                />

                {/* ✅ (추가) 상세주소 공백-only 에러 표시(공용 Input 에러 스타일 그대로) */}
                {addrError ? (
                  <div style={{ marginTop: 6 }}>
                    <div style={{ fontSize: 12, color: "#d32f2f" }}>{addrError}</div>
                  </div>
                ) : null}

                {addrDetailError ? (
                  <div style={{ marginTop: 6 }}>
                    <div style={{ fontSize: 12, color: "#d32f2f" }}>
                      {addrDetailError}
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {!editing.address ? (
              <button
                className={styles.editIconBtn}
                type="button"
                onClick={() => setEditing((p) => ({ ...p, address: true }))}
                aria-label="주소 수정"
              >
                ✏️
              </button>
            ) : (
              <button
                className={styles.editIconBtn}
                type="button"
                onClick={() => setEditing((p) => ({ ...p, address: false }))}
                aria-label="주소 수정 완료"
              >
                완료
              </button>
            )}
          </div>

          {/* 연락처/주소 저장 버튼 */}
          <div className={styles.actions}>
            <Button variant="outline" onClick={() => navigate(-1)}>
              이전
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveContactAddress}
              disabled={!changed}
            >
              저장
            </Button>
          </div>

          {/* 회원탈퇴(유지) */}
          <div className={styles.actions}>
            <Button onClick={() => navigate("/mypage/me/delete")}>회원탈퇴</Button>
          </div>
        </div>
      </section>

      {/* 프로필 수정 모달 */}
      <CommonModal isOpen={editOpen} onClose={closeEdit}>
        <div style={{ padding: 20 }}>
          {/* 파일 선택 input (숨김) */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setEditImages([f]);
              e.target.value = "";
            }}
          />

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div
              style={{
                position: "relative",
                width: 96,
                height: 96,
                borderRadius: 999,
                overflow: "hidden",
                border: "1px solid #eee",
                background: "#fafafa",
                display: "grid",
                placeItems: "center",
              }}
            >
              {editImages?.[0] ? (
                <img
                  src={URL.createObjectURL(editImages[0])}
                  alt="미리보기"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : profileImgSrc ? (
                <img
                  src={profileImgSrc}
                  alt="프로필"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: 12, color: "#666" }}>NO IMAGE</span>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="프로필 이미지 변경"
                style={{
                  position: "absolute",
                  right: 6,
                  bottom: 6,
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
                  <path d="M9.5 4.5 8.2 6H6.5A2.5 2.5 0 0 0 4 8.5v9A2.5 2.5 0 0 0 6.5 20h11A2.5 2.5 0 0 0 20 17.5v-9A2.5 2.5 0 0 0 17.5 6h-1.7l-1.3-1.5H9.5ZM12 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 13, opacity: 0.7 }}>
              닉네임
            </label>
            <Input
              value={editNickname}
              onChange={(e) => setEditNickname(e.target.value)}
              placeholder="닉네임"
              $error={!!editError}
              errorMessage={editError}
            />
          </div>

          <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Button onClick={closeEdit}>취소</Button>
            <Button variant="primary" onClick={handleSaveProfile} disabled={!canSaveProfile}>
              저장
            </Button>
          </div>
        </div>
      </CommonModal>

      {/* 주소찾기 모달 */}
      {addrOpen && (
        <PostcodeModal onClose={() => setAddrOpen(false)} onSelect={handleSelectAddress} />
      )}
    </>
  );
}
