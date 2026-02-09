
import { useState } from 'react';
import ExpertDetailModal from './ExpertDetailModal';
import useExpertDetailModal from './useExpertDetailModal';
import dummyExpertBasicInfo from "../../../Common/dummy/dummyExpertBasicInfo.js";

/**
 * 전문가 상세 모달 사용 예제 컴포넌트
 */
const ExpertDetailModalExample = () => {
  // useExpertDetailModal 훅 사용
  const { modalState, openModal, closeModal } = useExpertDetailModal();

  // 찜하기 상태 (실제로는 전역 상태나 API로 관리)
  const [favorites, setFavorites] = useState([]);

    // 더미 전문가 데이터 적용
  // 더미 전문가 데이터 적용 (구조에 맞게 data만 추출)
  const sampleExpert = { expertNo: 1, ...dummyExpertBasicInfo[0].data };

  // ============================================
  // 이벤트 핸들러
  // ============================================

  /**
   * 전문가 상세 보기 열기
   */
  const handleOpenExpertDetail = () => {
    // 찜하기 상태를 expert 데이터에 포함
    const expertWithFavorite = {
      ...sampleExpert,
      userLiked: favorites.includes(sampleExpert.expertNo),
    };
    openModal(expertWithFavorite);
  };

  /**
   * 찜하기 토글
   */
  const handleToggleFavorite = (expertNo) => {
    setFavorites(prev => {
      if (prev.includes(expertNo)) {
        // 찜 해제
        return prev.filter(id => id !== expertNo);
      } else {
        // 찜 추가
        return [...prev, expertNo];
      }
    });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>전문가 상세 모달 컴포넌트 사용 예제</h1>

      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginTop: '32px',
        flexWrap: 'wrap'
      }}>
        {/* 전문가 상세 보기 열기 */}
        <button
          onClick={handleOpenExpertDetail}
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
          🔍 전문가 상세 보기
        </button>
      </div>

      {/* 현재 찜 목록 */}
      <div style={{ 
        marginTop: '24px',
        padding: '16px',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h3>현재 찜한 전문가: {favorites.length}명</h3>
        <p>
          {favorites.length > 0 
            ? `전문가 No: ${favorites.join(', ')}`
            : '찜한 전문가가 없습니다.'}
        </p>
      </div>

      {/* 사용 방법 설명 */}
      <div style={{ 
        marginTop: '48px',
        padding: '24px',
        background: '#f8f9fa',
        borderRadius: '12px'
      }}>
        <h2>사용 방법</h2>
        
        <h3>1. 기본 import</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`import ExpertDetailModal from './ExpertDetailModal';
import useExpertDetailModal from './useExpertDetailModal';`}
        </pre>

        <h3>2. useExpertDetailModal 훅 사용</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`const { modalState, openModal, closeModal } = useExpertDetailModal();`}
        </pre>

        <h3>3. 전문가 데이터 구조</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`const data = {
  expertNo: 1,
  nickName: '홍길동 전문가',
  profileImg: 'https://via.placeholder.com/100',
  starScore: 4.9,
  reviewCount: 230,
  totalLike: 3,
  completedJobs: 87,
  address: '서울특별시 강남구',
  career: '10년',
  startTime: '오후 11시',
  endTime: '오후 11시',
  content: '서비스 설명...',
  images: ['url1', 'url2', 'url3'],
  userLiked: false
};`}
        </pre>

        <h3>4. 모달 열기</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`openModal(expertData);`}
        </pre>

        <h3>5. JSX에서 사용</h3>
        <pre style={{ 
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`<ExpertDetailModal
  isOpen={modalState.isOpen}
  data={modalState.data}
  onClose={closeModal}
  onToggleFavorite={handleToggleFavorite}
/>`}
        </pre>

        <h3>6. 주요 기능</h3>
        <ul>
          <li> 전문가 프로필 정보 표시</li>
          <li> 별점 및 리뷰 수 표시</li>
          <li> 고용 횟수, 위치, 경력, 연락 가능 시간 표시</li>
          <li> 찜하기 토글 기능</li>
          <li> 상세 설명 / 리뷰 탭 전환</li>
          <li> 서비스 상세 설명</li>
          <li> 이미지 갤러리 (메인 이미지 + 썸네일 4개)</li>
          <li> 썸네일 클릭으로 메인 이미지 변경</li>
          <li> ESC 키 및 오버레이 클릭으로 닫기</li>
          <li> 반응형 디자인</li>
        </ul>
      </div>

      {/* 전문가 상세 모달 */}
      <ExpertDetailModal
        isOpen={modalState.isOpen}
        expert={{
          ...modalState.expert,
          userLiked: modalState.expert ? favorites.includes(modalState.expert.expertNo) : false
        }}
        onClose={closeModal}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default ExpertDetailModalExample;
