// src/component/MyPage/sections/CashSummary.jsx
import styles from "./CashSummary.module.css";

const formatCash = (v) => {
  try {
    return Number(v || 0).toLocaleString("ko-KR");
  } catch {
    return "0";
  }
};

export default function CashSummary({ loading, error, balance }) {
  if (loading) {
    return <section className={styles.card}>보유 캐시 불러오는 중...</section>;
  }

  if (error) {
    return <section className={styles.card}>{error}</section>;
  }

  return (
    <section className={styles.card}>
      <div>
        <div className={styles.label}>보유 캐시</div>
        <div className={styles.value}>{formatCash(balance)}원</div>
      </div>
      <div className={styles.icon}>💰</div>
    </section>
  );
}
