# 전문가 상세 정보 모달 (Expert Detail Modal)

전문가의 상세 정보를 보여주는 모달 컴포넌트입니다.

## 📦 구성 파일

```
├── ExpertDetailModal.jsx           # 전문가 상세 모달
├── ExpertDetailModal.styled.js     # 스타일 컴포넌트
├── useExpertDetailModal.js         # 커스텀 훅
└── ExpertDetailModalExample.jsx    # 사용 예제
```

## 🚀 주요 기능

-  전문가 프로필 정보 (이름, 아바타, 별점, 리뷰 수)
-  찜하기 토글 기능
-  상세 정보 (고용 횟수, 위치, 경력, 연락 가능 시간)
-  상세 설명 및 리뷰 버튼
-  서비스 상세 설명
-  이미지 갤러리 (메인 이미지 + 썸네일)
-  썸네일 클릭으로 메인 이미지 변경
-  ESC 키 / 오버레이 클릭으로 닫기
-  반응형 디자인

## 📖 사용 방법

### 1. 기본 설정

```jsx
import ExpertDetailModal from './ExpertDetailModal';
import useExpertDetailModal from './useExpertDetailModal';

function MyComponent() {
  const { modalState, openModal, closeModal } = useExpertDetailModal();

  return (
    <>
      {/* 모달 */}
      <ExpertDetailModal
        isOpen={modalState.isOpen}
        expert={modalState.expert}
        onClose={closeModal}
        onEstimate={handleEstimate}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}
```

### 2. 전문가 데이터 구조

```jsx
const expert = {
  id: 1,                                    // 전문가 ID
  name: '홍길동 전문가',                     // 이름
  avatar: 'https://example.com/avatar.jpg', // 프로필 이미지
  rating: 4.9,                              // 별점
  reviewCount: 230,                         // 리뷰 수
  employmentCount: 87,                      // 고용 횟수
  location: '서울특별시 강남구',              // 위치
  career: '10년',                           // 경력
  availableTime: '오전 7시 ~ 오후 11시',     // 연락 가능 시간
  description: '서비스 설명 텍스트...',       // 서비스 상세 설명
  images: [                                 // 작업 이미지 (최대 4개)
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ],
  isFavorite: false,                        // 찜하기 여부
};
```

### 3. 모달 열기

```jsx
const handleShowExpert = (expertData) => {
  openModal(expertData);
};
```

### 4. 이벤트 핸들러

```jsx
// 상세 설명 버튼 클릭
const handleEstimate = (expert) => {
  console.log('상세 설명 요청:', expert);
  // API 호출 또는 다른 페이지로 이동
  closeModal();
};

// 찜하기 토글
const handleToggleFavorite = (expertId) => {
  // 찜하기 상태 업데이트 (API 호출 등)
  updateFavoriteStatus(expertId);
};
```

## 🎨 컴포넌트 Props

### ExpertDetailModal

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean |  | 모달 표시 여부 |
| `expert` | object |  | 전문가 데이터 |
| `onClose` | function |  | 닫기 콜백 |
| `onEstimate` | function | ❌ | 상세 설명 버튼 클릭 콜백 |
| `onToggleFavorite` | function | ❌ | 찜하기 토글 콜백 |

### expert 객체 구조

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | number/string |  | 전문가 고유 ID |
| `name` | string |  | 전문가 이름 |
| `avatar` | string |  | 프로필 이미지 URL |
| `rating` | number |  | 별점 (0-5) |
| `reviewCount` | number |  | 리뷰 수 |
| `employmentCount` | number |  | 고용 횟수 |
| `location` | string |  | 위치 |
| `career` | string |  | 경력 |
| `availableTime` | string |  | 연락 가능 시간 |
| `description` | string |  | 서비스 상세 설명 |
| `images` | string[] | ❌ | 작업 이미지 배열 (최대 4개) |
| `isFavorite` | boolean | ❌ | 찜하기 여부 (기본: false) |

## 주요 기능 설명

### 1. 이미지 갤러리
- 메인 이미지와 썸네일 4개 표시
- 썸네일 클릭 시 메인 이미지 변경
- 이미지가 없는 슬롯은 "No Image" 표시

### 2. 찜하기 기능
- 하트 아이콘 클릭으로 찜하기/해제
- 찜한 상태에 따라 하트 색상 변경
- `onToggleFavorite` 콜백으로 상태 관리

### 3. 액션 버튼
- **상세 설명**: 전문가에게 견적 요청 등
- **리뷰**: 리뷰 목록 확인 (리뷰 수 표시)

### 4. 키보드 접근성
- ESC 키로 모달 닫기
- Tab 네비게이션 지원
- ARIA 레이블 적용

## 🎯 사용 예제

### 예제 1: 전문가 목록에서 상세 보기

```jsx
const ExpertList = () => {
  const { modalState, openModal, closeModal } = useExpertDetailModal();

  const handleExpertClick = (expert) => {
    openModal(expert);
  };

  return (
    <div>
      {experts.map(expert => (
        <div key={expert.id} onClick={() => handleExpertClick(expert)}>
          {expert.name}
        </div>
      ))}

      <ExpertDetailModal
        {...modalState}
        onClose={closeModal}
        onEstimate={handleEstimate}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};
```

### 예제 2: 찜하기 기능 연동

```jsx
const [favorites, setFavorites] = useState([]);

const handleToggleFavorite = (expertId) => {
  setFavorites(prev => {
    if (prev.includes(expertId)) {
      // 찜 해제
      return prev.filter(id => id !== expertId);
    } else {
      // 찜 추가
      return [...prev, expertId];
    }
  });
};

// 모달 열 때 찜 상태 포함
const handleOpenExpert = (expert) => {
  openModal({
    ...expert,
    isFavorite: favorites.includes(expert.id)
  });
};
```

### 예제 3: API 연동

```jsx
const handleEstimate = async (expert) => {
  try {
    await requestEstimate(expert.id);
    alert('견적 요청이 완료되었습니다.');
    closeModal();
  } catch (error) {
    alert('견적 요청에 실패했습니다.');
  }
};

const handleToggleFavorite = async (expertId) => {
  try {
    await toggleFavoriteAPI(expertId);
    // 상태 업데이트
  } catch (error) {
    alert('찜하기 처리에 실패했습니다.');
  }
};
```

## 🎨 커스터마이징

### 스타일 수정

`ExpertDetailModal.styled.js` 파일에서 스타일을 수정할 수 있습니다.

```jsx
// 예: 모달 최대 너비 변경
export const ModalContainer = styled.div`
  max-width: 900px;  // 기본: 800px
`;

// 예: 버튼 색상 변경
export const EstimateButton = styled(BaseActionButton)`
  background: #ff6b00;  // 원하는 색상으로 변경
`;
```

## 📱 반응형 디자인

- **데스크톱**: 최대 너비 800px
- **태블릿/모바일**: 화면의 90-95%
- 스크롤 가능한 컨텐츠
- 터치 친화적 UI

## 🐛 문제 해결

### 모달이 열리지 않아요
- `isOpen` prop이 `true`인지 확인
- 전문가 데이터가 올바르게 전달되었는지 확인

### 이미지가 표시되지 않아요
- 이미지 URL이 유효한지 확인
- CORS 설정 확인
- 이미지 배열이 올바른 형식인지 확인

### 찜하기가 작동하지 않아요
- `onToggleFavorite` 콜백이 전달되었는지 확인
- `isFavorite` 상태가 올바르게 업데이트되는지 확인

## 📝 베스트 프랙티스

### 1. 상태 관리

```jsx
//  좋은 예: 전역 상태로 찜 목록 관리
const [favorites, setFavorites] = useRecoilState(favoritesState);

// ❌ 나쁜 예: 로컬 상태만 사용
const [isFavorite, setIsFavorite] = useState(false);
```

### 2. 에러 처리

```jsx
//  좋은 예: try-catch로 에러 처리
const handleEstimate = async (expert) => {
  try {
    await requestEstimate(expert.id);
    closeModal();
  } catch (error) {
    console.error('견적 요청 실패:', error);
    alert('오류가 발생했습니다.');
  }
};
```

### 3. 데이터 검증

```jsx
//  좋은 예: 데이터 유효성 검사
const openExpertDetail = (expert) => {
  if (!expert || !expert.id) {
    console.error('유효하지 않은 전문가 데이터');
    return;
  }
  openModal(expert);
};
```

## 🔧 개발 팁

1. **이미지 최적화**: 이미지를 웹 최적화 포맷(WebP)으로 제공하세요
2. **레이지 로딩**: 이미지 레이지 로딩을 적용하면 성능이 향상됩니다
3. **캐싱**: 전문가 데이터를 캐싱하여 재사용하세요
4. **애니메이션**: 필요시 이미지 전환 애니메이션을 추가할 수 있습니다

## 📝 라이센스

MIT License

## 🤝 기여

이슈나 PR은 언제든 환영합니다!
