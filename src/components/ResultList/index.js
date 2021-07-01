import { ClipboardListIcon, UserIcon } from '@heroicons/react/solid';
import React from 'react';
import PlayersPanel from '../../pages/lobby/PlayersPanel';
import DeckCard from '../DeckCard';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import SectionTitle from '../SectionTitle';

const ResultList = ({
  players,
  cardMessages,
  showingResults,
  setShowingResults
}) => {

  return (
    <>
      <BottomSheet
        open={showingResults}
        snapPoints={({ minHeight }) => minHeight}
        onDismiss={() => setShowingResults(false)}>
        <div className="p-5">
          <div className="">
            <SectionTitle title="PLAYERS RESULTS" icon={ClipboardListIcon} />
          </div>
          <div className="p-10 my-10">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {players.map((player, i) => (
                <div className="" key={i}>
                  <div className="text-center">
                    <div className="w-full">
                      <DeckCard
                        small
                        value={showingResults ? cardMessages.find(t => t.player.id === player.id)?.cardChosen : <div className={"py-3"}></div>}
                        type="button"
                        href="#"
                        onClick={() => { }} />
                    </div>
                    <div className="">
                      {player.playerName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}

export default ResultList;