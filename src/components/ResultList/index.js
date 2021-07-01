import { UserIcon } from '@heroicons/react/solid';
import React from 'react';
import PlayersPanel from '../../pages/lobby/PlayersPanel';
import DeckCard from '../DeckCard';

const ResultList = ({
  players,
  cardMessages,
  showingResults
}) => {

  const [resultsSorted, setResultsSorted] = React.useState(cardMessages);

  React.useEffect(() => {
    if (showingResults) {

      setResultsSorted(cardMessages.sort((a, b) => {
        return parseFloat(b.cardChosen) - parseFloat(a.cardChosen);
      }))
    }
  }, [showingResults, cardMessages]);


  return (
    <ul className="w-full">
      {players.map((player, i) => (
        <li className="px-1 py-3" key={i}>
        <div className="grid grid-cols-5 p-3 items-center">
          <div className="col-span-4">
            {player.playerName}
          </div>
          <div className="text-center">
            <DeckCard
              small
              value={showingResults ? cardMessages.find(t => t.player.id === player.id)?.cardChosen : <div className={"py-3"}></div>}
              type="button"
              href="#"
              onClick={() => { }} />
          </div>
        </div>
      </li>
      ))}
    </ul>
  );
}

export default ResultList;