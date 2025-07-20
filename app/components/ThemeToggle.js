"use client";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="filled"
      size="xl"
      onClick={toggleColorScheme}
      style={{ position: "absolute", top: 20, right: 20 }}
      color="brand"
    >
      <IconSun className="theme-icon-sun" size="70%" />
      <IconMoon className="theme-icon-moon" size="70%" />
    </ActionIcon>
  );
}
