import React, { useEffect } from 'react';
import { BrowserRouter, Link, useParams } from 'react-router-dom';
import {
  createLobby,
  getLobbyByCode,
  deleteLobbyByCode,
  enterLobbyByCode,
} from '../../api/lobby';
import { getUserLogged } from '../../services/auth';
import { readCookie, SCRUM_USER_REFRESH_TOKEN } from '../../utils/cookies';
import { ROUTE_DASHBOARD } from '../../utils/routes';

const useContainer = props => {
  const [lobbyData, setLobbyData] = React.useState(null);
  const { lobbyCode } = useParams();

  //didMount
  useEffect(() => {
    async function getLobby(lobbyCode) {
      let lobbyData = await enterLobbyByCode({
        userId: getUserLogged().id,
        lobbyCode: lobbyCode,
      });

      if (lobbyData) {
        setLobbyData(lobbyData);
      }
    }

    getLobby(lobbyCode);
  }, []);

  const handleDeleteLobby = () => {
    const deletedLobby = deleteLobbyByCode({
      lobbyCode: lobbyCode,
      refreshToken: readCookie(SCRUM_USER_REFRESH_TOKEN),
    });

    if (deletedLobby) goBack();
  };

  const goBack = () => props.history.push(ROUTE_DASHBOARD);

  return {
    lobbyCode,
    lobbyData,
    setLobbyData,
    handleDeleteLobby,
    goBack,
  };
};

export default useContainer;
