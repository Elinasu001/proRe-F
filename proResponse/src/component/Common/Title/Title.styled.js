import styled from 'styled-components';

export const LogoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: inherit;
  margin:40px 0 40px 0;
`;

export const MainLine = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-3);
  line-height: 1.2;
`;

export const Highlight = styled.span`
  color: var(--primary);
  font-weight: 700;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: inherit;
  margin-bottom: 16px;
`;

export const SubLine = styled.div`
  font-size: var(--font16); 
  color: var(--color-3);
  margin-top: 8px;
`;

export const SubHighlight = styled.span`
  font-size: var(--font18); 
  color: var(--primary);
  font-weight: 700;
`;