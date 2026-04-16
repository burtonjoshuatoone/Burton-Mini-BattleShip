function placeShipRandomly() {
  const board = Array(16).fill(null);
  const orientations = ["horizontal", "vertical"];
  const orientation = orientations[Math.floor(Math.random() * 2)];

  let start;

  if (orientation === "horizontal") {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 2); // only 0 or 1 fits length 3
    start = row * 4 + col;
    board[start] = "S";
    board[start + 1] = "S";
    board[start + 2] = "S";
  } else {
    const row = Math.floor(Math.random() * 2); // only 0 or 1 fits length 3
    const col = Math.floor(Math.random() * 4);
    start = row * 4 + col;
    board[start] = "S";
    board[start + 4] = "S";
    board[start + 8] = "S";
  }

  return board;
}

export default placeShipRandomly;
