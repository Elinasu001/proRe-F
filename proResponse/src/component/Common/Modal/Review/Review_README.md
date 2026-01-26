# 리뷰 모달 컴포넌트 (Review Modal Components)

기존 Alert 컴포넌트 구조를 기반으로 만든 리뷰 관련 모달 컴포넌트입니다.

## 📦 구성 파일

```
├── ReviewViewModal.jsx        # 리뷰 조회 모달
├── ReviewWriteModal.jsx       # 리뷰 작성 모달
├── ReviewModal.styled.js      # 스타일 컴포넌트
├── useReviewModal.js          # 커스텀 훅
└── ReviewModalExample.jsx     # 사용 예제
```

## 🚀 주요 기능

### ReviewViewModal (내가 보낸 후기)
- ✅ 사용자 정보 표시 (이름, 날짜, 별점)
- ✅ 이미지 갤러리 (최대 4개)
- ✅ 리뷰 텍스트
- ✅ 태그 표시
- ✅ 삭제 버튼 (선택)
- ✅ ESC 키로 닫기
- ✅ 오버레이 클릭으로 닫기

### ReviewWriteModal (후기 보내기)
- ✅ 별점 선택 (1~5점)
- ✅ 이미지 업로드 (최대 4개)
- ✅ 텍스트 입력 (최대 1000자)
- ✅ 태그 선택
- ✅ 폼 유효성 검사
- ✅ ESC 키로 닫기
- ✅ 오버레이 클릭으로 닫기

## 📖 사용 방법

### 1. 기본 설정

```jsx
import ReviewViewModal from './ReviewViewModal';
import ReviewWriteModal from './ReviewWriteModal';
import useReviewModal from './useReviewModal';

function MyComponent() {
  const {
    viewModal,
    writeModal,
    openViewModal,
    openWriteModal,
    closeModals,
  } = useReviewModal();

  return (
    <>
      {/* 모달들 */}
      <ReviewViewModal {...viewModal} />
      <ReviewWriteModal {...writeModal} />
    </>
  );
}
```

### 2. 리뷰 조회 모달 사용

```jsx
// 리뷰 데이터
const review = {
  userName: '박바라',
  date: '2주 전',
  rating: 5.0,
  images: ['url1', 'url2', 'url3'],
  text: '정말 좋았어요!',
  tags: ['친절해요', '전문가예요']
};

// 모달 열기
const handleViewReview = () => {
  openViewModal(
    review,
    // 삭제 콜백 (선택)
    () => {
      console.log('리뷰 삭제');
      closeModals();
    },
    // 확인 콜백
    () => {
      console.log('확인');
      closeModals();
    }
  );
};
```

### 3. 리뷰 작성 모달 사용

```jsx
// 태그 옵션
const tagOptions = [
  '정확과 느허항가 없어요',
  '사건을 잘 자세요',
  '응대가 친절해요',
  '상담이 자세해요'
];

// 모달 열기
const handleWriteReview = () => {
  openWriteModal(
    tagOptions,
    // 제출 콜백
    (reviewData) => {
      console.log('제출된 데이터:', reviewData);
      // reviewData 구조:
      // {
      //   rating: 5,
      //   images: ['url1', 'url2'],
      //   text: '리뷰 내용',
      //   tags: ['태그1', '태그2']
      // }
      
      // API 호출 등
      submitReview(reviewData);
      closeModals();
    }
  );
};
```

## 🎨 커스터마이징

### 스타일 수정

`ReviewModal.styled.js` 파일에서 스타일을 수정할 수 있습니다.

```jsx
// 예: 모달 최대 너비 변경
export const ModalContainer = styled.div`
  max-width: 600px;  // 기본: 480px
`;

// 예: 버튼 색상 변경
export const ConfirmButton = styled(BaseButton)`
  background: #ff6b00;  // 원하는 색상으로 변경
`;
```

### Props로 커스터마이징

```jsx
// ReviewViewModal
<ReviewViewModal
  isOpen={isOpen}
  review={reviewData}
  onClose={handleClose}
  onDelete={handleDelete}  // 선택: 없으면 삭제 버튼 미표시
  onConfirm={handleConfirm}
/>

// ReviewWriteModal
<ReviewWriteModal
  isOpen={isOpen}
  onClose={handleClose}
  onSubmit={handleSubmit}
  tagOptions={tagOptions}  // 빈 배열이면 태그 섹션 미표시
/>
```

## 💡 주요 기능 설명

### 1. 이미지 업로드
- 최대 4개까지 업로드 가능
- 미리보기 제공
- 개별 이미지 삭제 가능

### 2. 별점 시스템
- 호버 시 미리보기
- 클릭으로 선택
- 필수 입력 (유효성 검사)

### 3. 텍스트 입력
- 최대 1000자 제한
- 실시간 글자 수 표시
- 자동 크기 조절 가능

### 4. 태그 시스템
- 다중 선택 가능
- 선택/해제 토글
- 시각적 피드백

### 5. 키보드 접근성
- ESC 키로 모달 닫기
- Tab 네비게이션
- ARIA 레이블

## 🔧 유효성 검사

ReviewWriteModal에서 자동으로 다음을 검사합니다:

```jsx
// 별점 필수
if (rating === 0) {
  alert('별점을 선택해주세요.');
  return;
}

// 리뷰 텍스트 필수
if (reviewText.trim().length === 0) {
  alert('후기를 작성해주세요.');
  return;
}
```

## 📱 반응형 디자인

- 데스크톱: 최대 너비 480px
- 모바일: 화면의 90-95%
- 스크롤 가능한 컨테이너
- 터치 친화적 UI

## 🎯 베스트 프랙티스

### 1. useReviewModal 훅 사용 (권장)

```jsx
// ✅ 좋은 예
const { viewModal, writeModal, openViewModal } = useReviewModal();
```

### 2. 데이터 정리

```jsx
// ✅ 리뷰 제출 후 모달 닫기
const handleSubmit = (data) => {
  submitReview(data);
  closeModals();  // 모달 닫기
};
```

### 3. 에러 처리

```jsx
// ✅ API 에러 처리
const handleSubmit = async (data) => {
  try {
    await submitReview(data);
    closeModals();
  } catch (error) {
    alert('리뷰 제출에 실패했습니다.');
  }
};
```

## 🐛 문제 해결

### 모달이 열리지 않아요
- `isOpen` prop이 `true`인지 확인
- 리뷰 데이터가 올바르게 전달되었는지 확인

### 스타일이 적용되지 않아요
- styled-components가 설치되어 있는지 확인
- CSS 변수(`--primary`)가 정의되어 있는지 확인

### 이미지가 업로드되지 않아요
- input의 `accept` 속성 확인
- 파일 크기 제한 확인

## 📝 라이센스

MIT License

## 🤝 기여

이슈나 PR은 언제든 환영합니다!
