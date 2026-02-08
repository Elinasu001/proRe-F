import { useEffect, useMemo, useRef } from "react";
import Button from "../Common/Button/Button";
import Input from "../Common/Input/Input";

/*
 * Step3
 * - 프로필 이미지 업로드
 * - 닉네임 입력
 */
export default function Step3({ form, onChange }) {

  /*
   * 파일 input DOM을 직접 제어하기 위한 ref
   */
  const fileRef = useRef(null);

  /* 
   * 파일 선택 시 실행되는 핸들러
   */
  const handlePickImage = (e) => {
    const file = e.target.files?.[0] || null;

    // 부모 상태 업데이트
    onChange("profileImageFile", file);

    /*
     * 같은 파일을 다시 선택해도
     * onChange가 다시 실행되도록 value 초기화
     */
    e.target.value = "";
  };

  const openFilePicker = () => {
    fileRef.current?.click();
  };

  /* 
   * 이미지 미리보기 URL 생성
   */
  const previewUrl = useMemo(() => {
    if (!form.profileImageFile) return null;
    return URL.createObjectURL(form.profileImageFile);
  }, [form.profileImageFile]);


  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  /* 
   * 화면 렌더링
   */
  return (
    <div className="step step-3">
      {/* 프로필 이미지 영역 */}
      <div className="profile-image-area">

        {/* 실제 파일 input (화면에서는 숨김) */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handlePickImage}
          style={{ display: "none" }}
        />

        {/* 동그란 프로필 미리보기 영역 */}
        <div className="circle">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="프로필 미리보기"
              className="profile-preview"
            />
          ) : (
            <div className="placeholder">+</div>
          )}
        </div>

        {/* 파일 선택 버튼 */}
        <Button type="button" onClick={openFilePicker}>
          이미지 선택
        </Button>
      </div>

      {/* 닉네임 입력 */}
      <Input
        label="닉네임"
        type="text"
        value={form.nickname}
        onChange={(e) => onChange("nickname", e.target.value)}
        placeholder="사용할 닉네임을 입력하세요"
      />
    </div>
  );
}
