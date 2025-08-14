"use client";

import { checkWinner, createEmptyBoard } from "@/utils";
import {
  COL_SIZE,
  EMPTY_CELL,
  PLAYER_O,
  PLAYER_X,
  ROW_SIZE,
} from "@/constants";
import { useState } from "react";

export const TicTacToe = () => {
  const [board, setBoard] = useState<string[][]>(
    createEmptyBoard(ROW_SIZE, COL_SIZE)
  );

  const [currentPlayer, setCurrentPlayer] = useState<string>(PLAYER_X);
  const [winner, setWinner] = useState<string | null>(null);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== EMPTY_CELL || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoard(newBoard);

    const isWinner = checkWinner(newBoard, currentPlayer);

    if (isWinner) {
      setWinner(currentPlayer);
      alert(`${currentPlayer} wins!`);
      return;
    }

    setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard(ROW_SIZE, COL_SIZE));
    setWinner(null);
    setCurrentPlayer(PLAYER_X);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Tic Tac Toe
        </h1>

        <div className="text-xl font-semibold text-center mb-6 p-4 bg-gray-100 rounded-lg">
          {winner ? (
            <span className="text-green-600">Winner: {winner}</span>
          ) : (
            <span className="text-blue-600">
              Current Player: {currentPlayer}
            </span>
          )}
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-6"
          onClick={resetGame}
        >
          Reset Game
        </button>

        <div className="grid grid-cols-3 gap-2 bg-gray-200 p-4 rounded-lg">
          {Array.from({ length: ROW_SIZE }).map((_, rowIndex) => (
            <div key={rowIndex} data-row={rowIndex} className="contents">
              {Array.from({ length: COL_SIZE }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  role="button"
                  data-col={colIndex}
                  className="aspect-square bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-200 rounded-lg"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  <span
                    className={
                      board[rowIndex][colIndex] === PLAYER_X
                        ? "text-red-500"
                        : "text-blue-500"
                    }
                  >
                    {board[rowIndex][colIndex]}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
