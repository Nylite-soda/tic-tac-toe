"use client";
import { Paper, Stack, Title, Group, Text, Badge, Button } from "@mantine/core";

export function Scoreboard({ score, gameMode, aiLevel, onReset }) {
  let gameModeText = "Player vs Player";
  if (gameMode === "pva") {
    gameModeText = `Player vs AI - ${aiLevel}`;
  }

  return (
    <Paper withBorder shadow="md" p="lg" radius="md" style={{ flex: 1 }}>
      <Stack align="center" gap="md" h="100%">
        <Title order={2}>Scoreboard</Title>
        <Text c="dimmed">{gameModeText}</Text>
        <Stack align="center" justify="center" style={{ flex: 1 }}>
          <Group>
            <Text size="xl">Player X:</Text>
            <Badge size="xl" color="indigo">
              {score.X}
            </Badge>
          </Group>
          <Group>
            <Text size="xl">Player O:</Text>
            <Badge size="xl" color="violet">
              {score.O}
            </Badge>
          </Group>
          <Group>
            <Text size="xl">Draws:</Text>
            <Badge size="xl" variant="light" color="gray">
              {score.Draw}
            </Badge>
          </Group>
        </Stack>
        <Button onClick={onReset} variant="light" color="red" size="sm" mt="sm">
          Reset Score
        </Button>
      </Stack>
    </Paper>
  );
}
