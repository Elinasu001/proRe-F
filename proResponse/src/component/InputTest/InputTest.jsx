import React, { useState } from 'react';
import Input, { DateInput, TimeRangeInput, GenderSelect, ImageUpload, TextArea, AddressInput, BussinessInput, CheckboxGroup} from '../Common/Input/Input.jsx';
import * as S from './InputTest.styled';

const InputTest = () => {
	// 상태 관리
	const [basicInput, setBasicInput] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [gender, setGender] = useState('');
	const [images, setImages] = useState([]);
	const [textAreaValue, setTextAreaValue] = useState('');
	const [mainAddress, setMainAddress] = useState('');
	const [detailAddress, setDetailAddress] = useState('');
	const [businessNumber, setBusinessNumber] = useState('');
	const [selectedLessons, setSelectedLessons] = useState([]);

	// 에러 상태 관리
	const [showErrors, setShowErrors] = useState(false);

	// 체크박스 옵션
	const lessonOptions = [
		{ value: 'piano', label: '피아노/키보드레슨' },
		{ value: 'vocal', label: '보컬 레슨' },
		{ value: 'analytics', label: '일렉기타 레슨' },
		{ value: 'bass', label: '베이스기타 레슨' },
		{ value: 'drum', label: '드럼 레슨' },
		{ value: 'percussion', label: '타악기 레슨' },
		{ value: 'vocal2', label: '보컬 레슨 2' },
		{ value: 'sound', label: '성악 레슨' }
	];

	// 주소 검색 핸들러
	const handleAddressSearch = () => {
		// 실제로는 다음 주소 API 등을 사용
		alert('주소 검색 기능은 다음 주소 API 등을 연동하여 구현할 수 있습니다.');
	};

	return (
		<S.Container>
			<S.Title>Input 컴포넌트 테스트</S.Title>

			<S.Section>
				<S.SectionTitle>에러 상태 테스트</S.SectionTitle>
				<button
					onClick={() => setShowErrors(!showErrors)}
					style={{
						padding: '12px 24px',
						fontSize: '16px',
						borderRadius: '8px',
						border: '1px solid #4A90E2',
						backgroundColor: showErrors ? '#4A90E2' : '#FFFFFF',
						color: showErrors ? '#FFFFFF' : '#4A90E2',
						cursor: 'pointer'
					}}
				>
					{showErrors ? '정상 상태로 보기' : '에러 상태로 보기'}
				</button>
			</S.Section>

			<S.Section>
				<S.SectionTitle>1. 기본 Input</S.SectionTitle>
				<Input
					placeholder="기본 입력 필드"
					value={basicInput}
					onChange={(e) => setBasicInput(e.target.value)}
					$error={showErrors}
					errorMessage={showErrors ? "필수 입력 항목입니다" : ""}
				/>
				<S.ValueDisplay>입력값: {basicInput}</S.ValueDisplay>
			</S.Section>

			<S.Section>
				<S.SectionTitle>2. 생년월일 Input</S.SectionTitle>
				<DateInput
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
					$error={showErrors}
					errorMessage={showErrors ? "올바른 생년월일을 입력해주세요 (YYYYMMDD)" : ""}
				/>
				<S.ValueDisplay>입력값: {birthDate}</S.ValueDisplay>
			</S.Section>

			<S.Section>
				<S.SectionTitle>3. 연락 가능 시간 Input</S.SectionTitle>
				<TimeRangeInput
					startValue={startTime}
					endValue={endTime}
					onStartChange={(date) => setStartTime(date)}
					onEndChange={(date) => setEndTime(date)}
					$error={showErrors}
					errorMessage={showErrors ? "시작 시간과 종료 시간을 모두 입력해주세요" : ""}
				/>
				<S.ValueDisplay>
					입력값: {startTime ? startTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : ''} ~ {endTime ? endTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : ''}
				</S.ValueDisplay>
			</S.Section>

			<S.Section>
				<S.SectionTitle>4. 성별 선택</S.SectionTitle>
				<GenderSelect
					value={gender}
					onChange={setGender}
					$error={showErrors}
					errorMessage={showErrors ? "성별을 선택해주세요" : ""}
				/>
				<S.ValueDisplay>선택값: {gender}</S.ValueDisplay>
			</S.Section>

			<S.Section>
				<S.SectionTitle>5. 이미지 업로드 (최대 4개)</S.SectionTitle>
				<ImageUpload
					images={images}
					onChange={setImages}
					maxImages={4}
					$error={showErrors}
					errorMessage={showErrors ? "이미지를 업로드해주세요" : ""}
				/>
				<S.ValueDisplay>업로드된 이미지: {images.length}개</S.ValueDisplay>
			</S.Section>

			<S.Section>
				<S.SectionTitle>6. 텍스트 영역</S.SectionTitle>
				<TextArea
					value={textAreaValue}
					onChange={(e) => setTextAreaValue(e.target.value)}
					placeholder="예) 서비스 음성, 주거 비용, 서비스 횟수에 따른 견적 차이 등"
					maxLength={1000}
					$error={showErrors}
					errorMessage={showErrors ? "내용을 입력해주세요" : ""}
				/>
			</S.Section>

			<S.Section>
				<S.SectionTitle>7. 주소 입력</S.SectionTitle>
				<AddressInput
					mainAddress={mainAddress}
					detailAddress={detailAddress}
					onMainChange={(e) => setMainAddress(e.target.value)}
					onDetailChange={(e) => setDetailAddress(e.target.value)}
					onSearchClick={handleAddressSearch}
					$error={showErrors}
					errorMessage={showErrors ? "주소를 입력해주세요" : ""}
				/>
				<S.ValueDisplay>
					주소: {mainAddress} {detailAddress}
				</S.ValueDisplay>
			</S.Section>


			<S.Section>
				<S.SectionTitle>8. 사업자등록번호</S.SectionTitle>
				<BussinessInput
					mainAddress={mainAddress}
					onMainChange={(e) => setBusinessNumber(e.target.value)}
					onSearchClick={handleAddressSearch}
					$error={showErrors}
					errorMessage={showErrors ? "사업자등록번호를 입력해주세요" : ""}
				/>
				<S.ValueDisplay>
					사업자등록번호: {businessNumber}
				</S.ValueDisplay>
			</S.Section>

			
			
			<S.Section>
				<S.SectionTitle>8. 사업자등록번호</S.SectionTitle>
				<CheckboxGroup
					options={lessonOptions}
					selectedValues={selectedLessons}
					onChange={setSelectedLessons}
					$error={showErrors}
					errorMessage={showErrors ? "관심 레슨을 하나 이상 선택해주세요" : ""}
				/>
				<S.ValueDisplay>
					사업자등록번호: {businessNumber}
				</S.ValueDisplay>
			</S.Section>


		</S.Container>
	);
};

export default InputTest;
