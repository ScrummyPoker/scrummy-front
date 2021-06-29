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
  const { lobbyCode } = useParams();

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
    handleDeleteLobby,
    goBack,
  };
};

export default useContainer;
