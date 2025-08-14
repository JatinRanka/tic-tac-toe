import { EMPTY_CELL, PLAYER_O, PLAYER_X } from "@/constants";


export const createEmptyBoard = (row: number, col: number) => {
  const board = new Array(row)
    .fill(null)
    .map(() => new Array(col).fill(EMPTY_CELL));

  return board;
};

const checkRow = (board: string[][], currentPlayer: string) => {
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    if (row.every((cell) => cell === currentPlayer)) {
      return true;
    }
  }
  return false;
};

const checkCol = (board: string[][], currentPlayer: string) => {
  for (let i = 0; i < board[0].length; i++) {
    const col = board.map((row) => row[i]);
    if (col.every((cell) => cell === currentPlayer)) {
      return true;
    }
  }
  return false;
};

const checkDiagonal = (board: string[][], currentPlayer: string) => {

  const diag1 = [board[0][0], board[1][1], board[2][2]];

  if (diag1.every((cell) => cell === currentPlayer)) {
    return true;
  }

  const diag2 = [board[0][2], board[1][1], board[2][0]];
  
  if (diag2.every((cell) => cell === currentPlayer)) {
    return true;
  }

  return false;
};

export const checkWinner = (board: string[][], currentPlayer: string) => {
  return checkRow(board, currentPlayer) || checkCol(board, currentPlayer) || checkDiagonal(board, currentPlayer);
};