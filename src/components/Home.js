import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [roomName, setRoomName] = React.useState('');
  const [username, setUsername] = React.useState('');

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsername}
        className="text-input-field"
      />
      <Link to={`/${username}/${roomName}`} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

export default Home;
