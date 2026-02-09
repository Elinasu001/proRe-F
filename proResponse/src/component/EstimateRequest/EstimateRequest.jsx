import { useState } from "react";
import * as S from "./EstimateRequest.styled";
import { ImageUpload, TextArea } from "../Common/Input/Input";

/**
 * EstimateRequest - 견적 요청 Multi-step Form
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부 (선택사항)
 * @param {function} props.onClose - 닫기 콜백 (선택사항)
 * @param {Object} props.expertInfo - 전문가 정보
 * @param {function} props.onSubmit - 제출 콜백
 */
const EstimateRequest = ({
  isOpen,
  onClose,
  expertInfo = { expertName: "" },
  categoryName,
  detailCategoryNo,
  onSubmit,
}) => {
  // 현재 단계 (1: 유형 선택, 2: 희망 서비스, 3: 상세 요청)
  const [currentStep, setCurrentStep] = useState(1);

  // 폼 데이터
  const [formData, setFormData] = useState({
    requestType: "", // 유형
    requestService: "", // 희망 서비스
    images: [], // 이미지들
    content: "", // 상세 설명
  });

  //console.log(`categoryName 체크 : ${categoryName}`)

  // 상세 카테고리 -> 상위 카테고리 매핑
  const CATEGORY_MAPPING = {
    // 촬영 및 편집
    "기업/상업용 시진 촬영": "촬영 및 편집",
    "기업/상업용 사진 촬영": "촬영 및 편집",
    "스냅 촬영": "촬영 및 편집",
    "개인용 시진촬영": "촬영 및 편집",
    "개인용 사진촬영": "촬영 및 편집",
    "영상 촬영": "촬영 및 편집",
    "영상 편집": "촬영 및 편집",
    // 음향 및 편집
    "음악 제작": "음향 및 편집",
    "녹음": "음향 및 편집",
    "믹싱/마스터링": "음향 및 편집",
    // 제2외국어
    "영어": "제2외국어",
    "일본어": "제2외국어",
    "중국어": "제2외국어",
    "영어 레슨": "제2외국어",
    "일본어 레슨": "제2외국어",
    "중국어 레슨": "제2외국어",
    // 음악
    "피아노": "음악",
    "기타": "음악",
    "보컬": "음악",
    "드럼": "음악",
    "피아노 레슨": "음악",
    "기타 레슨": "음악",
    "일렉기타 레슨": "음악",
    "베이스기타 레슨": "음악",
    "어쿠스틱기타 레슨": "음악",
    "보컬 레슨": "음악",
    "드럼 레슨": "음악",
    "바이올린 레슨": "음악",
    "첼로 레슨": "음악",
    // 게임 개발
    "Unity": "게임 개발",
    "Unreal": "게임 개발",
    "Unity 개발": "게임 개발",
    "Unreal 개발": "게임 개발",
    // 백엔드 개발
    "Java / Spring": "백엔드 개발",
    "Node.js": "백엔드 개발",
    "Python / Django": "백엔드 개발",
    "Java/Spring 개발": "백엔드 개발",
    "Node.js 개발": "백엔드 개발",
    "Python/Django 개발": "백엔드 개발",
    "DB 설계 (MySQL / Oracle)": "백엔드 개발",
    "DB 설계": "백엔드 개발",
    // 프론트엔드 개발
    "React": "프론트엔드 개발",
    "Vue.js": "프론트엔드 개발",
    "HTML/CSS": "프론트엔드 개발",
    "React 개발": "프론트엔드 개발",
    "Vue.js 개발": "프론트엔드 개발",
    "HTML/CSS 개발": "프론트엔드 개발",
  };

  // 매핑된 상위 카테고리명 찾기
  const mappedCategoryName = CATEGORY_MAPPING[categoryName] || categoryName;

  const QUESTION_CONFIG = {
    "촬영 및 편집": {
      typeOptions: [
        { value: "개인 영상", label: "개인 영상" },
        { value: "상업 영상", label: "상업 영상" },
        { value: "기업 영상", label: "기업 영상" },
        { value: "기타", label: "기타" },
      ],
      serviceOptions: [
        { value: "기획부터 촬영까지", label: "기획부터 촬영까지" },
        { value: "촬영만", label: "촬영만" },
        { value: "편집만", label: "편집만" },
        { value: "전체 서비스", label: "전체 서비스" },
      ],
    },
    "음향 및 편집": {
      typeOptions: [
        { value: "제작", label: "제작" },
        { value: "편집", label: "편집" },
        { value: "녹음", label: "녹음" },
        { value: "기타", label: "기타" },
      ],
      serviceOptions: [
        { value: "녹음만", label: "녹음만" },
        { value: "믹싱/마스터링", label: "믹싱/마스터링" },
        { value: "전체 제작", label: "전체 제작" },
        { value: "컨설팅", label: "컨설팅" },
      ],
    },
    제2외국어: {
      typeOptions: [
        { value: "취미", label: "취미" },
        { value: "시험", label: "시험" },
        { value: "여행", label: "여행" },
        { value: "비즈니스", label: "비즈니스" },
      ],
      serviceOptions: [
        { value: "정기 수업 (주 1-2회)", label: "정기 수업 (주 1-2회)" },
        { value: "집중 수업 (주 3회 이상)", label: "집중 수업 (주 3회 이상)" },
        { value: "원데이 클래스", label: "원데이 클래스" },
        { value: "온라인 수업", label: "온라인 수업" },
      ],
    },
    음악: {
      typeOptions: [
        { value: "취미", label: "취미" },
        { value: "입시", label: "입시" },
        { value: "전공심화", label: "전공심화" },
        { value: "기타", label: "기타" },
      ],
      serviceOptions: [
        { value: "정기 레슨 (주 1-2회)", label: "정기 레슨 (주 1-2회)" },
        { value: "집중 레슨 (주 3회 이상)", label: "집중 레슨 (주 3회 이상)" },
        { value: "원데이 클래스", label: "원데이 클래스" },
        { value: "온라인 레슨", label: "온라인 레슨" },
      ],
    },
    "게임 개발": {
      typeOptions: [
        { value: "취미", label: "취미" },
        { value: "입문", label: "입문" },
        { value: "개인 게임 제작", label: "개인 게임 제작" },
        { value: "상업용", label: "상업용" },
        { value: "출시 목표", label: "출시 목표" },
      ],
      serviceOptions: [
        { value: "정기 강의", label: "정기 강의" },
        { value: "프로젝트 멘토링", label: "프로젝트 멘토링" },
        { value: "포트폴리오 제작", label: "포트폴리오 제작" },
        { value: "1:1 컨설팅", label: "1:1 컨설팅" },
      ],
    },
    "백엔드 개발": {
      typeOptions: [
        { value: "입문", label: "입문" },
        { value: "기초", label: "기초" },
        { value: "실무", label: "실무" },
        { value: "포트폴리오", label: "포트폴리오" },
      ],
      serviceOptions: [
        { value: "정기 강의", label: "정기 강의" },
        { value: "코드 리뷰", label: "코드 리뷰" },
        { value: "프로젝트 멘토링", label: "프로젝트 멘토링" },
        { value: "1:1 컨설팅", label: "1:1 컨설팅" },
      ],
    },
    "프론트엔드 개발": {
      typeOptions: [
        { value: "입문", label: "입문" },
        { value: "기초", label: "기초" },
        { value: "실무", label: "실무" },
        { value: "포트폴리오", label: "포트폴리오" },
      ],
      serviceOptions: [
        { value: "정기 강의", label: "정기 강의" },
        { value: "코드 리뷰", label: "코드 리뷰" },
        { value: "프로젝트 멘토링", label: "프로젝트 멘토링" },
        { value: "1:1 컨설팅", label: "1:1 컨설팅" },
      ],
    },
  };

  // 기본 질문 세트 (매핑되지 않은 카테고리용)
  const DEFAULT_QUESTION_SET = {
    typeOptions: [
      { value: "취미", label: "취미" },
      { value: "입문", label: "입문" },
      { value: "실무", label: "실무" },
      { value: "기타", label: "기타" },
    ],
    serviceOptions: [
      { value: "정기 수업 (주 1-2회)", label: "정기 수업 (주 1-2회)" },
      { value: "집중 수업 (주 3회 이상)", label: "집중 수업 (주 3회 이상)" },
      { value: "원데이 클래스", label: "원데이 클래스" },
      { value: "1:1 컨설팅", label: "1:1 컨설팅" },
    ],
  };

  const currentQuestionSet = QUESTION_CONFIG[mappedCategoryName] || DEFAULT_QUESTION_SET;

  const { typeOptions, serviceOptions } = currentQuestionSet;

  /**
   * 옵션 선택 핸들러
   */
  const handleSelectOption = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * 이미지 변경 핸들러
   */
  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  /**
   * 다음 단계로
   */
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  /**
   * 이전 단계로
   */
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /**
   * 제출 핸들러
   */
  const handleSubmit = () => {
    const form = new FormData();

    form.append("requestType", formData.requestType);
    form.append("requestService", formData.requestService);
    form.append("content", formData.content);
    form.append("expertNo", expertInfo.expertNo);
    form.append("categoryDetailNo", detailCategoryNo);
    // 이미지 
    if (formData.images && formData.images.length > 0) {
     // console.log("이미지 전송:", formData.images.length + "개");
      formData.images.forEach((image, index) => {
        if (image.file) {
         // console.log(`이미지 ${index}:`, image.file.name, image.file.size);
          form.append("images", image.file); // image.file로 변경
        } else {
          console.warn(`이미지 ${index}에 file 속성이 없습니다`);
        }
      });
    }

    if (onSubmit) {
      onSubmit(form);
    }

    if (onClose) {
      onClose();
    }
  };

  /**
   * 현재 단계 진행 가능 여부
   */
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.requestType !== "";
      case 2:
        return formData.requestService !== "";
      case 3:
        return formData.content.trim() !== "";
      default:
        return false;
    }
  };

  /**
   * 프로그레스 바 계산
   */
  const getProgress = () => {
    return (currentStep / 3) * 100;
  };

  /**
   * 단계별 컨텐츠 렌더링
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <S.ExpertBanner>
              <S.ExpertName>{expertInfo.expertName}</S.ExpertName>
              <S.ExpertMessage>
                전문가님에게 멋진 정보만 알려주시면 전문가가 검토를 받을 수
                있어요
              </S.ExpertMessage>
            </S.ExpertBanner>

            <S.Section>
              <S.SectionTitle>유형</S.SectionTitle>
              <S.OptionList>
                {typeOptions.map((option) => (
                  <S.OptionItem
                    key={option.value}
                    $selected={formData.requestType === option.value}
                    onClick={() =>
                      handleSelectOption("requestType", option.value)
                    }
                  >
                    {option.label}
                    <S.CheckIcon
                      $checked={formData.requestType === option.value}
                    />
                  </S.OptionItem>
                ))}
              </S.OptionList>
            </S.Section>

            {formData.requestType && (
              <S.SelectedBadge>
                {
                  typeOptions.find((o) => o.value === formData.requestType)
                    ?.label
                }
              </S.SelectedBadge>
            )}
          </>
        );

      case 2:
        return (
          <>
            {formData.requestType && (
              <S.SelectedBadge>
                {
                  typeOptions.find((o) => o.value === formData.requestType)
                    ?.label
                }
              </S.SelectedBadge>
            )}

            <S.Section>
              <S.SectionTitle>희망 서비스</S.SectionTitle>
              <S.OptionList>
                {serviceOptions.map((option) => (
                  <S.OptionItem
                    key={option.value}
                    $selected={formData.requestService === option.value}
                    onClick={() =>
                      handleSelectOption("requestService", option.value)
                    }
                  >
                    {option.label}
                    <S.CheckIcon
                      $checked={formData.requestService === option.value}
                    />
                  </S.OptionItem>
                ))}
              </S.OptionList>
            </S.Section>

            {formData.requestService && (
              <S.SelectedBadge style={{ top: "70px" }}>
                {
                  serviceOptions.find(
                    (o) => o.value === formData.requestService,
                  )?.label
                }
              </S.SelectedBadge>
            )}
          </>
        );

      case 3:
        return (
          <>
            <ImageUpload
              label="사진 첨부"
              images={formData.images}
              onChange={handleImagesChange}
              maxImages={4}
            />

            <TextArea
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              placeholder="견적 요청 시 문의 사항 설명을 작성해주세요"
              maxLength={1000}
            />
          </>
        );

      default:
        return null;
    }
  };

  // 모달로 사용할 경우
  if (isOpen !== undefined && !isOpen) {
    return null;
  }

  const content = (
    <>
      <S.Header>
        <div>
          <S.Title>
            {currentStep === 1 && "견적 요청"}
            {currentStep === 2 && "견적 요청"}
            {currentStep === 3 && "문의 상세 요청"}
          </S.Title>
          {currentStep === 3 && (
            <S.Subtitle>견적 요청 시 문의 사항 설명을 작성해주세요</S.Subtitle>
          )}
        </div>
        {onClose && <S.CloseButton onClick={onClose}>×</S.CloseButton>}
      </S.Header>

      <S.ProgressBar>
        <S.ProgressFill $width={getProgress()} />
      </S.ProgressBar>

      <S.Content>{renderStepContent()}</S.Content>

      <S.ButtonGroup>
        {currentStep > 1 && (
          <S.PrevButton onClick={handlePrev}>뒤로가기</S.PrevButton>
        )}
        {currentStep < 3 ? (
          <S.NextButton onClick={handleNext} disabled={!canProceed()}>
            다음으로
          </S.NextButton>
        ) : (
          <S.SubmitButton onClick={handleSubmit} disabled={!canProceed()}>
            요청하기
          </S.SubmitButton>
        )}
      </S.ButtonGroup>
    </>
  );

  // 모달 형태로 렌더링
  if (onClose) {
    return (
      <S.ModalOverlay
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <S.ModalContainer>{content}</S.ModalContainer>
      </S.ModalOverlay>
    );
  }

  // 페이지 형태로 렌더링
  return <S.Container>{content}</S.Container>;
};

export default EstimateRequest;
