import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { hasAdminAccess } from "../../utils/authUtils";
import { getAdminReports, updateReportStatus } from "../../api/admin/adminReportApi";
import * as S from './AdminReportList.styled';

const AdminReportList = () => {
  const { currentUser } = useAuth();
  const [reports, setReports] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    status: "",
    reasonNo: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 신고 목록 조회
  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAdminReports({
        currentPage,
        ...searchParams
      });
      setReports(response.data.reportList);
      setPageInfo(response.data.pageInfo);
    } catch (err) {
      setError(err.response?.data?.message || "신고 목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  // 검색 실행
  const handleSearch = () => {
    setCurrentPage(1);
    fetchReports();
  };

  useEffect(() => {
    if (hasAdminAccess(currentUser?.userRole)) {
      fetchReports();
    }
  }, [currentPage, currentUser]);

  // 신고 상태 변경
  const handleStatusChange = async (reportNo, newStatus) => {
    const answer = prompt("답변을 입력하세요:");
    if (!answer) {
      alert("답변을 입력해야 합니다.");
      return;
    }

    try {
      await updateReportStatus(reportNo, newStatus, answer);
      alert("신고 상태가 변경되었습니다.");
      fetchReports();
    } catch (err) {
      alert(err.response?.data?.message || "상태 변경 실패");
    }
  };

  // 관리자 권한 체크
  if (!hasAdminAccess(currentUser?.userRole)) {
    return (
      <S.Container>
        <S.Title>접근 권한이 없습니다.</S.Title>
      </S.Container>
    );
  }

  if (loading) return <S.Container>로딩 중...</S.Container>;
  if (error) return <S.Container style={{ color: "red" }}>{error}</S.Container>;

  return (
    <S.Container>
      <S.Title>신고 관리</S.Title>

      {/* 검색 필터 */}
      <S.SearchSection>
        <S.SearchRow>
          <S.Select
            value={searchParams.status}
            onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
          >
            <option value="">전체 상태</option>
            <option value="WAITING">대기중</option>
            <option value="RESOLVED">해결됨</option>
            <option value="REJECTED">반려됨</option>
          </S.Select>

          <S.Button onClick={handleSearch}>
            검색
          </S.Button>
        </S.SearchRow>
      </S.SearchSection>

      {/* 신고 목록 테이블 */}
      <S.Table>
        <thead>
          <tr>
            <S.Th>번호</S.Th>
            <S.Th>신고자</S.Th>
            <S.Th>대상자</S.Th>
            <S.Th>사유</S.Th>
            <S.Th>내용</S.Th>
            <S.Th>상태</S.Th>
            <S.Th>신고일</S.Th>
            <S.Th>관리</S.Th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.reportNo}>
              <S.Td>{report.reportNo}</S.Td>
              <S.Td>{report.reporterNickname}</S.Td>
              <S.Td>{report.targetNickname}</S.Td>
              <S.Td>{report.reasonName}</S.Td>
              <S.Td>{report.content}</S.Td>
              <S.Td>
                {report.status === "WAITING" && "대기중"}
                {report.status === "RESOLVED" && "해결됨"}
                {report.status === "REJECTED" && "반려됨"}
              </S.Td>
              <S.Td>{report.createDate}</S.Td>
              <S.Td>
                {report.status === "WAITING" && (
                  <>
                    <S.ActionButton 
                      variant="success"
                      onClick={() => handleStatusChange(report.reportNo, "RESOLVED")}
                    >
                      승인
                    </S.ActionButton>
                    <S.ActionButton 
                      variant="danger"
                      onClick={() => handleStatusChange(report.reportNo, "REJECTED")}
                    >
                      반려
                    </S.ActionButton>
                  </>
                )}
              </S.Td>
            </tr>
          ))}
        </tbody>
      </S.Table>

      {/* 페이징 */}
      {pageInfo && (
        <S.Pagination>
          <S.PageButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            이전
          </S.PageButton>
          <S.PageInfo>
            {currentPage} / {pageInfo.maxPage}
          </S.PageInfo>
          <S.PageButton
            disabled={currentPage === pageInfo.maxPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            다음
          </S.PageButton>
        </S.Pagination>
      )}
    </S.Container>
  );
};

export default AdminReportList;