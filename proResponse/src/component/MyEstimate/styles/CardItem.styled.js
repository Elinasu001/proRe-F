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