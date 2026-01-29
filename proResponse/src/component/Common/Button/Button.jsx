import React from 'react';
import { Button as StyledButton } from './Button.styled.js';

const Button = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
