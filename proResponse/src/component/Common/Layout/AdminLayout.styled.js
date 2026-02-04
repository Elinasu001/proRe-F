import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = styled.img`
  height: 40px;
  width: auto;
  margin-right: 12px;
  vertical-align: middle;
`;

export const Header = styled.header`
  background: #0d6efd;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 24px;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #4CAF50;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Nickname = styled.span`
  font-weight: 500;
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: white;
    color: #1a1a1a;
  }
`;

export const Main = styled.main`
  min-height: calc(100vh - 64px);
  background: #f5f5f5;
`;

export const Footer = styled.footer`
  background: #f8f9fa;
  padding: 24px;
  text-align: center;
  border-top: 2px solid #0d6efd;
`;

export const FooterLogo = styled.img`
  height: 40px;
  width: auto;
  margin-bottom: 12px;
  opacity: 0.9;
`;

export const Copyright = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin: 8px 0 0 0;
`;

export const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 12px;
`;