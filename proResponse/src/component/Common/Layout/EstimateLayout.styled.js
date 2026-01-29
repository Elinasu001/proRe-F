import styled from 'styled-components';


export const EstimateContent = styled.div`
    background-color: #F4F6F8;
    flex: 1;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    @media (max-width: 900px) {
        flex-direction: column;
        gap: 16px;
    }
`;

export const LeftContent = styled.aside`
    padding-top:30px;
    flex: 3 1 0%;
    min-width: 0;
    border-radius: 12px;
    /* box-shadow: 0 2px 8px rgba(0,0,0,0.04); */
    @media (max-width: 900px) {
        flex: none;
        width: 100%;
        order: 2;
    }
    /* 웹 접근성 */
    &[aria-label] {
        outline: none;
    }
`;

export const RightContent = styled.section`
    padding-top:30px;
    background-color: var(--white);
    flex: 7 1 0%;
    min-width: 0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    @media (max-width: 900px) {
        flex: none;
        width: 100%;
        order: 1;
    }
    /* 웹 접근성 */
    &[aria-label] {
        outline: none;
    }
`;

export const Section = styled.section`
    padding: 20px;
`;

export const CardSection = styled.section`
    padding: 20px 20px 50px 20px;      
`;