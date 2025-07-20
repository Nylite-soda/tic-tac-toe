import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
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
  primaryColor: "indigo",
  colors: {
    indigo: [
      "#edf2ff",
      "#d8e1fe",
      "#b0c2fd",
      "#87a2fc",
      "#6184fa",
      "#4c6ef5",
      "#4263f3",
      "#3b58da",
      "#364ec2",
      "#3145ab",
    ],
    violet: [
      "#f3f0ff",
      "#e5dbfe",
      "#caaffd",
      "#b182fc",
      "#9d5ffa",
      "#9049f8",
      "#8b41f8",
      "#7936db",
      "#6b2fc4",
      "#5d27ad",
    ],
  },
  fontFamily: `Fredoka, ${fredoka.style.fontFamily}, sans-serif`,
  headings: {
    fontFamily: `Fredoka, ${fredoka.style.fontFamily}, sans-serif`,
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
