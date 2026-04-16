function computerAttack() {
  let index;
  do {
    index = Math.floor(Math.random() * 16);
  } while (computerGuesses[index] !== null);

  const newGuesses = [...computerGuesses];
  newGuesses[index] = playerBoard[index] === "S" ? "H" : "M";
  setComputerGuesses(newGuesses);

  setIsPlayerTurn(true);

  if (checkWin(computerBoard, newGuesses)) {
    alert("You win!");
  }
}

export default computerAttack();
