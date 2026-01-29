
import {styled, keyframes } from 'styled-components';

export const ChatPopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--dim);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ChatPopup = styled.div`
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 600px;
    height: 80vh;
    max-height: 700px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

export const ChatHeader = styled.div`
    padding: 24px 24px 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid var(--secondary);
`;

export const ChatTitle = styled.h2`
    margin: 0;
    font-size: var(--font20);
    font-weight: var(--font-w-b);
    color: var(--popup-txt);
`;

export const ChatSubtitle = styled.p`
    margin: 4px 0 0;
    font-size: var(--font16);
    color: var(--popup-sub-txt);
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color:var(--color-6d);
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        color: var(--active);
    }
`;

export const ChatActions = styled.div`
    display: flex;
    gap: 12px;
    padding: 16px 24px;
    justify-content: space-between;
    border-bottom: 1px solid var(--secondary);
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 16px;
    background: white;
    border: 1px solid var(--secondary);
    border-radius: 8px;
    cursor: pointer;
    font-size: var(--font16);
    font-weight: var(--font-w-m);
    color: var(--color-3);
    &:hover {
        background: #f8f8f8;
    }
    img {
        width: 20px;
        height: 20px;
    }
`;

export const ActionLightWrapper = styled.div`
    display: flex;
`;

export const ActionRightWrapper = styled.div`
    display: flex;
    gap:12px;
`;

export const ChatMessages = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }
`;

// 말풍선 애니메이션 (fade-in + scale)
const bubbleIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    80% {
        opacity: 1;
        transform: scale(1.05);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const Message = styled.div`
    display: flex;
    width: 100%;
    &.message-other {
        justify-content: flex-start;
    }
    &.message-me {
        justify-content: flex-end;
    }
`;

export const ChatImage = styled.img`
    max-width: 200px;
    max-height: 200px;
    border-radius: 8px;
    margin-top: 4px;
    margin-bottom: 4px;
    display: block;
`;

export const MessageBubble = styled.div`
    max-width: 70%;
    padding: 12px 20px;
    border-radius: ${({ $sender }) => $sender === 'me' ? '16px 0px 16px 16px' : '0px 16px 16px 16px'};
    font-size: var(--font16);
    font-weight: var(--font-w-r);
    line-height: 1.5;
    word-wrap: break-word;
    background-color: ${({ $sender }) => $sender === 'me' ? 'var(--primary)' : 'var(--gray-primary)'};
    color: ${({ $sender }) => $sender === 'me' ? 'var(--white)' : 'var(--color-3)'};
    text-align: ${({ $sender }) => $sender === 'me' ? 'right' : 'left'};
    animation: ${({ $animate }) => $animate ? bubbleIn : 'none'} 0.35s cubic-bezier(0.4, 0.7, 0.4, 1.2);
`;

export const ChatInputContainer = styled.div`
    padding: 16px 24px 24px;
    ${'' /* border-top: 1px solid #f0f0f0; */}
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
`;

export const EmojiPicker = styled.div`
    position: absolute;
    bottom: 70px;
    left: 24px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10;
`;

export const EmojiItem = styled.button`
    background: none;
    border: none;
    font-size: var(--font24);
    cursor: pointer;
    padding: 8px;
    ${'' /* border-radius: 8px; */}
    transition: background 0.2s;
    &:hover {
        background: #f0f0f0;
    }
`;

export const ChatBox = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
`;

export const ChatInput = styled.input`
    flex: 1;
    padding: 16px;
    border: none;
    font-size: var(--font16);
    outline: none;
    &:focus {
        border-color: var(--primary);
    }
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    &.emoji-button:hover,
    &.attach-button:hover {
        background: #f0f0f0;
    }
    &.send-button {
        color: var(--primary);
        font-size: 24px;
    }
    &.send-button:hover {
        background: #e8f4ff;
    }
`;


export const UploadingBox = styled.div`
    margin-top: 8px;
    padding: 8px;
    background: rgba(0,0,0,0.1);
    border-radius: 4px;
`;

export const UploadingText = styled.div`
    font-size: 12px;
    margin-bottom: 4px;
`;

export const UploadingBarWrapper = styled.div`
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
`;

export const UploadingBar = styled.div`
    height: 100%;
    background: #4CAF50;
    transition: width 0.3s;
`;

export const FailedBox = styled.div`
    margin-top: 8px;
    padding: 8px;
    background: rgba(255,0,0,0.1);
    border-radius: 4px;
    color: #f44336;
    font-size: 12px;
`;

export const ChatAttachmentImage = styled.img`
    max-width: 200px;
    margin-top: 8px;
    border-radius: 8px;
    opacity: ${({ $uploading }) => $uploading ? 0.6 : 1};
`;