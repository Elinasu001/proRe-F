import { useState } from 'react';
import likeIcon from '../../../assets/images/common/like.png';
import transIcon from '../../../assets/images/common/trans.png';
import userIcon from '../../../assets/images/common/user.png';
import {
    CenteredNavList,
    DropdownButton,
    DropdownItem,
    DropdownMenu,
    IconButton,
    IconButtonLabel,
    LoginButton,
    Nav,
    NavItem,
    NavLink,
    ProfileDropdown,
    ProfileDropdownHeader,
    ProfileDropdownItem,
    ProfileDropdownWrapper,
    UserActions
} from './Header.styled';



const NavMenu = ({
    isMobileMenuOpen,
    isDropdownOpen,
    toggleDropdown,
    closeMobileMenu,
    dropdownRef,
    mobileMenuRef,
    setIsDropdownOpen,
    isLoggedIn = false,
    // favoriteCount = 0
}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        console.log('로그아웃');
        setIsProfileOpen(false);
        closeMobileMenu();
    };

    return (
        <Nav
            $isOpen={isMobileMenuOpen}
            ref={mobileMenuRef}
            role="navigation"
            aria-label="주요 메뉴"
        >
            <CenteredNavList>
                {/* Home */}
                <NavItem>
                    <NavLink
                        href="/"
                        onClick={closeMobileMenu}
                    >
                        Home
                    </NavLink>
                </NavItem>

                {/* 전문가 찾기 (드롭다운) */}
                <NavItem ref={dropdownRef}>
                    <DropdownButton
                        onClick={toggleDropdown}
                        $isOpen={isDropdownOpen}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                        aria-label="전문가 찾기 메뉴"
                    >
                        전문가 찾기
                        <svg
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </DropdownButton>

                    <DropdownMenu
                        $isOpen={isDropdownOpen}
                        role="menu"
                        aria-label="전문가 찾기 하위 메뉴"
                    >
                        <DropdownItem
                            href="/quote"
                            role="menuitem"
                            onClick={() => {
                                setIsDropdownOpen(false);
                                closeMobileMenu();
                            }}
                        >
                            견적 요청
                        </DropdownItem>
                        <DropdownItem
                            href="/nearby"
                            role="menuitem"
                            onClick={() => {
                                setIsDropdownOpen(false);
                                closeMobileMenu();
                            }}
                        >
                            주변 전문가 찾기
                        </DropdownItem>
                    </DropdownMenu>
                </NavItem>

                {/* Contact Us */}
                <NavItem>
                    <NavLink
                        href="/contact"
                        onClick={closeMobileMenu}
                    >
                        Contact Us
                    </NavLink>
                </NavItem>
            </CenteredNavList>

            {/* 모바일에서만 표시되는 UserActions */}
            {!isLoggedIn ? (
                <NavItem style={{ width: '100%', borderTop: '1px solid #f0f0f0', marginTop: '1rem', paddingTop: '1rem' }}>
                    <LoginButton
                        onClick={() => {
                            console.log('로그인 버튼 클릭');
                            closeMobileMenu();
                        }}
                        aria-label="로그인"
                    >
                        로그인
                    </LoginButton>
                </NavItem>
            ) : (
                <UserActions>
                    {/* 찜 목록 (하트 아이콘) */}
                    <a href="/favorite" style={{display:'flex',alignItems:'center'}}>
                        <IconButton
                            onClick={() => {
                                console.log('찜 목록 클릭');
                                closeMobileMenu();
                            }}
                        >
                            <img src={likeIcon} alt="찜 목록" />
                            <IconButtonLabel>찜 목록</IconButtonLabel>
                        </IconButton>
                    </a>

                    {/* 프로필 드롭다운 */}
                    <ProfileDropdownWrapper>
                        <IconButton
                            onClick={toggleProfile}
                            aria-label="프로필 메뉴"
                            aria-expanded={isProfileOpen}
                            aria-haspopup="true"
                        >
                            <img src={userIcon} alt="프로필" />
                            <IconButtonLabel>프로필</IconButtonLabel>
                        </IconButton>

                        <ProfileDropdown
                            $isOpen={isProfileOpen}
                            role="menu"
                            aria-label="프로필 메뉴"
                        >
                            {/* 내 정보 헤더 */}
                            <ProfileDropdownHeader>
                                <h4>내 정보</h4>
                            </ProfileDropdownHeader>

                            <a href="/mypage" style={{textDecoration:'none',color:'inherit'}}>
                                <ProfileDropdownItem
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        closeMobileMenu();
                                    }}
                                    role="menuitem"
                                >
                                    마이페이지
                                </ProfileDropdownItem>
                            </a>

                            {/* 로그아웃 */}
                            <ProfileDropdownItem
                                onClick={handleLogout}
                                role="menuitem"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                                </svg>
                                로그아웃
                            </ProfileDropdownItem>

                            {/* 견적 요청 */}
                            <a href="/myquote" style={{textDecoration:'none',color:'inherit'}}>
                                <ProfileDropdownItem
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        closeMobileMenu();
                                    }}
                                    role="menuitem"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                    </svg>
                                    견적 요청
                                </ProfileDropdownItem>
                            </a>

                            {/* 전문가 전환 */}
                            <ProfileDropdownItem
                                onClick={() => {
                                    console.log('전문가 모드로 전환');
                                    setIsProfileOpen(false);
                                    closeMobileMenu();
                                }}
                                role="menuitem"
                            >
                                <img src={transIcon} alt="전문가 전환" />
                                전문가 전환
                            </ProfileDropdownItem>
                        </ProfileDropdown>
                    </ProfileDropdownWrapper>
                </UserActions>
            )}
        </Nav>
    );
};

export default NavMenu;
