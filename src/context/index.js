import React from 'react';
import { SocketProvider } from './socket';

const Provider = ({ children }) => (
  <SocketProvider>
    {children}
  </SocketProvider>
);

export default Provider;
