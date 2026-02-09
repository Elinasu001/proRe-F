import { useEffect, useState } from 'react';
// import { useReportDetail } from './useReportModal';
// import { getReportApi } from '../../../api/report/reportApi';
import { TextArea } from '../../Common/Input/Input.jsx';
import CommonModal from '../../Common/Modal/CommonModal.jsx';
import * as S from '../../Common/Modal/Review/Modal.styled';
import * as W from '../../Common/Modal/Review/ReviewWrite.styled.js';
import useToast from '../../Common/Toast/useToast';
import useCommonModal from '../useCommonModal';

const ReportModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  tagOptions = [], 
  estimateNo,
  existingReport = null
}) => {

  // 폼 상태: 입력 중일 때만 별도 관리, 신고 내역 있으면 report에서 바로 사용
  const [inputText, setInputText] = useState('');
  const [inputTags, setInputTags] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const MAX_TEXT_LENGTH = 1000;
  
  const { showToastMessage } = useToast();
  
  const hasReport = !!(report && report.content);

  // 모달 열릴 때 입력값 초기화
  useEffect(() => {
    if (isOpen) {
      if (existingReport) {
        // 이미 신고한 경우 > 조회 모드
        setReport(existingReport);
        setInputText('');
        setInputTags([]);
      } else {
        // 신고 안 한 경우 > 입력 모드
        setReport(null);
        setInputText('');
        setInputTags([]);
      }
    }
  }, [isOpen, existingReport]);

  // 공통 모달 부수효과 적용 (ESC, 스크롤락)
  useCommonModal(isOpen, onClose);


  // 태그 토글 (value 기준으로 비교)
  const handleTagToggle = (tag) => {
    const isSelected = inputTags.some(t => t.value === tag.value);
    
    if (isSelected) {
      setInputTags(inputTags.filter(t => t.value !== tag.value));
    } else {
      setInputTags([...inputTags, tag]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (inputText.trim().length === 0) {
        showToastMessage('신고 내용을 입력해주세요.', 'error');
        return;
      }
      if (inputTags.length === 0) {
        showToastMessage('신고 사유(카테고리)를 선택해주세요.', 'error');
        return;
      }

      setLoading(true);

      await onSubmit({
        text: inputText,
        tags: inputTags,
      });

      // 입력한 값을 바로 화면에 표시
      const displayData = {
        content: inputText,
        selectedTags: inputTags.map(tag => ({
          reasonNo: tag.value,
          reasonName: tag.label,
          selected: true
        })),
        createDate: new Date(),
        status: 'WAITING'
      };

      setReport(displayData);
      
    } catch (err) {
      console.error('신고 등록 실패:', err);
      
      if (err.response?.status === 400) {
        showToastMessage(
          err.response?.data?.message || '입력 정보를 확인해주세요.', 
          'error'
        );
      } else {
        showToastMessage('신고 처리 중 오류가 발생했습니다.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} ariaLabelledby="write-report-title">
      <S.ModalHeader>
        <S.ModalTitle id="write-report-title">
          {hasReport ? '내가 보낸 신고' : '신고 작성하기'}
        </S.ModalTitle>
      </S.ModalHeader>

      <W.WriteContent>
        <TextArea
          placeholder="신고 사유를 입력하세요"
          value={hasReport ? report.content : inputText}
          onChange={e => setInputText(e.target.value)}
          maxLength={MAX_TEXT_LENGTH}
          disabled={loading || hasReport}
        />

        {tagOptions.length > 0 && (
          <W.TagSelectSection>
            {hasReport
              ? report.selectedTags?.map((tag, index) => (
                  <W.SelectableTag key={tag.reasonNo ?? index} disabled>
                    {tag.reasonName}
                  </W.SelectableTag>
                ))
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

      <S.ButtonGroup>
        {hasReport ? (
          <S.ConfirmButton onClick={onClose}>확인</S.ConfirmButton>
        ) : (
          <>
            <S.CancelButton onClick={onClose}>취소</S.CancelButton>
            <S.ConfirmButton onClick={handleSubmit} disabled={loading}>
              {loading ? '처리중...' : '신고'}
            </S.ConfirmButton>
          </>
        )}
      </S.ButtonGroup>
    </CommonModal>
  );
};

export default ReportModal;