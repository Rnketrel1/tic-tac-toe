const Gameboard = (function () {
  const board = Array(9).fill("");
  const gameContainer = document.querySelector(".board-container");
  const winnerText = document.querySelector(".winner");
  const resetButton = document.querySelector(".reset");

  let currentPlayerMarker = "X"; // Start with player 1 ('X')
  let player1, player2;

  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const resetGame = () => {
    board.fill("");
    gameContainer.innerHTML = "";
    winnerText.innerText = "";
    currentPlayerMarker = "X";
    createBoard();
  };

  const createBoard = () => {
    gameContainer.innerHTML = ""; // Clear existing cells
    board.forEach((_, i) => {
      const gamePiece = document.createElement("div");
      gamePiece.classList.add("board-cell");
      gamePiece.dataset.index = i;
      gamePiece.addEventListener("click", () => handleCellClick(i, gamePiece));
      gameContainer.appendChild(gamePiece);
    });
  };

  const handleCellClick = (index, element) => {
    if (board[index] === "") {
      board[index] = currentPlayerMarker;
      element.innerText = currentPlayerMarker;

      const winner = checkWinner();
      if (winner) {
        winnerText.innerText = `Player ${
          winner === "X" ? player1.name : player2.name
        } wins!`;
      } else if (board.every((cell) => cell !== "")) {
        winnerText.innerText = "It's a tie!";
      }

      currentPlayerMarker = currentPlayerMarker === "X" ? "O" : "X"; // Switch players
    }
  };

  const checkWinner = () => {
    for (const [a, b, c] of winningPositions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O' as the winner
      }
    }
    return null; // No winner
  };

  resetButton.addEventListener("click", resetGame);

  return {
    startGame: (p1, p2) => {
      player1 = p1;
      player2 = p2;
      createBoard();
    },
  };
})();

// Players factory
const players = (name, marker) => ({ name, marker });

// Game module
const Game = (() => {
  const getUserInput = () => {
    const playerOneInput = document.querySelector("#player1input").value;
    const playerTwoInput = document.querySelector("#player2input").value;
    const player1 = players(playerOneInput, "X");
    const player2 = players(playerTwoInput, "O");
    Gameboard.startGame(player1, player2);
  };

  // Submit button
  document.querySelector(".submit").addEventListener("click", (event) => {
    event.preventDefault();
    getUserInput();
  });

  return { getUserInput };
})();
