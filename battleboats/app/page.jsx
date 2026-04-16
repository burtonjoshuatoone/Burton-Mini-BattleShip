"use client";

import { useState, useEffect } from "react";
import "./globals.css";

import BotBoard from "./components/C-Board";
import PlayerBoard from "./components/P-Board";

function emptyBoard() {
  return Array(16).fill(null);
}

function placeRandomShip() {
  const horizontal = Math.random() < 0.5;

  if (horizontal) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 2); // fits 3-long ship
    return [row * 4 + col, row * 4 + col + 1, row * 4 + col + 2];
  } else {
    const row = Math.floor(Math.random() * 2);
    const col = Math.floor(Math.random() * 4);
    return [row * 4 + col, (row + 1) * 4 + col, (row + 2) * 4 + col];
  }
}

export default function Game() {
  const [playerBoard, setPlayerBoard] = useState(emptyBoard());
  const [aiBoard, setAiBoard] = useState(emptyBoard());

  const [phase, setPhase] = useState("placing");
  const [tempShip, setTempShip] = useState([]);

  const [playerShip, setPlayerShip] = useState(placeRandomShip());
  const [aiShip, setAiShip] = useState(placeRandomShip());

  const [playerTurn, setPlayerTurn] = useState(true);

  const [winner, setWinner] = useState(null);

  function onPlaceClick(index) {
    if (tempShip.includes(index)) return;

    const newShip = [...tempShip, index];

    if (newShip.length < 3) {
      setTempShip(newShip);
      return;
    }

    if (isValidShip(newShip)) {
      setPlayerShip(newShip);
      setPhase("playing");
    } else {
      alert("Ship must be 3 squares in a straight line.");
      setTempShip([]);
    }
  }

  function isValidShip(ship) {
    ship.sort((a, b) => a - b);

    const row = Math.floor(ship[0] / 4);
    if (
      Math.floor(ship[1] / 4) === row &&
      Math.floor(ship[2] / 4) === row &&
      ship[1] === ship[0] + 1 &&
      ship[2] === ship[1] + 1
    ) {
      return true;
    }

    if (ship[1] === ship[0] + 4 && ship[2] === ship[1] + 4) {
      return true;
    }

    return false;
  }

  function handlePlayerGuess(index, result) {
    if (phase !== "playing" || winner) return;

    if (winner) return;

    const updated = [...aiBoard];
    updated[index] = result;
    setAiBoard(updated);

    if (isShipSunk(updated, aiShip)) {
      setWinner("Player");
      return;
    }

    setPlayerTurn(false);

    setTimeout(() => {
      aiTakeTurn();
    }, 600);
  }

  function aiTakeTurn() {
    if (phase !== "playing" || winner) return;

    if (winner) return;

    const available = playerBoard
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);

    const guess = available[Math.floor(Math.random() * available.length)];

    const isHit = playerShip.includes(guess);
    const result = isHit ? "X" : "O";

    const updated = [...playerBoard];
    updated[guess] = result;
    setPlayerBoard(updated);

    if (isShipSunk(updated, playerShip)) {
      setWinner("AI");
      return;
    }

    setPlayerTurn(true);
  }

  function isShipSunk(board, ship) {
    return ship.every((index) => board[index] === "X");
  }

  return (
    <div className="game flex gap-10 p-6">
      {winner && (
        <div className="text-3xl font-bold text-center mt-4">
          {winner} wins!
        </div>
      )}

      <BotBoard
        aiBoard={aiBoard}
        aiShip={aiShip}
        playerTurn={playerTurn && phase === "playing" && !winner}
        onPlayerGuess={handlePlayerGuess}
      />

      <PlayerBoard
        playerBoard={playerBoard}
        playerShip={playerShip}
        tempShip={tempShip}
        phase={phase}
        onPlaceClick={onPlaceClick}
        onAiGuess={aiTakeTurn}
      />
    </div>
  );
}
