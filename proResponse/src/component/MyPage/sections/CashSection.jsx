// src/component/MyPage/sections/CashSection.jsx
import Alert from "../../Common/Alert/Alert.jsx";
import useAlert from "../../Common/Alert/useAlert";

import styles from "./CashSection.module.css";

export default function CashSection({ loading, error }) {
  const { alertState, openAlert, closeAlert } = useAlert();

  if (loading) {
    return <section className={styles.card}>불러오는 중...</section>;
  }

  if (error) {
    return <section className={styles.card}>{error}</section>;
  }

  const openTemp = (title) =>
    openAlert({
      title,
      message: "해당 기능은 추후 연결 예정입니다.",
      onConfirm: closeAlert,
    });

  return (
    <>
      <Alert {...alertState} />

      <section className={styles.card}>
        {/* ✅ 타이틀 유지 */}
        <h3 className={styles.title}>내 캐시</h3>

        {/* 메뉴 리스트 */}
        <ul className={styles.menuList}>
          <li
            className={styles.menuItem}
            onClick={() => openTemp("충전하기")}
          >
            <span>충전하기</span>
            <span className={styles.arrow}>›</span>
          </li>

          <li
            className={styles.menuItem}
            onClick={() => openTemp("이용내역")}
          >
            <span>이용내역</span>
            <span className={styles.arrow}>›</span>
          </li>

          <li
            className={styles.menuItem}
            onClick={() => openTemp("환불하기")}
          >
            <span>환불하기</span>
            <span className={styles.arrow}>›</span>
          </li>
        </ul>
      </section>
    </>
  );
}
