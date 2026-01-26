import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 프론트에서 사용할 5가지 STATUS에 맞는 더미 데이터
const initialRooms = [
    { id: 1, name: "홍길동", role: "EXPERT", estimateStatus: "REQUESTED" },
    { id: 2, name: "김철수", role: "EXPERT", estimateStatus: "QUOTED" },
    { id: 3, name: "이영희", role: "EXPERT", estimateStatus: "MATCHED" },
    { id: 41, estimateStatus: "MATCHED" },
    { id: 5, name: "정지원", role: "EXPERT", estimateStatus: "DONE" },
    { id: 6, name: "최유진", role: "USER", estimateStatus: "EXPIRED" }
];

const TestChatRooms = () => {
    const [rooms] = useState(initialRooms);
    const navi = useNavigate();

    // 실제 로그인 정보로 대체 (true: 전문가, false: 회원)
    const isExpert = false;

    // 각 버튼 클릭 시 동작 예시
    const handleCreateChatRoom = (roomId) => {
        navi(`/chatRoom/${roomId}`);
    };
    const handleSendEstimate = (roomId) => {
        alert(`견적 보내기: ${roomId}`);
    };
    const handleAcceptEstimate = (roomId) => {
        alert(`견적 확인 및 채팅 시작: ${roomId}`);
    };

    return (
        <>
            <h2>채팅방 목록</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        <div>
                            <b>{room.name} {room.role === 'EXPERT' ? '전문가님' : '님'}의 채팅방입니다.</b> / <b>견적상태:</b> {room.estimateStatus}
                        </div>
                        {/* 회원 화면 조건부 렌더링 */}
                        {!isExpert && (
                            <>
                                {/* 1. 견적 요청 후 대기 중 */}
                                {room.estimateStatus === 'REQUESTED' && (
                                    <div>전문가의 견적을 기다리는 중입니다.</div>
                                )}
                                {/* 2. 전문가가 견적을 보낸 경우, 회원이 견적 확인 및 수락 */}
                                {room.estimateStatus === 'QUOTED' && (
                                    <button onClick={() => handleAcceptEstimate(room.id)}>견적 확인 및 채팅 시작</button>
                                )}
                                {/* 3. 회원이 견적을 수락하면 바로 채팅방 입장 */}
                                {room.estimateStatus === 'MATCHED' && (
                                    <button onClick={() => handleCreateChatRoom(room.id)}>채팅방 입장</button>
                                )}
                                {/* 4. 완료/만료 */}
                                {room.estimateStatus === 'DONE' && (
                                    <div>견적 및 채팅이 완료되었습니다.</div>
                                )}
                                {room.estimateStatus === 'EXPIRED' && (
                                    <div>견적이 만료되었습니다.</div>
                                )}
                            </>
                        )}
                        {/* 전문가 화면 조건부 렌더링 */}
                        {isExpert && (
                            <>
                                {/* 1. 회원이 견적 요청한 경우, 전문가가 견적 보냄 */}
                                {room.estimateStatus === 'REQUESTED' && (
                                    <button onClick={() => handleSendEstimate(room.id)}>견적 보내기</button>
                                )}
                                {/* 2. 견적 보낸 후 회원의 수락 대기 */}
                                {room.estimateStatus === 'QUOTED' && (
                                    <div>회원의 견적 수락을 기다리는 중입니다.</div>
                                )}
                                {/* 3. 회원이 견적을 수락하면 바로 채팅방 입장 */}
                                {room.estimateStatus === 'MATCHED' && (
                                    <button onClick={() => handleCreateChatRoom(room.id)}>채팅방 입장</button>
                                )}
                                {/* 4. 완료/만료 */}
                                {room.estimateStatus === 'DONE' && (
                                    <div>견적 및 채팅이 완료되었습니다.</div>
                                )}
                                {room.estimateStatus === 'EXPIRED' && (
                                    <div>견적이 만료되었습니다.</div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TestChatRooms;