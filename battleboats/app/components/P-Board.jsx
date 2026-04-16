import PlayerSquare from "./P-Squares";

function PlayerBoard({
  playerBoard,
  playerShip,
  tempShip,
  phase,
  onPlaceClick,
  onAiGuess,
}) {
  function handleClick(i) {
    if (phase === "placing") {
      onPlaceClick(i);
      return;
    }

    return;
  }

  return (
    <div className="player-board">
      <h2 className="status">
        {phase === "placing" ? "Place your ship (3 squares)" : "Your Waters"}
      </h2>

      <div className="grid grid-cols-4 gap-1">
        {playerBoard.map((value, i) => {
          let displayValue = value;

          if (phase === "placing" && tempShip.includes(i)) {
            displayValue = "B";
          }

          if (phase === "playing" && playerShip.includes(i) && value === null) {
            displayValue = "B";
          }

          return (
            <PlayerSquare
              key={i}
              value={displayValue}
              onSquareClick={() => handleClick(i)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PlayerBoard;
