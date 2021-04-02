import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'joinLobby';
const NEW_MESSAGE_EVENT = 'chatMessage';
const GO_NEXT_PAGE_EVENT = 'goToNextPage';
const GET_ALL_USER_EVENT = 'lobbyInfo';

const CARD_MESSAGE_EVENT = 'cardMessage';
const LOBBY_MESSAGE_EVENT = 'lobbyMessage';

const SOCKET_SERVER_URL = 'http://localhost:4444';

const useChat = ({ playerId, lobbyCode }) => {
  const [messages, setMessages] = useState([]);
  const [cardMessages, setCardMessages] = useState([]);
  const [players, setPlayers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { lobbyCode },
      transports: ['websocket'],
    });

    // join room
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      playerId,
      room: lobbyCode,
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listens for incoming CARD messages
    socketRef.current.on(CARD_MESSAGE_EVENT, (cardMessageData) => {
      setCardMessages((prevMessages) => [...prevMessages, cardMessageData]);
    });

    // Go to next page
    socketRef.current.on(GO_NEXT_PAGE_EVENT, (url) => {
      console.log(url);

      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Get all user on room
    socketRef.current.on(GET_ALL_USER_EVENT, (userList) => {
      setPlayers(userList.players);
      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [lobbyCode]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendCardMessage = (cardChosen) => {
    socketRef.current.emit(CARD_MESSAGE_EVENT, {
      cardChosen,
      lobbyCode,
      playerId,
    });
  };

  const goToNextPage = () => {
    socketRef.current.emit(GO_NEXT_PAGE_EVENT, {
      lobbyCode,
    });
  };

  const getPlayersInLobby = () => players;

  return {
    messages,
    cardMessages,
    sendCardMessage,
    goToNextPage,
    getPlayersInLobby,
  };
};

export default useChat;
