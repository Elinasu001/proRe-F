import { useEffect, useRef, useState } from 'react';
import eventIcon from '../../assets/images/common/event.png';
import musicIcon from '../../assets/images/common/music.png';
import programIcon from '../../assets/images/common/program.png';
import {
  CategoryButton,
  CategoryText,
  HeaderContainer,
  IconWrapper,
  LeftMenu,
  LeftMenuItem,
  LeftMenuList,
  MenuContent,
  RightMenu,
  SubMenuItem,
  SubMenuList,
  SubMenuSection,
  SubMenuTitle,
  TopNav,
} from './Quote.styled';


const NavigationHeader = () => {
  // 상태 관리
  const [activeCategory, setActiveCategory] = useState('programming'); // 현재 활성화된 카테고리
  const [activeSection, setActiveSection] = useState(''); // 현재 활성화된 섹션

  // Ref 관리
  const rightMenuRef = useRef(null); // 오른쪽 메뉴 스크롤 감지용
  const sectionRefs = useRef({}); // 각 섹션 엘리먼트 참조

  // 메뉴 데이터 구조
  const menuData = {
    programming: {
      icon: <img src={programIcon} alt="프로그래밍"/>,
      label: '프로그래밍',
      sections: [
        {
          id: 'event-prep',
          title: '행사 준비',
          items: ['꽃장식', '파티/행사기획', '굿즈/판촉물제작', '전시부스 제작', '트로피/상패 제작']
        },
        {
          id: 'event-setup',
          title: '행사 설의',
          items: ['무술공연', '타로 행사', '예언/점술', '매직/버블쇼', '스카이댄스 제작']
        },
        {
          id: 'event-staff',
          title: '행사 인력',
          items: ['업서 제작(초대장/성첩장)', '트로피/상패 제작']
        }
      ]
    },
    event: {
      icon: <img src={eventIcon} alt="이벤트"/>, 
      label: '이벤트',
      sections: [
        {
          id: 'event-planning',
          title: '행사 기획',
          items: ['기업 행사', '공연 기획', '축제 기획', '전시회']
        },
        {
          id: 'event-management',
          title: '행사 관리',
          items: ['일정 관리', '예산 관리', '참가자 관리', '장소 섭외']
        }
      ]
    },
    music: {
      icon: <img src={musicIcon} alt="음악"/>,
      label: '음악',
      sections: [
        {
          id: 'performance',
          title: '공연',
          items: ['라이브 공연', '콘서트', '버스킹', '페스티벌']
        },
        {
          id: 'recording',
          title: '녹음',
          items: ['스튜디오 녹음', '믹싱', '마스터링', '편곡']
        }
      ]
    }
  };


  // 현재 활성화된 카테고리의 섹션들
  const currentSections = menuData[activeCategory]?.sections || [];

  /**
   * 초기 로드 시 첫 번째 섹션을 자동으로 활성화
   */
  useEffect(() => {
    const firstSectionId = menuData[activeCategory]?.sections[0]?.id;
    if (firstSectionId && !activeSection) {
      setActiveSection(firstSectionId);
    }
  }, [activeCategory, activeSection, menuData]);

  /**
   * IntersectionObserver를 사용한 스크롤 감지
   * - 오른쪽 메뉴 스크롤 시 현재 보이는 섹션을 감지
   * - 감지된 섹션에 맞춰 왼쪽 메뉴 활성화 상태 변경
   */
  useEffect(() => {
    const options = {
      root: rightMenuRef.current,
      rootMargin: '-10% 0px -80% 0px', // 상단 10% 지점에서 감지 (더 빠른 반응)
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      // 가장 먼저 보이는 섹션을 찾아서 활성화
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // 여러 섹션이 보일 때는 가장 위에 있는 것을 선택
        const topEntry = visibleEntries.reduce((prev, current) => {
          return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
        });
        
        const sectionId = topEntry.target.getAttribute('data-section-id');
        setActiveSection(sectionId);
      }
    }, options);

    // 모든 섹션에 옵저버 연결
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // 클린업: 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeCategory]);

  /**
   * 카테고리 변경 핸들러
   * @param {string} category - 선택된 카테고리 키
   */
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // 카테고리 변경 시 첫 번째 섹션을 활성화 (숨고 스타일)
    const firstSectionId = menuData[category]?.sections[0]?.id;
    if (firstSectionId) {
      setActiveSection(firstSectionId);
    }
    
    // 접근성: 스크린 리더에 변경 사항 알림
    const announcement = `${menuData[category].label} 카테고리가 선택되었습니다`;
    announceToScreenReader(announcement);
  };

  /**
   * 왼쪽 메뉴 클릭 핸들러
   * - 스크롤 이동 없이 활성화 상태만 변경
   * @param {string} sectionId - 선택한 섹션 ID
   */
  const handleLeftMenuClick = (sectionId) => {
    // 클릭 시에는 활성화 상태만 변경하고 스크롤은 이동하지 않음
    setActiveSection(sectionId);
  };

  /**
   * 스크린 리더에 메시지 전달 (웹 접근성)
   * @param {string} message - 전달할 메시지
   */
  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  /**
   * 섹션 Ref 설정 함수
   * @param {string} sectionId - 섹션 ID
   * @param {HTMLElement} element - DOM 엘리먼트
   */
  const setSectionRef = (sectionId, element) => {
    sectionRefs.current[sectionId] = element;
  };

  return (
    <HeaderContainer>
      {/* 상단 카테고리 네비게이션 */}
      <TopNav role="navigation" aria-label="주 카테고리">
        {Object.entries(menuData).map(([key, category]) => (
          <CategoryButton
            key={key}
            onClick={() => handleCategoryChange(key)}
            $active={activeCategory === key}
            aria-pressed={activeCategory === key}
            aria-label={`${category.label} 카테고리`}
          >
            <IconWrapper $active={activeCategory === key}>
              <span role="img" aria-hidden="true">
                {category.icon}
              </span>
            </IconWrapper>
            <CategoryText>{category.label}</CategoryText>
          </CategoryButton>
        ))}
      </TopNav>

      {/* 메뉴 컨텐츠 영역 */}
      <MenuContent 
        $isOpen={true}
        role="region"
        aria-label={`${menuData[activeCategory]?.label} 메뉴`}
      >
        {/* 왼쪽 메뉴 */}
        <LeftMenu role="navigation" aria-label="섹션 네비게이션">
          <LeftMenuList>
            {currentSections.map((section) => (
              <LeftMenuItem 
                key={section.id}
                $active={activeSection === section.id}
              >
                <button
                  onClick={() => handleLeftMenuClick(section.id)}
                  aria-current={activeSection === section.id ? 'true' : 'false'}
                >
                  {section.title}
                </button>
              </LeftMenuItem>
            ))}
          </LeftMenuList>
        </LeftMenu>

        {/* 오른쪽 서브메뉴 */}
        <RightMenu 
          ref={rightMenuRef}
          role="main"
          aria-label="서브 메뉴 목록"
        >
          {currentSections.map((section) => (
            <SubMenuSection
              key={section.id}
              ref={(el) => setSectionRef(section.id, el)}
              data-section-id={section.id}
              aria-labelledby={`section-${section.id}`}
            >
              <SubMenuTitle id={`section-${section.id}`}>
                {section.title}
              </SubMenuTitle>
              <SubMenuList>
                {section.items.map((item, index) => (
                  <SubMenuItem key={index}>
                    <a 
                      href={`#${section.id}-${index}`}
                      onClick={(e) => {
                        e.preventDefault();
                        // 실제 프로젝트에서는 라우팅 처리
                        console.log(`${item} 클릭됨`);
                      }}
                    >
                      {item}
                    </a>
                  </SubMenuItem>
                ))}
              </SubMenuList>
            </SubMenuSection>
          ))}
        </RightMenu>
      </MenuContent>
    </HeaderContainer>
  );
};

export default NavigationHeader;
