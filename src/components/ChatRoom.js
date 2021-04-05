import React from 'react';

import useChat from './useChat';

const ChatRoom = (props) => {
  const { lobbyCode } = props.match.params;
  const { playerId } = props.match.params;

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
    startGame
  } = useChat({ playerId, lobbyCode });

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  React.useEffect(() => {
    sendCardMessage(cardChosen);
  }, [cardChosen]);

  React.useEffect(() => (
    gameStarted && startGame()
  ), [gameStarted]);

  React.useEffect(() => {
    
  }, [lobbyInfo]);

  return (
    <div className="chat-room-container">
      <h1 className="room-name">
        lobbyCode:
        {lobbyCode}
        playerId:
        {playerId}
      </h1>
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <button type="button" href="#" onClick={() => setCardChosen(index)}>
              {index}
            </button>
          ))}

          {cardChosen && (
            <button type="button" onClick={() => setCardChosen(null)} className="">
              clear card
            </button>
          )}
        </>
      )}

      <div>
        PLayers on lobby:
      </div>

      <button onClick={() => {setGameStarted(!gameStarted)}}>
        {gameStarted ? "stop game" : "start game"}
      </button>

      <button onClick={() => {setShowResults(true)}}>show results</button>
    </div>
  );
};

export default ChatRoom;
