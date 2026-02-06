import { useEffect, useMemo, useRef } from "react";
import Button from "../Common/Button/Button";
import Input from "../Common/Input/Input";

/*
 * Step3
 * - 프로필 이미지 업로드
 * - 닉네임 입력
 *
 * 핵심 포인트
 * 1) file input은 화면에 숨긴다
 * 2) 버튼 클릭 시 input.click()으로 파일 선택창을 연다
 * 3) 선택된 파일(File 객체)은 부모(SignUp)의 form 상태에 저장한다
 * 4) URL.createObjectURL 로 미리보기를 만든다
 */
export default function Step3({ form, onChange }) {

  /* ==================================================
   * 파일 input DOM을 직접 제어하기 위한 ref
   * --------------------------------------------------
   * label로 감싸는 방식은
   * - styled Button
   * - z-index / position
   * 때문에 클릭이 안 먹는 경우가 많다.
   *
   * 그래서 input을 ref로 잡고
   * 버튼 클릭 시 input.click()을 직접 호출한다.
   * ================================================== */
  const fileRef = useRef(null);

  /* ==================================================
   * 파일 선택 시 실행되는 핸들러
   * --------------------------------------------------
   * e.target.files[0] :
   * - 사용자가 선택한 첫 번째 파일
   * - 없으면 null
   *
   * 선택된 File 객체를
   * 부모(SignUp)의 form.profileImageFile에 저장
   * ================================================== */
  const handlePickImage = (e) => {
    const file = e.target.files?.[0] || null;

    // 부모 상태 업데이트
    onChange("profileImageFile", file);

    /*
     * 같은 파일을 다시 선택해도
     * onChange가 다시 실행되도록 value 초기화
     * (이거 안 하면 같은 이미지 재선택 시 반응 없음)
     */
    e.target.value = "";
  };

  /* ==================================================
   * 버튼 클릭 → 파일 선택창 열기
   * --------------------------------------------------
   * 숨겨둔 input을 강제로 클릭
   * ================================================== */
  const openFilePicker = () => {
    fileRef.current?.click();
  };

  /* ==================================================
   * 이미지 미리보기 URL 생성
   * --------------------------------------------------
   * File 객체는 <img src>에 바로 못 씀
   * → 브라우저가 임시 URL을 만들어줘야 한다
   *
   * useMemo:
   * - profileImageFile이 바뀔 때만 URL 생성
   * ================================================== */
  const previewUrl = useMemo(() => {
    if (!form.profileImageFile) return null;
    return URL.createObjectURL(form.profileImageFile);
  }, [form.profileImageFile]);

  /* ==================================================
   * 메모리 누수 방지
   * --------------------------------------------------
   * createObjectURL로 만든 URL은
   * 사용 끝나면 반드시 revoke 해야 한다
   * ================================================== */
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  /* ==================================================
   * 화면 렌더링
   * ================================================== */
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
