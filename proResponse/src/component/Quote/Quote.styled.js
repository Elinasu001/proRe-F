import styled from 'styled-components';

// 전체 헤더 컨테이너
export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  ${'' /* background: #000; */}
  color: #fff;
  z-index: 1000;
  width: 100%;
`;

// 상단 카테고리 네비게이션 (프로그래밍, 이벤트, 음악)
export const TopNav = styled.nav`
  display: flex;
  ${'' /* justify-content: center; */}
  gap: 20px;
  padding: 60px 0 20px 0;
  border-bottom: 1px solid var(--secondary);

  @media (max-width: 768px) {
    gap: 10px;
    padding: 15px 10px;
    overflow-x: auto;
    justify-content: flex-start;
    
    /* 모바일에서 스크롤 가능하도록 */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// 상단 카테고리 버튼
export const CategoryButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s ease;
  min-width: 80px;

  &:hover {
    span{
        color: var(--primary);
    }
  }
${'' /*   
  [aria-pressed="true"]:focus {
    span{
        color: var(--primary);
    }
  }
   */}

  &:focus-visible {
    outline: 2px solid #4a9eff;
    outline-offset: 4px;
    border-radius: 4px;
  }

  /* 활성화 상태 */
  ${props => props.$active && `
    color: #4a9eff;
  `}

  @media (max-width: 768px) {
    min-width: 60px;
    gap: 4px;
    padding: 8px;
  }
`;

// 카테고리 아이콘 영역
export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* border: 2px solid #333; */}
  border-radius: 12px;
  transition: all 0.3s ease;
  
  ${CategoryButton}:hover & {
    border-color: #4a9eff;
    transform: translateY(-2px);
  }

  ${props => props.$active && `
    border-color: #4a9eff;
    background: rgba(74, 158, 255, 0.1);
  `}

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

// 카테고리 텍스트
export const CategoryText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-6d);


  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// 메뉴 컨텐츠 영역 (왼쪽 메뉴 + 오른쪽 서브메뉴)
export const MenuContent = styled.div`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  max-height: 500px;
  
  @media (max-width: 968px) {
    flex-direction: column;
    max-height: 80vh;
  }
`;

// 왼쪽 메뉴 영역
export const LeftMenu = styled.nav`
  width: 280px;
  border-right: 1px solid var(--secondary);
  overflow-y: auto;
  padding:24px;
  
  li:first-child{
    margin-top:0;
  }
  li{
    margin-top:20px;
  }

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background:var(--gray-secondary);
  }

  &::-webkit-scrollbar-thumb {
    background:var(--gray-secondary)
    border-radius: 3px;
  }

  @media (max-width: 968px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--secondary);
    max-height: 200px;
  }
`;

// 왼쪽 메뉴 리스트
export const LeftMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// 왼쪽 메뉴 아이템
export const LeftMenuItem = styled.li`
  button {
    width: 100%;
    padding: 20px 24px;
    background: transparent;
    border: none;
    border-radius: 10px;
    border-left: 3px solid transparent;
    color: #888;
    text-align: left;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: var(--gray-primary);
      color: var(--color-3);
    }

    &:focus-visible {
      outline: 2px solid #4a9eff;
      outline-offset: -2px;
    }

    /* 활성화 상태 */
    ${props => props.$active && `
      background: var(--gray-primary);
      color: var(--color-3);
    `}

    @media (max-width: 768px) {
      padding: 16px 20px;
      font-size: 14px;
    }
  }
`;

// 오른쪽 서브메뉴 영역
export const RightMenu = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  ${'' /* background: #000; */}

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background:var(--gray-secondary)
  }

  &::-webkit-scrollbar-thumb {
    background:var(--gray-secondary)
    border-radius: 3px;
  }

  @media (max-width: 968px) {
    padding: 20px;
    max-height: calc(80vh - 200px);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// 서브메뉴 섹션
export const SubMenuSection = styled.section`
  margin-bottom: 48px;
  scroll-margin-top: 24px; /* 스크롤 시 여백 확보 */

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

// 서브메뉴 제목
export const SubMenuTitle = styled.h3`
  font-size: 20px;
  font-weight: var(--font-w-b);
  margin-bottom: 16px;
  color: var(--color-3);

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

// 서브메뉴 리스트
export const SubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

// 서브메뉴 아이템
export const SubMenuItem = styled.li`
  a {
    display: block;
    padding: 16px 16px 16px 0;
    ${'' /* background: #1a1a1a; */}
    border-radius: 8px;
    color: var(--color-3);
    text-decoration: none;
    font-size: var(--font16);
    transition: all 0.2s ease;

    &:hover {
      ${'' /* background: #252525; */}
      color: var(--primary);
      transform: translateX(4px);
    }

    &:focus-visible {
      outline: 2px solid #4a9eff;
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      padding: 10px 14px;
      font-size: 13px;
    }
  }
`;
