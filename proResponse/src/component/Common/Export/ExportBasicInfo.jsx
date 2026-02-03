import { useState } from "react";

import {
    Card,
    Top,
    Profile,
    ProfileImg,
    Name,
    Heart,
    Row,
    Col,
    Icon,
    InfoBox,
    InfoRow,
    ButtonBox,
    Button,
    TextWrapper,
    Data
}
from "../ExportCards/ExportCards.styled.js";

import user1 from "../../../assets/images/common/user1.png";
import user2 from "../../../assets/images/common/user2.png";
import user3 from "../../../assets/images/common/user3.png";
import user4 from "../../../assets/images/common/user4.png";
import user5 from "../../../assets/images/common/user5.png";
import mLikeImg from "../../../assets/images/common/m_like.png";
import mStarImg from "../../../assets/images/common/m_star.png";
import mTimeImg from "../../../assets/images/common/m_time.png";
import mHireImg from "../../../assets/images/common/m_hire.png";
import mCarerImg from "../../../assets/images/common/m_carer.png";
import mLocationImg from "../../../assets/images/common/m_location.png";

import iHeart from '../../../assets/images/common/i_heart.svg';
import heart from '../../../assets/images/common/heart.svg';
import { axiosAuth } from "../../../api/reqApi.js";

const profileImages = [user1, user2, user3, user4, user5];

function getRandomImage() {
    return profileImages[Math.floor(Math.random() * profileImages.length)];
}

const ExportCardItem = ({ data }) => {
    const [isLiked, setIsLiked] = useState(() => {
        // 초기값: data.userLiked가 true, 1, "1" 중 하나면 true
        return data?.userLiked === true || data?.userLiked === 1 || data?.userLiked === "1";
    });
    const [animating, setAnimating] = useState(false);
    const [likeCount, setLikeCount] = useState(data?.totalLikes || 0);
    
    // 최초 렌더링 시 한 번만 이미지 선택
    const [profileImg] = useState(() => data?.profileImg ? data.profileImg : getRandomImage());

    const handleLikeClick = async () => {
        // 로그인 체크
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        setAnimating(true);
        
        try {
            const response = await axiosAuth.post(`/api/likes/${data.expertNo}`);
            console.log("좋아요 토글 응답:", response);
            
            const newIsLiked = response.data?.isLiked;
            setIsLiked(newIsLiked);
            setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);
        } catch (error) {
            console.error("좋아요 요청 실패:", error);
            alert("좋아요 요청에 실패했습니다.");
        } finally {
            setTimeout(() => {
                setAnimating(false);
            }, 200);
        }
    };

    return (
        <>
            <Top>
                <Profile>
                    <ProfileImg src={profileImg} alt="프로필" />
                    <Name><span>{data?.nickname || data?.nickName}</span> 전문가</Name>
                </Profile>
                <img
                    src={isLiked ? heart : iHeart}
                    alt="좋아요"
                    style={{
                        width: 28,
                        height: 28,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        transform: animating ? 'scale(1.3)' : 'scale(1)',
                    }}
                    onClick={handleLikeClick}
                />
            </Top>
            <Col>
                <Row>
                    <Icon src={mStarImg} alt="별점" />
                    <TextWrapper>
                        <Data>{data?.starScore}</Data>
                        (<Data>{data?.reviewCount}</Data>)
                    </TextWrapper>
                </Row>
                <Row>
                    <Icon src={mLikeImg} alt="좋아요" />
                    <TextWrapper>
                        <Data>{likeCount}</Data>
                    </TextWrapper>
                </Row>
            </Col>
            <InfoBox>
                <InfoRow>
                    <Icon src={mHireImg} alt="고용" />
                    <Data>{data?.completedJobs}</Data>회 고용됨
                </InfoRow>
                <InfoRow>
                    <Icon src={mLocationImg} alt="위치" />
                    <Data>{data?.address}</Data>
                </InfoRow>
                <InfoRow>
                    <Icon src={mCarerImg} alt="경력" />
                    경력 &nbsp;<Data>{data?.career}</Data>년
                </InfoRow>
                <InfoRow>
                    <Icon src={mTimeImg} alt="시간" />
                    연락 가능 시간 : <Data>{data?.startTime}</Data> ~ <Data>{data?.endTime}</Data>
                </InfoRow>
            </InfoBox>
        </>
    );
};


export default ExportCardItem;

