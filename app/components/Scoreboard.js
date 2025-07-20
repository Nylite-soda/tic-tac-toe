"use client";
import { Paper, Stack, Title, Group, Text, Badge, Button } from "@mantine/core";

export function Scoreboard({ score, onReset }) {
  return (
    <Paper withBorder shadow="md" p="lg" radius="md" style={{ flex: 1 }}>
      <Stack align="center" gap="md" h="100%">
        <Title order={1} c="brand.6">
          Scoreboard
        </Title>
        <Stack align="center" justify="center" style={{ flex: 1 }}>
          <Group>
            <Text size="xl">Player X:</Text>
            <Badge size="xl" variant="filled" color="brand">
              {score.X}
            </Badge>
          </Group>
          <Group>
            <Text size="xl">Player O:</Text>
            <Badge size="xl" variant="filled" color="brand">
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
        <Button onClick={onReset} variant="filled" color="red" size="md">
          Reset Score
        </Button>
      </Stack>
    </Paper>
  );
}
