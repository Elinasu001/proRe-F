import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.4;
`;


export const Notice = styled.div`
  background-color: #f8f9fa;
  padding: 12px 16px;
  border-radius: 8px;
  color: var(--color-6d);
  font-size: 14px;
`;

export const ReservationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
`;

export const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const PageNumber = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  min-width: 36px;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#f8f9fa'};
  }
`;

export const Ellipsis = styled.span`
  padding: 8px 4px;
  color: #999;
`;