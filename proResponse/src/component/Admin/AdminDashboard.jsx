import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <h2>관리자 대시보드</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* 회원 관리 */}
        <div style={{ border: '1px solid #ddd', padding: 20 }}>
          <h3>회원 관리</h3>
          <button onClick={() => navigate('/admin/members')}>
            회원 관리 바로가기
          </button>
        </div>
        
        {/* 신고 관리 */}
        <div style={{ border: '1px solid #ddd', padding: 20 }}>
          <h3>신고 관리</h3>
          <button onClick={() => navigate('/admin/reports')}>
            신고 관리 바로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;