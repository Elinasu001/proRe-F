import React, { useState, useEffect } from 'react';
import CardItem from './CardItem.jsx';
import * as S from '../styles/Cards.styled.js';
import * as TB from '../../Common/Button/Tab.styled.js';
import * as T from '../../Common/Title/Title.styled.js';
import * as L from '../../Common/Layout/EstimateLayout.styled.js';
import Pagination from '../../Common/Pagination/Pagination.jsx';
import defaultImg from '../../../assets/images/common/default_profile.png';


const ExpertCards = () => {
    const [experts, setexperts] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });
    const [activeTab, setActiveTab] = useState('관심 받는 중');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchexperts();
    }, [activeTab, currentPage]);

    const fetchexperts = async () => {
        // 전체 데이터 (실제 API에서는 서버에서 페이징된 데이터만 받아오면 됨)
        const result = {
        message: "조회에 성공 했습니다.",
            data: {
                list: [ 
                    {
                        requestNo: 82,
                        expertNo: 62,
                        profileImg: null,
                        nickName: "지은쓰",
                        starScore: 5.0,
                        reviewCount: 1,
                        address: "서울특별시 강동구 천호대로 456",
                        startTime: "09:00",
                        endTime: "22:00",
                        requestStatus: "REQUESTED"
                    },
                    {
                        requestNo: 82,
                        expertNo: 62,
                        profileImg: null,
                        nickName: "지은쓰",
                        starScore: 5.0,
                        reviewCount: 1,
                        address: "서울특별시 강동구 천호대로 456",
                        startTime: "09:00",
                        endTime: "22:00",
                        requestStatus: "REQUESTED"
                    },
                    {
                        requestNo: 82,
                        expertNo: 62,
                        profileImg: null,
                        nickName: "지은쓰",
                        starScore: 5.0,
                        reviewCount: 1,
                        address: "서울특별시 강동구 천호대로 456",
                        startTime: "09:00",
                        endTime: "22:00",
                        requestStatus: "REQUESTED"
                    },
                    {
                        requestNo: 82,
                        expertNo: 62,
                        profileImg: null,
                        nickName: "지은쓰",
                        starScore: 5.0,
                        reviewCount: 1,
                        address: "서울특별시 강동구 천호대로 456",
                        startTime: "09:00",
                        endTime: "22:00",
                        requestStatus: "REQUESTED"
                    }
                ],
                pageInfo: {
                    listCount: 2,
                    currentPage: 1,
                    boardLimit: 4,
                    pageLimit: 5,
                    maxPage: 1,
                    startPage: 1,
                    endPage: 1
                }
            },
            success: true,
            timestamp: "2026-01-29T12:03:57.3007798"
        };
        setexperts(result.data.list);
        setPageInfo({
            startPage: 1,
            endPage: 1,
            totalPage: 1
        });
    };

    const tabs = ['관심 받는 중', '받은 견적'];

    return (
        <>
        <S.Header>
           {/* 타이틀 */}
            <L.Section>
                <T.TitleWrapper>
                    <T.SubLine>
                        <T.SubHighlight>박길동</T.SubHighlight> 전문가 님의
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
                {experts.map(experts => (
                    <CardItem
                        key={experts.requestNo}
                        data={{
                            profileImg: experts.profileImg || defaultImg,
                            nickName: experts.nickName,
                            starScore: experts.starScore,
                            reviewCount: experts.reviewCount,
                            address: experts.address,
                            startTime: experts.startTime,
                            endTime: experts.endTime,
                        }}
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

export default ExpertCards;