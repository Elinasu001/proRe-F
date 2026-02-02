import React, { useState, useEffect } from 'react';
import CardItem from './CardItem.jsx';
import * as S from '../styles/Cards.styled.js';
import * as TB from '../../Common/Button/Tab.styled.js';
import * as T from '../../Common/Title/Title.styled.js';
import * as L from '../../Common/Layout/EstimateLayout.styled.js';
import Pagination from '../../Common/Pagination/Pagination.jsx';
import defaultImg from '../../../assets/images/common/default_profile.png';
import { axiosAuth, axiosPublic } from "../../../api/reqApi.js";
import { useAuth } from '../../../context/AuthContext.jsx';

const UserCards = ({
    onExpertDetail,
    onRequestDetail,
    onEstimateDetail,
    onQuoteAccept,
    onChatStart,
    onDeleteEstimate,
    onEditEstimate,
    refreshKey,
}) => {

    const { currentUser } = useAuth();
    const nickname = currentUser?.nickname;

    const [reservations, setReservations] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });
    const [activeTab, setActiveTab] = useState('보낸 견적 요청');
    const [currentPage, setCurrentPage] = useState(1);

    const tabs = ['보낸 견적 요청', '받은 견적'];

    useEffect(() => {
        fetchReservations();
    }, [activeTab, currentPage, refreshKey]);

    const fetchReservations = async () => {
        let endpoint = '';
        
        if (activeTab === '보낸 견적 요청') {
            endpoint = `/api/estimate?pageNo=${currentPage}`;
        } else if (activeTab === '받은 견적') {
            endpoint = `/api/estimate/receive?pageNo=${currentPage}`;
        }
        
        axiosAuth.getList(endpoint).then(res =>{
            setReservations(res.data.list);
            console.log(res.data);
            setPageInfo(res.data.pageInfo);
        }).catch(err => {
            console.error(err);
        })
    };

    const handleExpertDetail = async (expertNo) => {
        try {
            const response = await axiosAuth.getList(`/api/experts/${expertNo}`);
            console.log('전문가 상세 데이터:', response);
            // 부모 컴포넌트에 데이터 전달
            if (onExpertDetail) {
                onExpertDetail(response.data);
            }
        } catch (error) {
            console.error('전문가 상세 조회 실패:', error);
        }
    };

    return (
        <>
        <S.Header>
           {/* 타이틀 */}
            <L.Section>
                <T.TitleWrapper>
                    <T.SubLine>
                        <T.SubHighlight>{nickname}</T.SubHighlight> 회원님의
                    </T.SubLine>
                    <T.SubLine>거래하기</T.SubLine>
                </T.TitleWrapper>
                </L.Section>
            <TB.TabContainer>
            {tabs.map(tab => (
                <TB.Tab
                    key={tab}
                    $active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                >
                {tab}
                </TB.Tab>
            ))}
            </TB.TabContainer>
        </S.Header>

        <S.Notice>
            ⓘ 채팅을 통해 서비스 받아보세요!
        </S.Notice>
        
        <L.CardSection>
            <S.ReservationGrid>
                {reservations.map(reservation => (
                    <CardItem
                        key={reservation.requestNo}
                        isReceived={activeTab === '받은 견적'}
                        data={activeTab === '보낸 견적 요청' ? {
                            requestNo: reservation.requestNo,
                            expertNo: reservation.expertNo,
                            profileImg: reservation.profileImg || defaultImg,
                            nickName: reservation.nickName,
                            starScore: reservation.starScore,
                            reviewCount: reservation.reviewCount,
                            address: reservation.address,
                            startTime: reservation.startTime,
                            endTime: reservation.endTime,
                        } : {
                            requestNo: reservation.requestNo,
                            expertNo: reservation.expertNo,
                            estimateNo: reservation.estimateNo,
                            profileImg: reservation.profileImg || defaultImg,
                            nickName: reservation.nickName,
                            starScore: reservation.starScore,
                            reviewCount: reservation.reviewCount,
                            price: reservation.price,
                            status: reservation.status,
                        }}
                        onExpertDetail={handleExpertDetail}
                        onRequestDetail={onRequestDetail}
                        onEstimateDetail={onEstimateDetail}
                        onQuoteAccept={onQuoteAccept}
                        onChatStart={onChatStart}
                        onDeleteEstimate={onDeleteEstimate}
                        onEditEstimate={onEditEstimate}
                    />
                ))}
            </S.ReservationGrid>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageInfo={pageInfo}
            />
        </L.CardSection>
        </>
    );
};

export default UserCards;