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

function isValidPosition(row, col) {
  return (
    row >= 0 &&
    row < guardPathData.length &&
    col >= 0 &&
    col < guardPathData[0].length
  );
}

let haveBeenHere = [[guardPositionRow, guardPositionCol]];

function hasBeenVisited(row, col) {
  let checkIfVisited = haveBeenHere.some((position) => {
    return position[0] === row && position[1] === col;
  });
  console.log("check if visited", checkIfVisited);
  return checkIfVisited;
}

let stepCounter = 1;

function checkNextStep() {
  let newRow = guardPositionRow + directionRow[currentDirection];
  let newCol = guardPositionCol + directionCol[currentDirection];

  if (isValidPosition(newRow, newCol)) {
    const potentialNextStep = guardPathData[newRow][newCol];

    if (potentialNextStep === "#") {
      console.log("Guard encountered '#', turning 90 degrees.");
      turn90Degrees();
    }

    if (potentialNextStep !== "#") {
      const alreadyVisited = hasBeenVisited(newRow, newCol);
      guardPositionRow = newRow;
      guardPositionCol = newCol;

      if (!alreadyVisited) {
        haveBeenHere.push([guardPositionRow, guardPositionCol]);
        stepCounter++; // increment here for new positions
      }

      return true;
    }
  } else {
    console.log("Guard reached the edge of the grid.");
    nextStep = "-";
  }
  return false;
}

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

let nextStep = guardPathData[guardPositionRow][guardPositionCol];

function move() {
  while (nextStep !== "#" && nextStep !== "-") {
    checkNextStep();

    if (nextStep === "-") break;
  }
}

while (nextStep !== "-") {
  move();
}

console.log("Final Step Counter:", stepCounter);
