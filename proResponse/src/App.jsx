
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CommonGlobalStyles from './assets/styles/CommonGlobalStyles';
import AdminDashboard from './component/Admin/AdminDashboard.jsx';
import AdminMemberList from './component/Admin/AdminMemberList.jsx';
import AdminReportList from './component/Admin/AdminReportList.jsx';
import ChatRoom from './component/ChatRoom/ChatRoom.jsx';
import PaymentModal from './component/ChatRoom/Payment/PaymentModal.jsx';
import AlertExample from './component/Common/Alert/AlertExample.jsx';
import AdminLayout from './component/Common/Layout/AdminLayout.jsx';
import EstimateLayout from './component/Common/Layout/EstimateLayout.jsx';
import Layout from './component/Common/Layout/Layout.jsx';
import ExpertDetailModalExample from './component/Common/Modal/ExportDetail/ExpertDetailModalExample.jsx';
import ReviewModalExample from './component/Common/Modal/Review/ReviewModalExample.jsx';
import ProtectedRoute from './component/Common/ProtectedRoute.jsx';
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
import MypageExpert from './component/MyPage/MypageExpert.jsx';
import NearbyExperts from './component/NearbyExperts/NearbyExperts.jsx';
import Quote from './component/Quote/Quote.jsx';
import TestChatRooms from './component/TestChatRooms/TestChatRooms.jsx';
import { AuthProvider } from './context/AuthContext';
import SignUp from './component/SignUp/SignUp.jsx';
import ExpertRegister from './component/ExpertRegister/ExpertRegister.jsx';
import ExpertEdit from './component/ExpertEdit/ExpertEdit.jsx';
import EditMe from "./component/MyPage/sections/EditMe.jsx";
import DeleteMember from './component/MyPage/sections/DeleteMember.jsx';
import SwitchToUser from "./component/Auth/SwitchToUser.jsx";
import SwitchToExpert from "./component/Auth/SwitchToExpert.jsx";
import ResetPassword from "./component/ResetPassword/ResetPassword.jsx";
import Contact from './component/Contact/Contact.jsx';

function App() {
  return (
    <AuthProvider>
      <CommonGlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
            <Route path="/quote" element={
              <ProtectedRoute roles={["ROLE_USER"]}>
                <Quote />
              </ProtectedRoute>
            } />
            <Route path="/myquote" element={<MyQuote />} />
            <Route path="/exportList" element={
              <ProtectedRoute roles={["ROLE_USER"]}>
                <ExportList />
              </ProtectedRoute>
            } />
            <Route path="/chatRoom/:id" element={<ChatRoom />} />
            <Route path="/favorite" element={
              <ProtectedRoute roles={["ROLE_USER"]}>
                <Favorite />
              </ProtectedRoute>
            } />
            <Route path="/inputTest" element={<InputTest />} />
            <Route path="/AlertExample" element={<AlertExample />} />
            <Route path="/ReviewModalExample" element={<ReviewModalExample/>} />
            <Route path="/TestChatRooms" element={<TestChatRooms />} />
            <Route path="/ExpertDetailModalExample" element={<ExpertDetailModalExample/>} />
            <Route path="/EstimateRequestExample" element={<EstimateRequestExample/>} />
            <Route path="/auth/loginForm" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/expert/register" element={<ExpertRegister />} />
            <Route path="/expert/edit" element={<ExpertEdit />} />
            <Route path="/mypage/me/edit" element={<EditMe />} />
            <Route path="/mypage/me/delete" element={<DeleteMember />} />
            <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
            <Route path="/Testpayment" element={<PaymentModal />} />
            <Route path="/mypageUser" element={<MypageUser />} />
            <Route path="/mypageExpert" element={<MypageExpert />} />
            <Route path="/switch/user" element={<SwitchToUser />} />
            <Route path="/switch/expert" element={<SwitchToExpert />} />
            <Route path="/reset/password" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<EstimateLayout />}>
          <Route path="/estimateUser" element={
            <ProtectedRoute roles={["ROLE_USER"]}>
              <EstimateUser />
            </ProtectedRoute>
          } />
          <Route path="/estimateExpert" element={
            <ProtectedRoute roles={["ROLE_EXPERT"]}>
              <EstimateExpert />
            </ProtectedRoute>
          } />
          <Route path="/nearby" element={
            <ProtectedRoute roles={["ROLE_USER"]}>
              <NearbyExperts />
            </ProtectedRoute>
          } />
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