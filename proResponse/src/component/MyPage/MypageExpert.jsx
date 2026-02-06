// src/component/MyPage/MypageExpert.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";

/* sections */
import ProfileSection from "./sections/ProfileSection.jsx";
import CashSummary from "./sections/CashSummary.jsx";
import CashSection from "./sections/CashSection.jsx";
import ReviewSection from "./sections/ReviewSection.jsx";

import styles from "./MypageExpert.module.css";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

export default function MypageExpert() {
  /* =========================
     1) Auth
  ========================= */
  const { auth, logout } = useAuth();

  /* =========================
     2) 캐시 상태
  ========================= */
  const [myCash, setMyCash] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     3) 리뷰 상태
  ========================= */
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewPageInfo, setReviewPageInfo] = useState(null);

  /* =========================
     4) 캐시 조회 (1회)
  ========================= */
  useEffect(() => {
    if (!auth?.accessToken) return;

    const getCash = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(`${apiUrl}/api/cash/me`);
        setMyCash(res?.data?.data ?? res?.data);
      } catch (err) {
        const status = err?.response?.status;

        if (status === 401) {
          logout();
          return;
        }

        setError(err?.response?.data?.message || "캐시 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getCash();
  }, [auth?.accessToken, logout]);

  /* =========================
     5) 리뷰 조회 (1회)
  ========================= */
  useEffect(() => {
  if (!auth?.accessToken) return;

  const expertNo =
    auth?.currentUser?.userNo ||
    auth?.user?.userNo ||
    auth?.userNo ||
    Number(localStorage.getItem("userNo"));

  if (!expertNo) return;

  const getReviews = async () => {
    setReviewLoading(true);
    setReviewError("");

    try {
      const res = await axios.get(`${apiUrl}/api/reviews/expert/${expertNo}`, {
        params: { pageNo: 1 },
      });

      const payload = res?.data?.data;
      const list = payload?.list ?? payload?.content ?? [];
      const pi = payload?.pageInfo ?? payload?.pi ?? null;

      setReviews(Array.isArray(list) ? list : []);
      setReviewPageInfo(pi);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        logout();
        return;
      }
      setReviewError(err?.response?.data?.message || "리뷰를 불러오지 못했습니다.");
    } finally {
      setReviewLoading(false);
    }
  };

  getReviews();
}, [auth?.accessToken, auth, logout]);

  /* =========================
     6) 잔액 가공
  ========================= */
  const cashBalance = Number(myCash ?? 0);

  /* =========================
     7) UI
  ========================= */
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>마이페이지</h1>
      </div>

      <div className={styles.topGrid}>
        <ProfileSection />
        <CashSummary loading={loading} error={error} balance={cashBalance} />
      </div>

      <div className={styles.block}>
        <CashSection loading={loading} error={error} balance={cashBalance} />
      </div>

      <div className={styles.block}>
        <ReviewSection
          loading={reviewLoading}
          error={reviewError}
          reviews={reviews}
          pageInfo={reviewPageInfo}
        />
      </div>
    </div>
  );
}
