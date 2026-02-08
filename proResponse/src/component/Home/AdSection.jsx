import lineImg from '../../assets/images/common/line.png';
import roundwaveBg from '../../assets/images/common/roundwave_bg.png';
import { useAuth } from '../../context/AuthContext';
import * as A from './AdSection.styled.js';

const AdSection = () => {
    const { currentUser } = useAuth();
    return (
        <A.AdSectionContainer>
            <A.RoundWaveBg src={roundwaveBg} alt="광고 배경" />
            <A.AdContent>
                <A.AdTitle>
                    <A.AdIcon>ⓘ 광고</A.AdIcon>
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
                    <A.CTAButton>
                        전문가 프로필 상세보기 <span style={{fontSize: '22px', marginLeft: '8px'}}>→</span>
                    </A.CTAButton>
                </A.AdTitle>
                <A.AdProfile>
                    {/* <img src="https://via.placeholder.com/600x400.png?text=광고+프로필+이미지" alt="광고 프로필" style={{width: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}} /> */}
                </A.AdProfile>
            </A.AdContent>
        </A.AdSectionContainer>
    );
};

export default AdSection;
