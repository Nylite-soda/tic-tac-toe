"use client";
import { useState, useEffect } from "react";
import { Button, Box, Transition } from "@mantine/core";
import { IconX, IconCircle } from "@tabler/icons-react";

export function Square({ value, onSquareClick, isWinning }) {
  const [scaled, setScaled] = useState(false);
  useEffect(() => {
    setScaled(!!value);
  }, [value]);

  return (
    <Button
      onClick={onSquareClick}
      variant={isWinning ? "filled" : "light"}
      color={isWinning ? "yellow" : "brand"}
      mih={{ base: 80, sm: 100, md: 120 }}
      miw={{ base: 80, sm: 100, md: 120 }}
      p={0}
      style={{ position: "relative" }}
    >
      <Box pos="absolute" top={0} left={0} right={0} bottom={0}>
        <Transition
          mounted={scaled}
          transition="scale"
          duration={200}
          timingFunction="ease"
        >
          {(styles) => (
            <Box
              style={{
                ...styles,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              {value === "X" && <IconX size="70%" />}
              {value === "O" && <IconCircle size="70%" />}
            </Box>
          )}
        </Transition>
      </Box>
    </Button>
  );
}
