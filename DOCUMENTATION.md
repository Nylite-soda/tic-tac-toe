# Application Documentation

This document provides a detailed breakdown of the Tic-Tac-Toe application's architecture, components, state management, and styling approach.

## 1. High-Level Architecture

The application is built as a single-page application (SPA) using **Next.js** and the **React** library. It follows a component-based architecture, where the UI is broken down into small, reusable pieces.

-   **Framework**: Next.js handles the project structure, routing (though it's a single page), and build process.
-   **UI Components**: Mantine is used as the primary component library, providing pre-built and themeable components like buttons, modals, and layout elements.
-   **State Management**: State is managed locally within the main `Game` component (`app/page.js`) using React Hooks (`useState`, `useEffect`). There is no global state manager like Redux, as the application's state is not complex enough to require one.
-   **Styling**: The primary styling mechanism is Mantine's theming system, defined in `app/layout.js`. This allows for easy light/dark mode switching and consistent design. Global CSS is kept to a minimum.

---

## 2. Project Structure Deep Dive

-   `app/layout.js`
    -   **Purpose**: This is the root layout of the application. It's where the global HTML structure is defined.
    -   **Key Logic**: It initializes the **MantineProvider**, which wraps the entire application and provides the theme. It also sets up the `Fredoka` custom font and includes the `ColorSchemeScript` for reliable light/dark mode detection.

-   `app/page.js`
    -   **Purpose**: This is the main component for the entire application. It acts as the "God component" for this small project, managing all game-related state and logic.
    -   **Key Logic**: Contains all the core game logic, including move history, winner detection, AI turns, and score management. It assembles the UI by composing the smaller components from the `app/components/` directory.

-   `app/globals.css`
    -   **Purpose**: Contains minimal global styling. After the refactor to a Mantine-first approach, its only remaining role is to define the CSS rules that show/hide the sun and moon icons in the `ThemeToggle` component based on the current theme.

-   `app/components/`
    -   **Purpose**: This directory holds all the reusable, self-contained UI components.
        -   `Board.js`: Renders the 3x3 game grid.
        -   `Square.js`: Represents a single clickable square on the board.
        -   `Scoreboard.js`: Displays the scores for Player X, Player O, and Draws.
        -   `ThemeToggle.js`: The button that switches between light and dark modes.

-   `app/hooks/`
    -   **Purpose**: Contains custom React Hooks to encapsulate and reuse stateful logic.
        -   `useLocalStorage.js`: A generic hook that syncs a `useState` variable with the browser's `localStorage`. This is used to persist the scoreboard across sessions.
        -   `useWindowSize.js`: A simple hook that returns the current width and height of the browser window. This is used by the `react-confetti` component to know how large to make the celebration.

-   `app/utils/gameLogic.js`
    -   **Purpose**: Holds pure, non-React-specific JavaScript functions that are responsible for the core game logic.
        -   `calculateWinner()`: Checks the board state to see if a player has won.
        -   `findAiMove()`: Contains the logic for the AI's moves based on the selected difficulty.

---

## 3. Component Breakdown

#### `Board.js`

-   **Purpose**: To render the 3x3 grid of squares.
-   **Props**:
    -   `squares`: The array of 9 elements representing the state of each square.
    -   `onPlay`: A function to be called when a square is clicked.
    -   `winningLine`: An array of indices representing the winning squares, used to highlight them.
-   **Logic**: It maps over a 2D representation of the grid and renders a `Square` component for each position, passing down the necessary props.

#### `Square.js`

-   **Purpose**: To display a single square and handle clicks.
-   **Props**:
    -   `value`: The content of the square ('X', 'O', or `null`).
    -   `onSquareClick`: The function to call when the button is clicked.
    -   `isWinning`: A boolean indicating if this square is part of the winning line.
-   **Logic**:
    -   It renders a Mantine `Button`.
    -   The `variant` and `color` of the button change based on the `isWinning` prop to highlight the winning move.
    -   It uses a `Transition` component to animate the 'X' or 'O' icon when it appears.

#### `Scoreboard.js`

-   **Purpose**: To display the current scores and game mode.
-   **Props**:
    -   `score`: An object containing the scores for X, O, and Draw.
    -   `gameMode`: A string indicating the current game mode ('pvp' or 'pva').
    -   `aiLevel`: The current AI difficulty.
    -   `onReset`: A function to call when the "Reset Score" button is clicked.
-   **Logic**: It displays the scores using Mantine's `Badge` component, with different colors for each player to be easily distinguishable.

#### `ThemeToggle.js`

-   **Purpose**: To provide a UI control for switching between light and dark themes.
-   **Logic**:
    -   It uses Mantine's `useMantineColorScheme` hook to get the current `colorScheme` and the `toggleColorScheme` function.
    -   It renders an `ActionIcon` that, when clicked, calls `toggleColorScheme`.
    -   The two icons (`IconSun` and `IconMoon`) are swapped using the CSS classes defined in `globals.css`.

---

## 4. State Management and Logic

The core of the application's logic resides in `app/page.js`.

#### State Variables

-   `history`: An array of board states. Each element is an array of 9 square values. This allows for the "Undo" functionality.
-   `modalOpened`: A boolean to control the visibility of the end-of-game modal.
-   `gameOver`: A boolean flag to ensure the end-of-game logic (score update, modal opening) runs only once.
-   `showConfetti`: A boolean to control the confetti animation.
-   `gameMode` & `aiLevel`: Strings that control the game type and difficulty.
-   `scores`: An object managed by the `useLocalStorage` hook that stores the scores for all game modes.

#### `useEffect` Hooks

1.  **Game Over and Score Effect**:
    -   **Trigger**: Runs whenever `winner`, `isDraw`, or `gameOver` changes.
    -   **Logic**: It checks if the game has ended (`winner` or `isDraw` is true) and if the `gameOver` flag has not been set yet. If both are true, it sets `gameOver` to `true`, updates the score, and triggers the modal and confetti. This prevents the effect from running in an infinite loop.

2.  **AI Turn Effect**:
    -   **Trigger**: Runs whenever the `history` changes (i.e., after a move).
    -   **Logic**: It checks if it's the AI's turn in a PvA game. If so, it calls `findAiMove()` from `utils/gameLogic.js` to get the AI's next move and then calls `handlePlay` after a short delay to simulate "thinking."

#### Game Logic (`utils/gameLogic.js`)

-   `calculateWinner(squares)`: This function has an array of all 8 possible winning lines. It iterates through them, checking if the `squares` array has 'X' or 'O' in all three positions of any given line. If it finds a winner, it returns the winner ('X' or 'O') and the winning line.
-   `findAiMove(squares, level)`:
    -   **Rookie**: Returns a random available square.
    -   **Challenger**: A simple, rule-based AI. It first checks if it can win in the next move. If not, it checks if the player can win in the next move and blocks them. Otherwise, it plays a random move.
    -   **Grandmaster**: Implements the **minimax algorithm**, a recursive algorithm that explores all possible future moves to find the optimal one. It guarantees the AI will never lose (it will either win or draw).

---

## 5. Styling and Theming

-   **Mantine Theme (`layout.js`)**: A theme is created with `createTheme`. We've defined `indigo` as the `primaryColor` and added a `violet` color for use in the scoreboard. This central theme object provides consistent colors, fonts, and styles to all Mantine components throughout the app.
-   **Light/Dark Mode**: Mantine handles theme switching automatically. When `toggleColorScheme` is called, Mantine applies the `data-mantine-color-scheme="dark"` (or `light`) attribute to the `<html>` element. All Mantine components are designed to adapt their styles based on this attribute, and our custom theme colors are automatically adjusted.
-   **Component Styling**: We prioritize using Mantine's props for styling (e.g., `<Button color="indigo" variant="filled">`). This is the cleanest way to ensure components are theme-aware. Inline styles (`style={{...}}`) are avoided unless absolutely necessary for dynamic or complex styles that can't be achieved with props.
