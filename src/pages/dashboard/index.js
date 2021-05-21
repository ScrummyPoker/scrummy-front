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

const Dashboard = props => {
  const [isLoadingCreate, setIsLoadingCreate] = React.useState(false);
  const [isLoadingJoin, setIsLoadingJoin] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const newLobbyCode = useInput('');
  const existingLobbyName = useInput('');

  //hooks
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

  //handlers
  const handleCreateNewLobby = async () => {
    if (!newLobbyCode.value) {
      return setIsError(true);
    }

    setIsLoadingCreate(true);

    const newLobby = await createLobby({
      userId: getUserLogged().id,
      lobbyCode: newLobbyCode.value,
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
    if (!existingLobbyName.value) {
      return setIsError(true);
    }

    setIsLoadingJoin(true);

    const existingLobby = await enterLobbyByCode({
      userId: getUserLogged().id,
      lobbyCode: existingLobbyName.value,
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

  return (
    <>
      <div>
        <InputWithButton
          label="Create new lobby"
          type="text"
          placeholder="Ex: planning-spacex"
          isLoading={isLoadingCreate}
          buttonDisabled={newLobbyCode.value.length === 0}
          buttonIcon={ChevronRightIcon}
          handleButtonClick={handleCreateNewLobby}
          onKeyPress={e => handleKeyPress(e, handleCreateNewLobby)}
          {...newLobbyCode}
        />
      </div>
      <div className={'mt-2'}>
        <InputWithButton
          label="Join existing lobby"
          type="text"
          placeholder="Enter existing lobby code"
          isLoading={isLoadingJoin}
          buttonDisabled={existingLobbyName.value.length === 0}
          buttonIcon={ChevronRightIcon}
          handleButtonClick={joinExistingLobby}
          onKeyPress={e => handleKeyPress(e, joinExistingLobby)}
          {...existingLobbyName}
        />
      </div>
    </>
  );
};

export default Dashboard;
