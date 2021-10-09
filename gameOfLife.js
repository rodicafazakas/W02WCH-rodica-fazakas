// game of life
const numberOfRows = 5;
const numberOfColumns = 5;

// pass the values of the matrixHTML to the current state matrix 
let matrix = new Array(numberOfRows).fill(0).map( () => new Array(numberOfColumns).fill(0) );

// we create the matrix of divs that will be painted in the HTML file
function createMatrixHTML() {
  let world = document.querySelector(".world");
  let matrixHTML = document.createElement("table");
  matrixHTML.className = "matrixHTML";

  for (let i=0; i < numberOfRows; i++) {
    let tr = document.createElement("tr");
    
    for (let j=0; j< numberOfColumns; j++) {
      let cell = document.createElement("td");
      var textToCell = document.createTextNode(0);
      cell.appendChild(textToCell);
      cell.className = "dead";
      cell.setAttribute("id", i + "_" + j);
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
  this.innerHTML = "";
  let newValue = document.createTextNode(1);
  this.appendChild(newValue); 
  this.className = "alive"; 
  let [row, column] =this.id.split("_").map(x=> +x);
  matrix[row][column] = 1;
}

//let matrixInitial = document.getElementsByTagName("table");
//console.log(matrixInitial);   


let nextMatrix = new Array(numberOfRows).fill(0)
                              .map( () => new Array(numberOfColumns).fill(0) );


// fill the array                            
//matrix[1][2] = 1;
//matrix[2][2] = 1;
//matrix[3][2] = 1;

//console.log(matrix);

// count the neighbours
function countNeighbours(row,columna) {
   let count = 0;

  if (row === 0) {
    count = countOnFirstRow();
  } else if (row === numberOfRows - 1) {
    count = countOnLastRow();
  } else {
    count = countOnMiddleRow();
  }
  
  return count; 


  function countOnFirstRow() {
    if (columna === 0) {
      count += matrix[row][columna + 1];
      count += matrix[row + 1][columna];
      count += matrix[row + 1][columna + 1];
    } else if (columna === numberOfColumns - 1) {
      count += matrix[row][columna - 1];
      count += matrix[row + 1][columna];
      count += matrix[row + 1][columna - 1];
    } else {
      // 1. On the same row
      count += matrix[row][columna - 1];
      count += matrix[row][columna + 1];

      // 2. One row down 
      count += matrix[row + 1][columna - 1];
      count += matrix[row + 1][columna];
      count += matrix[row + 1][columna + 1];
    }

    return count;
  }

  function countOnLastRow() {
    if (columna === 0) {
      count += matrix[row][columna + 1];
      count += matrix[row - 1][columna];
      count += matrix[row - 1][columna + 1];
    } else if (columna === numberOfColumns - 1) {
      count += matrix[row][columna - 1];
      count += matrix[row - 1][columna];
      count += matrix[row - 1][columna - 1];
    } else {
      // 1. On the same row
      count += matrix[row][columna - 1];
      count += matrix[row][columna + 1];

      // 2. One row down 
      count += matrix[row - 1][columna - 1];
      count += matrix[row - 1][columna];
      count += matrix[row - 1][columna + 1];
    }

    return count;
  }

  function countOnMiddleRow() {
    if (columna === 0) {
      count += matrix[row][columna + 1];
      count += matrix[row - 1][columna];
      count += matrix[row - 1][columna + 1];
      count += matrix[row + 1][columna];
      count += matrix[row + 1][columna + 1];
    } else if (columna === numberOfColumns - 1) {
      count += matrix[row][columna - 1];
      count += matrix[row - 1][columna];
      count += matrix[row - 1][columna - 1];
      count += matrix[row + 1][columna];
      count += matrix[row + 1][columna - 1];
    } else {
      // 1. On the same row
      count += matrix[row][columna - 1];
      count += matrix[row][columna + 1];

      // 2. One row down 
      count += matrix[row - 1][columna - 1];
      count += matrix[row - 1][columna];
      count += matrix[row - 1][columna + 1];

      // 2. One row up 
      count += matrix[row + 1][columna - 1];
      count += matrix[row + 1][columna];
      count += matrix[row + 1][columna + 1];
    }

    return count;
  }
}


//console.log(countNeighbours(2,1));
//console.log(countNeighbours(0,1));
//console.log(countNeighbours(4,2));



// define the rules that take us to the next state matrix
function transition() {
  console.log(matrix);
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0;  col < numberOfColumns; col++) {
      let numberOfNeighbours = countNeighbours(row,col);
      // apply the rules of the game  
      // if alive, stays alive if it has min 2 neighbours alive; otherwise it dies
      if (matrix[row][col]=== 1) {
        if (numberOfNeighbours < 2) {
          nextMatrix[row][col] = 0;
        } else if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
          nextMatrix[row][col] = 1;
        } else if (numberOfNeighbours > 3) {
          nextMatrix[row][col] = 0;
        }
      } else if (matrix[row][col]===0) {
        // if dead, it becomes alive if it has exactly 3 neighbours alive
        if (numberOfNeighbours===3) {
          nextMatrix[row][col] = 1;
        } else {
          nextMatrix[row][col] = 0;
        }
      }
    }  
  } 
console.log(nextMatrix);
}

// transition();
// console.log(nextMatrix);

// update the world
function updateWorld() {
  let cell='';
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0;  col < numberOfColumns; col++) {
            cell = document.getElementById(row + '_' + col);
            if (nextMatrix[row][col] == 0) {
                cell.setAttribute('class', 'dead');
                cell.innerHTML = "";
                let newValue = document.createTextNode(0);
                cell.appendChild(newValue); 
            } else {
                cell.setAttribute('class', 'alive');
                cell.innerHTML = "";
                let newValue = document.createTextNode(1);
                cell.appendChild(newValue); 
            }
    }
  }
}



