import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Title = styled.h2`
  margin: 0 0 32px 0;
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const CardGrid = styled.div`
  display: grid;
  gridTemplateColumns: repeat(2, 1fr);
  gap: 24px;
`;

export const Card = styled.div`
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
    border-color: #0d6efd;
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const CardDescription = styled.p`
  margin: 0;
  font-size: 16px;
  color: #6c757d;
  line-height: 1.5;
`;