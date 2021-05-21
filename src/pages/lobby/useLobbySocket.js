import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'joinLobby';
const NEW_MESSAGE_EVENT = 'chatMessage';
const GO_NEXT_PAGE_EVENT = 'goToNextPage';
const LOBBY_INFO = 'lobbyInfo';
const ADMIN_ACTION = 'adminAction';

const CARD_MESSAGE_EVENT = 'cardMessage';
const LOBBY_MESSAGE_EVENT = 'lobbyMessage';
const LOBBY_NEW_PLAYER = 'newPlayer';


const useLobbySocket = ({ playerId, lobbyCode }) => {
  const [messages, setMessages] = useState([]);
  const [cardMessages, setCardMessages] = useState([]);
  const [players, setPlayers] = useState([]);
  const [lobbyInfo, setLobbyInfo] = useState(null);
  const [adminAction, setAdminAction] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = io(process.env.SOCKET_URL, {
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

    // Listens for incoming NEW PLAYER
    socketRef.current.on(LOBBY_NEW_PLAYER, playersMessageData => {
      setPlayers(playersMessageData.players);
    });

    // Listens for incoming ADMIN_ACTION
    socketRef.current.on(ADMIN_ACTION, adminMessageData => {
      setAdminAction(adminMessageData);
    });

    // Go to next page
    socketRef.current.on(GO_NEXT_PAGE_EVENT, url => {
      console.log(url);

      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketRef.current.on(LOBBY_INFO, lobbyInfo => {
      setLobbyInfo(lobbyInfo);
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
      cardChosen: cardChosen,
      lobbyCode,
      player: {
        id: playerId,
      },
    };

    updateCardResults(newCardData);
    socketRef.current.emit(CARD_MESSAGE_EVENT, { ...newCardData });
  };

  const startGame = () => {
    emitAdminAction('STARTED');
  };

  const showResults = () => {
    emitAdminAction('SHOWING_RESULTS');
  };

  const clearResults = () => {
    emitAdminAction('CLEAR_RESULTS');
  };

  const hideResults = () => {
    emitAdminAction('HIDE_RESULTS');
  };

  const emitAdminAction = action => {
    socketRef.current.emit(ADMIN_ACTION, {
      player: { id: playerId },
      lobbyCode,
      action: action,
    });
  };

  const updateCardResults = newCardData => {
    setCardMessages(prevMessages => {
      const newCards = [...prevMessages];
      const actualPlayerIndex = newCards.findIndex(
        t => t.player.id === newCardData.player.id,
      );

      if (actualPlayerIndex > -1) {
        newCards[actualPlayerIndex] = newCardData;
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
    players,
    adminAction,
    showResults,
    clearResults,
    hideResults,
  };
};

export default useLobbySocket;
