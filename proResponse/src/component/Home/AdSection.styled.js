
import styled from 'styled-components';

export const AdSectionContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 500px;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const RoundWaveBg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 100%;
  object-fit: contain;
  z-index: 0;
  pointer-events: none;
`;

export const AdContent = styled.div`
    display:flex;
    position: relative;
    width:100%;
    max-width: 1200px;
    padding:0 20px;
    margin: 0 auto;
    justify-content: space-between;
`;

export const AdIcon = styled.span`
    font-size: var(--font20);
    margin-bottom: 16px;
    color: var(--color-2);
    opacity: 0.6;
`;

export const AdTopTitle = styled.h2`
    margin-top: 1rem;
    font-size: var(--font38);
    font-weight: 700;
    line-height: 1.1;
    color: var(--color-2);
`;

export const AdSubTitle = styled.p`
    margin: 32px 0 24px 0;
    font-size: var(--font20);
    color: var(--color-6d);
`;

export const CTAButton = styled.button`
  background: #4F9CF9;
  color: white;
  border: none;
  padding: 16px 20px;
  font-size:var(--font16);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
  gap: 8px;
  display: inline-flex;

  &:hover {
    background: #4a89ca;
  }
  &:active {
    transform: translateY(0);
  }
`;


export const AdTitle = styled.div`
    color: #222;
`;

export const AdProfile = styled.div`
    color: #222;
    max-width: 600px;
    border-radius:10px;
    border-radius: 10px;
    overflow: hidden;
`;

export const ServiceImg = styled.img`
    width: 100%;
    height: auto;
    object-fit:contain
`;



export const HighlightWrap = styled.span`
  position: relative;
  display: inline-block;
`;

export const LineImg = styled.img`
  position: absolute;
  top:20px;
  left: 0;
  bottom: 0.1em;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  z-index: 1;
`;

export const AdTooltip = styled.div`
  position: absolute;
  left: 50%;
  top: -44px;
  transform: translateX(-50%);
  background: #222;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 15px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  z-index: 10;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #222;
  }
`;