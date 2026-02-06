import { useEffect, useState } from 'react';
// import { getReportApi } from '../../../api/report/reportApi';
import CommonModal from '../../Common/Modal/CommonModal.jsx';
import { TextArea } from '../../Common/Input/Input.jsx';
import * as S from '../../Common/Modal/Review/Modal.styled';
import * as W from '../../Common/Modal/Review/ReviewWrite.styled.js';
import { useReportDetail } from './useReportModal';

const ReportModal = ({ isOpen, onClose, onSubmit, tagOptions = [], estimateNo }) => {

  // 폼 상태: 입력 중일 때만 별도 관리, 신고 내역 있으면 report에서 바로 사용
  const [inputText, setInputText] = useState('');
  const [inputTags, setInputTags] = useState([]);
  const MAX_TEXT_LENGTH = 1000;
  // 신고 내역 조회 훅 사용
  const { report, loading, refetch } = useReportDetail(isOpen ? estimateNo : null);
  const hasReport = !!(report && (report.content || (Array.isArray(report.tagList) && report.tagList.length > 0)));

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

  // 신고 내역 조회 결과를 폼에 바인딩
  useEffect(() => {
    if (isOpen && !hasReport) {
      setInputText('');
      setInputTags([]);
    }
  }, [isOpen, hasReport]);

  // 태그 토글 (value 기준으로 비교)
  const handleTagToggle = (tag) => {
    const isSelected = inputTags.some(t => t.value === tag.value);
    if (isSelected) {
      setInputTags(inputTags.filter(t => t.value !== tag.value));
    } else {
      setInputTags([...inputTags, tag]);
    }
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (inputText.trim().length === 0) {
      alert('신고 내용을 입력해주세요.');
      return;
    }
    await onSubmit({
      text: inputText,
      tags: inputTags,
    });
    // 신고 후 최신 내역 강제 반영 (모달 닫기 전에)
    await refetch();
  };


  if (!isOpen) return null;

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} ariaLabelledby="write-report-title">
      {/* 헤더 */}
      <S.ModalHeader>
        {hasReport ? (
          <>
            <S.ModalTitle id="write-report-title">내가 보낸 신고</S.ModalTitle>
          </>
        ) : (
          <S.ModalTitle id="write-report-title">신고 작성하기</S.ModalTitle>
        )}
      </S.ModalHeader>
      {/* 신고 작성 폼 */}
      <W.WriteContent>
        {/* 텍스트 입력 */}
        <TextArea
          placeholder="신고 사유를 입력하세요"
          value={hasReport ? (report?.content || '') : inputText}
          onChange={e => setInputText(e.target.value)}
          maxLength={MAX_TEXT_LENGTH}
          disabled={loading || hasReport}
        />
        {/* 태그 선택 */}
        {tagOptions.length > 0 && (
          <W.TagSelectSection>
            {hasReport
              ? (Array.isArray(report?.selectedTags) && report.selectedTags.length > 0
                ? report.selectedTags.filter(t => t.selected || t.reasonNo || t.value).map((tag, index) => (
                    <W.SelectableTag
                      key={tag.reasonNo ?? tag.value ?? index}
                      disabled
                    >
                      {tag.reasonName || tag.label}
                    </W.SelectableTag>
                  ))
                : null)
              : tagOptions.map((tag, index) => {
                  const selected = inputTags.some(t => t.value === tag.value);
                  return (
                    <W.SelectableTag
                      key={tag.value ?? index}
                      $selected={selected}
                      onClick={() => handleTagToggle(tag)}
                      disabled={loading}
                    >
                      {tag.label}
                    </W.SelectableTag>
                  );
                })
            }
          </W.TagSelectSection>
        )}
      </W.WriteContent>
      {/* 버튼 그룹 */}
      <S.ButtonGroup>
        {hasReport ? (
          <S.ConfirmButton onClick={onClose}>확인</S.ConfirmButton>
        ) : (
          <>
            <S.CancelButton onClick={onClose}>취소</S.CancelButton>
            <S.ConfirmButton onClick={handleSubmit}>신고</S.ConfirmButton>
          </>
        )}
      </S.ButtonGroup>
    </CommonModal>
  );
};

export default ReportModal;
