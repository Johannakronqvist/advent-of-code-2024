const fs = require("fs");

// Read and parse the input
const rawData = fs.readFileSync("input.txt", "utf-8");
const reports = rawData
  .trim()
  .split(/\r?\n/)
  .map((line) => line.split(""));

let xmasCounter = 0;
let row = 1;
let col = 1;

//console.log(reports[directions.downLeftCol][directions.downLeftRow]);

//Check if positions in possible directions can form "MAS"
function checkMas1() {
  let upRight = reports[row - 1][col + 1];
  let downLeft = reports[row + 1][col - 1];

  console.log("upRight", upRight);
  console.log("downLeft", downLeft);

  if (upRight === "M") {
    console.log("upRight is M");
    if (downLeft === "S") {
      console.log("downLeft is S");
      checkMas2();
    }
  } else if (upRight === "S") {
    console.log("upRight is S");
    if (downLeft === "M") {
      console.log("downLeft is M");
      checkMas2();
    }
  }
}

function checkMas2() {
  console.log('IN "checkMas2"');

  let upLeft = reports[row - 1][col - 1];
  let downRight = reports[row + 1][col + 1];

  if (upLeft === "M") {
    if (downRight === "S") {
      xmasCounter += 1;
    }
  } else if (upLeft === "S") {
    if (downRight === "M") {
      xmasCounter += 1;
    }
  }
}

// Check if "MAS" exists starting from (row, col) in a given direction
function findXmas() {
  for (let i = 1; i < reports.length - 1; i += 1) {
    let report = reports[i];
    for (let j = 1; j < report.length - 1; j += 1) {
      let char = report[j];
      char === "A" ? checkMas1() : null;
      //Set current col in "Row"
      col += 1;
    }
    col = 1;
    row += 1; //Set current row in "Reports"
  }
}

findXmas();
console.log(`Total XMAS patterns found: ${xmasCounter}`);
