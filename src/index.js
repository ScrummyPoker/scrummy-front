import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SocketProvider from './context';
import 'tailwindcss/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
