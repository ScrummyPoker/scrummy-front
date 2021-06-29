import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { createLobby, enterLobbyByCode } from '../../api/lobby';
import { getUserLogged } from '../../services/auth';
import { buildURL, ROUTE_LOBBY } from '../../utils/routes';
import Input from '../../components/Input';
import useInput from '../../components/Input/useInput';
import Button from '../../components/Button';
import InputWithButton from '../../components/Input/withButton';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { toast } from 'tailwind-toast';
import { RECEIVED_GREETINGS } from '../../constants/auth';

const Dashboard = props => {
  const [isLoadingCreate, setIsLoadingCreate] = React.useState(false);
  const [isLoadingJoin, setIsLoadingJoin] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [newLobbyCode, setNewLobbyCode] = React.useState('');
  const [existingLobbyName, setExistingLobbyName] = React.useState('');


  //#region hooks

  React.useEffect(() => {
    const availableChars = /[^a-zA-Z0-9-]/ig;

    if(newLobbyCode.length && newLobbyCode.match(availableChars)) {
      setNewLobbyCode(
        newLobbyCode
        .replace(' ', '-')
        .replace(availableChars, '')
      );
    }

    if(existingLobbyName.length && existingLobbyName.match(availableChars)) {
      setExistingLobbyName(
        existingLobbyName
        .replace(' ', '-')
        .replace(availableChars, '')
      );
    }

  }, [newLobbyCode, existingLobbyName]);

  //didMount
  React.useEffect(() => {
    //hello greetings
    const isRecentlyLogged = !localStorage.getItem(RECEIVED_GREETINGS);

    if (isRecentlyLogged) {
      localStorage.setItem(RECEIVED_GREETINGS, 'true');
      toast()
        .success(
          'Welcome to Scrummy!',
          'You can join an existing lobby or create a new one. Have fun!',
        )
        .for(6000)
        .show();
    }
  }, []);

  React.useEffect(() => {
    if (isError) {
      toast()
        .danger(
          'Oops!',
          "We couldn't make the connection to the lobby. Please check the code and try again.",
        )
        .for(3000)
        .show();
    }
  }, [isError]);

  //#endregion

  //#region handlers
  const handleNewLobby = e => setNewLobbyCode(e.target.value);
  const handleExistingLobby = e => setExistingLobbyName(e.target.value);

  const handleCreateNewLobby = async () => {
    if (!newLobbyCode) return setIsError(true);

    setIsLoadingCreate(true);

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
    } else {
      handleErrors();
    }
  };

  const joinExistingLobby = async () => {
    if (!existingLobbyName) return setIsError(true);

    setIsLoadingJoin(true);

    const existingLobby = await enterLobbyByCode({
      userId: getUserLogged().id,
      lobbyCode: existingLobbyName,
    });

    if (existingLobby) {
      props.history.push(
        generatePath(ROUTE_LOBBY, {
          lobbyCode: existingLobby.code,
        }),
        { update: true },
      );
    } else {
      handleErrors();
    }
  };

  const handleErrors = () => {
    setIsError(true);
    setIsLoadingJoin(false);
  };

  const handleKeyPress = (e, _cb) => _cb && e.charCode === 13 && _cb();
  //#endregion

  return (
    <>
      <div>
        <InputWithButton
          label="Create new lobby"
          type="text"
          placeholder="Ex: planning-spacex"
          isLoading={isLoadingCreate}
          buttonDisabled={newLobbyCode.length === 0}
          buttonIcon={ChevronRightIcon}
          handleButtonClick={handleCreateNewLobby}
          onKeyPress={e => handleKeyPress(e, handleCreateNewLobby)}
          onChange={handleNewLobby}
          value={newLobbyCode}
        />
      </div>
      <div className={'mt-2'}>
        <InputWithButton
          label="Join existing lobby"
          type="text"
          placeholder="Enter existing lobby code"
          isLoading={isLoadingJoin}
          buttonDisabled={existingLobbyName.length === 0}
          buttonIcon={ChevronRightIcon}
          handleButtonClick={joinExistingLobby}
          onKeyPress={e => handleKeyPress(e, joinExistingLobby)}
          onChange={handleExistingLobby}
          value={existingLobbyName}
        />
      </div>
    </>
  );
};

export default Dashboard;
