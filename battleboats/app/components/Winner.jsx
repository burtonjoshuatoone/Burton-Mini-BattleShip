function checkWin(board, guesses) {
  return board.every((cell, i) => cell !== "S" || guesses[i] === "H");
}

export default checkWin;
