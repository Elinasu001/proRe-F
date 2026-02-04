import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import * as S from './AdminLayout.styled';
import makerLogo from '../../../assets/images/common/maker.png';


const AdminLayout = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
      <S.Header>
        <S.HeaderLeft>
          <S.Logo src={makerLogo} alt="로고" />
          <S.Title>관리자 페이지</S.Title>
        </S.HeaderLeft>
        
        <S.Nav>
          <S.NavLink to="/admin">대시보드</S.NavLink>
          <S.NavLink to="/admin/members">회원 관리</S.NavLink>
          <S.NavLink to="/admin/reports">신고 관리</S.NavLink>
        </S.Nav>

        <S.UserSection>
          <S.Nickname>{currentUser?.nickname}</S.Nickname>
          <S.LogoutButton onClick={logout}>로그아웃</S.LogoutButton>
        </S.UserSection>
      </S.Header>

      <S.Main>
        <Outlet />
      </S.Main>
    </>
  );
};

export default AdminLayout;