import React, { useState } from 'react';
import ReservationDetail from './ReservationDetail';
import Button from '../../Common/Button/Button.jsx';
import * as S from '../styles/CardItem.styled';
import * as C from '../../Common/ExportCards/ExportCards.styled.js';

import mStarImg from '../../../assets/images/common/m_star.png';
import mTimeImg from '../../../assets/images/common/m_time.png';
import mLocationImg from '../../../assets/images/common/m_location.png';

const CardItem = ({ data }) => {

    const [isDetailOpen, setIsDetailOpen] = useState(false);

    return (
        <>
        <S.Card>
            <S.ExpertInfo>
                <C.Profile>
                    <C.ProfileImg src={data.profileImg} alt="프로필" />
                    <S.Col>
                        <C.Name><span>{data.nickName}</span> 전문가</C.Name>
                        <S.Row>
                            <C.Icon src={mStarImg} alt="별점" />
                            <C.TextWrapper>
                                <C.Data>{data.starScore}</C.Data>
                                (<C.Data>{data.reviewCount}</C.Data>)
                            </C.TextWrapper>
                        </S.Row>
                    </S.Col>
                </C.Profile>
            </S.ExpertInfo>

            <C.InfoBox>
                <S.InfoList>
                    <C.InfoRow>
                        <C.Icon src={mLocationImg} alt="위치" />
                        <C.Data>{data?.address}</C.Data>
                    </C.InfoRow>
                    <C.InfoRow>
                        <C.Icon src={mTimeImg} alt="시간" />
                        연락 가능 시간 : <C.Data>{data?.startTime}</C.Data> ~ <C.Data>{data?.endTime}</C.Data>
                    </C.InfoRow>
                </S.InfoList>
            </C.InfoBox>

            <S.ActionContainer>
                <S.ButtonGroup>
                    <Button
                    variant="outline"
                    >
                    자세히 보기
                    </Button>
                    <Button 
                        variant="primary"
                        onClick={() => setIsDetailOpen(true)}
                    >
                    내 문의 상세
                    </Button>
                </S.ButtonGroup>
            </S.ActionContainer>
        </S.Card>

        {isDetailOpen && (
            <ReservationDetail
                data={data}
                onClose={() => setIsDetailOpen(false)}
            />
        )}
        </>
    );
};

export default CardItem;