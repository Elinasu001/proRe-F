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
  const sampleReview = {
    profileImg: '',
    nickname: '홍길동',
    createdAgo: '1시간 전',
    starScore: 5,
    attachments: [
      { filePath: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', originName: '샘플1.jpg' },
      { filePath: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', originName: '샘플2.jpg' }
    ],
    content: '이 전문가 정말 친절하고 실력도 좋아요!',
    selectedTags: [
      { tagName: '친절함' },
      { tagName: '전문성' }
    ]
  };

  // ============================================
  // 이벤트 핸들러
  // ============================================

  /**
   * 리뷰 보기 모달 열기
   */
  const handleOpenViewModal = () => {
    openViewModal(
      sampleReview, // sampleReview
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
      // 제출 콜백 - 작성 완료 후 조회 모달로 전환
      (reviewData) => {
        console.log('제출된 리뷰:', reviewData);
        // 작성된 리뷰 데이터를 조회 모달로 표시
        const submittedReview = {
          profileImg: '',
          nickname: '나',
          createdAgo: '방금 전',
          starScore: reviewData.starScore,
          attachments: reviewData.images?.map((img, idx) => ({
            filePath: img.preview || img,
            originName: `이미지${idx + 1}.jpg`
          })) || [],
          content: reviewData.text,
          selectedTags: reviewData.tags?.map(tagValue => ({ tagName: tagValue })) || []
        };
        // 조회 모달 열기
        openViewModal(
          submittedReview,
          () => {
            console.log('리뷰 삭제');
            closeModals();
          },
          () => {
            console.log('확인 클릭');
            closeModals();
          }
        );
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
import useReviewModal from './useReviewModal';
import useReportModal from '../../../ChatRoom/Report/useReportModal.js';`}
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
      <ReviewViewModal
        isOpen={viewModal.isOpen}
        review={viewModal.data}
        onClose={closeModals}
        onConfirm={viewModal.onConfirm || closeModals}
        onDelete={viewModal.onDelete || closeModals}
      />
      <ReviewWriteModal {...writeModal} onClose={closeModals} />
    </div>
  );
};

export default ReviewModalExample;