import ComputerSquare from "./C-Squares";

function BotBoard({ aiBoard, aiShip, playerTurn, onPlayerGuess }) {
  function handleClick(i) {
    if (!playerTurn) return;

    if (aiBoard[i] !== null) return;

    const isHit = aiShip.includes(i);
    const result = isHit ? "X" : "O";

    onPlayerGuess(i, result);
  }

  return (
    <div className="bot-board">
      <h2 className="status">Enemy Waters</h2>

      <div className="grid grid-cols-4 gap-1">
        {aiBoard.map((value, i) => (
          <ComputerSquare
            key={i}
            value={value}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default BotBoard;
