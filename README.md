# Tic-Tac-Toe Game

A modern, playful, and responsive Tic-Tac-Toe game built with Next.js and the Mantine component library. This project serves as a great example of a well-structured React application, featuring light and dark modes, multiple game modes, and a clean, engaging user interface.

![Tic-Tac-Toe Gameplay Screenshot](https://raw.githubusercontent.com/gemini-testing/react-tic-tac-toe/main/public/screenshot.png)

## Features

-   **Two Game Modes**: Play against another player (PvP) or challenge the AI (PvE).
-   **Three AI Difficulty Levels**:
    -   **Rookie**: Plays randomly.
    -   **Challenger**: Plays defensively to block wins.
    -   **Grandmaster**: Uses the minimax algorithm to play a perfect game.
-   **Light & Dark Mode**: Seamlessly switch between themes.
-   **Score Tracking**: Scores are saved to local storage for each game mode and difficulty.
-   **Responsive Design**: Looks and works great on all screen sizes.
-   **Confetti Celebration**: A fun confetti explosion celebrates every win!
-   **Undo Moves**: Made a mistake? You can undo your last move (and the AI's).

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **UI Library**: [React](https://reactjs.org/)
-   **Component Library**: [Mantine](https://mantine.dev/)
-   **Icons**: [Tabler Icons](https://tabler-icons.io/)
-   **Animations**: [React Confetti](https://www.npmjs.com/package/react-confetti)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer recommended)
-   [pnpm](https://pnpm.io/) (or your preferred package manager like npm or yarn)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

### Running the Application

To start the development server, run the following command:

```sh
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows the standard Next.js `app` directory structure.

-   `app/` - Contains all the core application code.
    -   `layout.js` - The root layout, which sets up the Mantine theme.
    -   `page.js` - The main component that holds the game logic and state.
    -   `globals.css` - Minimal global styles, primarily for the theme toggle icon.
    -   `components/` - All the reusable React components (`Board`, `Square`, `Scoreboard`, etc.).
    -   `hooks/` - Custom React hooks for managing local storage and window size.
    -   `utils/` - Utility functions, including the core game and AI logic.
-   `public/` - Static assets.
-   `*.config.mjs` - Configuration files for Next.js, PostCSS, and Tailwind.

## License

This project is open-source and available under the [MIT License](LICENSE).