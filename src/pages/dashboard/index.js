import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { createLobby, enterLobbyByCode } from '../../api/lobby';
import { getUserLogged } from '../../services/auth';
import { buildURL, ROUTE_LOBBY } from '../../utils/routes';
import Input from '../../components/Input';
import useInput from '../../components/Input/useInput';
import Button from '../../components/Button';

const Dashboard = props => {
  const [isLoadingCreate, setIsLoadingCreate] = React.useState(false);
  const [isLoadingJoin, setIsLoadingJoin] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const newLobbyCode = useInput('');
  const existingLobbyName = useInput('');

  const handleCreateNewLobby = async () => {
    if(!newLobbyCode.value) {
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
    }
  };

  const joinExistingLobby = async () => {
    if(!existingLobbyName.value) {
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
        }), { update: true }
      );
    }
  };

  return (
    <>
      {isError && <p>An error has occurred when trying to enter lobby</p>}
      
      <div>
        <Input
          label="Create new lobby"
          type="text"
          placeholder="Ex: planning-spacex"
          styleClass="text-input-field"
          {...newLobbyCode}
        />

        <Button isLoading={isLoadingCreate} onClick={handleCreateNewLobby}>
          Create lobby
        </Button>
      </div>
      <div className={'mt-2'}>
        <Input
          label="Join existing lobby"
          type="text"
          placeholder="Enter existing lobby code"
          {...existingLobbyName}
        />

        <Button isLoading={isLoadingJoin}  onClick={joinExistingLobby}>Join lobby</Button>
      </div>
    </>
  );
};

export default Dashboard;
