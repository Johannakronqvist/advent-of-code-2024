const fs = require("fs");

const rawData = fs.readFileSync("input.txt", "utf-8");

//PART 1

// Split rawData into arrays of numbers
let reports = rawData
  .trim()
  .split("\n")
  .map((line) => line.split(" ").map(Number));

let safeReports = 0;

function ascendingSafeReport(report) {
  for (let i = 0; i < report.length; i++) {
    const dif = report[i + 1] - report[i];
    if (dif < 1 || dif > 3) {
      return false;
    }
  }

  return true;
}

function descendingSafeReport(report) {
  for (let i = 0; i < report.length; i++) {
    const dif = report[i + 1] - report[i];
    if (dif > -1 || dif < -3) {
      return false;
    }
  }

  return true;
}

reports.forEach((report) => {
  if (ascendingSafeReport(report) || descendingSafeReport(report)) {
    safeReports += 1;
    console.log(safeReports);
  }
});
