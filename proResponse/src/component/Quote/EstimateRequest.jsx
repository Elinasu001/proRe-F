import { useState } from 'react';
import * as S from './EstimateRequest.styled';
import { ImageUpload, TextArea } from '../Common/Input/Input';

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
  expertInfo = { name: '홍길동' },
  onSubmit
}) => {
  // 현재 단계 (1: 유형 선택, 2: 희망 서비스, 3: 상세 요청)
  const [currentStep, setCurrentStep] = useState(1);

  // 폼 데이터
  const [formData, setFormData] = useState({
    type: '',           // 유형
    service: '',        // 희망 서비스
    images: [],         // 이미지들
    description: ''     // 상세 설명
  });

  // 유형 옵션
  const typeOptions = [
    { value: '10', label: '10명 미만' },
    { value: '20', label: '20명 미만' },
    { value: '30', label: '30명 미만' },
    { value: '40', label: '40명 미만' }
  ];

  // 희망 서비스 옵션
  const serviceOptions = [
    { value: 'specific_date', label: '원하는 날짜가 있어요' },
    { value: 'flexible', label: '협의 가능해요' },
    { value: 'fast', label: '빨리 진행하고 싶어요' },
    { value: 'week', label: '일주일 이내로 진행하고 싶어요' }
  ];

  /**
   * 옵션 선택 핸들러
   */
  const handleSelectOption = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * 이미지 변경 핸들러
   */
  const handleImagesChange = (newImages) => {
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  /**
   * 다음 단계로
   */
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  /**
   * 이전 단계로
   */
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  /**
   * 제출 핸들러
   */
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
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
        return formData.type !== '';
      case 2:
        return formData.service !== '';
      case 3:
        return formData.description.trim() !== '';
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
              <S.ExpertName>{expertInfo.name}</S.ExpertName>
              <S.ExpertMessage>
                전문가님에게 멋진 정보만 알려주시면 전문가가 검토를 받을 수 있어요
              </S.ExpertMessage>
            </S.ExpertBanner>

            <S.Section>
              <S.SectionTitle>유형</S.SectionTitle>
              <S.OptionList>
                {typeOptions.map(option => (
                  <S.OptionItem
                    key={option.value}
                    $selected={formData.type === option.value}
                    onClick={() => handleSelectOption('type', option.value)}
                  >
                    {option.label}
                    <S.CheckIcon $checked={formData.type === option.value} />
                  </S.OptionItem>
                ))}
              </S.OptionList>
            </S.Section>

            {formData.type && (
              <S.SelectedBadge>{typeOptions.find(o => o.value === formData.type)?.label}</S.SelectedBadge>
            )}
          </>
        );

      case 2:
        return (
          <>
            {formData.type && (
              <S.SelectedBadge>{typeOptions.find(o => o.value === formData.type)?.label}</S.SelectedBadge>
            )}

            <S.Section>
              <S.SectionTitle>희망 서비스</S.SectionTitle>
              <S.OptionList>
                {serviceOptions.map(option => (
                  <S.OptionItem
                    key={option.value}
                    $selected={formData.service === option.value}
                    onClick={() => handleSelectOption('service', option.value)}
                  >
                    {option.label}
                    <S.CheckIcon $checked={formData.service === option.value} />
                  </S.OptionItem>
                ))}
              </S.OptionList>
            </S.Section>

            {formData.service && (
              <S.SelectedBadge style={{ top: '70px' }}>
                {serviceOptions.find(o => o.value === formData.service)?.label}
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
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
            {currentStep === 1 && '전적 요청'}
            {currentStep === 2 && '전적 요청'}
            {currentStep === 3 && '문의 상세 요청'}
          </S.Title>
          {currentStep === 3 && (
            <S.Subtitle>견적 요청 시 문의 사항 설명을 작성해주세요</S.Subtitle>
          )}
        </div>
        {onClose && (
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        )}
      </S.Header>

      <S.ProgressBar>
        <S.ProgressFill $width={getProgress()} />
      </S.ProgressBar>

      <S.Content>
        {renderStepContent()}
      </S.Content>

      <S.ButtonGroup>
        {currentStep > 1 && (
          <S.PrevButton onClick={handlePrev}>
            뒤로가기
          </S.PrevButton>
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
      <S.ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
        <S.ModalContainer>
          {content}
        </S.ModalContainer>
      </S.ModalOverlay>
    );
  }

  // 페이지 형태로 렌더링
  return (
    <S.Container>
      {content}
    </S.Container>
  );
};

export default EstimateRequest;
