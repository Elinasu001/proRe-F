
import { Route, Routes } from 'react-router-dom';
import './App.css';



import CommonGlobalStyles from './assets/styles/CommonGlobalStyles';
import ChatRoom from './component/ChatRoom/ChatRoom.jsx';
import Layout from './component/Common/Layout/Layout.jsx';
import Favorite from './component/Favorite/Favorite.jsx';
import Home from './component/Home/Home.jsx';
import MyPage from './component/MyPage/MyPage.jsx';
import Quote from './component/Quote/Quote.jsx';
import TestChatRooms from './component/TestChatRooms/TestChatRooms.jsx';



function App() {
  return (
    <>
      <CommonGlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/TestChatRooms" element={<TestChatRooms />} />
          <Route path="/chatRoom/:id" element={<ChatRoom />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/myquote" element={<Quote />} />
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App