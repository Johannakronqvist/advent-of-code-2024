const fs = require("fs");

// Read and parse the input
const rawData = fs.readFileSync("input.txt", "utf-8");
const reports = rawData
  .trim()
  .split(/\r?\n/)
  .map((line) => line.split(""));

let xmasCounter = 0;

// All 8 possible directions (x, y): right, left, down, up, diagonal directions
const directions = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
  [1, 1], // Diagonal Down-Right
  [1, -1], // Diagonal Down-Left
  [-1, 1], // Diagonal Up-Right
  [-1, -1], // Diagonal Up-Left
];

// Check if "XMAS" exists starting from (row, col) in a given direction
function checkDirection(data, row, col, dirX, dirY) {
  const target = "XMAS";
  const rows = data.length;
  const cols = data[0].length;

  for (let k = 0; k < target.length; k++) {
    const newRow = row + k * dirX;
    const newCol = col + k * dirY;

    // Check bounds and character match
    if (
      newRow < 0 ||
      newRow >= rows ||
      newCol < 0 ||
      newCol >= cols ||
      data[newRow][newCol] !== target[k]
    ) {
      return false;
    }
  }
  return true;
}

function findXmas(data) {
  const rows = data.length;
  const cols = data[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Check for "X" as the starting character
      if (data[row][col] === "X") {
        // Test all directions
        for (const [dirX, dirY] of directions) {
          if (checkDirection(data, row, col, dirX, dirY)) {
            xmasCounter++;
            console.log(
              `XMAS found at (${row}, ${col}) in direction (${dirX}, ${dirY})`
            );
          }
        }
      }
    }
  }
}

// Execute the search
findXmas(reports);
console.log(`Total XMAS patterns found: ${xmasCounter}`);
