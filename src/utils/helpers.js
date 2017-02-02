/* return the sum of values in top left corner of puzzle */
export const getCurrentSum = (puzzle) => {
  let currentSum = 0;
  let n = puzzle.length / 2;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      currentSum += puzzle[row][col];
    } 
  }
  return currentSum;
}

/* determine if given cell is a corner of a puzzle of size n */
export const isCorner = (n, row, col) => {
  return [
    [0,0],
    [0,n-1],
    [n-1, n-1],
    [n-1, 0]
  ].findIndex(x => x[0] == row && x[1] == col) > -1;
}

/* determine if given cell is on the edge of a puzzle of size n */
export const isEdge = (n, row, col) => {
  return ((row === 0 || row === n-1) || (col === 0 || col === n-1));
}

/* compute the maximum value that could be in the top left
 * corner of the puzzle.
 */
export const findMaxSum = (puzzle) => {
  let maxSum = 0;
  let n = puzzle.length / 2;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      maxSum = maxSum + Math.max(
        Math.max(puzzle[row][col], puzzle[row][((2*n)-1) - col]),
        Math.max(puzzle[((2*n)-1) - row][col], puzzle[((2*n)-1) - row][((2*n)-1) - col])
      );
    }
  }
  return maxSum;
}


export const handleMouseMove = (event) => {
  let x = event.pageX - event.target.offsetLeft;
  let y = event.pageY - event.target.offsetTop;
  
  if (x < y) {
    event.target.classList.add("direction-hor");
    event.target.classList.remove("direction-vert");
  } else {
    event.target.classList.add("direction-vert");
    event.target.classList.remove("direction-hor");
  }

}
