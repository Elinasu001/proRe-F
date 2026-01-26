import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    StyledInput,
    DateInputWrapper,
    DateLabel,
    DateInputField,
    TimeRangeWrapper,
    TimeLabel,
    TimeInputContainer,
    TimeInputBox,
    TimeInput,
    TimeDivider,
    GenderWrapper,
    GenderLabel,
    GenderButtonGroup,
    GenderButton,
    ErrorMessage,
    DatePickerStyles,
    ImageUploadWrapper,
    ImageUploadLabel,
    ImageUploadContainer,
    ImageUploadBox,
    ImagePreview,
    ImageRemoveButton,
    HiddenFileInput,
    TextAreaWrapper,
    TextAreaLabel,
    StyledTextArea,
    CharacterCount,
    AddressWrapper,
    AddressLabel,
    AddressInputGroup,
    StyledAddressInput,
    AddressButton,
    CheckboxWrapper,
    CheckboxLabel,
    CheckboxItem,
    CheckboxText,
    CheckboxIcon,
    HiddenCheckbox
} from "./Input.styled";
import time from "../../../assets/images/common/time.png";


    // 기본 Input 컴포넌트
    const Input = ({ $error, errorMessage, ...props }) => {
        return (
            <>
                <StyledInput $error={$error} {...props} />
                {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </>
        );
    };

    // 1. 생년월일 Input 컴포넌트
    export const DateInput = ({ label = "생년월일", value, onChange, $error, errorMessage, ...props }) => {
        return (
            <DateInputWrapper>
                <DateLabel>{label}</DateLabel>
                <DateInputField
                    type="text"
                    placeholder="YYYYMMDD"
                    value={value}
                    onChange={onChange}
                    maxLength={8}
                    $error={$error}
                    {...props}
                />
                {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </DateInputWrapper>
        );
    };

    // 2. 연락 가능 시간 Input 컴포넌트
    export const TimeRangeInput = ({
        label = "연락 가능 시간",
        startValue,
        endValue,
        onStartChange,
        onEndChange,
        $error,
        errorMessage,
        ...props
    }) => {
        return (
            <>
                <DatePickerStyles />
                <TimeRangeWrapper>
                    <TimeLabel>{label}</TimeLabel>
                    <TimeInputContainer>
                        <TimeInputBox>
                            <DatePicker
                                selected={startValue}
                                onChange={onStartChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="시간"
                                dateFormat="aa h:mm"
                                placeholderText="시작 시간"
                                customInput={
                                    <TimeInput
                                        $error={$error}
                                        {...props}
                                    />
                                }
                            />
                            <img src={time} alt="time icon" />
                        </TimeInputBox>
                        <TimeDivider>-</TimeDivider>
                        <TimeInputBox>
                            <DatePicker
                                selected={endValue}
                                onChange={onEndChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="시간"   
                                dateFormat="aa h:mm"
                                placeholderText="종료 시간"
                                customInput={
                                    <TimeInput
                                        $error={$error}
                                        {...props}
                                    />
                                }
                            />
                            <img src={time} alt="time icon" />
                        </TimeInputBox>
                    </TimeInputContainer>
                    {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                </TimeRangeWrapper>
            </>
        );
    };

    // 3. 성별 선택 컴포넌트
    export const GenderSelect = ({
        label = "성별",
        value,
        onChange,
        $error,
        errorMessage,
        ...props
    }) => {
        const handleGenderClick = (gender) => {
            if (onChange) {
                onChange(gender);
            }
        };

        return (
            <GenderWrapper>
                <GenderLabel>{label}</GenderLabel>
                <GenderButtonGroup>
                    <GenderButton
                        type="button"
                        $isSelected={value === "male"}
                        $error={$error}
                        onClick={() => handleGenderClick("male")}
                        {...props}
                    >
                        남자
                    </GenderButton>
                    <GenderButton
                        type="button"
                        $isSelected={value === "female"}
                        $error={$error}
                        onClick={() => handleGenderClick("female")}
                        {...props}
                    >
                        여자
                    </GenderButton>
                </GenderButtonGroup>
                {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </GenderWrapper>
        );
    };

    // 4. 이미지 업로드 컴포넌트 (최대 4개)
    export const ImageUpload = ({
        label = "상세 설명",
        images = [],
        onChange,
        maxImages = 4,
        $error,
        errorMessage,
        ...props
    }) => {
        const handleFileChange = (e) => {
            const files = Array.from(e.target.files);
            const remainingSlots = maxImages - images.length;
            const filesToAdd = files.slice(0, remainingSlots);
            const newImages = filesToAdd.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            if (onChange) {
                onChange([...images, ...newImages]);
            }
        };

        const handleRemoveImage = (index) => {
            const newImages = images.filter((_, i) => i !== index);
            // 메모리 해제
            if (images[index]?.preview) {
                URL.revokeObjectURL(images[index].preview);
            }
            if (onChange) {
                onChange(newImages);
            }
        };

        return (
            <ImageUploadWrapper>
                <ImageUploadLabel>{label}</ImageUploadLabel>
                <ImageUploadContainer>
                    {images.map((image, index) => (
                        <ImagePreview key={index}>
                            <img src={image.preview} alt={`업로드 이미지 ${index + 1}`} />
                            <ImageRemoveButton
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                            >
                                ×
                            </ImageRemoveButton>
                        </ImagePreview>
                    ))}
                    {images.length < maxImages && (
                        <ImageUploadBox $error={$error} htmlFor="image-upload">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span>{images.length}/{maxImages}</span>
                            <HiddenFileInput
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                {...props}
                            />
                        </ImageUploadBox>
                    )}
                </ImageUploadContainer>
                {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </ImageUploadWrapper>
        );
    };

    // 5. 텍스트 영역 컴포넌트
    export const TextArea = ({
        label,
        value,
        onChange,
        maxLength = 1000,
        placeholder = "예) 서비스 음성, 주거 비용, 서비스 횟수에 따른 견적 차이 등",
        $error,
        errorMessage,
        ...props
    }) => {
        return (
            <TextAreaWrapper>
                {label && <TextAreaLabel>{label}</TextAreaLabel>}
                <StyledTextArea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    $error={$error}
                    {...props}
                />
                <CharacterCount>
                    {value?.length || 0}/{maxLength} 자
                </CharacterCount>
                {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </TextAreaWrapper>
        );
    };

    // 6. 주소 입력 컴포넌트
    export const AddressInput = ({
        label = "주소",
        mainAddress,
        detailAddress,
        onMainChange,
        onDetailChange,
        onSearchClick,
        $error,
        errorMessage,
        ...props
    }) => {
        return (
            <AddressWrapper>
                <AddressLabel>{label}</AddressLabel>
                <AddressInputGroup>
                    <StyledAddressInput
                        type="text"
                        placeholder="주소를 입력해주세요"
                        value={mainAddress}
                        onChange={onMainChange}
                        readOnly
                        $error={$error}
                        {...props}
                    />
                    <AddressButton type="button" onClick={onSearchClick}>
                        찾아보기
                    </AddressButton>
                </AddressInputGroup>
                <StyledAddressInput
                    type="text"
                    placeholder="상세 주소를 입력해주세요"
                    value={detailAddress}
                    onChange={onDetailChange}
                    $error={$error}
                    {...props}
                />
                {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </AddressWrapper>
        );
    };


    // 7. 사업자등록번호 입력 컴포넌트
    export const BussinessInput = ({
        label = "사업자등록번호(상세)",
        businessNumber,
        onBusinessNumberChange,
        onSearchClick,
        $error,
        errorMessage,
        ...props
    }) => {
        return (
            <AddressWrapper>
                <AddressLabel>{label}</AddressLabel>
                <AddressInputGroup>
                    <StyledAddressInput
                        type="text"
                        placeholder="사업자등록번호를 입력해주세요"
                        value={businessNumber}
                        onChange={onBusinessNumberChange}
                        readOnly
                        $error={$error}
                        {...props}
                    />
                    <AddressButton type="button" onClick={onSearchClick}>
                        인증하기
                    </AddressButton>
                </AddressInputGroup>
                {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </AddressWrapper>
        );
    };

    // 8. 체크박스 그룹 컴포넌트
    export const CheckboxGroup = ({
        label,
        options = [],
        selectedValues = [],
        onChange,
        $error,
        errorMessage,
        ...props
    }) => {
        const handleCheckboxChange = (value) => {
            if (selectedValues.includes(value)) {
                // 이미 선택되어 있으면 제거
                onChange(selectedValues.filter(v => v !== value));
            } else {
                // 선택되어 있지 않으면 추가
                onChange([...selectedValues, value]);
            }
        };

        return (
            <CheckboxWrapper>
                {label && <CheckboxLabel>{label}</CheckboxLabel>}
                {options.map((option) => {
                    const isChecked = selectedValues.includes(option.value);
                    return (
                        <CheckboxItem
                            key={option.value}
                            $isChecked={isChecked}
                        >
                            <CheckboxText $isChecked={isChecked}>
                                {option.label}
                            </CheckboxText>
                            <CheckboxIcon $isChecked={isChecked}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </CheckboxIcon>
                            <HiddenCheckbox
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(option.value)}
                                {...props}
                            />
                        </CheckboxItem>
                    );
                })}
                {$error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </CheckboxWrapper>
        );
    };

export default Input;
