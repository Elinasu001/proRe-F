import { useNavigate } from "react-router-dom";
import * as S from './AdminDashboard.styled';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Title>관리자 메뉴</S.Title>

      <S.CardGrid>
        {/* 회원 관리 */}
        <S.Card onClick={() => navigate('/admin/members')}>
          <S.CardTitle>👥 회원 관리</S.CardTitle>
          <S.CardDescription>
            회원 조회, 상태 관리, 페널티 부여
          </S.CardDescription>
        </S.Card>
        
        {/* 신고 관리 */}
        <S.Card onClick={() => navigate('/admin/reports')}>
          <S.CardTitle>🚨 신고 관리</S.CardTitle>
          <S.CardDescription>
            신고 접수 확인, 승인 및 반려 처리
          </S.CardDescription>
        </S.Card>
      </S.CardGrid>
    </S.Container>
  );
};

export default AdminDashboard;