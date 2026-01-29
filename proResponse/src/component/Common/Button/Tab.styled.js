import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid var(--secondary);
`;

export const Tab = styled.button`
  width:100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  background: none;
  border: none;
  color: ${props => props.$active ? 'var(--primary)' : 'var(--color-6d)'};
  border-bottom: 3px solid ${props => props.$active ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: var(--primary);
  }
`;