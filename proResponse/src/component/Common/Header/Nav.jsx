import { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
    logout,
    currentUser,
    // favoriteCount = 0
}) => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        logout();
        //console.log('로그아웃');
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
                <NavItem>
                    <LoginButton
                        onClick={() => {
                            //console.log('로그인 버튼 클릭');
                            closeMobileMenu();
                            navigate("/auth/loginForm");
                        }}
                        aria-label="로그인"
                    >
                        로그인
                    </LoginButton>
                </NavItem>
            ) : (
                <UserActions>
                    {/* 찜 목록 (하트 아이콘) */}
                    <a href="/favorite">
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

                            {/* 마이페이지 및 내 견적 메뉴 분기 */}

                            {currentUser?.userRole === 'ROLE_EXPERT' ? (
                                <>
                                    <a href="/mypageExpert">
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
                                    <a href="/estimateExpert" style={{textDecoration:'none',color:'inherit'}}>
                                        <ProfileDropdownItem
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                closeMobileMenu();
                                            }}
                                            role="menuitem"
                                        >
                                            내 견적 보내기
                                        </ProfileDropdownItem>
                                    </a>
                                    {/* 전문가면 일반 회원 전환 버튼 */}
                                    <ProfileDropdownItem
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            closeMobileMenu();
                                            // 기능 없음
                                        }}
                                        role="menuitem"
                                    >
                                        <img src={transIcon} alt="일반 회원 전환" />
                                        일반 회원 전환
                                    </ProfileDropdownItem>
                                </>
                            ) : (
                                <>
                                    <a href="/mypageuser">
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
                                    <a href="/estimateUser" style={{textDecoration:'none',color:'inherit'}}>
                                        <ProfileDropdownItem
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                closeMobileMenu();
                                            }}
                                            role="menuitem"
                                        >
                                            내 견적 요청
                                        </ProfileDropdownItem>
                                    </a>
                                    {/* 일반 회원이면 전문가 전환 버튼 */}
                                    <ProfileDropdownItem
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            closeMobileMenu();
                                            navigate("/expert/register")
                                            // 기능 없음
                                        }}
                                        role="menuitem"
                                    >
                                        <img src={transIcon} alt="전문가 전환" />
                                        전문가 전환
                                    </ProfileDropdownItem>
                                </>
                            )}

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
                        </ProfileDropdown>
                    </ProfileDropdownWrapper>
                </UserActions>
            )}
        </Nav>
    );
};

export default NavMenu;
