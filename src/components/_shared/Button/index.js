import React from 'react';

import { Container } from './styles';


const Button = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
);

export default Button;
