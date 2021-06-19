import React from 'react';
import { getFibonacci } from '../../constants/Fibonacci';
import { UserIcon, CheckIcon, SwitchHorizontalIcon, UsersIcon } from '@heroicons/react/solid';
import useLobbySocket from './useLobbySocket';
import { getUserLogged } from '../../services/auth';
import Card from '../../components/Card';
import clsx from 'clsx';
import AdminPanel from './AdminPanel';
import DeckCard from '../../components/DeckCard';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import PlayersPanel from './PlayersPanel';
import ResultList from '../../components/ResultList';


const LobbyInfo = ({ userLogged, lobbyCode, lobbyData }) => {
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent
  const [cardChosen, setCardChosen] = React.useState(null);
  const [cardConfirmed, setCardConfirmed] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [showingResults, setShowingResults] = React.useState(false);

  const {
    lobbyInfo,
    cardMessages,
    sendMessage,
    sendCardMessage,
    getPlayersInLobby,
    startGame,
    players,
    adminAction,
    showResults,
    clearResults,
    hideResults,
  } = useLobbySocket({
    playerId: userLogged.id,
    playerName: userLogged.name,
    lobbyCode
  });

  React.useEffect(() => {
    if (adminAction) {
      if (adminAction.action === 'STARTED' && !gameStarted) {
        setGameStarted(true);
      }

      if (adminAction.action === 'CLEAR_RESULTS') {
        handleChangeCard();
      }

      if (adminAction.action === 'SHOWING_RESULTS' && !showingResults) {
        setShowingResults(true);
      }

      if (adminAction.action === 'HIDE_RESULTS' && showingResults) {
        setShowingResults(false);
      }

      if (adminAction.action === 'STOP' && showingResults) {
        setGameStarted(false);
        setCardChosen(null);
        setShowingResults(false);
      }
    }
  }, [adminAction]);

  const handleShowResults = () => {
    showResults();
    setShowingResults(true);
  };

  const handleClearResults = () => {
    clearResults();
    handleHideResults();
  };

  const handleHideResults = () => {
    hideResults();
    setShowingResults(false);
  };

  const handleAdminStartGame = () => {
    startGame();
    setGameStarted(true);
  };

  const toggleCardConfirmation = () => {
    setCardConfirmed(!cardConfirmed);
    sendCardMessage(cardChosen);
  }

  const handleChangeCard = () => {
    setCardChosen(null);
    setCardConfirmed(false);
  }

  React.useEffect(() => { }, []);

  const isPlayerAdminInLobby = (playerId) => {
    return lobbyData.admins.indexOf(playerId) > -1;
  };

  return (
    <div className="relative chat-room-container">
      {lobbyData && (
        <Card>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Lobby Code:</label> <b>{lobbyCode}</b>
            </div>
            <div>
              <label>Created at:</label> <b>{lobbyData.createAt}</b>
            </div>
            <div>
              <label>Nº. of Admins:</label> <b>{lobbyData.admins.length}</b>
            </div>
            <div>
              <label>Players connected:</label> <b>{players.length}</b>
            </div>
          </div>
        </Card>
      )}

      {gameStarted && (
        <>
          {
            cardConfirmed ? (
              <div>
                <ResultList 
                  players={players}
                  showingResults={showingResults}
                  cardMessages={cardMessages} />

                {showingResults !== true && (
                  <Button
                    primary
                    icon={SwitchHorizontalIcon}
                    onClick={handleChangeCard}>Change Card</Button>
                )}
                
              </div>
            ) : (
              <div className="decks-container my-10 pb-24" >
                {cardChosen !== null ? (
                  //TODO HOC
                  <div>
                    <div className="grid grid-cols-6 md:grid-cols-5 lg:grid-cols-6">
                      <div
                        className={clsx(
                          "col-start-3 col-span-2",
                          "md:col-start-2 md:col-span-3",
                          "lg:col-start-3 lg:col-span-2"

                        )}>
                        <DeckCard
                          value={cardChosen}
                          type="button"
                          href="#"
                          onClick={() => { }} />
                      </div>
                    </div>
                    <div className="absolute bottom-0 w-full">
                      <Button
                        small
                        alternative
                        icon={CheckIcon}
                        onClick={toggleCardConfirmation}>Confirm Card</Button>

                      <Button
                        primary
                        icon={SwitchHorizontalIcon}
                        onClick={handleChangeCard}>Change Card</Button>
                    </div>
                  </div>
                ) : (
                  //TODO HOC
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {[...new Set(getFibonacci(8))].map(index => (
                      <DeckCard
                        key={index}
                        value={index}
                        type="button"
                        href="#"
                        onClick={() => setCardChosen(index)} />
                    ))}
                  </div>
                )}


              </div>
            )
          }
        </>

      )}


      <div>
        <PlayersPanel
          players={players}
          isPlayerAdminInLobby={isPlayerAdminInLobby} />
      </div>

      {
        isPlayerAdminInLobby(userLogged.id) && (
          <>
            <AdminPanel
              showingResults={showingResults}
              gameStarted={gameStarted}
              handleAdminStartGame={handleAdminStartGame}
              handleHideResults={handleHideResults}
              handleClearResults={handleClearResults}
              handleShowResults={handleShowResults} />
          </>
        )
      }
    </div >
  );
};

export default LobbyInfo;
