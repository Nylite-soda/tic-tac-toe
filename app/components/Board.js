"use client";
import { Paper, Stack, Group } from "@mantine/core";
import { Square } from "./Square";
import { calculateWinner } from "../utils/gameLogic";

export function Board({ squares, onPlay, winningLine, xIsNext }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares).winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    onPlay(newSquares);
  }

  return (
    <Paper withBorder shadow="md" p="sm" radius="md">
      <Stack gap="xs">
        {[0, 1, 2].map((row) => (
          <Group key={row} gap="xs" justify="center">
            {[0, 1, 2].map((col) => {
              const i = row * 3 + col;
              return (
                <Square
                  key={i}
                  value={squares[i]}
                  onSquareClick={() => handleClick(i)}
                  isWinning={winningLine?.includes(i)}
                />
              );
            })}
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}
