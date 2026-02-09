import { createGlobalStyle } from 'styled-components';

export const SwiperGlobalStyle = createGlobalStyle`
  .mySwiper {
    ${'' /* border-radius: 16px; */}
  }
  .mySwiper .swiper-slide {
    padding: 16px;
  }
  .mySwiper .swiper-button-next,
  .mySwiper .swiper-button-prev {
    color: #216ba5;
    border-radius: 50%;
    top: 45%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, color 0.3s;
  }
  .mySwiper .swiper-button-next:hover,
  .mySwiper .swiper-button-prev:hover {
    ${'' /* background-color: #043873; */}
    color: #043873;
  }
  .mySwiper .swiper-pagination-bullet {
    background-color: #ccc;
    width:16px;
    height:16px;
    opacity: 1;
  }
  .mySwiper .swiper-pagination-bullet-active {
    background-color: #043873;
    width:40px;
    border-radius:10px;
  }

  @media (max-width: 768px) {
    .mySwiper .swiper-slide{
      margin-right:0 !important;
    }
  }
`;
