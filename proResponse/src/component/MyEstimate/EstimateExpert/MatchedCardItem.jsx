import React, { useState, useRef, useEffect } from 'react';
import Button from '../../Common/Button/Button.jsx';
import * as S from '../styles/CardItem.styled';
import * as C from '../../Common/ExportCards/ExportCards.styled.js';
import mLocationImg from '../../../assets/images/common/m_location.png';

const MatchedCardItem = ({ data, onRequestDetail, onChatStart, onDeleteEstimate }) => {
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

    // 자세히 보기 - 회원 요청 정보 + 내가 보낸 견적 (탭으로 전환)
    const handleDetailClick = () => {
        console.log("자세히 보기 클릭 - requestNo:", data.requestNo);
        if (onRequestDetail && data.requestNo) {
            onRequestDetail(data.requestNo);
        }
    };

    const handleChatClick = () => {
        if (onChatStart) {
            onChatStart(data);
        }
    };

    const handleDelete = () => {
        if (onDeleteEstimate) {
            onDeleteEstimate(data.requestNo);
        }
        setIsMenuOpen(false);
    };

    return (
        <S.Card>
            <S.ExpertInfo>
                <C.Profile>
                    <C.ProfileImg src={data.profileImg} alt="프로필" />
                    <S.Col>
                        <C.Name><span>{data.nickName}</span> 회원</C.Name>
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
                        onClick={handleChatClick}
                    >
                    채팅 하기
                    </Button>
                </S.ButtonGroup>
            </S.ActionContainer>
        </S.Card>
    );
};

export default MatchedCardItem;
