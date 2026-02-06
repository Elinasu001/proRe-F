import { useState } from "react";
import PostcodeModal from "../Address/PostcodeModal";
import Button from "../Common/Button/Button";
import Input from "../Common/Input/Input";
import axios from "axios";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

/*
 * - 생년월일 / 성별(토글) / 주소찾기 / 주소 / 상세주소
 */
export default function Step2({ form, onChange }) {
  const [open, setOpen] = useState(false);

  /* 생년월일 입력 */
  const handleBirthDate = (e) => {
    const onlyNum = e.target.value.replace(/\D/g, "").slice(0, 8);
    onChange("birthday", onlyNum);
  };

  /* 성별 토글 */
  const selectGender = (value) => {
    onChange("gender", value); /* "M" | "F" */
  };

  const onSearchAddress = () => {
    setOpen(true);
  };

const handleSelectAddress = async (data) => {
 
  const zipCode = data?.zipCode ?? data?.zonecode ?? "";
  const address  = data?.address ?? data?.roadAddress ?? data?.jibunAddress ?? "";

  // 1) 우편번호/주소 반영
  onChange("zipCode", zipCode);
  onChange("address", address);

  // 2) 좌표 초기화
  onChange("lat", "");
  onChange("lng", "");

  if (!address) {
    alert("주소가 비어있습니다. 다시 선택해 주세요.");
    return;
  }

  try {
    const res = await axios.get(`${apiUrl}/api/geo/geocode`, {
      params: { query: address },
    });

    // 공통 응답 포맷 기준
    const lat = res?.data?.data?.lat;
    const lng = res?.data?.data?.lng;

    if (!lat || !lng) {
      console.error("지오코딩 응답:", res?.data);
      alert("좌표 변환에 실패했습니다. 주소를 다시 선택해 주세요.");
      return;
    }

    onChange("lat", lat);
    onChange("lng", lng);
  } catch (e) {
    console.error("지오코딩 실패:", e?.response?.data || e);
    alert("좌표 변환에 실패했습니다. 잠시 후 다시 시도해 주세요.");
  }
};


  /* 렌더링 */
  return (
    <div className="step step-2">
      {/* 생년월일 */}
      <Input
        label="생년월일"
        type="text"
        value={form.birthday}
        onChange={handleBirthDate}
        placeholder="YYYYMMDD"
      />

      {/* 성별 */}
      <div className="gender-row">
        <div className="label">성별</div>

        <div className="gender-buttons">
          <Button
            type="button"
            onClick={() => selectGender("M")}
            aria-pressed={form.gender === "M"}
          >
            남
          </Button>

          <Button
            type="button"
            onClick={() => selectGender("F")}
            aria-pressed={form.gender === "F"}
          >
            여
          </Button>
        </div>
      </div>

      {/* 우편번호 */}
      <Input
        label="우편번호"
        type="text"
        value={form.zipCode}
        onChange={(e) => onChange("zipCode", e.target.value)}
        placeholder="주소찾기로 자동 입력"
        readOnly
      />

      {/* 주소 + 주소찾기 */}
      <div className="row">
        <Input
          label="주소"
          type="text"
          value={form.address}
          onChange={(e) => onChange("zipCode", e.target.value)}
          placeholder="주소를 입력하거나 찾아보기를 눌러주세요"
          readOnly
        />

        <Button type="button" onClick={onSearchAddress}>
          주소찾기
        </Button>
      </div>

      {/* 상세주소 */}
      <Input
        label="상세주소"
        type="text"
        value={form.addressDetail}
        onChange={(e) => onChange("addressDetail", e.target.value)}
        placeholder="상세주소 입력"
      />

      {open && (
        <PostcodeModal
          onClose={() => setOpen(false)}
          onSelect={handleSelectAddress}
        />
      )}
    </div>
  );
}
