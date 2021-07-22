import clsx from 'clsx';
import React from 'react';

const WaitingList = ({
  players,
  cardMessages,
  showingResults
}) => {

  const [resultsSorted, setResultsSorted] = React.useState(cardMessages);

  React.useEffect(() => {
    setResultsSorted(cardMessages.sort((a, b) => {
      return parseFloat(b.cardChosen) - parseFloat(a.cardChosen);
    }));
  }, [cardMessages]);

  const isPlayerReadyToShowCard = (player) => resultsSorted.find(t => t.player.id === player.id && !!t.cardChosen);

  return (
    <ul className="w-full">
      {players.map((player, i) => {
        const playerReady = isPlayerReadyToShowCard(player);
        return (
          <li className="px-1 py-3" key={i}>
            <div className="grid grid-cols-8 py-5 items-center">
              <div className="col-span-7">
                <div>
                  <b>
                    {player.playerName}
                  </b>
                </div>
                <div>
                  <em className="text-xs">
                    {playerReady ? "Player ready!" : "Choosing card..."}
                 </em>
                </div>
              </div>

              <div className="text-right relative m-2">
                <div className={clsx(
                  "absolute mx-auto top-1.5 w-3 h-3 inline-block rounded-full",
                  playerReady ? "bg-green-500" : "bg-red-500"
                )} >

                </div>
                <div className={clsx(
                  "w-3 h-3 animate-ping inline-block rounded-full",
                  playerReady ? "bg-green-500" : "bg-red-500"
                )} />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  );
}

export default WaitingList;