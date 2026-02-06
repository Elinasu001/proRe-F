import styled from 'styled-components';

const Card = styled.div`
  text-align: left;
  background: rgba(251,208,97,56%);
  border-radius: 20px;
  width: 250px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: var(--color-2);
  margin-bottom: 8px;
`;
const AmountRow = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font16);
  font-weight: var(--font-w-m);
  color: var(--color-3);
  justify-content: flex-end;
`;
const CoinIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/src/assets/images/common/coin.svg') no-repeat center/cover;
  margin-right: 6px;
`;

const InfoTop = styled.div`
  padding: 20px 20px 13px 20px;
`;

const InfoBox = styled.div`
  background: var(--gray-primary);
  border-radius: 0 0 12px 12px;
  padding: 20px 20px 20px 26px;
  font-size: 14px;
  color: var(--color-6d);
  div:last-child {
    margin-top:8px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  color:var(--color-6d);
  span:last-child{
    color:var(--color-2);
    font-weight:var(--font-w-m);
  }
`;



function PaymentMessageCard({ amount, date }) {
  return (
    <Card>
      <InfoTop>
        <Title>송금완료</Title>
        <AmountRow>
          <CoinIcon />
          {amount.toLocaleString()}
        </AmountRow>
      </InfoTop>
      <InfoBox>
        <InfoRow>
          <span>일시</span>
          <span>{date}</span>
        </InfoRow>
        <InfoRow>
          <span>거래 금액</span>
          <span>{amount.toLocaleString()} 원</span>
        </InfoRow>
      </InfoBox>
    </Card>
  );
}

export default PaymentMessageCard;
