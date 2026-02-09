import React, { useState, useRef, useEffect } from 'react';
import ReservationDetail from './ReservationDetail';
import Button from '../../Common/Button/Button.jsx';
import * as S from '../styles/CardItem.styled';
import * as C from '../../Common/ExportCards/ExportCards.styled.js';

// import mStarImg from '../../../assets/images/common/m_star.png';
// import mTimeImg from '../../../assets/images/common/m_time.png';
import mLocationImg from '../../../assets/images/common/m_location.png';

const CardItem = ({ data, onRequestDetail, onEstimateSuccess, onDeleteEstimate }) => {

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDetailClick = () => {
        if (onRequestDetail && data.requestNo) {
            onRequestDetail(data.requestNo);
        }
    };

    const handleEstimateSuccess = () => {
        setIsDetailOpen(false);
        onEstimateSuccess && onEstimateSuccess();
    };

    const handleDelete = () => {
        if (onDeleteEstimate) {
            onDeleteEstimate(data.requestNo);
        }
        setIsMenuOpen(false);
    };

    return (
        <>
        <S.Card>
            <S.ExpertInfo>
                <C.Profile>
                    <C.ProfileImg src={data.profileImg} alt="프로필" />
                    <S.Col>
                        <C.Name><span>{data.nickName}</span> 회원</C.Name>
                        {/* <S.Row>
                            <C.Icon src={mStarImg} alt="별점" />
                            <C.TextWrapper>
                                <C.Data>{data.starScore}</C.Data>
                                (<C.Data>{data.reviewCount}</C.Data>)
                            </C.TextWrapper>
                        </S.Row> */}
                    </S.Col>
                </C.Profile>
                {/* 더보기 메뉴 */}
                <S.MoreMenuWrapper ref={menuRef}>
                    <S.MoreButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        ⋮
                    </S.MoreButton>
                    {isMenuOpen && (
                        <S.DropdownMenu>
                            <S.DropdownItem className="danger" onClick={handleDelete}>
                                견적 삭제
                            </S.DropdownItem>
                        </S.DropdownMenu>
                    )}
                </S.MoreMenuWrapper>
            </S.ExpertInfo>

            <C.InfoBox>
                <S.InfoList>
                    <C.InfoRow>
                        <C.Icon src={mLocationImg} alt="위치" />
                        <C.Data>{data?.address}</C.Data>
                    </C.InfoRow>
                    {/* <C.InfoRow>
                        <C.Icon src={mTimeImg} alt="시간" />
                        연락 가능 시간 : <C.Data>{data?.startTime}</C.Data> ~ <C.Data>{data?.endTime}</C.Data>
                    </C.InfoRow> */}
                </S.InfoList>
            </C.InfoBox>

            <S.ActionContainer>
                <S.ButtonGroup>
                    <Button
                        variant="outline"
                        onClick={handleDetailClick}
                    >
                    자세히 보기
                    </Button>
                    <Button 
                        variant="primary"
                        onClick={() => setIsDetailOpen(true)}
                    >
                    견적 보내기
                    </Button>
                </S.ButtonGroup>
            </S.ActionContainer>
        </S.Card>

        {isDetailOpen && (
            <ReservationDetail
                data={data}
                onClose={() => setIsDetailOpen(false)}
                onSuccess={handleEstimateSuccess}
            />
        )}
        </>
    );
};

export default CardItem;