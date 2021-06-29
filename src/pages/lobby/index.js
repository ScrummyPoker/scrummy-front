import React, { useContext, useEffect } from 'react';
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
import LobbyInfo from './LobbyInfo';
import useContainer from './useContainer';
import FlatButton from '../../components/FlatButton';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { LobbyProvider, LobbyContext, useLobby } from './context';

const LobbyPage = props => {
  const { goBack, handleDeleteLobby, lobbyCode } = useContainer(props);
  const [lobbyData, setLobbyData] = React.useState(null);
  const userLogged = getUserLogged();

  const getLobbyData = () => {
    enterLobbyByCode({
      userId: userLogged.id,
      lobbyCode: lobbyCode,
    }).then(res => {
      if (res && !lobbyData) {
        setLobbyData(res);
      }
    });

  }

  React.useEffect(() => {
    getLobbyData();
  }, [lobbyCode]);


  return (
    <>
      {lobbyData ? (
        <LobbyProvider lobbyData={lobbyData} >
          <div className="w-1/2">
            <FlatButton onClick={goBack} icon={ChevronLeftIcon}>
              <div>Back</div>
            </FlatButton>
          </div>

          <LobbyInfo />
        </LobbyProvider >
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default LobbyPage;
