import styled from 'styled-components';

const Card = styled.div`
  background: #ffe29b;
  border-radius: 12px 12px 0 0;
  padding: 18px 20px 0 20px;
  width: 215px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
`;
const AmountRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #f5b300;
  margin-bottom: 12px;
`;
const CoinIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('../images/common/coin.svg') no-repeat center/cover;
  margin-right: 6px;
`;
const InfoBox = styled.div`
  background: #f7f7f7;
  border-radius: 0 0 12px 12px;
  padding: 12px 20px;
  font-size: 14px;
  color: #222;
`;
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

function PaymentMessageCard({ amount, date }) {
  return (
    <Card>
      <Title>송금완료</Title>
      <AmountRow>
        <CoinIcon />
        {amount.toLocaleString()}원
      </AmountRow>
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
