import {
    Desc,
    LineImg,
    QuoteImg,
    RecommandSection,
    RecommandTitle,
    RecommandTitleWrap,
    SlideCard,
    SlideLocation,
    SlideName,
    SlideProfile
} from './RecommandExpert.styled.js';

import { default as expert6 } from '../../assets/images/common/default_profile.png';
import lineImg from '../../assets/images/common/line.png';
import quote from '../../assets/images/common/quote.png';
import expert1 from '../../assets/images/common/user1.png';
import expert2 from '../../assets/images/common/user2.png';
import expert3 from '../../assets/images/common/user3.png';
import expert4 from '../../assets/images/common/user4.png';
import expert5 from '../../assets/images/common/user5.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const expertData = [
  {
    name: '홍길동',
    location: '서울특별시 강남구',
    profile: expert1,
    desc: `안녕하세요 아리랑익스프레스 입니다😄\n• 아버지사업을 같이해서 오래된 노하우와\n시대에 맞는 저의 젊은 생각을 더하여 운영중입니다.\n• 제가 직접 견적부터 이사당일 추가요금 및 불미스러운일이 없도록 하고 있습니다.\n합리적인 가격과 안심포장 서비스를 보장합니다💕\n• 저희의 서비스는 친절인거같아요.`
  },
  {
    name: '홍길동',
    location: '서울특별시 강남구',
    profile: expert2,
    desc: `안녕하세요 아리랑익스프레스 입니다😄\n• 아버지사업을 같이해서 오래된 노하우와\n시대에 맞는 저의 젊은 생각을 더하여 운영중입니다.\n• 제가 직접 견적부터 이사당일 추가요금 및 불미스러운일이 없도록 하고 있습니다.\n합리적인 가격과 안심포장 서비스를 보장합니다💕\n• 저희의 서비스는 친절인거같아요.`
  },
  {
    name: '홍길동',
    location: '서울특별시 강남구',
    profile: expert3,
    desc: `안녕하세요 아리랑익스프레스 입니다😄\n• 아버지사업을 같이해서 오래된 노하우와\n시대에 맞는 저의 젊은 생각을 더하여 운영중입니다.\n• 제가 직접 견적부터 이사당일 추가요금 및 불미스러운일이 없도록 하고 있습니다.\n합리적인 가격과 안심포장 서비스를 보장합니다💕\n• 저희의 서비스는 친절인거같아요.`
  },
  {
    name: '홍길동',
    location: '서울특별시 강남구',
    profile: expert4,
    desc: `안녕하세요 아리랑익스프레스 입니다😄\n• 아버지사업을 같이해서 오래된 노하우와\n시대에 맞는 저의 젊은 생각을 더하여 운영중입니다.\n• 제가 직접 견적부터 이사당일 추가요금 및 불미스러운일이 없도록 하고 있습니다.\n합리적인 가격과 안심포장 서비스를 보장합니다💕\n• 저희의 서비스는 친절인거같아요.`
  },
  {
    name: '홍길동',
    location: '서울특별시 강남구',
    profile: expert5,
    desc: `안녕하세요 아리랑익스프레스 입니다😄\n• 아버지사업을 같이해서 오래된 노하우와\n시대에 맞는 저의 젊은 생각을 더하여 운영중입니다.\n• 제가 직접 견적부터 이사당일 추가요금 및 불미스러운일이 없도록 하고 있습니다.\n합리적인 가격과 안심포장 서비스를 보장합니다💕\n• 저희의 서비스는 친절인거같아요.`
  },
  {
    name: '홍길동',
    location: '서울특별시 강남구',
    profile: expert6,
    desc: `안녕하세요 아리랑익스프레스 입니다😄\n• 아버지사업을 같이해서 오래된 노하우와\n시대에 맞는 저의 젊은 생각을 더하여 운영중입니다.\n• 제가 직접 견적부터 이사당일 추가요금 및 불미스러운일이 없도록 하고 있습니다.\n합리적인 가격과 안심포장 서비스를 보장합니다💕\n• 저희의 서비스는 친절인거같아요.`
  }
];

const RecommandExpert = () => {
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
                slidesPerView={3}
                spaceBetween={24}
                navigation
                pagination={{ clickable: true }}
            >
                {expertData.map((expert, idx) => (
                  <SwiperSlide key={idx}>
                    <SlideCard>
                        <QuoteImg
                          src={quote}
                          alt="quote"
                          style={{height:'32px'}}
                          className="quote-img"
                        />
                      <Desc className="desc">{expert.desc}</Desc>
                      <SlideProfile>
                        <img src={expert.profile} alt={expert.name} style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',marginRight:'16px'}} />
                        <div>
                          <SlideName>{expert.name}</SlideName>
                          <SlideLocation className="address">{expert.location}</SlideLocation>
                        </div>
                      </SlideProfile>
                    </SlideCard>
                  </SwiperSlide>
                ))}
            </Swiper>
        </RecommandSection>
    );
};

export default RecommandExpert;
