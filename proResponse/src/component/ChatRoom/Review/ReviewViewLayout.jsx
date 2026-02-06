import ReviewItem from '../../Common/Review/ReviewItem.jsx';

const ReviewViewLayout = ({ review, ...props }) => {
  return (
    <ReviewItem review={review} {...props} />
  );
};

export default ReviewViewLayout;
