"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Stack,
  Text,
  Title,
  Group,
  Container,
  SimpleGrid,
  SegmentedControl,
  Box,
} from "@mantine/core";
import { IconRefresh, IconArrowBackUp, IconTrophy } from "@tabler/icons-react";
import Confetti from "react-confetti";
import { useWindowSize } from "./hooks/useWindowSize";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateWinner, findAiMove } from "./utils/gameLogic";
import { Board } from "./components/Board";
import { Scoreboard } from "./components/Scoreboard";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [modalOpened, setModalOpened] = useState(false);
  const { width, height } = useWindowSize();
  const [gameMode, setGameMode] = useState("pvp"); // 'pvp' or 'pva'
  const [aiLevel, setAiLevel] = useState("Rookie"); // 'Rookie', 'Challenger', 'Grandmaster'

  const [scores, setScores] = useLocalStorage("tic-tac-toe-scores", {
    pvp: { X: 0, O: 0, Draw: 0 },
    pva: { X: 0, O: 0, Draw: 0 },
  });

  const currentSquares = history[history.length - 1];
  const { winner, line: winningLine } = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(Boolean);
  const xIsNext = currentSquares.filter(Boolean).length % 2 === 0;

  // Effect for handling game over and score
  useEffect(() => {
    const gameEnded = winner || isDraw;
    if (gameEnded && !modalOpened) {
      setModalOpened(true);
      setScores((prevScores) => {
        const newScores = { ...prevScores };
        if (winner) {
          newScores[gameMode][winner]++;
        } else {
          newScores[gameMode].Draw++;
        }
        return newScores;
      });
    }
  }, [winner, isDraw, modalOpened, setScores, gameMode]);

  // Effect for handling AI's turn
  useEffect(() => {
    if (gameMode === "pva" && !xIsNext && !winner && !isDraw) {
      const aiMove = findAiMove(currentSquares, aiLevel);
      if (aiMove !== -1) {
        setTimeout(() => {
          handlePlay(aiMove);
        }, 500); // AI "thinks" for 500ms
      }
    }
  }, [history, gameMode, xIsNext, winner, isDraw, currentSquares, aiLevel]);

  function handlePlay(i) {
    if (currentSquares[i] || winner) return;
    const newSquares = currentSquares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...history, newSquares]);
  }

  function handleUndo() {
    if (history.length > 1 && !winner && !isDraw) {
      const movesToUndo = gameMode === "pva" && history.length > 2 ? 2 : 1;
      setHistory(history.slice(0, history.length - movesToUndo));
    }
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setModalOpened(false);
  }

  function resetScores() {
    setScores({
      pvp: { X: 0, O: 0, Draw: 0 },
      pva: { X: 0, O: 0, Draw: 0 },
    });
  }

  function handleGameModeChange(mode) {
    setGameMode(mode);
    restartGame();
  }

  let status;
  if (winner) {
    status = `Player ${winner} is the winner!`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <ThemeToggle />
      <Container
        size="lg"
        py="xl"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {winner && <Confetti width={width} height={height} />}
        <Modal
          opened={modalOpened}
          onClose={restartGame}
          title={winner ? "Congratulations!" : "Game Over"}
          centered
          size="md"
        >
          <Stack align="center" gap="md">
            <IconTrophy size={80} color="yellow" />
            <Title order={2}>
              {winner ? `Player ${winner} Wins!` : "It's a Draw!"}
            </Title>
            <Button
              onClick={restartGame}
              leftSection={<IconRefresh size={18} />}
              size="md"
              variant="filled"
            >
              Play Again
            </Button>
          </Stack>
        </Modal>

        <Stack
          align="center"
          gap="xl"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Title order={1} style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Tic-Tac-Toe
          </Title>

          <Stack align="center" gap="md">
            <SegmentedControl
              value={gameMode}
              onChange={handleGameModeChange}
              data={[
                { label: "Player vs Player", value: "pvp" },
                { label: "Player vs AI", value: "pva" },
              ]}
            />
            <Box
            // h={42}
            >
              {gameMode === "pva" && (
                <SegmentedControl
                  value={aiLevel}
                  onChange={setAiLevel}
                  data={["Rookie", "Challenger", "Grandmaster"]}
                />
              )}
            </Box>
          </Stack>

          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            spacing="xl"
            verticalSpacing="xl"
            style={{ alignItems: "stretch" }}
          >
            <Stack align="center" gap="lg">
              <Text size="xl" fw={500}>
                {status}
              </Text>
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={(i) => handlePlay(i)}
                winningLine={winningLine}
              />
              <Group>
                <Button
                  onClick={handleUndo}
                  variant="default"
                  leftSection={<IconArrowBackUp size={16} />}
                  disabled={history.length <= 1 || !!winner || isDraw}
                >
                  Undo
                </Button>
                <Button
                  onClick={restartGame}
                  variant="default"
                  leftSection={<IconRefresh size={16} />}
                >
                  Restart
                </Button>
              </Group>
            </Stack>
            <Scoreboard
              score={scores[gameMode]}
              gameMode={gameMode}
              onReset={resetScores}
            />
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
}
