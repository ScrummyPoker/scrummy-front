import React from 'react';
import Button from '../../components/Button';
import FlatButton from '../../components/FlatButton';
import IconButton from '../../components/IconButton';
import { LockClosedIcon, BadgeCheckIcon, TrashIcon, EyeIcon, EyeOffIcon, LogoutIcon, PlayIcon } from '@heroicons/react/solid';
import { UserAddIcon, UsersIcon } from '@heroicons/react/outline';
import { useHistory } from "react-router-dom";
import PlayersPanel from '../../pages/lobby/PlayersPanel';
import { ROUTE_DASHBOARD } from '../../utils/routes';
import { getUserLogged } from '../../services/auth';
import clsx from 'clsx';

const ActionMenu = ({
  players,
  isPlayerAdminInLobby,
  gameStarted,
  showingResults,
  handleAdminStartGame,
  handleHideResults,
  handleClearResults,
  handleResetGame,
  handleShowResults,
  setShowingResults,
  setShowingPlayers
}) => {
  const history = useHistory();


  const goToDashboard = () => history.push(ROUTE_DASHBOARD);

  return (
    <div className="fixed w-full bottom-0 left-0 bg-gray-800 bg-opacity-90">
      <div className="mx-auto">
        <div className="grid grid-flow-col flex justify-center">

          {isPlayerAdminInLobby ? (
            <div className="grid grid-flow-col border-0 border-r border-solid border-gray-700">
              {gameStarted ? (
                <div>
                  <FlatButton onClick={handleResetGame} icon={TrashIcon} vertical>
                    <div>RESET GAME</div>
                  </FlatButton>
                </div>
              ) : (
                <div>
                  <FlatButton onClick={handleAdminStartGame} icon={PlayIcon} vertical>
                    <div>START GAME</div>
                  </FlatButton>
                </div>
              )}

              <div>
                <FlatButton onClick={handleShowResults} icon={EyeIcon} vertical>
                  <div>SHOW RESULTS</div>
                </FlatButton>
              </div>
              <div>
                <FlatButton onClick={handleClearResults} icon={BadgeCheckIcon} vertical>
                  <div>NEW ROUND</div>
                </FlatButton>
              </div>
            </div>
          ) : (
            // if not admin but lobby is showing card, users can show results
            <>
              {showingResults && (
                <div>
                  <FlatButton onClick={() => setShowingResults(true)} icon={EyeIcon} vertical>
                    <div>SHOW RESULTS</div>
                  </FlatButton>
                </div>

              )}
            </>
          )}

          <div className="relative inline-block">
            <FlatButton onClick={() => setShowingPlayers(true)} icon={UsersIcon} vertical>
              <div>PLAYERS</div>
              <span className={
                clsx(
                  "absolute top-5 right-5 inline-flex items-center justify-center",
                  "px-1.5 py-1 text-xs  leading-none bg-gray-400 bg-opacity-10 text-secondary font-extrabold",
                  "transform translate-x-1/2 -translate-y-1/2 rounded-full"
                )}>
                {players.length}
              </span>
            </FlatButton>
          </div>
          <div>
            <FlatButton onClick={goToDashboard} icon={LogoutIcon} vertical>
              <div>QUIT LOBBY</div>
            </FlatButton>
          </div>
        </div>
      </div>

      
     
    </div>
  );
}

export default ActionMenu;