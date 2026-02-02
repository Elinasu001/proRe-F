import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/loginForm');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 관리자 헤더 */}
      <header style={{ 
        padding: '16px 24px', 
        background: '#1a1a1a', 
        color: '#fff',
        borderBottom: '2px solid #333'
      }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: 24 }}>관리자 페이지</h1>
          
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <a 
              href="/admin/members" 
              style={{ 
                color: '#fff', 
                textDecoration: 'none',
                fontSize: 16,
                padding: '8px 12px',
                borderRadius: 4,
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#333'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              회원 관리
            </a>
            <a 
              href="/admin/reports" 
              style={{ 
                color: '#fff', 
                textDecoration: 'none',
                fontSize: 16,
                padding: '8px 12px',
                borderRadius: 4
              }}
              onMouseOver={(e) => e.target.style.background = '#333'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              신고 관리
            </a>
            
            <div style={{ 
              borderLeft: '1px solid #555', 
              paddingLeft: 24, 
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <span style={{ fontSize: 14, color: '#aaa' }}>
                {currentUser?.nickname || currentUser?.email}
              </span>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '6px 16px',
                  background: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                로그아웃
              </button>
            </div>
          </nav>
        </div>
      </header>
      
      {/* 콘텐츠 영역 */}
      <main style={{ flex: 1, background: '#f5f5f5' }}>
        <Outlet />
      </main>
      
      {/* 푸터 */}
      <footer style={{ 
        padding: 16, 
        background: '#1a1a1a', 
        color: '#888',
        textAlign: 'center',
        fontSize: 14
      }}>
        © 2026 Admin Panel. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminLayout;