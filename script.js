let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let playerScore = 0;
let computerScore = 0;

function playerMove(index) {
  if (!gameOver && board[index] === "") {
    board[index] = currentPlayer;
    drawBoard();
    if (checkWinner(currentPlayer)) {
      gameOver = true;
      if (currentPlayer === 'X') {
        playerScore++;
        document.getElementById("playerScore").innerText = playerScore;
        alert("You win!");
      } else {
        computerScore++;
        document.getElementById("computerScore").innerText = computerScore;
        alert("Computer wins!");
      }
      return;
    }
    if (!board.includes("")) {
      gameOver = true;
      alert("It's a tie!");
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") {
      computerMove();
    }
  }
}

function computerMove() {
  let availableMoves = board.reduce((acc, cell, index) => {
    if (cell === "") acc.push(index);
    return acc;
  }, []);
  let randomIndex = Math.floor(Math.random() * availableMoves.length);
  playerMove(availableMoves[randomIndex]);
}

function checkWinner(player) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];
  return winConditions.some(condition => {
    return condition.every(index => board[index] === player);
  });
}

function drawBoard() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  drawBoard();
}