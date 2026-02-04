import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Title = styled.h2`
  margin: 0 0 24px 0;
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const SearchSection = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
`;

export const SearchRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  flex: 1;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #0b5ed7;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Th = styled.th`
  padding: 12px;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  text-align: center;
  font-weight: 600;
  color: #495057;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  text-align: center;
  color: #212529;
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  margin: 0 4px;
  background: ${props => props.variant === 'danger' ? '#dc3545' : '#28a745'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.variant === 'danger' ? '#c82333' : '#218838'};
  }
`;

export const Pagination = styled.div`
  margin-top: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const PageButton = styled.button`
  padding: 8px 12px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #0d6efd;
    color: white;
    border-color: #0d6efd;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  font-weight: 500;
  color: #495057;
`;