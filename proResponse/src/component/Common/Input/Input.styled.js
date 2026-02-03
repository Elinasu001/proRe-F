import styled, { createGlobalStyle } from 'styled-components';

// DatePicker 전역 스타일
export const DatePickerStyles = createGlobalStyle`
  .react-datepicker-popper {
    z-index: 9999 !important;
  }

  .react-datepicker {
    font-family: inherit;
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: #F8F9FA;
    border-bottom: 1px solid #E5E5E5;
    border-radius: 8px 8px 0 0;
    padding: 16px 0;
  }

  .react-datepicker__time-container {
    border-left: 1px solid #E5E5E5;
  }

  .react-datepicker__time-list-item {
    padding: 8px 16px;
    font-size: 14px;

    &:hover {
      background-color: #E3F2FD !important;
      color: #4A90E2 !important;
    }
  }

  .react-datepicker__time-list-item--selected {
    background-color: #4A90E2 !important;
    color: white !important;
    font-weight: 600;
  }

  .react-datepicker-time__header {
    font-size: 14px;
    font-weight: 600;
    color: #111111;
  }
`;

// 기본 Input 스타일
export const StyledInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  border: 1px solid ${props => props.$error ? '#FF4444' : '#E5E5E5'};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
  background-color: ${props => props.$error ? '#FFF5F5' : '#FFFFFF'};

  &::placeholder {
    color: #AAAAAA;
  }

  &:focus {
    border-color: ${props => props.$error ? '#FF4444' : '#4A90E2'};
    background-color: #FFFFFF;
  }
`;

// 에러 메시지
export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #FF4444;
  margin-top: 4px;
  display: block;
`;

// 생년월일 Input 컨테이너
export const DateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DateLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111111;

  &::after {
    content: '*';
    color: #FF4444;
    margin-left: 4px;
  }
`;

export const DateInputField = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  border: 1px solid ${props => props.$error ? '#FF4444' : '#E5E5E5'};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
  background-color: ${props => props.$error ? '#FFF5F5' : '#FFFFFF'};

  &::placeholder {
    color: #AAAAAA;
  }

  &:focus {
    border-color: ${props => props.$error ? '#FF4444' : '#4A90E2'};
    background-color: #FFFFFF;
  }
`;

// 연락 가능 시간 Input 스타일
export const TimeRangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TimeLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111111;

  &::after {
    content: '*';
    color: #FF4444;
    margin-left: 4px;
  }
`;

export const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TimeInputBox = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  & img {
    position: absolute;
    right: 16px;
    width: 24px;
    height: 24px;
    z-index: 10;
    pointer-events: none;
  }
`;

export const TimeInput = styled.input`
  width: 100%;
  padding: 16px 50px 16px 20px;
  font-size: 16px;
  border: 1px solid ${props => props.$error ? '#FF4444' : '#E5E5E5'};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
  /* background-color: ${props => props.$error ? '#FFF5F5' : '#F8F9FA'}; */

  &::placeholder {
    color: #AAAAAA;
  }

  &:focus {
    border-color: ${props => props.$error ? '#FF4444' : '#4A90E2'};
    background-color: #FFFFFF;
  }
`;

export const CheckIcon = styled.div`
  position: absolute;
  right: 16px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '✓';
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.$hasValue ? '#4A90E2' : '#CCCCCC'};
  }
`;

export const TimeDivider = styled.span`
  font-size: 16px;
  color: #111111;
  margin: 0 4px;
`;

// 성별 선택 스타일
export const GenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const GenderLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111111;

  &::after {
    content: '*';
    color: #FF4444;
    margin-left: 4px;
  }
`;

export const GenderButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const GenderButton = styled.button`
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid ${props => {
    if (props.$error) return '#FF4444';
    if (props.$isSelected) return '#4A90E2';
    return '#E5E5E5';
  }};
  border-radius: 8px;
  background-color: ${props => {
    if (props.$error) return '#FFF5F5';
    if (props.$isSelected) return '#E3F2FD';
    return '#FFFFFF';
  }};
  color: ${props => props.$isSelected ? '#4A90E2' : '#111111'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.$error ? '#FF4444' : '#4A90E2'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

// 이미지 업로드 스타일
export const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ImageUploadLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111111;
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ImageUploadBox = styled.label`
  width: 100px;
  height: 100px;
  border: 2px dashed ${props => props.$error ? '#FF4444' : '#E5E5E5'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.$error ? '#FFF5F5' : '#F8F9FA'};
  margin-bottom:20px;
  
  &:hover {
    border-color: ${props => props.$error ? '#FF4444' : '#4A90E2'};
    background-color: ${props => props.$error ? '#FFF5F5' : '#E3F2FD'};
  }

  svg {
    width: 32px;
    height: 32px;
    color: #AAAAAA;
    margin-bottom: 4px;
  }

  span {
    font-size: 12px;
    color: #AAAAAA;
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;


  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ImageRemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  line-height: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

// 텍스트 영역 스타일
export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextAreaLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111111;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 16px 20px;
  font-size: 16px;
  border: 1px solid ${props => props.$error ? '#FF4444' : '#E5E5E5'};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
  background-color: ${props => props.$error ? '#FFF5F5' : '#FFFFFF'};
  font-family: inherit;
  resize: vertical;

  &::placeholder {
    color: #AAAAAA;
  }

  &:focus {
    border-color: ${props => props.$error ? '#FF4444' : '#4A90E2'};
    background-color: #FFFFFF;
  }
`;

export const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #AAAAAA;
`;

// 주소 입력 스타일
export const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AddressLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111111;

  &::after {
    content: '*';
    color: #FF4444;
    margin-left: 4px;
  }
`;

export const AddressInputGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledAddressInput = styled.input`
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  border: 1px solid ${props => props.$error ? '#FF4444' : '#E5E5E5'};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
  background-color: ${props => props.$error ? '#FFF5F5' : '#FFFFFF'};

  &::placeholder {
    color: #AAAAAA;
  }

  &:focus {
    border-color: ${props => props.$error ? '#FF4444' : '#4A90E2'};
    background-color: #FFFFFF;
  }
`;

export const AddressButton = styled.button`
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid var(--btn-secondary);
  border-radius: 8px;
  background-color: var(--btn-secondary);
  color: var(--color-3);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #4A90E2;
    color: #FFFFFF;
  }

  &:active {
    transform: scale(0.98);
  }
`;

// 체크박스 스타일
export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 4px;
`;

export const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border: 1px solid ${props => props.$isChecked ? '#4A90E2' : '#E5E5E5'};
  border-radius: 8px;
  background-color: ${props => props.$isChecked ? '#F0F7FF' : '#FFFFFF'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4A90E2;
    background-color: #F0F7FF;
  }
`;

export const CheckboxText = styled.span`
  font-size: 16px;
  color: ${props => props.$isChecked ? '#4A90E2' : '#111111'};
  font-weight: ${props => props.$isChecked ? '600' : '400'};
`;

export const CheckboxIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.$isChecked ? '#4A90E2' : '#E5E5E5'};
  background-color: ${props => props.$isChecked ? '#4A90E2' : '#FFFFFF'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  svg {
    width: 14px;
    height: 14px;
    color: white;
    opacity: ${props => props.$isChecked ? 1 : 0};
  }
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;


export const MountText = styled.div`
  width: 100%;
  text-align: right;
  font-size: var(--font14);
  color: var(--color-7);
`;