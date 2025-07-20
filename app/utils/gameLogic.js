// Helper to check for a winner
function getWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// --- Rookie AI: Makes a random move ---
function findRandomMove(squares) {
  const emptySquares = [];
  squares.forEach((square, index) => {
    if (square === null) {
      emptySquares.push(index);
    }
  });
  if (emptySquares.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }
  return -1;
}

// --- Challenger AI: Tries to win or block, otherwise random ---
function findChallengerMove(squares) {
  // 1. Check if AI ('O') can win
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const tempSquares = squares.slice();
      tempSquares[i] = 'O';
      if (getWinner(tempSquares) === 'O') {
        return i;
      }
    }
  }
  // 2. Check if Player ('X') can win and block them
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const tempSquares = squares.slice();
      tempSquares[i] = 'X';
      if (getWinner(tempSquares) === 'X') {
        return i;
      }
    }
  }
  // 3. Otherwise, make a random move
  return findRandomMove(squares);
}


// --- Grandmaster AI: Unbeatable Minimax ---
function evaluate(squares) {
  const winner = getWinner(squares);
  if (winner === 'O') return 10;
  if (winner === 'X') return -10;
  return 0;
}

function isMovesLeft(squares) {
  return squares.includes(null);
}

function minimax(squares, depth, isMax) {
  const score = evaluate(squares);

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (!isMovesLeft(squares)) return 0;

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        best = Math.max(best, minimax(squares, depth + 1, !isMax));
        squares[i] = null;
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = 'X';
        best = Math.min(best, minimax(squares, depth + 1, !isMax));
        squares[i] = null;
      }
    }
    return best;
  }
}

function findGrandmasterMove(squares) {
  let bestVal = -1000;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      squares[i] = 'O';
      const moveVal = minimax(squares, 0, false);
      squares[i] = null;
      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
}

// --- Main AI Move Finder ---
export function findAiMove(squares, level) {
  switch (level) {
    case 'Rookie':
      return findRandomMove(squares);
    case 'Challenger':
      return findChallengerMove(squares);
    case 'Grandmaster':
      return findGrandmasterMove(squares);
    default:
      return findRandomMove(squares);
  }
}


export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}
