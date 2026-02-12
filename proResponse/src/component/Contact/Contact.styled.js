import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px;
`;

export const PageTitle = styled.h2`
  font-size: var(--font38);
  font-weight: 700;
  color: var(--color-2);
  text-align: center;
`;

export const PageSubTitle = styled.p`
  font-size: var(--font16);
  color: var(--color-6d);
  text-align: center;
  margin-top: 12px;
  margin-bottom: 56px;
`;

/* ── 스텝 카드 공통 ── */
export const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export const StepCard = styled.div`
  background: #f8f9fb;
  border-radius: 16px;
  padding: 32px 36px;
  border-left: 5px solid ${({ color }) => color || '#4F9CF9'};
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
`;

export const StepBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ color }) => color || '#4F9CF9'};
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
`;

export const StepTitle = styled.h3`
  font-size: var(--font20);
  font-weight: 700;
  color: var(--color-2);
`;

export const StepRole = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: ${({ color }) => color || '#4F9CF9'};
  padding: 3px 10px;
  border-radius: 20px;
`;

/* ── 플로우 (화살표로 연결된 단계) ── */
export const Flow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

export const FlowItem = styled.span`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-2);
  white-space: nowrap;
`;

export const FlowArrow = styled.span`
  font-size: 16px;
  color: var(--color-6d);
`;

/* ── 계정 정보 박스 ── */
export const AccountBox = styled.div`
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 16px 20px;
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
`;

export const AccountLabel = styled.span`
  font-size: 13px;
  color: var(--color-6d);
`;

export const AccountValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--color-2);
`;

/* ── 설명 텍스트 ── */
export const Description = styled.p`
  font-size: 15px;
  color: var(--color-6d);
  line-height: 1.7;
  margin-top: 8px;
`;

/* ── 팁 박스 ── */
export const TipBox = styled.div`
  background: #fff8e1;
  border: 1px solid #ffe082;
  border-radius: 10px;
  padding: 14px 18px;
  margin-top: 16px;
  font-size: 14px;
  color: #5d4e00;
  line-height: 1.6;

  strong {
    font-weight: 700;
  }

  kbd {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 13px;
    font-family: inherit;
  }
`;
