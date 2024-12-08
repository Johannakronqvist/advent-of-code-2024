const fs = require("fs");

const rawData = fs.readFileSync("input.txt", "utf-8");

const guardPathData = rawData
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const directionRow = {
  "^": -1, // Move up
  v: 1, // Move down
  ">": 0, // No vertical movement
  "<": 0, // No vertical movement
};

const directionCol = {
  "^": 0, // No horizontal movement
  v: 0, // No horizontal movement
  ">": 1, // Move right
  "<": -1, // Move left
};

let currentDirection;
let guardPositionRow;
let guardPositionCol;

// Find the guard's starting position and direction
for (let i = 0; i < guardPathData.length; i++) {
  for (let j = 0; j < guardPathData[i].length; j++) {
    if ("^v<>".includes(guardPathData[i][j])) {
      currentDirection = guardPathData[i][j];
      guardPositionRow = i;
      guardPositionCol = j;
      break;
    }
  }
  if (currentDirection) break;
}

// Function to check if a position is within bounds
function isValidPosition(row, col) {
  return (
    row >= 0 &&
    row < guardPathData.length &&
    col >= 0 &&
    col < guardPathData[0].length
  );
}

// Function to calculate the next step
function checkNextStep() {
  let newRow = guardPositionRow + directionRow[currentDirection];
  let newCol = guardPositionCol + directionCol[currentDirection];

  if (isValidPosition(newRow, newCol)) {
    const potentialNextStep = guardPathData[newRow][newCol];

    if (potentialNextStep === "#") {
      // Stop movement and turn without changing position
      console.log("Guard encountered '#', turning 90 degrees.");
      turn90Degrees();
    } else {
      // Move to the new position
      nextStep = potentialNextStep;
      guardPositionRow = newRow;
      guardPositionCol = newCol;
      return true; // Indicates the guard moved
    }
  } else {
    console.log("Guard reached the edge of the grid.");
    nextStep = "-"; // Indicate end of movement
  }
  return false; // Indicates no movement
}

// Function to turn the guard 90 degrees clockwise
function turn90Degrees() {
  switch (currentDirection) {
    case "^":
      currentDirection = ">";
      break;
    case ">":
      currentDirection = "v";
      break;
    case "v":
      currentDirection = "<";
      break;
    case "<":
      currentDirection = "^";
      break;
  }
}

// Initialize step counter and nextStep
let stepCounter = 0;
let nextStep = guardPathData[guardPositionRow][guardPositionCol];

function move() {
  while (nextStep !== "#" && nextStep !== "-") {
    const moved = checkNextStep();
    if (moved) {
      stepCounter++; // Only increment if the guard moved
    }
    if (nextStep === "-") break; // Stop if out of bounds
  }
}

// Outer loop: Continue until the guard reaches the edge
while (nextStep !== "-") {
  move();
}

console.log("Final Step Counter:", stepCounter);

//6226, 6223, 5802
