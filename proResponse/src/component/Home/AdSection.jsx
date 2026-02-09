import lineImg from '../../assets/images/common/line.png';
import mainGif from '../../assets/images/common/main.gif';
import roundwaveBg from '../../assets/images/common/roundwave_bg.png';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as A from './AdSection.styled.js';
import { AdTooltip } from './AdSection.styled.js';

const AdSection = () => {
    const { currentUser } = useAuth();
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();

    const handleIconClick = () => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 1800);
    };

    const handleGoQuote = () => {
        navigate('/quote');
    };

    return (
        <A.AdSectionContainer>
            <A.RoundWaveBg src={roundwaveBg} alt="광고 배경" />
            <A.AdContent>
                <A.AdTitle>
                    <div style={{position:'relative',display:'inline-block'}}>
                        <A.AdIcon onClick={handleIconClick} style={{cursor:'pointer'}}>ⓘ 광고</A.AdIcon>
                        {showTooltip && (
                            <AdTooltip>
                                전문가에게 서비스를 받아보세요.
                            </AdTooltip>
                        )}
                    </div>
                    <A.AdTopTitle>
                        지금 필요한 서비스를<br />
                        <A.HighlightWrap>
                            <span>이용해 보세요</span>
                            <A.LineImg src={lineImg} alt="강조선" />
                        </A.HighlightWrap>
                    </A.AdTopTitle>
                    <A.AdSubTitle>
                        {currentUser?.userName ? `${currentUser.userName}님! 이 서비스는 어떠세요?` : '서비스를 이용해 보세요!'}
                    </A.AdSubTitle>
                    <A.CTAButton onClick={handleGoQuote}>
                        전문가 프로필 상세보기 <span style={{fontSize: '22px', marginLeft: '8px'}}>→</span>
                    </A.CTAButton>
                </A.AdTitle>
                <A.AdProfile>
                    <A.ServiceImg src={mainGif} alt="서비스 이미지"/>
                </A.AdProfile>
            </A.AdContent>
        </A.AdSectionContainer>
    );
};

export default AdSection;
