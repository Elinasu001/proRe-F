import styled from 'styled-components';

// 헤더 전체 컨테이너
export const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(5, 5, 5, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

// 헤더 내부 래퍼
export const HeaderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: space-between;
  }
`;

// 로고
export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  
  a {
    text-decoration: none;
    color: var(--color-3);
    display: flex;
    align-items: center;
    width:150px;
    height:auto;
    object-fit: contain;

    &:focus {
      outline: 2px solid var(--outline);
      outline-offset: 4px;
      border-radius: 4px;
    }
  }

  span.logo-highlight {
    color: var(--outline);
  }
`;


// 네비게이션
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.$isOpen ? '0' : '-100%'};
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: #ffffff;
    flex-direction: column;
    justify-content: flex-start;
    padding: 5rem 2rem 2rem;
    gap: 1.5rem;
    transition: right 0.3s ease-in-out;
    box-shadow: ${props => props.$isOpen ? '-2px 0 8px rgba(0, 0, 0, 0.1)' : 'none'};
    z-index: 999;
    overflow-y: auto; // 모바일에서 스크롤 가능하도록
  }
`;


export const CenteredNavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0;
  }
`;

// 네비게이션 리스트
export const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0;
  }
`;

// 네비게이션 아이템
export const NavItem = styled.li`
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
  }
`;

// 네비게이션 링크
export const NavLink = styled.a`
  text-decoration: none;
  color: var(--color-3);
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }

  &:focus {
    outline: 2px solid var(--outline);
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
    justify-content: space-between;
  }
`;

// 드롭다운 버튼
export const DropdownButton = styled.button`
  background: none;
  border: none;
  color: var(--color-3);
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }

  &:focus {
    outline: 2px solid var(--outline);
    outline-offset: 2px;
    border-radius: 4px;
  }

  svg {
    transition: transform 0.2s;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
    justify-content: space-between;
  }
`;

// 드롭다운 메뉴
export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.2s, visibility 0.2s;
  z-index: 1001;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-top: 0;
    box-shadow: none;
    border-radius: 0;
    max-height: ${props => props.$isOpen ? '200px' : '0'};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    background-color: #f8f8f8;
  }
`;

// 드롭다운 아이템
export const DropdownItem = styled.a`
  display: block;
  padding: 0.75rem 1.25rem;
  color: var(--thirdary);
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    outline: 2px solid var(--outline);
    outline-offset: -2px;
    background-color: #f5f5f5;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    
    &:first-child,
    &:last-child {
      border-radius: 0;
    }
  }
`;

// 로그인 버튼
export const LoginButton = styled.button`
  background: none;
  border: 1px solid #dddddd;
  color: #333333;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    border-color: #00A8E1;
    color: #00A8E1;
  }

  &:focus {
    outline: 2px solid var(--outline);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem;
    margin-top: 1rem;
  }
`;

// 햄버거 메뉴 버튼 (모바일)
export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1000;

  &:focus {
    outline: 2px solid var(--outline);
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

// 모바일 오버레이
export const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
`;

// 로그인 후 사용자 액션 컨테이너
export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid #f0f0f0;
    margin-top: 1rem;
  }
`;

// 아이콘 버튼 (하트, 프로필)
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.2s;
  border: 1px solid #C3D4E9;
  border-radius: 50%;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid var(--outline);
    outline-offset: 2px;
    border-radius: 50%;
  }

  img {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem;
    justify-content: flex-start;
    gap: 0.75rem;
    border-radius: 4px;
    border: none;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

// 알림 배지
export const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.35rem;
  border-radius: 10px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    position: static;
    margin-left: auto;
  }
`;

// 프로필 드롭다운 래퍼
export const ProfileDropdownWrapper = styled.div`
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// 프로필 드롭다운 메뉴
export const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.2s, visibility 0.2s;
  z-index: 1001;
  overflow: hidden;

  @media (max-width: 768px) {
    position: static;
    box-shadow: none;
    border-radius: 0;
    max-height: ${props => props.$isOpen ? '300px' : '0'};
    transition: max-height 0.3s ease-in-out;
    background-color: #f8f8f8;
    margin-top: 0.5rem;
  }
`;

// 프로필 드롭다운 헤더 (내 정보)
export const ProfileDropdownHeader = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #f8f9fa;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #00A8E1;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    background-color: #e8f4f8;
  }
`;

// 프로필 드롭다운 아이템
export const ProfileDropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  color: var(--thirdary);
  text-decoration: none;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;

  svg{
    width: 18px;
    height: 18px;
  }
  img{
    width:24px;
    height:24px;
  }

  svg, img{
     color: #70779C;
  }

  &:hover {
    color: var(--primary);
    background-color: #f5f5f5;
  }

  &:focus {
    color: var(--primary);
    outline: 2px solid var(--outline);
    outline-offset: -2px;
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

// 모바일 아이콘 버튼 레이블
export const IconButtonLabel = styled.span`
  display: none;
  font-size: 1rem;
  color: #333333;

  @media (max-width: 768px) {
    display: block;
  }
`;
