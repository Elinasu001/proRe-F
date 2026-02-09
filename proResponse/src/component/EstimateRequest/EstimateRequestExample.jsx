import { useState } from 'react';
import EstimateRequest from './EstimateRequest';
import { useNavigate } from "react-router-dom";

/**
 * EstimateRequest 사용 예제
 */
const EstimateRequestExample = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const expertInfo = {
    name: '홍길동'
  };

  const handleSubmit = (formData) => {
    //console.log('견적 요청 제출:', formData);

    
    alert('견적 요청이 전송되었습니다!');
    
    navigate(`/estimateUser`);
    
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>견적 요청 예제</h1>

      {/* 모달 형태로 사용 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>1. 모달 형태로 사용</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '12px 24px',
            background: '#0066ff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          견적 요청하기
        </button>

        <EstimateRequest
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          expertInfo={expertInfo}
          onSubmit={handleSubmit}
        />
      </div>

      {/* 페이지 형태로 사용 */}
      <div>
        <h2>2. 페이지 형태로 사용</h2>
        <div style={{
          border: '2px solid #e0e0e0',
          borderRadius: '12px',
          overflow: 'hidden',
          marginTop: '20px'
        }}>
          <EstimateRequest
            expertInfo={expertInfo}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EstimateRequestExample;
