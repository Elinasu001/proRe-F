import * as S from './Contact.styled';

const STEPS = [
  {
    step: 1,
    color: '#4F9CF9',
    role: '일반회원',
    title: '견적 요청하기',
    account: { email: 'user45@test.com', pw: 'test1234!' },
    flow: ['로그인', '전문가 찾기', '견적 요청', '이벤트', '촬영 및 편집', '영상 편집'],
    desc: '일반회원으로 로그인 후, 네비게이션 바에서 전문가 찾기를 클릭합니다. 견적 요청 페이지에서 이벤트 > 촬영 및 편집 > 영상 편집 카테고리를 선택한 뒤, 전문가 "지은쓰"에게 견적을 요청하세요.',
  },
  {
    step: 2,
    color: '#5dcea1',
    role: '전문가',
    title: '견적 보내기',
    account: { email: 'user02@test.com', pw: 'test1234!' },
    flow: ['로그인', '내 정보', '내 견적 보내기', '"여기우리형" 회원에게 견적 전송'],
    desc: '전문가 계정으로 로그인 후, 내 정보 페이지에서 내 견적 보내기를 선택합니다. 견적을 요청한 "여기우리형" 회원에게 견적을 보내주세요.',
    tip: '일반회원과 전문가 계정을 동시에 사용하려면 시크릿(비공개) 창을 열어주세요. Chrome: Ctrl + Shift + N / Safari: Cmd + Shift + N',
  },
  {
    step: 3,
    color: '#f6c667',
    role: '일반회원',
    title: '견적 수락 & 채팅 상담',
    account: { email: 'user45@test.com', pw: 'test1234!' },
    flow: ['로그인', '내 견적 확인', '견적 수락', '채팅하기'],
    desc: '다시 일반회원으로 로그인하여 전문가가 보낸 견적을 확인합니다. 견적을 수락한 뒤 채팅하기를 통해 전문가와 1:1 상담을 진행하고 서비스를 받아보세요.',
  },
];

const Contact = () => {
  return (
    <S.Container>
      <S.PageTitle>서비스 이용 가이드</S.PageTitle>
      <S.PageSubTitle>
        ProResponse에서 전문가를 매칭하고 서비스를 받는 방법을 안내해 드립니다.
      </S.PageSubTitle>

      <S.StepList>
        {STEPS.map(({ step, color, role, title, account, flow, desc, tip }) => (
          <S.StepCard key={step} color={color}>
            <S.StepHeader>
              <S.StepBadge color={color}>{step}</S.StepBadge>
              <S.StepTitle>{title}</S.StepTitle>
              <S.StepRole color={color}>{role}</S.StepRole>
            </S.StepHeader>

            <S.Flow>
              {flow.map((item, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {i > 0 && <S.FlowArrow>→</S.FlowArrow>}
                  <S.FlowItem>{item}</S.FlowItem>
                </span>
              ))}
            </S.Flow>

            <S.Description>{desc}</S.Description>

            {tip && (
              <S.TipBox>
                <strong>Tip: </strong>{tip}
              </S.TipBox>
            )}

            <S.AccountBox>
              <S.AccountLabel>테스트 계정</S.AccountLabel>
              <S.AccountValue>{account.email} / {account.pw}</S.AccountValue>
            </S.AccountBox>
          </S.StepCard>
        ))}
      </S.StepList>
    </S.Container>
  );
};

export default Contact;
