import ReviewViewModal from './ReviewViewModal';
import ReviewWriteModal from './ReviewWriteModal';
import useReviewModal from './useReviewModal';

/**
 * 리뷰 모달 사용 예제 컴포넌트
 */
const ReviewModalExample = () => {
  // useReviewModal 훅 사용
  const {
    viewModal,
    writeModal,
    openViewModal,
    openWriteModal,
    closeModals,
  } = useReviewModal();

  // 샘플 리뷰 데이터
  const sampleReview = {
    userName: '박바라',
    date: '2주 전',
    rating: 5.0,
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300',
    ],
    text: '이번에 이사를 진행하게 됐을 때 민준스러운 정말로 해주셔 정정 기쁘던 추가를 남겨드립니다. 자랑 이사 당일엔 에어키 팀장 사업으로 같게 대가 상업이 3시간이나 빌려주시는 등비 상생의 너무 자연사러면 안졸를 리뷰를 작잏ね 정서와 주시며 조언내 기대면 주석여 조력써 오히려 저로 추석이 지로 안친시기',
    tags: ['직접 숙달가 뻘쯤요', '정말과 느허항가 없어요', '응대가 친절해요', '상담이 자세해요'],
  };

  // 태그 옵션
  const tagOptions = [
    '정말과 느허항가 없어요',
    '사건을 잘 자세요',
    '응대가 친절해요',
    '외시스톤이 합격해요',
    '상담이 자세해요',
  ];

  // ============================================
  // 이벤트 핸들러
  // ============================================

  /**
   * 리뷰 보기 모달 열기
   */
  const handleOpenViewModal = () => {
    openViewModal(
      sampleReview,
      // 삭제 콜백
      () => {
        console.log('리뷰 삭제');
        closeModals();
      },
      // 확인 콜백
      () => {
        console.log('확인 클릭');
        closeModals();
      }
    );
  };

  /**
   * 리뷰 작성 모달 열기
   */
  const handleOpenWriteModal = () => {
    openWriteModal(
      tagOptions,
      // 제출 콜백
      (reviewData) => {
        console.log('제출된 리뷰:', reviewData);
        alert('리뷰가 제출되었습니다!');
        closeModals();
      }
    );
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>리뷰 모달 컴포넌트 사용 예제</h1>

      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginTop: '32px',
        flexWrap: 'wrap'
      }}>
        {/* 리뷰 조회 모달 열기 */}
        <button
          onClick={handleOpenViewModal}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: '#0066ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
           내가 보낸 후기 보기
        </button>

        {/* 리뷰 작성 모달 열기 */}
        <button
          onClick={handleOpenWriteModal}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: '#0066ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          후기 보내기
        </button>
      </div>

      {/* 사용 방법 설명 */}
      <div style={{ 
        marginTop: '48px',
        padding: '24px',
        background: '#f8f9fa',
        borderRadius: '12px'
      }}>
        <h2> 사용 방법</h2>
        
        <h3>1. 기본 import</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`import ReviewViewModal from './ReviewViewModal';
import ReviewWriteModal from './ReviewWriteModal';
import useReviewModal from './useReviewModal';`}
        </pre>

        <h3>2. useReviewModal 훅 사용</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`const {
  viewModal,
  writeModal,
  openViewModal,
  openWriteModal,
  closeModals,
} = useReviewModal();`}
        </pre>

        <h3>3. 리뷰 조회 모달 열기</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`openViewModal(
  reviewData,  // 리뷰 데이터
  handleDelete, // 삭제 콜백 (선택)
  handleConfirm // 확인 콜백
);`}
        </pre>

        <h3>4. 리뷰 작성 모달 열기</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`openWriteModal(
  tagOptions,   // 태그 옵션 배열
  handleSubmit  // 제출 콜백
);`}
        </pre>

        <h3>5. JSX에서 사용</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`<ReviewViewModal {...viewModal} />
<ReviewWriteModal {...writeModal} />`}
        </pre>
      </div>

      {/* 리뷰 모달들 */}
      <ReviewViewModal {...viewModal} />
      <ReviewWriteModal {...writeModal} />
    </div>
  );
};

export default ReviewModalExample;
