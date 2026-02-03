import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { hasAdminAccess } from "../../utils/authUtils";
import { getAdminReports, updateReportStatus } from "../../api/admin/adminReportApi";

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
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2>접근 권한이 없습니다.</h2>
      </div>
    );
  }

  if (loading) return <div style={{ padding: 24 }}>로딩 중...</div>;
  if (error) return <div style={{ padding: 24, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>신고 관리</h2>

      {/* 검색 필터 */}
      <div style={{ marginBottom: 20, padding: 16, border: "1px solid #ddd" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <select
            value={searchParams.status}
            onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
          >
            <option value="">전체 상태</option>
            <option value="WAITING">대기중</option>
            <option value="RESOLVED">해결됨</option>
            <option value="REJECTED">반려됨</option>
          </select>

          <button onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>

      {/* 신고 목록 테이블 */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333" }}>
            <th style={{ padding: 12 }}>번호</th>
            <th style={{ padding: 12 }}>신고자</th>
            <th style={{ padding: 12 }}>대상자</th>
            <th style={{ padding: 12 }}>사유</th>
            <th style={{ padding: 12 }}>내용</th>
            <th style={{ padding: 12 }}>상태</th>
            <th style={{ padding: 12 }}>신고일</th>
            <th style={{ padding: 12 }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.reportNo} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: 12, textAlign: "center" }}>{report.reportNo}</td>
              <td style={{ padding: 12 }}>{report.reporterNickname}</td>
              <td style={{ padding: 12 }}>{report.targetNickname}</td>
              <td style={{ padding: 12 }}>{report.reasonName}</td>
              <td style={{ padding: 12 }}>{report.content}</td>
              <td style={{ padding: 12, textAlign: "center" }}>
                {report.status === "WAITING" && "대기중"}
                {report.status === "RESOLVED" && "해결됨"}
                {report.status === "REJECTED" && "반려됨"}
              </td>
              <td style={{ padding: 12, textAlign: "center" }}>
                {report.createDate}
              </td>
              <td style={{ padding: 12, textAlign: "center" }}>
                {report.status === "WAITING" && (
                  <>
                    <button 
                      onClick={() => handleStatusChange(report.reportNo, "RESOLVED")}
                      style={{ marginRight: 8 }}
                    >
                      승인
                    </button>
                    <button 
                      onClick={() => handleStatusChange(report.reportNo, "REJECTED")}
                    >
                      반려
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 */}
      {pageInfo && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            이전
          </button>
          <span style={{ margin: "0 12px" }}>
            {currentPage} / {pageInfo.maxPage}
          </span>
          <button
            disabled={currentPage === pageInfo.maxPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminReportList;