import React, { useState, useEffect } from 'react';
import CardItem from './CardItem.jsx';
import MatchedCardItem from './MatchedCardItem.jsx';
import * as S from '../styles/Cards.styled.js';
import * as TB from '../../Common/Button/Tab.styled.js';
import * as T from '../../Common/Title/Title.styled.js';
import * as L from '../../Common/Layout/EstimateLayout.styled.js';
import Pagination from '../../Common/Pagination/Pagination.jsx';
import defaultImg from '../../../assets/images/common/default_profile.png';
import { axiosAuth, axiosPublic } from "../../../api/reqApi.js";
import { useAuth } from '../../../context/AuthContext.jsx';
const ExpertCards = ({ onRequestDetail, onEstimateSuccess, onMatchedDetail, onChatStart, onDeleteEstimate, refreshKey }) => {

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
    }, [activeTab, currentPage, refreshKey]);

    const fetchExperts = async () => {
        let endpoint = '';
        
        if (activeTab === '받은 요청') {
            endpoint = `/api/estimate/requests?pageNo=${currentPage}`;
        } else if (activeTab === '매칭 완료') {
            endpoint = `/api/experts/matches?pageNo=${currentPage}`;
        }
        
        //console.log("호출 API:", endpoint);
        
        axiosAuth.getList(endpoint).then(res =>{
            //console.log("받은 데이터:", res.data);
            //console.log("리스트:", res.data.list);
            setExperts(res.data.list || []);
            setPageInfo(res.data.pageInfo);
        }).catch(err => {
            console.error("API 에러:", err);
            setExperts([]);  // 에러 시 빈 배열로 초기화
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
                    activeTab === '받은 요청' ? (
                        <CardItem
                            key={expert.requestNo}
                            data={{
                                requestNo: expert.requestNo,
                                profileImg: expert.profileImg || defaultImg,
                                nickName: expert.nickname,       
                                address: expert.address,
                            }}
                            onRequestDetail={onRequestDetail}
                            onEstimateSuccess={onEstimateSuccess}
                            onDeleteEstimate={onDeleteEstimate}
                        />
                    ) : (
                        <MatchedCardItem
                            key={expert.requestNo || expert.estimateNo}
                            data={{
                                ...expert, // 원본 데이터 전체 포함
                                profileImg: expert.profileImg || defaultImg,
                                nickName: expert.nickname,       
                            }}
                            onRequestDetail={onMatchedDetail}
                            onChatStart={onChatStart}
                            onDeleteEstimate={onDeleteEstimate}
                        />
                    )
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