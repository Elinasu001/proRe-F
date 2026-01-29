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
const ExpertCards = () => {

    const { currentUser } = useAuth();
    const nickname = currentUser?.nickname;

    const [experts, setExperts] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });
    const [activeTab, setActiveTab] = useState('받은 요청');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchExperts();
    }, [activeTab, currentPage]);

    const fetchExperts = async () => {
        let endpoint = '';
        
        if (activeTab === '받은 요청') {
            endpoint = `/api/estimate/requests?pageNo=${currentPage}`;
        } else if (activeTab === '매칭 완료') {
            endpoint = `/api/experts/matches?pageNo=${currentPage}`;
        }
        
        axiosAuth.getList(endpoint).then(res =>{
            setExperts(res.data.list);
            console.log(res.data);
            setPageInfo(res.data.pageInfo);
        }).catch(err => {
            console.error(err);
        })
    };

    const tabs = ['받은 요청', '매칭 완료'];

    return (
        <>
        <S.Header>
           {/* 타이틀 */}
            <L.Section>
                <T.TitleWrapper>
                    <T.SubLine>
                        <T.SubHighlight>{nickname}</T.SubHighlight> 전문가 님의
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
                {experts.map(expert => (
                    <CardItem
                        key={expert.requestNo}
                        data={{
                            profileImg: expert.profileImg || defaultImg,
                            nickName: expert.nickname,
                            starScore: expert.starScore,
                            reviewCount: expert.reviewCount,
                            address: expert.address,
                            startTime: expert.startTime,
                            endTime: expert.endTime,
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