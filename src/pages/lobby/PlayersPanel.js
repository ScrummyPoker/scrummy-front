import React from 'react';
import { UserIcon, UsersIcon, CheckIcon, XIcon } from '@heroicons/react/solid';
import IconButton from '../../components/IconButton';
import clsx from 'clsx';
import { useSpring, animated } from "react-spring";


const PlayersPanel = ({
  players,
  isPlayerAdminInLobby
}) => {
  const [isShowingPlayers, setIsShowingPlayers] = React.useState(false);

  const toggleShowingPlayers = () => setIsShowingPlayers(!isShowingPlayers);

  const panelSpring = useSpring({
    left: isShowingPlayers ? 10 : -300,
  });

  const panelIconSpring = useSpring({
    left: isShowingPlayers ? 350 : 20,
  });

  return (

    <>
      <animated.div style={panelIconSpring} className={clsx(
        "fixed top-1/2 left-10",
        isShowingPlayers && "left-96"
      )}>
          <IconButton
            primary={!isShowingPlayers}
            Icon={isShowingPlayers ? XIcon : UsersIcon}
            onClick={toggleShowingPlayers} />


        <span
          className={clsx(
            "absolute top-0 right-0 inline-flex items-center justify-center px-2",
            "py-1 text-xs font-bold leading-nonetransform translate-x-1/2",
            "-translate-y-1/2 rounded-full")}
        >
          <CheckIcon />
        </span>

      </animated.div>

      <animated.div 
        style={panelSpring} 
        className={"bg-black bg-opacity-90 p-5 rounded-lg fixed left-10 top-1/2 shadow-lg transition"}>
        <h4 className={"mb-3"}>Players in lobby:</h4>
        <div className="grid grid-cols-4 gap-5 ">
          {players.map((player, i) => (
            <div key={i} className="text-center">
              <div class="relative inline-block">
                <UserIcon width={30} className="mx-auto" />
                {isPlayerAdminInLobby(player.id) && (
                  <span class={
                    clsx(
                      "absolute top-0 right-0 inline-flex items-center justify-center",
                      "px-2 py-1 text-xs font-bold leading-none text-yellow",
                      "transform translate-x-1/2 -translate-y-1/2 rounded-full"
                    )}>
                    ♕
                  </span>
                )}
              </div>
              <div>
                {player.playerName}
              </div>
          </div>
          ))}
        </div>
      </animated.div>


    </>
  );
}

export default PlayersPanel;