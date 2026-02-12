
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CommonGlobalStyles from './assets/styles/CommonGlobalStyles';
import ChatRoom from './component/ChatRoom/ChatRoom.jsx';
import PaymentExample from './component/ChatRoom/Payment/PaymentExample.jsx';
import AlertExample from './component/Common/Alert/AlertExample.jsx';
import EstimateLayout from './component/Common/Layout/EstimateLayout.jsx';
import Layout from './component/Common/Layout/Layout.jsx';
import Map from './component/Common/Map/Map.jsx';
import ExpertDetailModalExample from './component/Common/Modal/ExportDetail/ExpertDetailModalExample.jsx';
import ReviewModalExample from './component/Common/Modal/Review/ReviewModalExample.jsx';
import EstimateRequestExample from './component/EstimateRequest/EstimateRequestExample.jsx';
import ExportList from './component/ExportList/ExportList.jsx';
import Favorite from './component/Favorite/Favorite.jsx';
import Home from './component/Home/Home.jsx';
import InputTest from './component/InputTest/InputTest.jsx';
import Login from "./component/Login/Login";
import EstimateExpert from './component/MyEstimate/EstimateExpert/EstimateExpert.jsx';
import EstimateUser from './component/MyEstimate/EstimateUser/EstimateUser.jsx';
import MypageUser from './component/MyPage/MypageUser.jsx';
import MyQuote from './component/MyQuote/MyQuote.jsx';
import MypageExpert from './component/Mypage/MypageExpert.jsx';
import Quote from './component/Quote/Quote.jsx';
import TestChatRooms from './component/TestChatRooms/TestChatRooms.jsx';
import AdminDashboard from './component/Admin/AdminDashboard.jsx';
import AdminLayout from './component/Common/Layout/AdminLayout.jsx';
import AdminMemberList from './component/Admin/AdminMemberList.jsx';
import AdminReportList from './component/Admin/AdminReportList.jsx';
import ProtectedRoute from './component/Common/ProtectedRoute';  
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CommonGlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/myquote" element={<MyQuote />} />
          <Route path="/exportList" element={<ExportList />} />
          <Route path="/chatRoom/:id" element={<ChatRoom />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/inputTest" element={<InputTest />} />
          <Route path="/AlertExample" element={<AlertExample />} />
          <Route path="/ReviewModalExample" element={<ReviewModalExample/>} />
          <Route path="/TestChatRooms" element={<TestChatRooms />} />
          <Route path="/ExpertDetailModalExample" element={<ExpertDetailModalExample/>} />
          <Route path="/EstimateRequestExample" element={<EstimateRequestExample/>} />
          <Route path="/auth/loginForm" element={<Login />} />
          <Route path="/mypageUser" element={<MypageUser />} />
          {/* <Route path="/estimateUser" element={<EstimateUser />} /> */}
          <Route path="/mypageExpert" element={<MypageExpert />} />
          <Route path="/nearby" element= {<Map />} />
          <Route path="/Testpayment" element={<PaymentExample />} />
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
        </Route>
        <Route element={<EstimateLayout />}>
          <Route path="/estimateUser" element={<EstimateUser />} />
          <Route path="/estimateExpert" element={<EstimateExpert />} />
        </Route>

        {/* 관리자 페이지 */}
        <Route element={
          <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_ROOT']}>
            <AdminLayout />
          </ProtectedRoute>
}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<AdminMemberList />} />
          <Route path="/admin/reports" element={<AdminReportList />} />

        </Route>
          
      </Routes>
    </AuthProvider>
  );
}

export default App;