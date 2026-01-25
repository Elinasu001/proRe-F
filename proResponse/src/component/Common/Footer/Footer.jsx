import logo from '../../../assets/images/common/logo.png';
import {
    FooterBottom,
    FooterBrand,
    FooterColumn,
    FooterColumnTitle,
    FooterContainer,
    FooterCopyright,
    FooterDescription,
    FooterLink,
    FooterLinks,
    FooterLogo,
    FooterMain,
    FooterPolicy,
    FooterWrapper,
    PolicyLink,
    SkipLink,
    SrOnly
} from './Footer.styled';
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
        {/* 접근성을 위한 Skip Link */}
        <SkipLink href="#main-content">
            메인 콘텐츠로 건너뛰기
        </SkipLink>

        <FooterContainer role="contentinfo" aria-label="사이트 푸터">
            <FooterWrapper>
            {/* Footer Main Content */}
            <FooterMain>
                {/* Brand Section */}
                <FooterBrand>
                <FooterLogo href="/" aria-label="ProResponse 홈으로 이동">
                    {/* 로고 */}
                    <img src={logo} alt="ProResponse 로고" />
                </FooterLogo>
                <FooterDescription>
                    Our vision is to provide convenience and help increase your sales business.
                </FooterDescription>
                </FooterBrand>

                {/* About Column */}
                <FooterColumn as="nav" aria-label="About 메뉴">
                <FooterColumnTitle>About</FooterColumnTitle>
                <FooterLinks>
                    <li>
                    <FooterLink href="/how-it-works">
                        How it works
                    </FooterLink>
                    </li>
                    <li>
                    <FooterLink href="/featured">
                        Featured
                    </FooterLink>
                    </li>
                </FooterLinks>
                </FooterColumn>

                {/* Community Column */}
                <FooterColumn as="nav" aria-label="Community 메뉴">
                <FooterColumnTitle>Community</FooterColumnTitle>
                <FooterLinks>
                    <li>
                    <FooterLink href="/product">
                        Product
                    </FooterLink>
                    </li>
                    <li>
                    <FooterLink href="/events">
                        Events
                    </FooterLink>
                    </li>
                </FooterLinks>
                </FooterColumn>

                {/* Social Column */}
                <FooterColumn as="nav" aria-label="Social 메뉴">
                <FooterColumnTitle>Social</FooterColumnTitle>
                <FooterLinks>
                    <li>
                    <FooterLink 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Instagram
                        <SrOnly>(새 창에서 열림)</SrOnly>
                    </FooterLink>
                    </li>
                    <li>
                    <FooterLink 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Twitter
                        <SrOnly>(새 창에서 열림)</SrOnly>
                    </FooterLink>
                    </li>
                </FooterLinks>
                </FooterColumn>
            </FooterMain>

            {/* Footer Bottom */}
            <FooterBottom>
                <FooterCopyright>
                <span aria-label="Copyright">&copy;</span>
                <time dateTime={currentYear}>{currentYear}</time>
                <span>ProResponse. All rights reserved</span>
                </FooterCopyright>
                <FooterPolicy as="nav" aria-label="정책 메뉴">
                <PolicyLink href="/privacy">Privacy</PolicyLink>
                <span aria-hidden="true">&</span>
                <PolicyLink href="/policy">Policy</PolicyLink>
                </FooterPolicy>
            </FooterBottom>
            </FooterWrapper>
        </FooterContainer>
        </>
    );
};

export default Footer;
