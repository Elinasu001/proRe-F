import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ExpertInfo = styled.div`
  padding: 1rem 1rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ExpertDetails = styled.div`
  flex: 1;
`;

export const InfoList = styled.div`
  padding: 0 16px;
`;


export const ActionContainer = styled.div`
  padding: 0 1rem 1rem 1rem;
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const Col = styled.div`
  display: flex;
   flex-direction: column;
   gap:4px;
`;

export const Row = styled.div`
  display: flex;
  
`;

// 더보기 메뉴 스타일
export const MoreMenuWrapper = styled.div`
  position: relative;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 24px;
  color: #666;
  border-radius: 4px;
  
  &:hover {
    background: #f0f0f0;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 120px;
  overflow: hidden;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &.danger {
    color: #dc3545;
  }
`;