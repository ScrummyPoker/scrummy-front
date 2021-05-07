import React from 'react';
import { getFibonacci } from '../../constants/Fibonacci';

import useLobbySocket from './useLobbySocket';

const LobbyInfo = ({ playerId, lobbyCode, lobbyData }) => {
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent
  const [cardChosen, setCardChosen] = React.useState(null);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [showingResults, setShowingResults] = React.useState(false);

  const {
    lobbyInfo,
    cardMessages,
    sendMessage,
    sendCardMessage,
    getPlayersInLobby,
    startGame,
    players,
    adminAction,
    showResults,
    clearResults,
    hideResults,
  } = useLobbySocket({ playerId, lobbyCode });

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  React.useEffect(() => {
    sendCardMessage(cardChosen);
  }, [cardChosen]);

  React.useEffect(() => {
    if (adminAction) {
      if (adminAction.action === 'STARTED' && !gameStarted) {
        setGameStarted(true);
      }

      if (adminAction.action === 'CLEAR_RESULTS') {
        setCardChosen(null);
      }

      if (adminAction.action === 'SHOWING_RESULTS' && !showingResults) {
        setShowingResults(true);
      }

      if (adminAction.action === 'HIDE_RESULTS' && showingResults) {
        setShowingResults(false);
      }

      if (adminAction.action === 'STOP' && showingResults) {
        setGameStarted(false);
        setCardChosen(null);
        setShowingResults(false);
      }
    }
  }, [adminAction]);

  const handleShowResults = () => {
    showResults();
    setShowingResults(true);
  };

  const handleClearResults = () => {
    clearResults();
    handleHideResults();
  };

  const handleHideResults = () => {
    hideResults();
    setShowingResults(false);
  };

  const handleAdminStartGame = () => {
    startGame();
    setGameStarted(true);
  };

  React.useEffect(() => {}, []);

  const isPlayerAdminInLobby = () => {
    return lobbyData.admins.indexOf(playerId) > -1;
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">
        lobbyCode:
        {lobbyCode}
        playerId:
        {playerId}
      </h1>
      <div>{!!lobbyInfo && JSON.stringify(lobbyInfo)}</div>
      <div className="messages-container">
        <ol className="messages-list">
          {showingResults && (
            <>
              {cardMessages.map((cardMessage, i) => (
                <li key={i}>
                  Player ({cardMessage.player.id}):{' '}
                  <b>{cardMessage.cardChosen}</b>
                </li>
              ))}
            </>
          )}
        </ol>
      </div>

      {gameStarted && (
        <>
          {[...new Set(getFibonacci(8))].map(index => (
            <button type="button" href="#" onClick={() => setCardChosen(index)}>
              {index}
            </button>
          ))}

          {cardChosen && (
            <button
              type="button"
              onClick={() => setCardChosen(null)}
              className=""
            >
              clear card
            </button>
          )}
        </>
      )}

      <div>PLayers on lobby:</div>
      {players.map((player, i) => (
        <li key={i}>Player {JSON.stringify(player)}</li>
      ))}

      {isPlayerAdminInLobby() && (
        <>
          <button onClick={handleAdminStartGame}>
            {gameStarted ? 'stop game' : 'start game'}
          </button>

          {showingResults ? (
            <>
              <button onClick={handleHideResults}>hide results</button>
              <button onClick={handleClearResults}>clear results</button>
            </>
          ) : (
            <button onClick={handleShowResults}>show results</button>
          )}
        </>
      )}
    </div>
  );
};

export default LobbyInfo;
