import React from 'react';
import Button from '../../components/Button';
import FlatButton from '../../components/FlatButton';
import IconButton from '../../components/IconButton';
import { LockClosedIcon, BadgeCheckIcon, TrashIcon, EyeIcon, EyeOffIcon, LogoutIcon, PlayIcon } from '@heroicons/react/solid';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import './style.css';
import { UserAddIcon, UsersIcon } from '@heroicons/react/outline';
import { useHistory } from "react-router-dom";
import PlayersPanel from '../../pages/lobby/PlayersPanel';

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

}) => {
  const history = useHistory();

  const [isShowing, setIsShowing] = React.useState(false);

  const toggleShowingPlayers = () => setIsShowing(!isShowing);

  const goToDashboard = () => history.push(ROUTE_DASHBOARD);

  return (
    <div className="fixed w-full bottom-0 left-0 bg-gray-800 bg-opacity-90">
      <div className="mx-auto">
        <div className="grid grid-cols-5 flex justify-center">
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

          {showingResults ? (
            <>
              <div>
                <FlatButton onClick={handleHideResults} icon={EyeOffIcon} vertical>
                  <div>HIDE RESULTS</div>
                </FlatButton>
              </div>

              <div>
                <FlatButton onClick={handleClearResults} icon={BadgeCheckIcon} vertical>
                  <div>NEW ROUND</div>
                </FlatButton>
              </div>
            </>
          ) : (
            <>
              <div>
                <FlatButton onClick={handleShowResults} icon={EyeIcon} vertical>
                  <div>SHOW RESULTS</div>
                </FlatButton>
              </div>
              <div>

              </div>
            </>
          )}

          <div>
            <FlatButton onClick={toggleShowingPlayers} icon={UsersIcon} vertical>
              <div>PLAYERS</div>
            </FlatButton>
          </div>
          <div>
            <FlatButton onClick={goToDashboard} icon={LogoutIcon} vertical>
              <div>QUIT LOBBY</div>
            </FlatButton>
          </div>
        </div>
      </div>

      <BottomSheet
        open={isShowing}
        snapPoints={({ minHeight }) => minHeight}
        onDismiss={toggleShowingPlayers}>
        <PlayersPanel
          players={players}
          isPlayerAdminInLobby={isPlayerAdminInLobby} />
      </BottomSheet>
    </div>
  );
}

export default ActionMenu;