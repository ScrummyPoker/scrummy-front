import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';

import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'joinRoom';
const NEW_MESSAGE_EVENT = 'chatMessage';
const GO_NEXT_PAGE_EVENT = 'goToNextPage';
const GET_ALL_USER_EVENT = 'roomUsers';

const SOCKET_SERVER_URL = 'http://localhost:3000';

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // Users on chat
  const [username, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
      transports: ['websocket'],
    });

    // join room
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, { username, room: roomId });

    // Listens for incoming messages
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Go to next page
    socketRef.current.on(GO_NEXT_PAGE_EVENT, (url) => {
      console.log(url);

      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Get all user on room
    socketRef.current.on(GET_ALL_USER_EVENT, (userList) => {
      setUsers(userList.users);
      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (message) => {
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      message,
      roomId,
      username,
      // senderId: socketRef.current.id,
    });
  };

  const goToNextPage = () => {
    socketRef.current.emit(GO_NEXT_PAGE_EVENT, {
      roomId,
    });
  };

  const getUsersOnChat = () => users;

  const value = React.useMemo(
    () => ({
      messages, sendMessage, goToNextPage, getUsersOnChat,
    }),
    [messages, sendMessage, goToNextPage, getUsersOnChat],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
}

export { SocketProvider, useSocket };
