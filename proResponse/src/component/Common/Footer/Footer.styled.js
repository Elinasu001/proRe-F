import styled from 'styled-components';

// Skip Link for Accessibility
export const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: #00A8E8;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
  border-radius: 0 0 4px 0;
  font-weight: 500;

  &:focus {
    top: 0;
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }
`;

// Screen Reader Only
export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

// Footer Container
export const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  padding: 60px 20px 0;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    background-color: #1a1a1a;
    border-top-color: #333333;
  }

  @media (max-width: 768px) {
   
    padding: 0 20px;
 
  }

  @media (max-width: 480px) {
    padding: 40px 16px 0;
  }
`;

export const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Footer Main
export const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e0e0e0;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #333333;
  }

  @media (max-width: 768px) {
    display:none;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// Brand Section
export const FooterBrand = styled.div`
  max-width: 350px;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    max-width: 100%;
  }
`;

export const FooterLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  text-decoration: none;
  width: fit-content;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid #00A8E8;
    outline-offset: 4px;
    border-radius: 4px;
  }

  &:focus-visible {
    outline: 2px solid #00A8E8;
    outline-offset: 4px;
  }

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const LogoIcon = styled.span`
  color: #00A8E8;
  font-weight: 700;
`;

export const FooterDescription = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #666666;

  @media (prefers-color-scheme: dark) {
    color: #b0b0b0;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Footer Columns
export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }

  @media (prefers-contrast: high) {
    font-weight: 700;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const FooterLink = styled.a`
  color: #666666;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease;
  display: inline-block;
  position: relative;

  &:hover {
    color: #00A8E8;
  }

  &:focus {
    outline: 2px solid #00A8E8;
    outline-offset: 2px;
    border-radius: 2px;
    color: #00A8E8;
  }

  &:focus-visible {
    outline: 2px solid #00A8E8;
    outline-offset: 2px;
  }

  @media (prefers-color-scheme: dark) {
    color: #b0b0b0;

    &:hover,
    &:focus {
      color: #00A8E8;
    }
  }

  @media (prefers-contrast: high) {
    color: #000000;
    font-weight: 500;

    &:focus {
      outline-width: 3px;
    }
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Footer Bottom
export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  font-size: 14px;
  color: #666666;

  @media (prefers-color-scheme: dark) {
    color: #b0b0b0;
  }

  @media (max-width: 768px) {
    ${'' /* flex-direction: column; */}
    gap: 16px;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const FooterCopyright = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;

  time {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const FooterPolicy = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  span[aria-hidden="true"] {
    color: #666666;

    @media (prefers-color-scheme: dark) {
      color: #b0b0b0;
    }
  }

  @media (max-width: 768px) {
    ${'' /* flex-direction: column; */}
    gap: 12px;

    span[aria-hidden="true"] {
      display: none;
    }
  }
`;

export const PolicyLink = styled.a`
  color: #666666;
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: #00A8E8;
    transition: width 0.2s ease;
  }

  &:hover {
    color: #00A8E8;

    &::after {
      width: 100%;
    }
  }

  &:focus {
    outline: 2px solid #00A8E8;
    outline-offset: 2px;
    border-radius: 2px;
    color: #00A8E8;
  }

  &:focus-visible {
    outline: 2px solid #00A8E8;
    outline-offset: 2px;
  }

  @media (prefers-color-scheme: dark) {
    color: #b0b0b0;

    &:hover,
    &:focus {
      color: #00A8E8;
    }
  }

  @media (prefers-contrast: high) {
    &:focus {
      outline-width: 3px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::after {
      transition: none;
    }
  }
`;
