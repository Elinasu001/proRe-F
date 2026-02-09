import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #999;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

export const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ExpertName = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Content = styled.div`
  padding: 24px;
`;

export const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const Label = styled.span`
  width: 120px;
  color: #666;
  font-size: 14px;
`;

export const Value = styled.span`
  flex: 1;
  color: #333;
  font-size: 14px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Badge = styled.span`
  background-color: #f0f0f0;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  color: #666;
`;

export const ReviewText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

export const Footer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1976d2;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #1976d2;
  }

  &::placeholder {
    color: #999;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 120px;
  box-sizing: border-box;

  &:focus {
    border-color: #1976d2;
  }

  &::placeholder {
    color: #999;
  }
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border-color: #1976d2;
  }
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  color: #666;

  &:hover {
    background: #f5f5f5;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  background: #1976d2;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #1565c0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;