function handlePlayerAttack(index) {
  if (!isPlayerTurn) return;

  const newGuesses = [...playerGuesses];
  newGuesses[index] = computerBoard[index] === "S" ? "X" : "O";
  setPlayerGuesses(newGuesses);

  setIsPlayerTurn(false);
  setTimeout(computerAttack, 500);

  if (checkWin(computerBoard, newGuesses)) {
    alert("You win!");
  }
}

export default handlePlayerAttack;
