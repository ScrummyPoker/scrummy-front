import React from 'react';

import useChat from './useChat';

const ChatRoom = (props) => {
  const { lobbyCode } = props.match.params;
  const { playerId } = props.match.params;

  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent
  const [cardChosen, setCardChosen] = React.useState(null);

  const {
    cardMessages,
    sendMessage,
    sendCardMessage,
    getPlayersInLobby,
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
          {cardMessages.map((message, i) => (
            <li key={i}>{message.text.cardChosen}</li>
          ))}
        </ol>
      </div>
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

      <div>
        <ol>
          {getPlayersInLobby().map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ChatRoom;
