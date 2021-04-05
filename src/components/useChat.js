import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'joinLobby';
const NEW_MESSAGE_EVENT = 'chatMessage';
const GO_NEXT_PAGE_EVENT = 'goToNextPage';
const LOBBY_INFO = 'lobbyInfo';
const ADMIN_ACTION = 'adminAction';

const CARD_MESSAGE_EVENT = 'cardMessage';
const LOBBY_MESSAGE_EVENT = 'lobbyMessage';

const SOCKET_SERVER_URL = 'http://localhost:4444';

const useChat = ({ playerId, lobbyCode }) => {
  const [messages, setMessages] = useState([]);
  const [cardMessages, setCardMessages] = useState([]);
  const [players, setPlayers] = useState([]);
  const [lobbyInfo, setLobbyInfo] = useState(null);
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
    socketRef.current.on(NEW_MESSAGE_EVENT, message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Listens for incoming CARD messages
    socketRef.current.on(CARD_MESSAGE_EVENT, cardMessageData => {
      updateCardResults(cardMessageData);
    });
    // Go to next page
    socketRef.current.on(GO_NEXT_PAGE_EVENT, url => {
      console.log(url);

      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Get all user on room
    socketRef.current.on(LOBBY_INFO, lobbyInfo => {
      setLobbyInfo(lobbyInfo);
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
  const sendCardMessage = cardChosen => {
    const newCardData = {
      cardChosen,
      lobbyCode,
      player: {
        id: playerId,
      },
    };

    updateCardResults(newCardData);
    socketRef.current.emit(CARD_MESSAGE_EVENT, { ...newCardData });
  };

  const startGame = () => {
    socketRef.current.emit(ADMIN_ACTION, {
      lobbyCode,
      action: 'START_GAME',
    });
  };

  const updateCardResults = newCardData => {
    setCardMessages(prevMessages => {
      const newCards = [...prevMessages];
      const actualPlayerIndex = newCards.findIndex(
        t => t.player.id === newCardData.player.id,
      );

      if (actualPlayerIndex > -1) {
        if (newCardData.cardChosen) {
          newCards[actualPlayerIndex] = newCardData;
        } else {
          newCards.splice(actualPlayerIndex, 1);
        }
      } else {
        newCards.push({ ...newCardData });
      }

      return newCards;
    });
  };

  return {
    lobbyInfo,
    messages,
    cardMessages,
    sendCardMessage,
    startGame,
  };
};

export default useChat;
