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
import LobbyInfo from './LobbyInfo';
import useContainer from './useContainer';
import FlatButton from '../../components/FlatButton';
import { ChevronLeftIcon } from '@heroicons/react/solid';


const LobbyPage = props => {
  const { lobbyCode } = props.match.params;
  const userLogged = getUserLogged();

  const {
    lobbyData,
    handleDeleteLobby,
    goBack
  } = useContainer(props);

  return (
    <>
      {lobbyData ? (
        <>
          <div className="w-1/2">
            <FlatButton onClick={goBack} icon={ChevronLeftIcon}>
              <div>Back</div>
            </FlatButton>
          </div>

          <LobbyInfo
            lobbyData={lobbyData}
            lobbyCode={lobbyCode}
            userLogged={userLogged}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default LobbyPage;
