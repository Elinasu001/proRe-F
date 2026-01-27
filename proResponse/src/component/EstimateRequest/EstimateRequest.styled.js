import styled from 'styled-components';

// 메인 컨테이너
export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// 모달 컨테이너 (모달로 사용 시)
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0 16px 16px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    width: 95%;
    max-height: 95vh;
  }
`;

// 헤더
export const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 8px 0 0 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
  }
`;

// 프로그레스 바
export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #f0f0f0;
  position: relative;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #0066ff 0%, #0099ff 100%);
  transition: width 0.3s ease;
  width: ${props => props.$width}%;
`;

// 컨텐츠 영역
export const Content = styled.div`
  padding: 32px 24px;
  min-height: 400px;
`;

// 전문가 정보 배너
export const ExpertBanner = styled.div`
  background: #f5f8ff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ExpertName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--primary);
`;

export const ExpertMessage = styled.span`
  font-size: 14px;
  color: #333;
`;

// 섹션
export const Section = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0 0 16px 0;
`;

// 옵션 리스트
export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionItem = styled.button`
  background: ${props => props.$selected ? '#fff' : '#f8f9fa'};
  border: 2px solid ${props => props.$selected ? 'var(--primary)' : '#e9ecef'};
  border-radius: 12px;
  padding: 16px 20px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  color: ${props => props.$selected ? 'var(--primary)' : '#333'};
  font-weight: ${props => props.$selected ? '600' : '400'};

  &:hover {
    border-color: var(--primary);
    background: #fff;
  }
`;

export const CheckIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.$checked ? 'var(--primary)' : '#ddd'};
  background: ${props => props.$checked ? 'var(--primary)' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;

  &::after {
    content: '✓';
    display: ${props => props.$checked ? 'block' : 'none'};
  }
`;

// 이미지 업로드 섹션
export const ImageUploadSection = styled.div`
  margin-bottom: 24px;
`;

export const ImagePreviewList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.2s;

  &:hover {
    background: #e9ecef;
  }

  input[type="file"] {
    display: none;
  }
`;

// 텍스트 영역
export const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &::placeholder {
    color: #999;
  }
`;

// 하단 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px 24px;
  border-top: 1px solid #f0f0f0;
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrevButton = styled(BaseButton)`
  background: #f8f9fa;
  color: #666;

  &:hover:not(:disabled) {
    background: #e9ecef;
  }
`;

export const NextButton = styled(BaseButton)`
  background: var(--primary);
  color: #fff;

  &:hover:not(:disabled) {
    background: #0052cc;
  }
`;

export const SubmitButton = styled(BaseButton)`
  background: var(--primary);
  color: #fff;

  &:hover:not(:disabled) {
    background: #0052cc;
  }
`;

// 선택된 항목 표시 (우측 상단)
export const SelectedBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 24px;
  background: var(--primary);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;
