import styled from 'styled-components';

export const Button = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    font-size: var(--font16);
    cursor: pointer;
    transition: all 0.3s;
    border: none;
    width: ${props => props.fullWidth ? '100%' : 'auto'};

    ${props => {
        switch (props.variant) {
        case 'primary':
            return `
            background-color: var(--primary);
            color: white;
            
            &:hover {
                background-color: #0056b3;
            }
            `;
        case 'outline':
            return `
            background-color: white;
            color: var(--primary);
            border: 1px solid var(--primary);
            
            &:hover {
                background-color: #f8f9fa;
            }
            `;
        default:
            return `
            background-color: #f0f0f0;
            color: var(--color-6d);
            
            &:hover {
                background-color: #e0e0e0;
            }
            `;
        }
    }}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;