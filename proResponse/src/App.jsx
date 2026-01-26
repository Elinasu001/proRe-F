
import { Route, Routes } from 'react-router-dom';
import './App.css';



import CommonGlobalStyles from './assets/styles/CommonGlobalStyles';
import ChatRoom from './component/ChatRoom/ChatRoom.jsx';
import Layout from './component/Common/Layout/Layout.jsx';
import Favorite from './component/Favorite/Favorite.jsx';
import Home from './component/Home/Home.jsx';
import MyPage from './component/MyPage/MyPage.jsx';
import MyQuote from './component/MyQuote/MyQuote.jsx';
import ExportList from './component/ExportList/ExportList.jsx';
import Quote from './component/Quote/Quote.jsx';
import TestChatRooms from './component/TestChatRooms/TestChatRooms.jsx';
import InputTest from './component/InputTest/InputTest.jsx';


function App() {
  return (
    <>
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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
          <Route path="/TestChatRooms" element={<TestChatRooms />} />
        </Route>
      </Routes>
    </>
  );
}

export default App