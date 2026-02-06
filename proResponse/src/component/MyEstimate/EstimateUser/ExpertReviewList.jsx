import React from "react";
import ReviewItem from "../../Common/Review/ReviewItem";

const ExpertReviewList = ({ reviews, loading }) => {
  if (loading) return <p>리뷰 로딩 중...</p>;
  if (!reviews.length) return <p>리뷰가 없습니다.</p>;

  return (
    <>
      {reviews.map((review, idx) => (
        <ReviewItem key={idx} review={review} />
      ))}
    </>
  );
};

export default ExpertReviewList;
