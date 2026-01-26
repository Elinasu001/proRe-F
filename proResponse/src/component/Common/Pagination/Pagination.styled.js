import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
`;

export const PageButton = styled.button`
    min-width: 40px;
    height: 40px;
    border: 1px solid ${props => props.$active ? '#3b82f6' : '#e5e7eb'};
    background-color: ${props => props.$active ? '#3b82f6' : 'white'};
    color: ${props => props.$active ? 'white' : '#6b7280'};
    border-radius: 8px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
    transition: all 0.2s ease;
    font-weight: ${props => props.$active ? '600' : '500'};
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
        background-color: ${props => props.$active ? '#2563eb' : '#f3f4f6'};
        border-color: ${props => props.$active ? '#2563eb' : '#d1d5db'};
    }

    i {
        font-size: 14px;
    }
`;
