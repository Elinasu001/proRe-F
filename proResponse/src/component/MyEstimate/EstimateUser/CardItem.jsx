import React, { useState } from 'react';
import ReservationDetail from './ReservationDetail';
import Button from '../../Common/Button/Button.jsx';
import * as S from '../styles/CardItem.styled';
import * as C from '../../Common/ExportCards/ExportCards.styled.js';

import mStarImg from '../../../assets/images/common/m_star.png';
import mTimeImg from '../../../assets/images/common/m_time.png';
import mLocationImg from '../../../assets/images/common/m_location.png';
import payImg from '../../../assets/images/common/pay.png';

const CardItem = ({
    data,
    isReceived = false,
    onExpertDetail,
    onRequestDetail,
    onEstimateDetail,
    onQuoteAccept,
    onChatStart,
}) => {

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const isQuoted = data?.status === 'QUOTED';
    const isMatched = data?.status === 'MATCHED' || data?.status === 'DONE';

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
                    {data.price ? (
                        // 받은 견적 탭
                        <>
                            <C.InfoRow style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <C.Data>견적 비용</C.Data>
                            </C.InfoRow>
                            <C.InfoRow style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <C.Data style={{fontWeight: 'bold'}}>총 {data.price?.toLocaleString()}원</C.Data>
                            </C.InfoRow>
                        </>
                    ) : (
                        // 보낸 견적 요청 탭
                        <>
                            <C.InfoRow>
                                <C.Icon src={mLocationImg} alt="위치" />
                                <C.Data>{data?.address}</C.Data>
                            </C.InfoRow>
                            <C.InfoRow>
                                <C.Icon src={mTimeImg} alt="시간" />
                                연락 가능 시간 : <C.Data>{data?.startTime}</C.Data> ~ <C.Data>{data?.endTime}</C.Data>
                            </C.InfoRow>
                        </>
                    )}
                </S.InfoList>
            </C.InfoBox>

            <S.ActionContainer>
                <S.ButtonGroup>
                    <Button
                        variant="outline"
                        onClick={() =>
                            isReceived
                                ? onEstimateDetail && onEstimateDetail(data.requestNo)
                                : onExpertDetail && onExpertDetail(data.expertNo)
                        }
                    >
                        {isReceived ? '견적 상세' : '전문가 상세'}
                    </Button>
                    {isReceived ? (
                        isQuoted ? (
                            <Button
                                variant="primary"
                                onClick={() => onQuoteAccept && onQuoteAccept(data)}
                            >
                                견적 수락
                            </Button>
                        ) : isMatched ? (
                            <Button
                                variant="primary"
                                onClick={() => onChatStart && onChatStart(data)}
                            >
                                채팅하기
                            </Button>
                        ) : null
                    ) : (
                        <Button 
                            variant="primary"
                            onClick={() => onRequestDetail && onRequestDetail(data.requestNo)}
                        >
                            내 문의 상세
                        </Button>
                    )}
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