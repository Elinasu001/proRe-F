import styled from 'styled-components';


// ===================================
// ReviewWriteModal 스타일
// ===================================

// 작성 폼 컨테이너
export const WriteContent = styled.div`
  padding: 24px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// 별점 선택 섹션
export const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

// 별
export const Star = styled.button`
  background: none;
  border: none;
  width: 54px;
  cursor: pointer;
  transition: all 0.2s;
  filter: ${props => props.$filled ? 'grayscale(0%)' : 'grayscale(100%)'};
  opacity: ${props => props.$filled ? '1' : '0.2'};
  
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

export const StarImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const DelImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;


// 태그 선택 섹션
export const TagSelectSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

// 선택 가능한 태그
export const SelectableTag = styled.button`
  padding: 8px 16px;
  background: ${props => props.$selected ? 'var(--primary)' : '#f5f5f5'};
  color: ${props => props.$selected ? '#fff' : '#666'};
  border: none;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$selected ? 'var(--primary)' : '#e8e8e8'};
  }
`;