import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { getUserLogged } from '../../services/auth';

const JOIN_LOBBY = 'joinLobby';
const NEW_MESSAGE_EVENT = 'chatMessage';
const GO_NEXT_PAGE_EVENT = 'goToNextPage';
const LOBBY_INFO = 'lobbyInfo';
const ADMIN_ACTION = 'adminAction';

const CARD_MESSAGE_EVENT = 'cardMessage';
const LOBBY_MESSAGE_EVENT = 'lobbyMessage';
const LOBBY_PLAYER_UPDATE = 'playerUpdate';


const useLobbySocket = ({ playerId, playerName, lobbyCode }) => {
  const [messages, setMessages] = useState([]);
  const [cardMessages, setCardMessages] = useState([]);
  const [players, setPlayers] = useState([]);
  const [lobbyInfo, setLobbyInfo] = useState(null);
  const [adminAction, setAdminAction] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {
      query: { lobbyCode },
      transports: ['websocket'],
      resource: 'nodejs'
    });

    // join room
    socketRef.current.emit(JOIN_LOBBY, {
      playerId,
      playerName,
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
    socketRef.current.on(LOBBY_PLAYER_UPDATE, playersMessageData => {
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
        playerName,
      },
    };

    updateCardResults(newCardData);
    socketRef.current.emit(CARD_MESSAGE_EVENT, { ...newCardData });
  };

  const startGame = () => {
    emitAdminAction('STARTED');
  };

  const stopGame = () => {
    emitAdminAction('STOPPED');
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
          //if new card is valid, change actual players's data
          if (newCardData.cardChosen) {
            newCards[actualPlayerIndex] = newCardData;
          } 
          //if it's not valid (changing card), then remove from list
          else {
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
    stopGame,
    players,
    adminAction,
    showResults,
    clearResults,
    hideResults,
  };
};

export default useLobbySocket;
