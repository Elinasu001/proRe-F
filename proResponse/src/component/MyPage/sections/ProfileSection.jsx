// src/component/MyPage/sections/ProfileSection.jsx
import { useState, useRef, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* 공용 UI */
import Button from "../../Common/Button/Button";
import Input from "../../Common/Input/Input.jsx";
import Alert from "../../Common/Alert/Alert.jsx";
import useAlert from "../../Common/Alert/useAlert";
import CommonModal from "../../Common/Modal/CommonModal.jsx";
import PostcodeModal from "../../Address/PostcodeModal";

import styles from "./ProfileSection.module.css";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

export default function ProfileSection() {
  /* =========================
     1) Auth 기반 유저
     auth.user X
     currentUser O 
  ========================= */
  const { currentUser, updateCurrentUser } = useAuth();
  const user = currentUser;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  /* =========================
     2) Alert
  ========================= */
  const { alertState, openAlert, closeAlert } = useAlert();

  /* =========================
     3) 수정 UI 상태
  ========================= */
  const [editOpen, setEditOpen] = useState(false);
  const [editNickname, setEditNickname] = useState("");
  const [editImages, setEditImages] = useState([]);
  const [editError, setEditError] = useState("");

  /* =========================
     4) 표시용 값
  ========================= */
  const nickname = user?.nickname || user?.userName || "사용자";
  const email = user?.email || "";

  const profileImgSrc = user?.profileImgPath
    ? user.profileImgPath.startsWith("http")
      ? user.profileImgPath
      : `${apiUrl}${user.profileImgPath}`
    : "";

  /* =========================
     5) 모달 제어
  ========================= */
  const openEdit = () => {
    setEditError("");
    setEditNickname(user?.nickname || "");
    setEditImages([]);
    setEditOpen(true);
  };

  const closeEdit = () => setEditOpen(false);

  /* =========================
     5-1) 변경 감지 & 저장 버튼 활성 조건
  ========================= */
  const originNickname = user?.nickname || "";
  const nicknameChanged = editNickname.trim() !== originNickname.trim();
  const imageChanged = (editImages?.length || 0) > 0;

  const canSave = useMemo(() => {
    if (!nicknameChanged && !imageChanged) return false;
    if (!editNickname.trim()) return false; // 닉네임은 빈 값 불가
    return true;
  }, [nicknameChanged, imageChanged, editNickname]);

  /* 저장 (PATCH 응답 DTO로 반영) */
  const handleSaveEdit = () => {
    setEditError("");

    if (!canSave) return;

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

          /* 변경된 것만 전송 */
          if (nicknameChanged) formData.append("nickname", editNickname.trim());
          if (imageChanged) formData.append("profileImg", editImages[0]); // 백엔드와 일치

          /* PATCH 호출 */
          const res = await axios.patch(`${apiUrl}/api/members/me`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          /* PATCH 응답 DTO로 currentUser에 반영 */
          const updated = res?.data?.data;

          if (updated) {
            updateCurrentUser({
              nickname: updated?.nickname,
              profileImgPath:
                updated?.profileImgPath ?? updated?.profileImg ?? updated?.profileImage,
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

  /* UI */
  return (
    <>
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

      <section className={styles.card}>
        <div className={styles.avatar}>
          {profileImgSrc ? (
            <img src={profileImgSrc} alt="프로필" className={styles.avatarImg} />
          ) : (
            <span className={styles.noImage}>NO IMAGE</span>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{nickname}</h3>
            <button className={styles.editBtn} onClick={openEdit}>
              ✏️ 수정
            </button>
          </div>
          <p className={styles.email}>{email}</p>
        </div>

        {/* 내 정보 관리 진입 (한 줄 메뉴) */}
        <div
          className={styles.oneLineMenu}
          role="button"
          tabIndex={0}
          onClick={() => navigate("/mypage/me/edit")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate("/mypage/me/edit");
            }
          }}
        >
          <span className={styles.oneLineLabel}>내 정보 관리</span>
          {/*<span className={styles.oneLineArrow}>›</span>*/}
        </div>
      </section>

      {/* 수정 모달 */}
      <CommonModal isOpen={editOpen} onClose={closeEdit}>
        <div className={styles.modalBody}>
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
              e.target.value = ""; // 같은 파일 재선택 가능
            }}
          />

          {/* 원형 프로필 + 카메라 버튼 */}
          <div className={styles.modalAvatarWrap}>
            <div className={styles.modalAvatarCircle}>
              {editImages?.[0] ? (
                <img
                  src={URL.createObjectURL(editImages[0])}
                  alt="미리보기"
                  className={styles.modalAvatarImg}
                />
              ) : profileImgSrc ? (
                <img src={profileImgSrc} alt="프로필" className={styles.modalAvatarImg} />
              ) : (
                <span className={styles.noImage}>NO IMAGE</span>
              )}

              <button
                type="button"
                className={styles.modalCameraBtn}
                onClick={() => fileInputRef.current?.click()}
                aria-label="프로필 이미지 변경"
              >
                <svg className={styles.cameraIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.5 4.5 8.2 6H6.5A2.5 2.5 0 0 0 4 8.5v9A2.5 2.5 0 0 0 6.5 20h11A2.5 2.5 0 0 0 20 17.5v-9A2.5 2.5 0 0 0 17.5 6h-1.7l-1.3-1.5H9.5ZM12 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 닉네임 */}
          <div className={styles.modalNickArea}>
            <label className={styles.modalNickLabel}>닉네임</label>
            <Input
              value={editNickname}
              onChange={(e) => setEditNickname(e.target.value)}
              placeholder="닉네임"
              $error={!!editError}
              errorMessage={editError}
            />
          </div>

          {/* 버튼 */}
          <div className={styles.modalActions}>
            <Button onClick={closeEdit}>취소</Button>
            <Button variant="primary" onClick={handleSaveEdit} disabled={!canSave}>
              저장
            </Button>
          </div>
        </div>
      </CommonModal>
    </>
  );
}
