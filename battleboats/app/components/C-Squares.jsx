function ComputerSquare({ value, onSquareClick }) {
  return (
    <button
      className="w-20 h-20 border border-red-700 flex items-center justify-center text-3x1 font-bold"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default ComputerSquare;
