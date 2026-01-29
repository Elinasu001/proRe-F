import { useEffect, useMemo, useRef, useState } from "react";
import eventIcon from "../../assets/images/common/event.png";
import musicIcon from "../../assets/images/common/music.png";
import programIcon from "../../assets/images/common/program.png";
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
} from "./Quote.styled";
import { axiosPublic } from "../../api/reqApi.js";
import { useNavigate } from "react-router-dom";

// 카테고리별 아이콘 매핑
const ICON_MAP = [eventIcon, musicIcon, programIcon];

const NavigationHeader = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const rightMenuRef = useRef(null);
  const sectionRefs = useRef({});

  // 전체 카테고리 조회 (첫 로드)
  useEffect(() => {
    axiosPublic
      .getList("/api/categories")
      .then((res) => {
        setCategory(res.data);
        if (res.data.length > 0) {
          const firstCategoryNo = res.data[0].categoryNo;
          setActiveCategory(firstCategoryNo);

          // 첫 번째 카테고리 소분류 조회
          axiosPublic
            .getList(`/api/categories/${firstCategoryNo}`)
            .then((res) => {
              setCategory((prev) =>
                prev.map((cat) =>
                  cat.categoryNo === firstCategoryNo
                    ? { ...cat, detailData: res.data }
                    : cat,
                ),
              );

              if (res.data.length > 0) {
                setActiveSection(`section-${firstCategoryNo}-0`);
              }
            })
            .catch(console.error);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 카테고리 클릭 시 소분류 조회
  const handelCategoryClick = (categoryNo) => {
    setActiveCategory(categoryNo);

    axiosPublic
      .getList(`/api/categories/${categoryNo}`)
      .then((res) => {
              console.log(res)
        setCategory((prevCategory) =>
          prevCategory.map((cat) =>
            cat.categoryNo === categoryNo
              ? { ...cat, detailData: res.data }
              : cat,
          ),
        );

        // 첫 번째 섹션 자동 선택
        if (res.data.length > 0) {
          setActiveSection(`section-${categoryNo}-0`);
        } else {
          setActiveSection("");
        }
      })
      .catch(console.error);
  };

  const handleDetailClick = (detailCategoryNo , sectionTitle) => {
    axiosPublic
      .getList(`/api/categories/experts/${detailCategoryNo}`)
      .then((res) => {
        const expertsData = res.data || [];

        // ExportList 페이지로 이동, state로 전문가 데이터 전달
        navigate("/exportList", { state: { experts: expertsData , categoryName: sectionTitle ,detailCategoryNo : detailCategoryNo } });
      })
      .catch(console.error);
  };

  // menuData 생성
  const menuData = useMemo(() => {
    if (!category || category.length === 0) return {};

    const result = {};
    category.forEach((cat, index) => {
      const categoryNo = cat.categoryNo;
      const detailData = cat.detailData || [];

      const sections = detailData.map((section, sectionIndex) => ({
        id: `section-${categoryNo}-${sectionIndex}`,
        title: section.categoryName,
        items:
          section.details?.map((d) => ({
            name: d.categoryName,
            detailCategoryNo: d.categoryDetailNo,
          })) || [],
      }));

      result[categoryNo] = {
        icon: (
          <img src={ICON_MAP[index % ICON_MAP.length]} alt={cat.expertName} />
        ),
        label: cat.expertName,
        sections,
      };
    });

    return result;
  }, [category]);

  // IntersectionObserver: 오른쪽 메뉴 스크롤 감지
  useEffect(() => {
    if (!rightMenuRef.current) return;

    const options = {
      root: rightMenuRef.current,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const topEntry = visibleEntries.reduce((prev, current) =>
          prev.boundingClientRect.top < current.boundingClientRect.top
            ? prev
            : current,
        );
        const sectionId = topEntry.target.getAttribute("data-section-id");
        setActiveSection(sectionId);
      }
    }, options);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeCategory]);

  // 왼쪽 메뉴 클릭
  const handleLeftMenuClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  // 섹션 Ref 설정
  const setSectionRef = (sectionId, element) => {
    sectionRefs.current[sectionId] = element;
  };

  if (loading || !activeCategory || !menuData[activeCategory]) {
    return <div>로딩중...</div>;
  }

  const currentSections = menuData[activeCategory].sections;

  return (
    <HeaderContainer>
      {/* 상단 카테고리 네비게이션 */}
      <TopNav role="navigation" aria-label="주 카테고리">
        {Object.entries(menuData).map(([key, cat]) => (
          <CategoryButton
            key={key}
            onClick={() => handelCategoryClick(Number(key))}
            $active={activeCategory === Number(key)}
          >
            <IconWrapper $active={activeCategory === Number(key)}>
              {cat.icon}
            </IconWrapper>
            <CategoryText>{cat.label}</CategoryText>
          </CategoryButton>
        ))}
      </TopNav>

      {/* 메뉴 컨텐츠 */}
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
                  aria-current={activeSection === section.id ? "true" : "false"}
                >
                  {section.title}
                </button>
              </LeftMenuItem>
            ))}
          </LeftMenuList>
        </LeftMenu>

        {/* 오른쪽 서브메뉴 */}
        <RightMenu ref={rightMenuRef} role="main" aria-label="서브 메뉴 목록">
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
                        handleDetailClick(item.detailCategoryNo,section.title); // ID 전달
                      }}
                    >
                      {item.name}
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
