import React from 'react';

import useChat from './useChat';

const ChatRoom = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { username } = props.match.params; // Gets roomId from URL
  const {
    messages, sendMessage, goToNextPage, getUsersOnChat,
  } = useChat({ username, roomId });
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">
        Room:
        {roomId}
        Username:
        {username}
      </h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? 'my-message' : 'received-message'}`}
            >
              {message.text}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button type="button" onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
      <button type="button" onClick={goToNextPage} className="send-message-button">
        Go to Next Page
      </button>
      <div>
        <ol>
          {getUsersOnChat().map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ChatRoom;
