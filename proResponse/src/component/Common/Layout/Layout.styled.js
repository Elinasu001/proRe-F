import styled from 'styled-components';

// Skip Link
export const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: #00A8E8;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
  border-radius: 0 0 4px 0;
  font-weight: 500;

  &:focus {
    top: 0;
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }
`;

// Layout Container
export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1a1a1a;

  @media (prefers-color-scheme: dark) {
    background-color: #0f0f0f;
    color: #ffffff;
  }
`;


// Main Content
export const MainContent = styled.main`
  flex: 1;
  margin-top: 80px;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    margin-top: 70px;
    padding: 1rem 0.5rem;
  }
`;
