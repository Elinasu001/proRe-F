// src/component/Admin/AdminMemberList.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { hasAdminAccess } from "../../utils/authUtils";
import { getAdminMembers, updateMemberStatus, updateMemberPenalty } from "../../api/Admin/adminMemberApi";

const AdminMemberList = () => {
  const { currentUser } = useAuth();
  const [members, setMembers] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    status: "",
    penaltyStatus: "",
    userRole: "",
    searchKeyword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 관리자 권한 체크
  if (!hasAdminAccess(currentUser?.userRole)) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2>접근 권한이 없습니다.</h2>
      </div>
    );
  }

  // 회원 목록 조회
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAdminMembers({
        currentPage,
        ...searchParams
      });
      setMembers(response.data.memberList);
      setPageInfo(response.data.pageInfo);
    } catch (err) {
      setError(err.response?.data?.message || "회원 목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [currentPage]);

  // 상태 변경
  const handleStatusChange = async (userNo, newStatus) => {
    try {
      await updateMemberStatus(userNo, newStatus);
      alert("회원 상태가 변경되었습니다.");
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || "상태 변경 실패");
    }
  };

  // 패널티 변경
  const handlePenaltyChange = async (userNo, newPenalty) => {
    try {
      await updateMemberPenalty(userNo, newPenalty);
      alert("패널티 상태가 변경되었습니다.");
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || "패널티 변경 실패");
    }
  };

  if (loading) return <div style={{ padding: 24 }}>로딩 중...</div>;
  if (error) return <div style={{ padding: 24, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>회원 관리</h2>

      {/* 검색 필터 */}
      <div style={{ marginBottom: 20, padding: 16, border: "1px solid #ddd" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <select
            value={searchParams.status}
            onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
          >
            <option value="">전체 상태</option>
            <option value="Y">활성</option>
            <option value="N">비활성</option>
          </select>

          <select
            value={searchParams.penaltyStatus}
            onChange={(e) => setSearchParams({ ...searchParams, penaltyStatus: e.target.value })}
          >
            <option value="">전체 패널티</option>
            <option value="N">정상</option>
            <option value="Y">패널티</option>
          </select>

          <select
            value={searchParams.userRole}
            onChange={(e) => setSearchParams({ ...searchParams, userRole: e.target.value })}
          >
            <option value="">전체 역할</option>
            <option value="ROLE_USER">일반회원</option>
            <option value="ROLE_EXPERT">전문가</option>
            <option value="ROLE_ADMIN">관리자</option>
          </select>

          <input
            type="text"
            placeholder="이메일 또는 닉네임 검색"
            value={searchParams.searchKeyword}
            onChange={(e) => setSearchParams({ ...searchParams, searchKeyword: e.target.value })}
            style={{ padding: 8, flex: 1 }}
          />

          <button onClick={() => { setCurrentPage(1); fetchMembers(); }}>
            검색
          </button>
        </div>
      </div>

      {/* 회원 목록 테이블 */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333" }}>
            <th style={{ padding: 12 }}>번호</th>
            <th style={{ padding: 12 }}>이메일</th>
            <th style={{ padding: 12 }}>닉네임</th>
            <th style={{ padding: 12 }}>역할</th>
            <th style={{ padding: 12 }}>상태</th>
            <th style={{ padding: 12 }}>패널티</th>
            <th style={{ padding: 12 }}>가입일</th>
            <th style={{ padding: 12 }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.userNo} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: 12, textAlign: "center" }}>{member.userNo}</td>
              <td style={{ padding: 12 }}>{member.email}</td>
              <td style={{ padding: 12 }}>{member.nickname}</td>
              <td style={{ padding: 12, textAlign: "center" }}>
                {member.userRole === "ROLE_USER" && "일반"}
                {member.userRole === "ROLE_EXPERT" && "전문가"}
                {member.userRole === "ROLE_ADMIN" && "관리자"}
              </td>
              <td style={{ padding: 12, textAlign: "center" }}>
                <select
                  value={member.status}
                  onChange={(e) => handleStatusChange(member.userNo, e.target.value)}
                >
                  <option value="Y">활성</option>
                  <option value="N">비활성</option>
                </select>
              </td>
              <td style={{ padding: 12, textAlign: "center" }}>
                <select
                  value={member.penaltyStatus}
                  onChange={(e) => handlePenaltyChange(member.userNo, e.target.value)}
                >
                  <option value="N">정상</option>
                  <option value="Y">패널티</option>
                </select>
              </td>
              <td style={{ padding: 12, textAlign: "center" }}>
                {member.createDate}
              </td>
              <td style={{ padding: 12, textAlign: "center" }}>
                <button onClick={() => alert(`상세: ${member.userNo}`)}>
                  상세
                </button>
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

export default AdminMemberList;