const board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = false;
let playerNames = { X: "Player X", O: "Player O" };

const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const playerForm = document.getElementById('player-form');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const gameBoard = document.getElementById('game-board');

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

function handleCellClick(e) {
  const idx = parseInt(e.target.dataset.index);
  if (!gameActive || board[idx]) return;

  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    statusDiv.textContent = `${playerNames[currentPlayer]} wins!`;
    highlightWinner(checkWinner(currentPlayer));
    gameActive = false;
    return;
  }
  if (board.every(cell => cell)) {
    statusDiv.textContent = "It's a tie!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `${playerNames[currentPlayer]}'s turn`;
}

function checkWinner(player) {
  for (const pattern of winPatterns) {
    if (pattern.every(idx => board[idx] === player)) {
      return pattern;
    }
  }
  return null;
}

function highlightWinner(pattern) {
  if (!pattern) return;
  pattern.forEach(idx => {
    cells[idx].classList.add('winner');
  });
}

function restartGame() {
  for (let i = 0; i < 9; i++) {
    board[i] = null;
    cells[i].textContent = '';
    cells[i].classList.remove('winner');
  }
  currentPlayer = "X";
  gameActive = true;
  statusDiv.textContent = `${playerNames[currentPlayer]}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Player form logic
playerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  playerNames.X = playerXInput.value.trim() || "Player X";
  playerNames.O = playerOInput.value.trim() || "Player O";
  playerForm.style.display = "none";
  gameBoard.style.display = "";
  restartBtn.style.display = "";
  restartGame();
  gameActive = true; // Start the game after entering names
});

// Initialize: hide board and restart until names entered
gameBoard.style.display = "none";
restartBtn.style.display = "none";
statusDiv.textContent = "";