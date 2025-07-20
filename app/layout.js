import "@mantine/core/styles.css";
import {
  MantineProvider,
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { Fredoka } from "next/font/google";

import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Tic-Tac-Toe",
  description: "A playful Tic-Tac-Toe game built with Next.js and Mantine.",
};

const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#eef1f9",
      "#d8deea",
      "#b1bdd4",
      "#899cbe",
      "#6881a9",
      "#526e9c",
      "#436395",
      "#355483",
      "#2a4a76",
      "#1d2b56",
    ],
  },
  fontFamily: `Fredoka One, ${fredoka.style.fontFamily}, sans-serif`,
  headings: {
    fontFamily: `Fredoka One, ${fredoka.style.fontFamily}, sans-serif`,
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider
          theme={theme}
          withGlobalStyles
          withNormalizeCSS
          defaultColorScheme="auto"
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
