import React, { useEffect } from 'react';
import { BrowserRouter, Link, useParams } from 'react-router-dom';
import {
  createLobby,
  getLobbyByCode,
  deleteLobbyByCode,
} from '../../api/lobby';
import { getUserLogged } from '../../services/auth';
import { readCookie, SCRUM_USER_REFRESH_TOKEN } from '../../utils/cookies';
import { ROUTE_DASHBOARD } from '../../utils/routes';
import { useInput } from '../_shared/form/input/useInput';
import LobbyInfo from './LobbyInfo';
import useContainer from './useContainer';
import LobbyContainer from './useContainer';

const LobbyPage = props => {
  const { lobbyCode } = props.match.params;
  const playerId = getUserLogged().id;

  const { lobbyData, setLobbyData, handleDeleteLobby, goBack } = useContainer(
    props,
  );

  return (
    <>
      {lobbyData ? (
        <>
          <button onClick={goBack}>Back</button>

          <button onClick={handleDeleteLobby}>Delete lobby</button>
          <button>Leave lobby</button>

          <LobbyInfo
            lobbyData={lobbyData}
            lobbyCode={lobbyCode}
            playerId={playerId}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default LobbyPage;
