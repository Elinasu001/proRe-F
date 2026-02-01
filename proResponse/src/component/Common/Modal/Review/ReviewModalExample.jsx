import ReviewViewModal from './ReviewViewModal';
import ReviewWriteModal from './ReviewWriteModal';
import useReviewModal from './useReviewModal';

/**
 * 리뷰 모달 사용 예제 컴포넌트
 */
const ReviewModalExample = () => {
  // useReviewModal 훅에서 상태와 함수 모두 구조분해 할당
  const {
    viewModal,
    writeModal,
    openViewModal,
    openWriteModal,
    closeModals,
  } = useReviewModal();

  // 실제 더미 리뷰 데이터 적용
  // const sampleReview = dummyChatExportReview.data;

  // ============================================
  // 이벤트 핸들러
  // ============================================

  /**
   * 리뷰 보기 모달 열기
   */
  const handleOpenViewModal = () => {
    openViewModal(
      {}, // sampleReview
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
      [], // 빈 배열을 넘기면 ReviewWriteModal에서 API로 태그를 불러옴
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
        <h2>📖 사용 방법</h2>
        
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
      <ReviewWriteModal {...writeModal} onClose={closeModals} />
    </div>
  );
};

export default ReviewModalExample;