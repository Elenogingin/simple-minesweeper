const NUM_ROWS = 8;
const NUM_COLS = 8;
const NUM_MINES = 10;

let board;
let isGameOver;

window.onload = function() {
  // Create the board
  board = createBoard();

  // Add the click event listeners to the cells
  let cells = document.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClick);
  }
};

function createBoard() {
  // Initialize the board
  let board = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    board.push([]);
    for (let j = 0; j < NUM_COLS; j++) {
      board[i].push(0);
    }
  }

  // Add the mines to the board
  addMines(board, NUM_MINES);

  // Calculate the numbers for the cells
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      if (board[i][j] !== "X") {
        board[i][j] = getAdjacentMines(board, i, j);
      }
    }
  }

  // Create the HTML table
  let table = document.getElementById("minesweeper");
  for (let i = 0; i < NUM_ROWS; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < NUM_COLS; j++) {
      let cell = row.insertCell(j);
      cell.innerHTML = "";
    }
  }

  return board;
}

function addMines(board, numMines) {
  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    let row = Math.floor(Math.random() * NUM_ROWS);
    let col = Math.floor(Math.random() * NUM_COLS);
    if (board[row][col] !== "X") {
      board[row][col] = "X";
      minesPlaced++;
    }
  }
}

function getAdjacentMines(board, row, col) {
  let numMines = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < NUM_ROWS && j >= 0 && j < NUM_COLS && board[i][j] === "X") {
        numMines++;
      }
    }
  }
  return numMines;
}

function checkWin() {
  let cells = document.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    if (!cell.classList.contains("mine") && !cell.classList.contains("clicked")) {
      return;
    }
  }
  alert("You won!");
}

function cellClick(event) {
  // Get the row and column of the clicked cell
  let cell = event.target;
  let row = cell.parentNode.rowIndex;
  let col = cell.cellIndex;

  // Check if the game is over
  if (isGameOver) {
    return;
  }

  // Check if the cell is a mine
  if (board[row][col] === "X") {
    // Game over
    isGameOver = true;
    cell.classList.add("mine");
    showMines();
    alert("Game over!");
  } else {
    // Click the cell
    clickCell(cell, row, col);
  }

  // Check if the player has won
  checkWin();
}



function clickCell(cell, row, col) {
    // Mark the cell as clicked
    cell.classList.add("clicked");

    // Show the number of adjacent mines
    cell.innerHTML = board[row][col];

    // Check if the cell has no adjacent mines
    if (board[row][col] === 0) {
    // Click all adjacent cells
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i < NUM_ROWS && j >= 0 && j < NUM_COLS) {
            let adjacentCell = document.getElementById("minesweeper").rows[i].cells[j];
            if (!adjacentCell.classList.contains("clicked")) {
            clickCell(adjacentCell, i, j);
            }
        }
        }
    }
    }
}

function showMines() {
    // Show the mines on the board
    let cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let row = cell.parentNode.rowIndex;
    let col = cell.cellIndex;
    if (board[row][col] === "X") {
        cell.classList.add("mine");
    }
    }
}
// Create the "Cheat" button
let button = document.createElement("button");
button.innerHTML = "Cheat";
document.body.appendChild(button);

// Add the click event listener to the button
button.addEventListener("click", cheat);

function cheat() {
  // Get all of the cells
  let cells = document.getElementsByTagName("td");

  // Check if any mines are currently being shown
  let showMines = false;
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    if (cell.classList.contains("mine")) {
      showMines = true;
      break;
    }
  }

  // Show or hide the mines
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let row = cell.parentNode.rowIndex;
    let col = cell.cellIndex;
    if (board[row][col] === "X") {
      if (showMines) {
        cell.classList.remove("mine");
      } else {
        cell.classList.add("mine");
      }
    }
  }
}



