import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChatRoomApi } from "../../api/chat/chatApi.js";

const TestChatRooms = () => {
    const [estimateNo, setEstimateNo] = useState('');
    const [content, setContent] = useState('안녕하세요');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [enterEstimateNo, setEnterEstimateNo] = useState(''); 
    const navi = useNavigate();

    // 채팅방 생성 (estimateNo 입력 없으면 랜덤)
    const handleCreateRoom = async () => {
        setLoading(true);
        try {
            const res = await createChatRoomApi({
                estimateNo: estimateNo ? Number(estimateNo) : undefined,
                content,
                type: 'TEXT'
            });
            console.log('채팅방 생성 결과:', res.data);
            setResult(res.data?.data);
            alert('채팅방이 생성되었습니다!');
        } catch (err) {
            console.error('채팅방 생성 실패:', err);
            alert(err?.response?.data?.message || '채팅방 생성 실패');
        } finally {
            setLoading(false);
        }
    };

    // estimateNo로 입장
    const handleEnterRoom = () => {
        if (!enterEstimateNo) {
            alert('견적 번호를 입력하세요');
            return;
        }
        navi(`/chatRoom/${enterEstimateNo}`);  //estimateNo로 이동
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>채팅 테스트</h2>

            {/* 채팅방 생성 */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
                <h3>1. 채팅방 생성</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>견적 번호 (estimateNo, 비워두면 랜덤): </label>
                    <input
                        type="number"
                        value={estimateNo}
                        onChange={(e) => setEstimateNo(e.target.value)}
                        placeholder="비우면 랜덤 생성"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>첫 메시지: </label>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="안녕하세요"
                        style={{ width: '200px' }}
                    />
                </div>
                <button onClick={handleCreateRoom} disabled={loading}>
                    {loading ? '생성 중...' : '채팅방 생성'}
                </button>

                {result && (
                    <div style={{ marginTop: '15px', padding: '10px', background: '#e8f5e9' }}>
                        <p><b>생성 완료!</b></p>
                        <p>roomNo: {result.roomNo}</p>
                        <p>estimateNo: {result.estimateNo}</p>
                        <button onClick={() => navi(`/chatRoom/${result.estimateNo}`)}>
                            채팅방 입장
                        </button>
                        <div style={{marginTop:'10px', fontSize:'13px', color:'#555'}}>
                            <b>WebSocket 예시:</b><br/>
                            ws://localhost:8080/ws/chat/<b>{result.estimateNo}</b>
                        </div>
                    </div>
                )}
            </div>

            {/* 기존 채팅방 입장 */}
            <div style={{ padding: '15px', border: '1px solid #ccc' }}>
                <h3>2. 기존 채팅방 입장</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>견적 번호 (estimateNo): </label>
                    <input
                        type="number"
                        value={enterEstimateNo}
                        onChange={(e) => setEnterEstimateNo(e.target.value)}
                        placeholder="예: 81"
                    />
                </div>
                <button onClick={handleEnterRoom}>채팅방 입장</button>
            </div>
        </div>
    );
};

export default TestChatRooms;