
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CommonGlobalStyles from './assets/styles/CommonGlobalStyles';
import ChatRoom from './component/ChatRoom/ChatRoom.jsx';
import PaymentModal from './component/ChatRoom/Payment/PaymentModal.jsx';
import AlertExample from './component/Common/Alert/AlertExample.jsx';
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
import MypageExpert from './component/Mypage/MypageExpert.jsx';
import NearbyExperts from './component/NearbyExperts/NearbyExperts.jsx';
import Quote from './component/Quote/Quote.jsx';
import TestChatRooms from './component/TestChatRooms/TestChatRooms.jsx';
import { AuthProvider } from './context/AuthContext';

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
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
          <Route path="/Testpayment" element={<PaymentModal />} />
          <Route path="/mypageUser" element={
            <ProtectedRoute roles={["ROLE_USER"]}>
              <MypageUser />
            </ProtectedRoute>
          } />
          <Route path="/mypageExpert" element={
            <ProtectedRoute roles={["ROLE_EXPERT"]}>
              <MypageExpert />
            </ProtectedRoute>
          } />
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
          
      </Routes>
    </AuthProvider>
  );
}

export default App