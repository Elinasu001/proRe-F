import { useEffect, useState } from "react";
import * as S from "./ExpertDetailModal.styled";
import ExportCardItem from "../../ExportCards/ExportCardItem.jsx";
import ExpertDetail from "../../Export/ExportDetail.jsx";
import dummyExpertBasicInfo from "../../../Common/dummy/dummyExpertBasicInfo.js";
import ExportBasicInfo from "../../Export/ExportBasicInfo.jsx";
import { axiosPublic } from "../../../../api/reqApi.js";
import * as SR from "../../Review/Review.styled.js";

/**
 * ExpertDetailModal - 전문가 상세 정보 모달
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Object} props.data - 전문가 데이터
 * @param {function} props.onClose - 닫기 콜백
 * @param {function} props.onEstimate - 상세 설명 버튼 클릭 콜백
 * @param {function} props.onToggleFavorite - 찜하기 토글 콜백
 */

const ExpertDetailModal = ({ isOpen, onClose, expert }) => {
  const data = expert || dummyExpertBasicInfo[0];
  const [activeTab, setActiveTab] = useState("detail"); // 'detail' or 'review'
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  /**
   * ESC 키로 모달 닫기
   */
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  /**
   * 배경 스크롤 방지
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /**
   * 모달이 열릴 때 선택된 이미지 인덱스 초기화
   */
  useEffect(() => {
    if (isOpen) {
      setSelectedImageIndex(0);
      setActiveTab("detail");
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeTab === "review") return;
    setLoadingReviews(true);
    axiosPublic
      .getList(`/api/reviews/expert/${data.expertNo}`)
      .then(
        (res) => {
          console.log(res.data);
          setReviews(res.data.list);
        },
        [activeTab, data.expertNo],
      )
      .catch((err) => {
        console.error("리뷰 불러오기 실패", err);
        setReviews([]);
      })
      .finally(() => setLoadingReviews(false));
  }, [activeTab, data.expertNo]);

  /**
   * 오버레이 클릭 시 닫기
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !data) return null;

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="expert-detail-title"
      >
        {/* 헤더 */}
        <S.ModalHeader>
          <div>
            <S.ModalTitle id="expert-detail-title">상세보기</S.ModalTitle>
            <S.ModalSubtitle>전문가님의 정보를 확인해보세요.</S.ModalSubtitle>
          </div>
          <S.CloseButton onClick={onClose} aria-label="닫기">
            ✕
          </S.CloseButton>
        </S.ModalHeader>

        {/* 스크롤 가능한 컨텐츠 */}
        <S.ScrollContent>
          {/* 전문가 정보 헤더 */}
          <S.ExpertHeader>
            <ExportBasicInfo data={expert} />
          </S.ExpertHeader>

          {/* 탭 버튼 */}
          <S.TabButtons>
            <S.TabButton
              $isActive={activeTab === "detail"}
              onClick={() => setActiveTab("detail")}
            >
              상세 설명
            </S.TabButton>
            <S.TabButton
              $isActive={activeTab === "review"}
              onClick={() => setActiveTab("review")}
            >
              리뷰 {data.reviewCount}
            </S.TabButton>
          </S.TabButtons>

          {activeTab === "detail" ? (
            <ExpertDetail
              data={data}
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
            />
          ) : (
            <SR.ReviewContent>
              {loadingReviews ? (
                <p>리뷰 로딩 중...</p>
              ) : reviews.length === 0 ? (
                <p>리뷰가 없습니다.</p>
              ) : (
                reviews.map((r, idx) => (
                  <div key={idx} style={{ marginBottom: "24px" }}>
                    {/* 사용자 정보 */}
                    <SR.UserInfo>
                      <SR.UserAvatar>
                        {r.profileImg ? (
                          <img
                            src={r.profileImg}
                            alt={r.nickname}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          r.nickname?.charAt(0) || "U"
                        )}
                      </SR.UserAvatar>

                      <SR.UserDetails>
                        <SR.UserName>{r.nickname}</SR.UserName>
                        <SR.ReviewDate>{r.categoryName}</SR.ReviewDate>
                        <SR.ReviewDate>{r.createDate}</SR.ReviewDate>
                      </SR.UserDetails>

                      <SR.Rating>⭐ {r.starScore}</SR.Rating>
                    </SR.UserInfo>

                    {/* 이미지 */}
                    {r.filePaths?.length > 0 && (
                      <SR.ImageGallery>
                        {r.filePaths.map((img, i) => (
                          <SR.ReviewImage
                            key={i}
                            src={img}
                            alt={`리뷰 이미지 ${i + 1}`}
                          />
                        ))}
                      </SR.ImageGallery>
                    )}

                    {/* 리뷰 내용 */}
                    <SR.ReviewText>{r.content}</SR.ReviewText>

                    {/* 태그 */}
                    {r.tagNames?.length > 0 && (
                      <SR.TagList>
                        {r.tagNames.map((tag, i) => (
                          <SR.Tag key={i}>#{tag}</SR.Tag>
                        ))}
                      </SR.TagList>
                    )}
                  </div>
                ))
              )}
            </SR.ReviewContent>
          )}
        </S.ScrollContent>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ExpertDetailModal;
