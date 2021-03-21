import React, { useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:3000', { transports: ['websocket'] });
    socket.on('connect', () => console.log('Front connected'));
  }, []);

  return (
    <div>
      Hello World!
    </div>
  );
}

export default App;
