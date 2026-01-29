import { useEffect, useState } from 'react';
import CommonModal from '../../Common/Modal/CommonModal.jsx';
import { TextArea } from '../../Common/Input/Input.jsx';
import * as S from '../../Common/Modal/Review/Modal.styled';
import * as W from '../../Common/Modal/Review/ReviewWrite.styled.js';

/**
 * ReportModal - 신고 모달 (리뷰 작성 모달과 거의 동일, 별점/사진첨부 없음)
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {function} props.onClose - 닫기 콜백
 * @param {function} props.onSubmit - 제출 콜백
 * @param {Array} props.tagOptions - 선택 가능한 태그 목록
 */
const ReportModal = ({ isOpen, onClose, onSubmit, tagOptions = [] }) => {
  // 폼 상태
  const [reportText, setReportText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const MAX_TEXT_LENGTH = 1000;

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 모달이 열릴 때만 폼 초기화
  useEffect(() => {
    if (isOpen) {
      setReportText('');
      setSelectedTags([]);
    }
  }, [isOpen]);

  // 태그 토글
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 폼 제출
  const handleSubmit = () => {
    if (reportText.trim().length === 0) {
      alert('신고 내용을 입력해주세요.');
      return;
    }
    onSubmit({
      text: reportText,
      tags: selectedTags,
    });
  };

  if (!isOpen) return null;

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} ariaLabelledby="write-report-title">
      {/* 헤더 */}
      <S.ModalHeader>
        <S.ModalTitle id="write-report-title">신고하기</S.ModalTitle>
      </S.ModalHeader>
      {/* 신고 작성 폼 */}
      <W.WriteContent>
        {/* 텍스트 입력 */}
        <TextArea
          placeholder="신고 사유를 입력하세요"
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          maxLength={MAX_TEXT_LENGTH}
        />
        {/* 태그 선택 */}
        {tagOptions.length > 0 && (
          <W.TagSelectSection>
            {tagOptions.map((tag, index) => (
              <W.SelectableTag
                key={index}
                $selected={selectedTags.includes(tag)}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </W.SelectableTag>
            ))}
          </W.TagSelectSection>
        )}
      </W.WriteContent>
      {/* 버튼 그룹 */}
      <S.ButtonGroup>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
        <S.ConfirmButton onClick={handleSubmit}>확인</S.ConfirmButton>
      </S.ButtonGroup>
    </CommonModal>
  );
};

export default ReportModal;
