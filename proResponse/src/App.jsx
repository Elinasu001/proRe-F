
import { Route, Routes } from 'react-router-dom';
import './App.css';

import CommonGlobalStyles from './assets/styles/CommonGlobalStyles';
import ChatRoom from './component/ChatRoom/ChatRoom.jsx';
import Header from './component/Common/Header/Header.jsx';
import Home from './component/Home/Home.jsx';
import TestChatRooms from './component/TestChatRooms/TestChatRooms.jsx';

// 임시 페이지 컴포넌트 (실제 구현시 교체)
const Favorite = () => <div>찜 목록 페이지</div>;
const MyPage = () => <div>마이페이지</div>;
const Quote = () => <div>견적 요청 페이지</div>;

function App() {
  return (
    <>
      <CommonGlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TestChatRooms" element={<TestChatRooms />} />
        <Route path="/chatRoom/:id" element={<ChatRoom />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/myquote" element={<Quote />} />
        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </>
  );
}

export default App