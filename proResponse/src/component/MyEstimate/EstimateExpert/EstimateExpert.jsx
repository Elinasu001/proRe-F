import React from 'react';
import * as S from '../../Common/Layout/EstimateLayout.styled.js';
import ExpertCards from './ExpertCards.jsx';

const EstimateExpert = () => {
  return (
    <>
      <S.LeftContent>
          <ExpertCards />
        {/* 카드리스트 */}
        <S.Section>
          {/* <ExpertCards /> */}
        </S.Section>
      </S.LeftContent>
      <S.RightContent>
        {/* 상세보기 */}
        <S.Section>
          내 견적 보내기 (전문가)   
        </S.Section> 
      </S.RightContent>
    </>
  );           
};

export default EstimateExpert;
