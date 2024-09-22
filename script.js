const Gameboard = (function () {
  const board = []; // Array to hold the game cells
  const gameContainer = document.querySelector(".board-container"); // Game board container
  const winnerText = document.querySelector(".winner"); // Element to display the winner
  const winningPositions = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  // Create board cells
  for (let i = 0; i < 9; i++) {
    const gamePiece = document.createElement("div");
    gamePiece.classList.add("board-cell");
    gameContainer.appendChild(gamePiece);
    gamePiece.dataset.index = i; // Store index for easy reference
    board.push(gamePiece);
  }

  let currentPlayerMarker = "X"; // Start with player X
  let player1, player2; // Hold player objects

  function updateBoard(p1, p2) {
    player1 = p1; // Store player 1
    player2 = p2; // Store player 2

    board.forEach((element) =>
      element.addEventListener("click", function () {
        if (!element.textContent) {
          // Only proceed if the cell is empty
          element.innerText = currentPlayerMarker; // Place the marker
          currentPlayerMarker = currentPlayerMarker === "X" ? "O" : "X"; // Switch players
          checkForWin(); // Check for a winner
        }
      })
    );
  }

  function checkForWin() {
    for (const win of winningPositions) {
      const [a, b, c] = win; // Destructure winning positions
      if (
        board[a].innerText &&
        board[a].innerText === board[b].innerText &&
        board[a].innerText === board[c].innerText
      ) {
        // Determine and display the winner
        const winner = board[a].innerText === "X" ? player1.name : player2.name;
        winnerText.innerText = `${winner} (${board[a].innerText}) is the winner!`;
        return; // Exit once a winner is found
      }
    }
  }

  function resetBoard() {
    board.forEach((cell) => {
      cell.innerText = ""; // Clear each cell
    });
    winnerText.innerText = ""; // Clear the winner text
    currentPlayerMarker = "X"; // Reset to player X
  }

  return {
    board,
    checkForWin,
    updateBoard,
    resetBoard,
  };
})();

// Players factory function
function players(name) {
  return {
    name,
  };
}

const Game = (() => {
  function getUserInput() {
    const playerOneInput = document.querySelector("#player1input");
    const playerTwoInput = document.querySelector("#player2input");
    const player1 = players(playerOneInput.value);
    const player2 = players(playerTwoInput.value);
    Gameboard.updateBoard(player1, player2); // Initialize the board with players
  }

  (function submit() {
    const submitButton = document.querySelector(".submit");
    submitButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission
      getUserInput(); // Get player names
    });
  })();

  return { getUserInput };
})();

document.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", function () {
    Gameboard.resetBoard(); // Reset the game board
  });
});
