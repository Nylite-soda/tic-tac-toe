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
  Transition,
} from "@mantine/core";
import { IconRefresh, IconArrowBackUp, IconTrophy } from "@tabler/icons-react";
import Confetti from "react-confetti";
import { useWindowSize } from "./hooks/useWindowSize";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateWinner, findAiMove } from "./utils/gameLogic";
import { Board } from "./components/Board";
import { Scoreboard } from "./components/Scoreboard";
import { ThemeToggle } from "./components/ThemeToggle";

// Define initial scores outside the component to prevent re-creation on render.
const initialScores = {
  pvp: { X: 0, O: 0, Draw: 0 },
  pva_Rookie: { X: 0, O: 0, Draw: 0 },
  pva_Challenger: { X: 0, O: 0, Draw: 0 },
  pva_Grandmaster: { X: 0, O: 0, Draw: 0 },
};

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [modalOpened, setModalOpened] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [gameMode, setGameMode] = useState("pvp"); // 'pvp' or 'pva'
  const [aiLevel, setAiLevel] = useState("Rookie"); // 'Rookie', 'Challenger', 'Grandmaster'

  const [scores, setScores] = useLocalStorage(
    "tic-tac-toe-scores",
    initialScores
  );

  const scoreKey = gameMode === "pva" ? `${gameMode}_${aiLevel}` : "pvp";

  const currentSquares = history[history.length - 1];
  const { winner, line: winningLine } = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(Boolean);
  const xIsNext = currentSquares.filter(Boolean).length % 2 === 0;

  // Effect for handling game over and score
  useEffect(() => {
    const gameEnded = winner || isDraw;
    if (gameEnded && !gameOver) {
      setGameOver(true);
      setModalOpened(true);
      if (winner) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 10000);
      }
      setScores((prevScores) => {
        const newScores = { ...prevScores };
        if (winner) {
          newScores[scoreKey][winner]++;
        } else {
          newScores[scoreKey].Draw++;
        }
        return newScores;
      });
    }
  }, [winner, isDraw, gameOver, setScores, scoreKey]);

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
    setGameOver(false);
    setShowConfetti(false);
  }

  function resetCurrentScore() {
    setScores((prevScores) => ({
      ...prevScores,
      [scoreKey]: { X: 0, O: 0, Draw: 0 },
    }));
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
        <Transition
          mounted={showConfetti}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div
              style={{
                ...styles,
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                // zIndex: 1000,
              }}
            >
              <Confetti width={width} height={height} />
            </div>
          )}
        </Transition>
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title={winner ? "Congratulations!" : "Game Over"}
          centered
          size="md"
        >
          <Stack align="center" gap="md">
            <IconTrophy size={80} color="var(--mantine-color-yellow-6)" />
            <Title order={2}>
              {winner ? `Player ${winner} Wins!` : "It's a Draw!"}
            </Title>
            <Button
              onClick={restartGame}
              leftSection={<IconRefresh size={18} />}
              size="md"
              variant="filled"
              color="indigo"
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
            <Box>
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
              score={scores[scoreKey]}
              gameMode={gameMode}
              aiLevel={aiLevel}
              onReset={resetCurrentScore}
            />
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
}
