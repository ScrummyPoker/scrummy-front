import React, { useContext } from 'react';
import { getFibonacci } from '../../constants/Fibonacci';
import { UserIcon, CheckIcon, SwitchHorizontalIcon, CollectionIcon, ClipboardIcon, ExternalLinkIcon, EmojiHappyIcon } from '@heroicons/react/solid';
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
import { useLobby, LobbyContext } from './context';
import { useParams } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';
import { copyToClipboard } from '../../utils/general';
import LobbyActions from './LobbyActions';
import ActionMenu from '../../components/ActionMenu';
import WaitingList from '../../components/WaitingList';
import { toast } from 'tailwind-toast';
import { SEQUENCES, SEQUENCE_DAYS, SEQUENCE_FIBONACCI } from '../../constants/lobby';

const LobbyInfo = props => {
  const [cardChosen, setCardChosen] = React.useState(null);
  const [cardConfirmed, setCardConfirmed] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [showingResults, setShowingResults] = React.useState(false);
  const [showingPlayers, setShowingPlayers] = React.useState(false);
  const [isAllowedToShowResults, setIsAllowedToShowResults] = React.useState(false);

  const { lobbyCode } = useParams();
  const userLogged = getUserLogged();

  const { lobbyData } = useContext(LobbyContext);

  const {
    lobbyInfo,
    cardMessages,
    sendMessage,
    sendCardMessage,
    getPlayersInLobby,
    startGame,
    stopGame,
    players,
    adminAction,
    showResults,
    clearResults,
    hideResults,
    changeSequence,
    lobbySequence,
    setLobbySequence,
  } = useLobbySocket({
    playerId: userLogged.id,
    playerName: userLogged.name,
    lobbyCode
  });

  //HOOKS
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

      if (adminAction.action === 'STOPPED') {
        sendActualLobbySequence();
        handleGameStopped();
      }
    }
  }, [adminAction]);

  React.useEffect(() => {
    setIsAllowedToShowResults(cardMessages.length === players.length);
  }, [cardMessages]);

  React.useEffect(() => {
    if(isPlayerAdminInLobby(userLogged.id)) {
      sendActualLobbySequence();
    }
  }, [players]);

  //methods
  const handleShowResults = () => {
    if (isAllowedToShowResults) {
      showResults();
      setShowingResults(true);
    } else {
      toast()
        .danger('Oops!', 'You must wait until every player choose a card.')
        .for(1500)
        .show();
    }
  };

  const handleClearResults = () => {
    clearResults();
    handleHideResults();
  };

  const handleResetGame = () => {
    stopGame();
  };

  const handleGameStopped = () => {
    setGameStarted(false);
    setShowingResults(false);
    handleChangeCard();
  }

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
    sendCardMessage(null);
    setCardConfirmed(false);
  }

  const isPlayerAdminInLobby = (playerId) => {
    return lobbyData ? lobbyData.admins.indexOf(playerId) > -1 : 0;
  };

  const handleCopyToClipboard = () => {
    copyToClipboard();

    toast()
      .success('', 'Copied to clipboard!')
      .for(1500)
      .show();
  }
  
  const handleLobbySequence = e => {
    setLobbySequence(e.target.value);
    changeSequence(e.target.value);
  }
  const sendActualLobbySequence = () => {
    handleLobbySequence({ target: { value: lobbySequence }});
  }

  return (
    <div className="relative chat-room-container">
      <div className={"mb-10"}>

        <SectionTitle icon={CollectionIcon} title="Lobby Information" />
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
      </div>

      <div>
        <SectionTitle icon={ExternalLinkIcon} title="Invite players" />
        <div className="grid grid-cols-6 flex text-center items-center">

          <div className="col-span-5">
            <Card>
              <p className="truncate text-left">{location.href}</p>
            </Card>
          </div>
          <div className="col-span-1 text-right">
            <IconButton
              primary
              Icon={ClipboardIcon}
              onClick={handleCopyToClipboard}>COPY URL</IconButton>
          </div>
        </div>
      </div>

      {gameStarted ? (
        <>
          {
            cardConfirmed ? (
              <div className={"pb-36"}>
                <WaitingList
                  players={players}
                  cardMessages={cardMessages} />

                {showingResults !== true && (
                  <Button
                    primary
                    icon={SwitchHorizontalIcon}
                    onClick={handleChangeCard}>Change Card</Button>
                )}

              </div>
            ) : (
              <div className="pb-64">
                <div className="decks-container relative my-10" >
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
                      <div className="absolute -bottom-36 mt-10 w-full">
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
                      {SEQUENCES[lobbySequence].map(index => (
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
              </div>

            )
          }
        </>
      ) : (
        <div className="mt-5">
          <div>
            <SectionTitle icon={CollectionIcon} title="Sequence" />
            <div className="mt-2">
              <div className="items-center">
                <input type="radio" 
                  className="form-radio" 
                  id="DaysSequence" 
                  name="lobbySequence" 
                  value={SEQUENCE_DAYS}
                  checked={lobbySequence === SEQUENCE_DAYS}
                  onChange={handleLobbySequence} />
                <label className="ml-2" htmlFor="DaysSequence">
                  [{SEQUENCES[SEQUENCE_DAYS].join(', ').toString()}]
                </label>
              </div>
              <div className="items-center mt-4">
                <input 
                  type="radio" 
                  className="form-radio" 
                  id="FibonacciSequence" 
                  name="lobbySequence"
                  checked={lobbySequence === SEQUENCE_FIBONACCI}
                  value={SEQUENCE_FIBONACCI}
                  onChange={handleLobbySequence} />
                <label className="ml-2" htmlFor="FibonacciSequence">
                  [{SEQUENCES[SEQUENCE_FIBONACCI].join(', ').toString()}]
                </label>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <div>
              <EmojiHappyIcon className="w-8 h-8 text-gray-500 animate-bounce mx-auto" />
            </div>
            <div className="text-center text-sm text-gray-500 animate-pulse">Waiting for lobby admin...</div>
          </div>
        </div>
      )}

      <ActionMenu
        players={players}
        isPlayerAdminInLobby={isPlayerAdminInLobby(userLogged.id)}
        showingResults={adminAction && adminAction.action === 'SHOWING_RESULTS'}
        gameStarted={gameStarted}
        isAllowedToShowResults={isAllowedToShowResults}
        handleAdminStartGame={handleAdminStartGame}
        handleHideResults={handleHideResults}
        handleClearResults={handleClearResults}
        handleResetGame={handleResetGame}
        handleShowResults={handleShowResults}
        setShowingResults={setShowingResults}
        setShowingPlayers={setShowingPlayers} />

      <ResultList
        players={players}
        cardMessages={cardMessages}
        showingResults={showingResults}
        setShowingResults={setShowingResults} />

      <PlayersPanel
        players={players}
        showingPlayers={showingPlayers}
        isPlayerAdminInLobby={isPlayerAdminInLobby}
        setShowingPlayers={setShowingPlayers} />
    </div >
  );
};

export default LobbyInfo;
