// /api/categories/{id} 응답 더미 데이터 (카테고리별 상세)
const dummyExportDetailCategory = {
  // 카테고리 1: 이벤트
  1: {
    message: "조회에 성공했습니다.",
    data: [
      {
        categoryName: "촬영 및 편집",
        details: [
          { categoryDetailNo: 1, categoryName: "영상 편집" },
          { categoryDetailNo: 2, categoryName: "기업/상업용 사진 촬영" },
          { categoryDetailNo: 3, categoryName: "스냅 촬영" },
          { categoryDetailNo: 4, categoryName: "기업/상업용 영상촬영" },
          { categoryDetailNo: 5, categoryName: "3D 영상제작" },
          { categoryDetailNo: 6, categoryName: "사진 편집 및 보정" },
          { categoryDetailNo: 7, categoryName: "개인용 영상촬영" },
          { categoryDetailNo: 8, categoryName: "개인용 사진촬영" },
          { categoryDetailNo: 9, categoryName: "드론 촬영" },
          { categoryDetailNo: 10, categoryName: "생중계/스트리밍 촬영" },
          { categoryDetailNo: 11, categoryName: "자막 제작" }
        ]
      },
      {
        categoryName: "음향 및 편집",
        details: [
          { categoryDetailNo: 12, categoryName: "음악 편집 및 제작" },
          { categoryDetailNo: 13, categoryName: "나레이션/더빙" },
          { categoryDetailNo: 14, categoryName: "BGM/사운드 제작" },
          { categoryDetailNo: 15, categoryName: "음반 제작 및 발매" }
        ]
      }
    ],
    success: true,
    timestamp: "2026-01-27T14:50:25.6256802"
  },
  // 카테고리 2: 과외
  2: {
    message: "조회에 성공했습니다.",
    data: [
      {
        categoryName: "제2외국어",
        details: [
          { categoryDetailNo: 16, categoryName: "영어 과외" },
          { categoryDetailNo: 17, categoryName: "아랍어 과외" },
          { categoryDetailNo: 18, categoryName: "히브리어 과외" }
        ]
      },
      {
        categoryName: "음악",
        details: [
          { categoryDetailNo: 19, categoryName: "피아노 레슨" },
          { categoryDetailNo: 20, categoryName: "드럼 레슨" },
          { categoryDetailNo: 21, categoryName: "통기타 레슨" },
          { categoryDetailNo: 22, categoryName: "일렉기타 레슨" },
          { categoryDetailNo: 23, categoryName: "베이스기타 레슨" },
          { categoryDetailNo: 24, categoryName: "보컬 레슨" }
        ]
      }
    ],
    success: true,
    timestamp: "2026-01-27T14:50:38.9579223"
  },
  // 카테고리 3: 개발
  3: {
    message: "조회에 성공했습니다.",
    data: [
      {
        categoryName: "백엔드 개발",
        details: [
          { categoryDetailNo: 25, categoryName: "Java / Spring" },
          { categoryDetailNo: 26, categoryName: "Node.js" },
          { categoryDetailNo: 27, categoryName: "DB 설계 (MySQL / Oracle)" },
          { categoryDetailNo: 28, categoryName: "Python (Django / FastAPI)" },
          { categoryDetailNo: 29, categoryName: "API 서버 구축" }
        ]
      },
      {
        categoryName: "프론트엔드 개발",
        details: [
          { categoryDetailNo: 30, categoryName: "HTML / CSS" },
          { categoryDetailNo: 31, categoryName: "JavaScript" },
          { categoryDetailNo: 32, categoryName: "React" },
          { categoryDetailNo: 33, categoryName: "Vue.js" },
          { categoryDetailNo: 34, categoryName: "웹 퍼블리싱" }
        ]
      },
      {
        categoryName: "게임 개발",
        details: [
          { categoryDetailNo: 35, categoryName: "Unity" },
          { categoryDetailNo: 36, categoryName: "게임 서버" },
          { categoryDetailNo: 37, categoryName: "게임 기획" },
          { categoryDetailNo: 38, categoryName: "Unreal Engine" },
          { categoryDetailNo: 39, categoryName: "게임 클라이언트" }
        ]
      }
    ],
    success: true,
    timestamp: "2026-01-27T14:50:56.513663"
  }
};

export default dummyExportDetailCategory;
