# EstimateRequest - 견적 요청 Multi-step Form

전문가에게 견적을 요청하는 3단계 폼 컴포넌트입니다.

## 기능

### 1단계 - 유형 선택
- 10명 미만
- 20명 미만
- 30명 미만
- 40명 미만

### 2단계 - 희망 서비스 선택
- 원하는 날짜가 있어요
- 협의 가능해요
- 빨리 진행하고 싶어요
- 일주일 이내로 진행하고 싶어요

### 3단계 - 상세 요청
- 사진 첨부 (다중 업로드)
- 상세 설명 입력

## 사용 방법

### 1. 모달 형태로 사용

```jsx
import { useState } from 'react';
import EstimateRequest from './EstimateRequest';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (formData) => {
    console.log('제출 데이터:', formData);
    // API 호출 등
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        견적 요청하기
      </button>

      <EstimateRequest
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        expertInfo={{ name: '홍길동' }}
        onSubmit={handleSubmit}
      />
    </>
  );
}
```

### 2. 커스텀 훅 사용

```jsx
import EstimateRequest from './EstimateRequest';
import useEstimateRequest from './useEstimateRequest';

function MyComponent() {
  const estimateRequest = useEstimateRequest();

  const handleOpenRequest = () => {
    estimateRequest.open({ name: '홍길동' });
  };

  const handleSubmit = (formData) => {
    console.log('제출 데이터:', formData);
    estimateRequest.close();
  };

  return (
    <>
      <button onClick={handleOpenRequest}>
        견적 요청하기
      </button>

      <EstimateRequest
        isOpen={estimateRequest.isOpen}
        onClose={estimateRequest.close}
        expertInfo={estimateRequest.expertInfo}
        onSubmit={handleSubmit}
      />
    </>
  );
}
```

### 3. 페이지 형태로 사용

```jsx
import EstimateRequest from './EstimateRequest';

function EstimateRequestPage() {
  const handleSubmit = (formData) => {
    console.log('제출 데이터:', formData);
    // API 호출 후 페이지 이동 등
  };

  return (
    <EstimateRequest
      expertInfo={{ name: '홍길동' }}
      onSubmit={handleSubmit}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | `boolean` | No | - | 모달 표시 여부 (모달로 사용 시) |
| `onClose` | `function` | No | - | 닫기 콜백 (모달로 사용 시) |
| `expertInfo` | `object` | No | `{ name: '홍길동' }` | 전문가 정보 |
| `onSubmit` | `function` | Yes | - | 제출 콜백 |

## FormData 구조

```javascript
{
  type: '30',                    // 유형 (10, 20, 30, 40)
  service: 'fast',               // 희망 서비스
  images: [                      // 첨부 이미지
    {
      file: File,
      preview: 'blob:...'
    }
  ],
  description: '상세 설명...'    // 상세 설명
}
```

## 주요 기능

### 1. 진행 상태 표시
- 프로그레스 바로 현재 단계 표시
- 선택한 옵션을 우측 상단 배지로 표시

### 2. 유효성 검사
- 각 단계에서 필수 항목 선택 확인
- 다음 단계 버튼 활성화/비활성화

### 3. 이미지 관리
- 다중 이미지 업로드
- 이미지 미리보기
- 개별 이미지 삭제

### 4. 단계 이동
- 다음/이전 버튼으로 단계 이동
- 마지막 단계에서 제출

## 스타일 커스터마이징

`EstimateRequest.styled.js`에서 스타일을 수정할 수 있습니다.

```javascript
// 주요 색상 변경
export const NextButton = styled(BaseButton)`
  background: var(--primary);  // 여기서 색상 변경
  color: #fff;
`;

// 프로그레스 바 색상 변경
export const ProgressFill = styled.div`
  background: linear-gradient(90deg, #0066ff 0%, #0099ff 100%);
`;
```

## 예제

전체 예제는 `EstimateRequestExample.jsx`를 참고하세요.

## 파일 구조

```
Quote/
├── EstimateRequest.jsx          # 메인 컴포넌트
├── EstimateRequest.styled.js    # 스타일 컴포넌트
├── useEstimateRequest.js        # 커스텀 훅
├── EstimateRequestExample.jsx   # 사용 예제
└── ESTIMATE_REQUEST_README.md   # 문서
```
