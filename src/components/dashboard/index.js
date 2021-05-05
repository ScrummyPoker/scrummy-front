import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { createLobby, enterLobbyByCode } from '../../api/lobby';
import { getUserLogged } from '../../services/auth';
import { buildURL, ROUTE_LOBBY } from '../../utils/routes';
import { useInput } from '../_shared/form/input/useInput';

const Dashboard = props => {
  const {
    value: newLobbyCode,
    bind: bindNewLobbyCode,
    reset: resetNewLobbyCode,
  } = useInput('');
  const {
    value: existingLobbyName,
    bind: bindExistingLobbyName,
    reset: resetExistingLobbyName,
  } = useInput('');

  const handleCreateNewLobby = async () => {
    const newLobby = await createLobby({
      userId: getUserLogged().id,
      lobbyCode: newLobbyCode,
    });

    if (newLobby) {
      props.history.push(
        generatePath(ROUTE_LOBBY, {
          lobbyCode: newLobby.code,
        }),
      );
    }
  };

  const joinExistingLobby = async () => {
    const existingLobby = await enterLobbyByCode({
      userId: getUserLogged().id,
      lobbyCode: existingLobbyName,
    });

    if (existingLobby) {
      props.history.push(
        generatePath(ROUTE_LOBBY, {
          lobbyCode: existingLobby.code,
        }),
      );
    }
  };

  return (
    <div className="Dashboard-container">
      <div>
        <input
          type="text"
          placeholder="Create new lobby"
          className="text-input-field"
          {...bindNewLobbyCode}
        />

        <button onClick={handleCreateNewLobby}>Create lobby</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Join existing lobby"
          className="text-input-field"
          {...bindExistingLobbyName}
        />

        <button onClick={joinExistingLobby}>Join lobby</button>
      </div>
    </div>
  );
};

export default Dashboard;
