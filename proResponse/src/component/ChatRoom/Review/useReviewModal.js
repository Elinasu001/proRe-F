import { useState, useEffect } from 'react';
import { getReviewTags } from '../../../api/review/reviewApi';
import useToast from '../../Common/Toast/useToast';

/**
 * useReviewWriteModal - 리뷰 작성 모달용 커스텀 훅
 * @param {boolean} isOpen - 모달 열림 여부
 */
export default function useReviewWriteModal(isOpen) {
	const [starScore, setStarScore] = useState(0);
	const [hoveredStarScore, setHoveredStarScore] = useState(0);
	const [images, setImages] = useState([]);
	const [reviewText, setReviewText] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [fetchedTags, setFetchedTags] = useState([]);
	const { showToast, toastMessage, showToastMessage, closeToast } = useToast();

	const MAX_IMAGES = 4;
	const MAX_TEXT_LENGTH = 1000;

	// 모달이 열릴 때 폼 초기화 및 태그 불러오기
	useEffect(() => {
		if (!isOpen) return;

		// 폼 초기화
		setStarScore(0);
		setHoveredStarScore(0);
		setImages([]);
		setReviewText('');
		setSelectedTags([]);

		// 태그 목록 불러오기
		const fetchTags = async () => {
			try {
				const res = await getReviewTags();
				const options = res.map(c => ({
					value: c.tagNo,
					label: c.tagName
				}));
				setFetchedTags(options);
			} catch {
				showToastMessage('리뷰 태그 불러오기 실패');
			}
		};

		fetchTags();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	// 태그 토글
	const handleTagToggle = (tag) => {
		const isSelected = selectedTags.some(t => t.value === tag.value);
		if (isSelected) {
			setSelectedTags(selectedTags.filter(t => t.value !== tag.value));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	// 폼 검증
	const validateForm = () => {
		if (starScore === 0) {
			showToastMessage('별점을 선택해주세요.');
			return false;
		}
		if (reviewText.trim().length === 0) {
			showToastMessage('후기를 작성해주세요.');
			return false;
		}
		return true;
	};

	// 제출 데이터 생성
	const getSubmitData = () => ({
		starScore,
		images: images.map(img => img.preview),
		text: reviewText,
		tags: selectedTags.map(t => t.value),
	});

	return {
		// 상태
		starScore,
		hoveredStarScore,
		images,
		reviewText,
		selectedTags,
		fetchedTags,
		// 상수
		MAX_IMAGES,
		MAX_TEXT_LENGTH,
		// 핸들러
		setStarScore,
		setHoveredStarScore,
		setImages,
		setReviewText,
		handleTagToggle,
		validateForm,
		getSubmitData,
		// Toast
		showToast,
		toastMessage,
		closeToast,
		showToastMessage,
	};
}
