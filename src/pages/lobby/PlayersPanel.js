import React from 'react';
import { UserIcon, UsersIcon, CheckIcon, XIcon } from '@heroicons/react/solid';
import IconButton from '../../components/IconButton';
import clsx from 'clsx';
import { useSpring, animated } from "react-spring";
import { BottomSheet } from 'react-spring-bottom-sheet'
import BottomDrawer from '../../components/BottomDrawer';

const PlayersPanel = ({
  players,
  isPlayerAdminInLobby,
  showingPlayers,
  setShowingPlayers
}) => {

  return (
    <BottomDrawer
      open={showingPlayers}
      onDismiss={() => setShowingPlayers(false)}>
      <div className="p-2 px-10">
        <h3 className="mb-5">Player connected to lobby:</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-5 py-10">
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
      </div>
    </BottomDrawer>
  );
}

export default PlayersPanel;