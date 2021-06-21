import React from 'react';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import { LockClosedIcon, BadgeCheckIcon, TrashIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const AdminPanel = ({
  gameStarted,
  showingResults,
  handleAdminStartGame,
  handleHideResults,
  handleClearResults,
  handleResetGame,
  handleShowResults,
}) => {
  const [isShowingButtons, setIsShowingButtons] = React.useState(false);

  return (
    <div className={"relative"}>
      <div className={"fixed bottom-10 right-10"}>
        <IconButton 
          primary={!isShowingButtons} 
          Icon={LockClosedIcon}
          onClick={() => setIsShowingButtons(!isShowingButtons)} />
      </div>
      {isShowingButtons && (
        <div className={"bg-black bg-opacity-90 p-3 rounded-lg fixed right-10 bottom-24"}>

          {gameStarted ? (
            <Button icon={TrashIcon} transparent onClick={handleResetGame}>
              Reset Game
            </Button>
          ) : (
            <Button alternative onClick={handleAdminStartGame}>
              Start Game
            </Button>
          )}

          {showingResults ? (
            <>
              <Button alternative icon={EyeOffIcon} onClick={handleHideResults}>Hide Results</Button>
              <Button primary icon={BadgeCheckIcon} onClick={handleClearResults}>New Round</Button>
            </>
          ) : (
            <Button primary icon={EyeIcon} onClick={handleShowResults}>Show Results</Button>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;