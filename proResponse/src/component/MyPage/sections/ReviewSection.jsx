// src/component/MyPage/sections/ReviewSection.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import * as SR from "../../Common/Review/Review.styled";
import starImg from "../../../assets/images/common/m_star.png";
import styles from "./ReviewSection.module.css";

const apiUrl = window.Env?.API_URL || "http://localhost:8080";

function toArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "string")
    return v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

function buildFileUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${apiUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

function normalizeReviews(raw = []) {
  const map = new Map();

  raw.forEach((r) => {
    const key =
      r?.reviewNo ??
      `${r?.nickname ?? "u"}_${r?.createDate ?? ""}_${r?.content ?? ""}`;

    const prev = map.get(key);
    const nextFilePaths = toArray(r?.filePaths).map(buildFileUrl).filter(Boolean);

    if (!prev) {
      map.set(key, {
        ...r,
        tagNames: toArray(r?.tagNames),
        filePaths: nextFilePaths,
      });
      return;
    }

    map.set(key, {
      ...prev,
      tagNames: Array.from(
        new Set([...(prev.tagNames || []), ...toArray(r?.tagNames)])
      ),
      filePaths: Array.from(new Set([...(prev.filePaths || []), ...nextFilePaths])),
    });
  });

  return Array.from(map.values());
}

function uniqByReviewNo(raw = []) {
  const map = new Map();
  raw.forEach((r) => {
    const key = r?.reviewNo ?? JSON.stringify(r);
    if (!map.has(key)) map.set(key, r);
  });
  return Array.from(map.values());
}

export default function ReviewSection({ loading, error, reviews }) {
  const [pageNo, setPageNo] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);
  const [moreError, setMoreError] = useState("");
  const [rawList, setRawList] = useState([]);

  useEffect(() => {
    setPageNo(1);
    setMoreError("");
    setRawList(Array.isArray(reviews) ? reviews : []);
  }, [reviews]);

  const list = useMemo(() => normalizeReviews(rawList), [rawList]);

  const canLoadMore = !loading && !error && list.length > 0 && !moreLoading;

  const handleLoadMore = async () => {
    const expertNo = Number(localStorage.getItem("userNo"));
    if (!expertNo) {
      setMoreError("전문가 정보를 확인할 수 없습니다.");
      return;
    }

    const nextPage = pageNo + 1;

    setMoreLoading(true);
    setMoreError("");

    try {
      const res = await axios.get(`${apiUrl}/api/reviews/expert/${expertNo}`, {
        params: { pageNo: nextPage },
      });

      const payload = res?.data?.data ?? res?.data;
      const next = payload?.list ?? payload?.content ?? payload?.data ?? payload ?? [];

      const nextArr = Array.isArray(next) ? next : [];
      if (nextArr.length === 0) {
        setMoreError("더 불러올 리뷰가 없습니다.");
        return;
      }

      setRawList((prev) => uniqByReviewNo([...prev, ...nextArr]));
      setPageNo(nextPage);
    } catch (e) {
      setMoreError(e?.response?.data?.message || "리뷰를 더 불러오지 못했습니다.");
    } finally {
      setMoreLoading(false);
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <h3 className={styles.title}>나에게 달린 리뷰</h3>
      </div>

      <div className={styles.scrollBox}>
        {loading && <div className={styles.text}>불러오는 중...</div>}

        {!loading && error && <div className={styles.text}>{error}</div>}

        {!loading && !error && list.length === 0 && (
          <div className={styles.text}>아직 등록된 리뷰가 없습니다.</div>
        )}

        {!loading && !error && list.length > 0 && (
          <div>
            {list.map((r, idx) => (
              <SR.ReviewContent key={r.reviewNo ?? idx}>
                <SR.UserInfo>
                  <SR.UserAvatar>
                    {r.profileImg ? (
                      <img
                        src={r.profileImg}
                        alt={r.nickname || "user"}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      (r.nickname || "익명").charAt(0)
                    )}
                  </SR.UserAvatar>

                  <SR.UserDetails>
                    <SR.UserName>{r.nickname || "익명"}</SR.UserName>
                    <SR.ReviewDate>{r.categoryName || ""}</SR.ReviewDate>
                  </SR.UserDetails>

                  <SR.UserDetails>
                    <SR.Rating>
                      <SR.StarImg src={starImg} alt="별점" />
                      {r.starScore}
                    </SR.Rating>
                    <SR.ReviewDate>{r.createDate || ""}</SR.ReviewDate>
                  </SR.UserDetails>
                </SR.UserInfo>

                {Array.isArray(r.filePaths) && r.filePaths.length > 0 && (
                  <SR.ImageGallery>
                    {r.filePaths.map((src, i) => (
                      <SR.ReviewImage key={`${src}_${i}`} src={src} alt="" />
                    ))}
                  </SR.ImageGallery>
                )}

                {r.content && (
                  <SR.ReviewText $collapsed={false}>{r.content}</SR.ReviewText>
                )}

                {Array.isArray(r.tagNames) && r.tagNames.length > 0 && (
                  <SR.TagList>
                    {r.tagNames.map((tag, i) => (
                      <SR.Tag key={`${tag}_${i}`}>#{tag}</SR.Tag>
                    ))}
                  </SR.TagList>
                )}
              </SR.ReviewContent>
            ))}

            <div style={{ padding: "10px 0 0" }}>
              {moreError && (
                <div className={styles.text} style={{ padding: 0 }}>
                  {moreError}
                </div>
              )}

              <button
                type="button"
                onClick={handleLoadMore}
                disabled={!canLoadMore}
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 10,
                  border: "1px solid #eee",
                  background: "#fff",
                  fontWeight: 700,
                  cursor: canLoadMore ? "pointer" : "not-allowed",
                  opacity: canLoadMore ? 1 : 0.6,
                }}
              >
                {moreLoading ? "불러오는 중..." : "다음 리뷰 보기"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
