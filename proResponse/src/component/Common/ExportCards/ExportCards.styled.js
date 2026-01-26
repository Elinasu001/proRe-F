export const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 12px;

  @media (max-width: 900px) {
    gap: 16px;
    padding: 16px 6px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 8px 2px;
  }
`;
import styled from "styled-components";

export const Card = styled.div`
  width: 312px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.08);
  padding: 24px 20px 20px 20px;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;
  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    max-width: 400px;
  }
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
`;
export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-right: 12px;
  border: 1px solid var(--secondary);
`;
export const Name = styled.div`
  font-size: var(--font14);
  color: var(--color-3);
  font-weight: 700;
  span {
    font-size:var(--font16);
  }
`;
export const Heart = styled.div`
  font-size: 22px;
  color: #e5e5e5;
  cursor: pointer;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  /* gap: 8px; */
`;

export const Col = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 8px;
  /* gap: 8px; */
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right:8px;
`;

export const TextWrapper = styled.div`
    display: flex;
    /* gap: 4px; */
    font-size: var(--font16);
    font-weight:var(--font-w-r);
    color: var(--thirdary);
    line-height: 1.5rem;
`;

export const InfoBox = styled.div`
  margin: 20px 0 16px 0;
  padding: 16px 0;
  border-top: 1px solid var(--secondary);
  border-bottom: 1px solid var(--secondary);
`;
export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: var(--thirdary);
  margin-bottom: 8px;
  /* gap: 8px; */
`;
export const ButtonBox = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;
export const Button = styled.button`
  flex: 1;
  padding: 12px 0;
  border-radius: 8px;
  border: 1px solid var(--primary);
  background: ${({ primary }) => (primary ? 'var(--primary)' : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : 'var(--primary)')};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const Data = styled.div`
    font-size: var(--font14); 
    font-weight: var(--font-w-r);
    color: var(--thirdary);
`;