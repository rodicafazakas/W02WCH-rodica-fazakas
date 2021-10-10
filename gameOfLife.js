// game of life
const numberOfRows = 10;
const numberOfColumns = 13;

// initialize current state and next state matrices and fill them with zeros
let matrix = new Array(numberOfRows).fill(0).map(() => new Array(numberOfColumns).fill(0));

// we create the matrix of divs that will be painted in the HTML file
function createMatrixHTML() {
  const world = document.querySelector('.world');
  const matrixHTML = document.createElement('table');
  matrixHTML.className = 'matrixHTML';

  for (let i = 0; i < numberOfRows; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < numberOfColumns; j++) {
      const cell = document.createElement('td');
      const textToCell = document.createTextNode("");
      cell.appendChild(textToCell);

      cell.className = 'dead';
      cell.setAttribute('id', `${i}_${j}`);
      cell.onclick = cellClick;
      tr.appendChild(cell);
    }
    matrixHTML.appendChild(tr);
  }
  world.appendChild(matrixHTML);
}

function cellClick() {
  // the user clicks on the cell to enter the initial pattern and
  // mutate the initial matrix of dead cells
  this.innerHTML = '';
  const newValue = document.createTextNode("");
  this.appendChild(newValue);
  this.className = 'alive';
  const [row, column] = this.id.split('_').map((x) => +x);
  matrix[row][column] = 1;
}

/* define pattern generation */

function countNeighbours(row, column, matrix) {
  let count = 0;

  function countOnFirstRow() {
    if (column === 0) {
      count += matrix[row][column + 1];
      count += matrix[row + 1][column];
      count += matrix[row + 1][column + 1];
    } else if (column === numberOfColumns - 1) {
      count += matrix[row][column - 1];
      count += matrix[row + 1][column];
      count += matrix[row + 1][column - 1];
    } else {
      // 1. On the same row
      count += matrix[row][column - 1];
      count += matrix[row][column + 1];

      // 2. One row down
      count += matrix[row + 1][column - 1];
      count += matrix[row + 1][column];
      count += matrix[row + 1][column + 1];
    }

    return count;
  }

  function countOnLastRow() {
    if (column === 0) {
      count += matrix[row][column + 1];
      count += matrix[row - 1][column];
      count += matrix[row - 1][column + 1];
    } else if (column === numberOfColumns - 1) {
      count += matrix[row][column - 1];
      count += matrix[row - 1][column];
      count += matrix[row - 1][column - 1];
    } else {
      // 1. On the same row
      count += matrix[row][column - 1];
      count += matrix[row][column + 1];

      // 2. One row down
      count += matrix[row - 1][column - 1];
      count += matrix[row - 1][column];
      count += matrix[row - 1][column + 1];
    }

    return count;
  }

  function countOnMiddleRow() {
    if (column === 0) {
      count += matrix[row][column + 1];
      count += matrix[row - 1][column];
      count += matrix[row - 1][column + 1];
      count += matrix[row + 1][column];
      count += matrix[row + 1][column + 1];
    } else if (column === numberOfColumns - 1) {
      count += matrix[row][column - 1];
      count += matrix[row - 1][column];
      count += matrix[row - 1][column - 1];
      count += matrix[row + 1][column];
      count += matrix[row + 1][column - 1];
    } else {
      // 1. On the same row
      count += matrix[row][column - 1];
      count += matrix[row][column + 1];

      // 2. One row down
      count += matrix[row - 1][column - 1];
      count += matrix[row - 1][column];
      count += matrix[row - 1][column + 1];

      // 2. One row up
      count += matrix[row + 1][column - 1];
      count += matrix[row + 1][column];
      count += matrix[row + 1][column + 1];
    }

    return count;
  }

  if (row === 0) {
    count = countOnFirstRow();
  } else if (row === numberOfRows - 1) {
    count = countOnLastRow();
  } else {
    count = countOnMiddleRow();
  }

  return count;
}

// define the rules that take us to the next state matrix
function transition() {
  const nextMatrix = new Array(numberOfRows).fill(0).map(() => new Array(numberOfColumns).fill(0));

  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      const numberOfNeighbours = countNeighbours(row, col, matrix);
      // apply the rules of the game
      // if alive, stays alive if it has min 2 neighbours alive; otherwise it dies
      if (matrix[row][col] === 1) {
        if (numberOfNeighbours < 2) {
          nextMatrix[row][col] = 0;
        } else if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
          nextMatrix[row][col] = 1;
        } else if (numberOfNeighbours > 3) {
          nextMatrix[row][col] = 0;
        }
      } else if (matrix[row][col] === 0) {
        // if dead, it becomes alive if it has exactly 3 neighbours alive
        if (numberOfNeighbours === 3) {
          nextMatrix[row][col] = 1;
        } else {
          nextMatrix[row][col] = 0;
        }
      }
    }
  }
  matrix = nextMatrix;
}

// update the world
function updateWorld() {
  let cell = '';
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      cell = document.getElementById(`${row}_${col}`);
      if (matrix[row][col] == 0) {
        cell.setAttribute('class', 'dead');
        cell.innerHTML = '';
        const newValue = document.createTextNode("");
        cell.appendChild(newValue);
      } else {
        cell.setAttribute('class', 'alive');
        cell.innerHTML = '';
        const newValue = document.createTextNode("");
        cell.appendChild(newValue);
      }
    }
  }
}

module.exports = {
  countNeighbours
};
