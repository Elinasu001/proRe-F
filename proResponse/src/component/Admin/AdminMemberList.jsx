import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { hasAdminAccess } from "../../utils/authUtils";
import { getAdminMembers, updateMemberStatus, updateMemberPenalty, updateUserRole} from "../../api/admin/adminMemberApi.js";
import { getReportsByTarget } from "../../api/admin/adminReportApi.js";
import * as S from './AdminMemberList.styled';

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
  
  // 모달 관련 state
  const [selectedUserNo, setSelectedUserNo] = useState(null);
  const [userReports, setUserReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);

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

  // 회원별 신고 내역 조회
  const fetchUserReports = async (userNo) => {
    setReportsLoading(true);
    try {
      const response = await getReportsByTarget(userNo, { currentPage: 1 });
      setUserReports(response.data.reportList);
    } catch (err) {
      alert("신고 내역 조회 실패");
    } finally {
      setReportsLoading(false);
    }
  };

  // 검색 실행
  const handleSearch = () => {
    setCurrentPage(1);
    fetchMembers();
  };

  useEffect(() => {
    if (hasAdminAccess(currentUser?.userRole)) {
      fetchMembers();
    }
  }, [currentPage, currentUser]);

// 권한 변경
const handleRoleChange = async (userNo, newRole) => {
  const roleNames = {
    'ROLE_USER': '일반 회원',
    'ROLE_EXPERT': '전문가',
    'ROLE_ADMIN': '관리자'
  };

  if (!confirm(`권한을 ${roleNames[newRole]}(으)로 변경하시겠습니까?`)) {
    fetchMembers(); // 드롭다운 원래대로 되돌리기
    return;
  }

  try {
    await updateUserRole(userNo, newRole);
    alert(`권한이 ${roleNames[newRole]}(으)로 변경되었습니다.`);
    fetchMembers();
  } catch (err) {
    alert(err.response?.data?.message || '권한 변경 실패');
    fetchMembers();
  }
};

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

  // 페널티 변경
  const handlePenaltyChange = async (userNo, newPenalty) => {
    try {
      await updateMemberPenalty(userNo, newPenalty);
      alert("페널티 상태가 변경되었습니다.");
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || "페널티 변경 실패");
    }
  };

  // 상세 버튼 클릭
  const handleDetailClick = (userNo) => {
    setSelectedUserNo(userNo);
    fetchUserReports(userNo);
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
    <>
      <S.Container>
        <S.Title>회원 관리</S.Title>

        {/* 검색 필터 */}
        <S.SearchSection>
          <S.SearchRow>
            <S.Select
              value={searchParams.status}
              onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
            >
              <option value="">전체 상태</option>
              <option value="Y">활성</option>
              <option value="N">비활성</option>
            </S.Select>

            <S.Select
              value={searchParams.penaltyStatus}
              onChange={(e) => setSearchParams({ ...searchParams, penaltyStatus: e.target.value })}
            >
              <option value="">전체 페널티</option>
              <option value="N">정상</option>
              <option value="Y">페널티</option>
            </S.Select>

            <S.Select
              value={searchParams.userRole}
              onChange={(e) => setSearchParams({ ...searchParams, userRole: e.target.value })}
            >
              <option value="">전체 역할</option>
              <option value="ROLE_USER">일반회원</option>
              <option value="ROLE_EXPERT">전문가</option>
              <option value="ROLE_ADMIN">관리자</option>
            </S.Select>

            <S.Input
              type="text"
              placeholder="닉네임 검색"
              value={searchParams.searchKeyword}
              onChange={(e) => setSearchParams({ ...searchParams, searchKeyword: e.target.value })}
            />

            <S.Button onClick={handleSearch}>
              검색
            </S.Button>
          </S.SearchRow>
        </S.SearchSection>

        {/* 회원 목록 테이블 */}
        <S.Table>
          <thead>
            <tr>
              <S.Th>번호</S.Th>
              <S.Th>이메일</S.Th>
              <S.Th>닉네임</S.Th>
              <S.Th>역할</S.Th>
              <S.Th>상태</S.Th>
              <S.Th>페널티</S.Th>
              <S.Th>가입일</S.Th>
              <S.Th>신고 내역</S.Th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.userNo}>
                <S.Td>{member.userNo}</S.Td>
                <S.Td>{member.email}</S.Td>
                <S.Td>{member.nickname}</S.Td>
                <S.Td>
                {currentUser?.userRole === 'ROLE_ROOT' ? (
                 <S.Select
                    value={member.userRole}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleRoleChange(member.userNo, e.target.value)}
                  >
                    <option value="ROLE_USER">일반</option>
                    <option value="ROLE_EXPERT">전문가</option>
                    <option value="ROLE_ADMIN">관리자</option>
                  </S.Select>
                ) : (
                <>
                    {member.userRole === "ROLE_USER" && "일반"}
                    {member.userRole === "ROLE_EXPERT" && "전문가"}
                    {member.userRole === "ROLE_ADMIN" && "관리자"}
                </>
                )}
              </S.Td>
                <S.Td>
                  <S.Select
                    value={member.status}
                    onChange={(e) => handleStatusChange(member.userNo, e.target.value)}
                  >
                    <option value="Y">활성</option>
                    <option value="N">비활성</option>
                  </S.Select>
                </S.Td>
                <S.Td>
                  <S.Select
                    value={member.penaltyStatus}
                    onChange={(e) => handlePenaltyChange(member.userNo, e.target.value)}
                  >
                    <option value="N">정상</option>
                    <option value="Y">페널티</option>
                  </S.Select>
                </S.Td>
                <S.Td>{member.createDate}</S.Td>
                <S.Td>
                  <S.ActionButton onClick={() => handleDetailClick(member.userNo)}>
                    상세
                  </S.ActionButton>
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

      {/* 모달 (조건부 렌더링) */}
      {selectedUserNo && (
        <MemberDetailModal 
          userNo={selectedUserNo}
          reports={userReports}
          loading={reportsLoading}
          onClose={() => {
            setSelectedUserNo(null);
            setUserReports([]);
          }}
        />
      )}
    </>
  );
};

// 회원 상세 모달 (같은 파일 내)
const MemberDetailModal = ({ userNo, reports, loading, onClose }) => {
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>회원 번호: {userNo} - 신고 받은 내역</S.ModalTitle>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.ModalHeader>

        {loading ? (
          <div style={{ padding: 20, textAlign: 'center' }}>로딩 중...</div>
        ) : reports.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center' }}>신고 받은 내역이 없습니다.</div>
        ) : (
          <S.Table>
            <thead>
              <tr>
                <S.Th>신고번호</S.Th>
                <S.Th>신고자</S.Th>
                <S.Th>사유</S.Th>
                <S.Th>내용</S.Th>
                <S.Th>상태</S.Th>
                <S.Th>신고일</S.Th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.reportNo}>
                  <S.Td>{report.reportNo}</S.Td>
                  <S.Td>{report.reporterNickname}</S.Td>
                  <S.Td>{report.reasonName}</S.Td>
                  <S.Td>{report.content}</S.Td>
                  <S.Td>
                    {report.status === "WAITING" && "대기중"}
                    {report.status === "RESOLVED" && "해결됨"}
                    {report.status === "REJECTED" && "반려됨"}
                  </S.Td>
                  <S.Td>{report.createDate}</S.Td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default AdminMemberList;