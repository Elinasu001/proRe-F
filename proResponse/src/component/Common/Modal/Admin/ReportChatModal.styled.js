import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #333;
  }
`;

export const Info = styled.div`
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
  
  div {
    display: flex;
    gap: 5px;
  }
`;

export const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const ChatItem = styled.div`
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Nickname = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

export const Time = styled.span`
  font-size: 12px;
  color: #999;
`;

export const ChatContent = styled.div`
  color: #555;
  font-size: 14px;
  line-height: 1.5;
`;

export const NoData = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
`;