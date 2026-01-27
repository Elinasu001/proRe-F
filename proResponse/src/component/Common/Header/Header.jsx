import { useEffect, useRef, useState } from 'react';
import { useAuth } from "../../../context/AuthContext";
import closeIcon from '../../../assets/images/common/close.svg';
import logo from '../../../assets/images/common/logo.png';
import menuIcon from '../../../assets/images/common/menu.svg';
import {
    HamburgerButton,
    HeaderContainer,
    HeaderWrapper,
    Logo,
    Overlay
} from './Header.styled';
import NavMenu from './Nav.jsx';

const Header = () => {
    // 상태 관리
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // 로그인 상태 (실제 앱에서는 전역 상태나 Context로 관리)
    const { isLoggedIn, currentUser, logout } = useAuth();
    const [favoriteCount, setFavoriteCount] = useState(3); // 찜 목록 개수
    
    // Ref
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // 드롭다운 토글
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // 모바일 메뉴 토글
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // 모바일 메뉴 닫기
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            // 드롭다운 외부 클릭 시 닫기
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            
            // 모바일 메뉴 외부 클릭 시 닫기
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                const hamburgerButton = document.getElementById('hamburger-button');
                if (!hamburgerButton.contains(event.target)) {
                    setIsMobileMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Escape 키로 드롭다운 및 모바일 메뉴 닫기
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    // 모바일 메뉴 열렸을 때 body 스크롤 방지
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <HeaderContainer>
                <HeaderWrapper>
                    {/* 로고 */}
                    <Logo>
                        <a href="/" aria-label="ProResponse 홈으로 이동">
                            <img src={logo} alt="ProResponse 로고" />
                        </a>
                    </Logo>

                    {/* 네비게이션 */}
                    <NavMenu
                        isMobileMenuOpen={isMobileMenuOpen}
                        isDropdownOpen={isDropdownOpen}
                        toggleDropdown={toggleDropdown}
                        closeMobileMenu={closeMobileMenu}
                        dropdownRef={dropdownRef}
                        mobileMenuRef={mobileMenuRef}
                        setIsDropdownOpen={setIsDropdownOpen}
                        isLoggedIn={isLoggedIn}
                        favoriteCount={favoriteCount}
                        currentUser={currentUser}
                        logout={logout}
                    />

                    {/* 햄버거 메뉴 버튼 (모바일) */}
                    <HamburgerButton
                        id="hamburger-button"
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <img
                            src={isMobileMenuOpen ? closeIcon : menuIcon}
                            alt={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                            style={{ width: 32, height: 32 }}
                        />
                    </HamburgerButton>
                </HeaderWrapper>
            </HeaderContainer>

            {/* 모바일 오버레이 */}
            <Overlay
                $isOpen={isMobileMenuOpen}
                onClick={closeMobileMenu}
                aria-hidden="true"
            />
        </>
    );
};

export default Header;
