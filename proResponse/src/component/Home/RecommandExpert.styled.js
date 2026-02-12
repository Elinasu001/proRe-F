import styled from 'styled-components';
import quoteAImg from '../../assets/images/common/quote_a.png';

export const RecommandSection = styled.section`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    padding: 100px 0 80px 0;
        .mySwiper{
            min-height: 500px;
        }
        .mySwiper .swiper-slide-next > div {
            background: #4F9CF9;
            box-shadow: 0 8px 32px rgba(79,156,249,0.18);
            transition: background 0.2s, color 0.2s, border 0.2s;
            .quote-img {
                content: url(${quoteAImg});
            }
            .desc{
                color:var(--white);
                font-weight:var(--font-w-r);
            }
            .address{
                color:var(--white);
            }
        }
`;

export const QuoteImg = styled.img`
    display: block;
    width: 32px;
    height: 32px;
    object-fit: contain;
    /* margin-bottom: 16px; */
    pointer-events: none;
`;

export const Desc = styled.span`
    font-size: 16px;
    font-weight: var(--font-w-r);
    color: #6A7685;
    letter-spacing: -0.5px;
    line-height:1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    overflow-wrap: break-word;
`;

export const RecommandTitleWrap = styled.div`
    text-align: center;
    margin-bottom: 40px;
`;

export const RecommandTitle = styled.h2`
    font-size: 38px;
    font-weight: 700;
    color:var(--color-2);
    position: relative;
    display: inline-block;
    z-index: 2;
`;

export const LineImg = styled.img`
    position: absolute;
    left: 50%;
    bottom: -18px;
    transform: translateX(-50%);
    width: 320px;
    height: 32px;
    object-fit: contain;
    pointer-events: none;
    z-index: 1;
`;

export const SlideContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SlideNav = styled.button`
    background: none;
    border: none;
    font-size: 32px;
    color: #1e5a8e;
    cursor: pointer;
    margin: 0 16px;
    padding: 0 8px;
    user-select: none;
`;

export const SlideWrapper = styled.div`
    display: flex;
    gap: 24px;
`;

export const SlideCard = styled.div`
    background: #f7faff;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(30,90,142,0.08);
    padding: 32px 24px 24px 24px;
    min-width: 320px;
    width: 360px;
    height:415px;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 1024px) {
        min-width: auto;
        max-width: none;
    }

`;

export const Top = styled.div`
    overflow: hidden;
    height:240px;
    /* flex-grow: 1; */
    /* margin-bottom:16px; */
    text-overflow: ellipsis;
`;

export const SlideProfile = styled.div`
    display: flex;
    align-items: center;
    padding-top: 24px;
    min-width: 320px;
    width:100%;
    border-top:1px solid var(--secondary);
`;

export const SlideName = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #222;
`;

export const SlideLocation = styled.div`
    font-size: var(--font14);
    margin-top:0.5rem;
    color: #888;
`;

export const DetailButton = styled.button`
    align-self: flex-end;
    margin-bottom:12px;
    background: none;
    border: none;
    color: var(--primary);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

export const ModalBody = styled.div`
    padding: 24px;
    font-size: 16px;
    color: #333;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: keep-all;
    overflow-wrap: break-word;
`;

export const ProfileImg = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 16px;

`;
