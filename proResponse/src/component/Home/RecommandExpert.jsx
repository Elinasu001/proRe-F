import {
    Desc,
    DetailButton,
    LineImg,
    ModalBody,
    ProfileImg,
    QuoteImg,
    RecommandSection,
    RecommandTitle,
    RecommandTitleWrap,
    SlideCard,
    SlideLocation,
    SlideName,
    SlideProfile,
    Top,
} from './RecommandExpert.styled.js';

import { default as expert6 } from '../../assets/images/common/default_profile.png';
import lineImg from '../../assets/images/common/line.png';
import quote from '../../assets/images/common/quote.png';

import { useCallback, useEffect, useState } from 'react';
import { getMainExperts } from '../../api/main/mainApi';
import CommonModal from '../Common/Modal/CommonModal';
import { ModalHeader, ModalTitle } from '../Common/Modal/Review/Modal.styled';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const RecommandExpert = () => {
    const [expertData, setExpertData] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(null);

    useEffect(() => {
        getMainExperts().then(setExpertData);
    }, []);

    const handleOpen = useCallback((expert) => setSelectedExpert(expert), []);
    const handleClose = useCallback(() => setSelectedExpert(null), []);

    return (
        <RecommandSection>
            <RecommandTitleWrap>
                <RecommandTitle>
                오늘의 추천 고수예요
                <LineImg src={lineImg} alt="강조선" />
                </RecommandTitle>
            </RecommandTitleWrap>
            <Swiper
                className="mySwiper"
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={16}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 16 },
                    600: { slidesPerView: 2, spaceBetween: 16 },
                    1043: { slidesPerView: 3, spaceBetween: 20 },
                //   1024: { slidesPerView:3, spaceBetween: 24 },
                //   1400: { slidesPerView: 4, spaceBetween: 24 },
                }}
            >
                {expertData.map((expert, idx) => (
                <SwiperSlide key={expert.expertNo || idx}>
                    <SlideCard>
                        <Top>
                            <QuoteImg
                            src={quote}
                            alt="quote"
                            style={{height:'32px'}}
                            className="quote-img"
                            />
                            <Desc className="desc">{expert.content}</Desc>
                        </Top>
                        <DetailButton type="button" onClick={() => handleOpen(expert)}>상세보기 &gt;</DetailButton>
                        <SlideProfile>
                            <ProfileImg src={expert.profileImg || expert6} alt={expert.nickname}/>
                            <div>
                            <SlideName>{expert.nickname}</SlideName>
                            <SlideLocation className="address">{expert.address}</SlideLocation>
                            </div>
                        </SlideProfile>
                    </SlideCard>
                </SwiperSlide>
                ))}
            </Swiper>

            <CommonModal isOpen={!!selectedExpert} onClose={handleClose} ariaLabelledby="expert-detail-title">
                <ModalHeader>
                    <ModalTitle id="expert-detail-title">{selectedExpert?.nickname}</ModalTitle>
                    <button onClick={handleClose} style={{ background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer' }}>✕</button>
                </ModalHeader>
                <ModalBody>{selectedExpert?.content}</ModalBody>
            </CommonModal>
        </RecommandSection>
    );
};

export default RecommandExpert;
