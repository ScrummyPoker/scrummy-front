import React from 'react';

import useLobbySocket from './useLobbySocket';

const LobbyInfo = ({ playerId, lobbyCode }) => {
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent
  const [cardChosen, setCardChosen] = React.useState(null);

  const [gameStarted, setGameStarted] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  const {
    lobbyInfo,
    cardMessages,
    sendMessage,
    sendCardMessage,
    getPlayersInLobby,
    startGame,
    players,
  } = useLobbySocket({ playerId, lobbyCode });

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  React.useEffect(() => {
    if (!!cardChosen) {
      sendCardMessage(cardChosen);
    }
  }, [cardChosen]);

  React.useEffect(() => gameStarted && startGame(), [gameStarted]);

  React.useEffect(() => {}, [lobbyInfo]);

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
          {cardMessages.map((cardMessage, i) => (
            <li key={i}>
              Player ({cardMessage.player.id}): <b>{cardMessage.cardChosen}</b>
            </li>
          ))}
        </ol>
      </div>

      {gameStarted && (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(index => (
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
      <button
        onClick={() => {
          setGameStarted(!gameStarted);
        }}
      >
        {gameStarted ? 'stop game' : 'start game'}
      </button>

      <button
        onClick={() => {
          setShowResults(true);
        }}
      >
        show results
      </button>
    </div>
  );
};

export default LobbyInfo;
