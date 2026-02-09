// src/component/Address/PostcodeModal.jsx
import DaumPostcode from "react-daum-postcode";
import styles from "./PostcodeModal.module.css";

export default function PostcodeModal({ onClose, onSelect }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // 바깥 클릭만 닫히게
      >
        <div className={styles.header}>
          <span className={styles.title}>주소 검색</span>
          <button className={styles.closeBtn} type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <DaumPostcode
            onComplete={(data) => {
              onSelect?.(data);
              // 선택 후 자동 닫기 원하면:
              // onClose?.();
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
