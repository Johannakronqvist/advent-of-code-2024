const fs = require("fs");

const rawData = fs.readFileSync("input.txt", "utf-8");

let reports = rawData
  .trim()
  .split("\n")
  .map((line) => line.split(" ").map(Number));

console.log(reports);

let safeReports = 0;

function ascendingSafeReport(report) {
  let skippedOne = false;
  for (let i = 0; i < report.length - 1; i++) {
    const dif = report[i + 1] - report[i];
    if (dif < 1 || dif > 3) {
      if (skippedOne || !unsafeToSafeAscending(report, i)) {
        return false;
      }
      skippedOne = true;
    }
  }
  return true;
}

function descendingSafeReport(report) {
  let skippedOne = false;
  for (let i = 0; i < report.length - 1; i++) {
    const dif = report[i + 1] - report[i];
    if (dif > -1 || dif < -3) {
      if (skippedOne || !unsafeToSafeDescending(report, i)) {
        return false;
      }
      skippedOne = true;
    }
  }
  return true;
}

function unsafeToSafeAscending(report, value) {
  const difSkipOne = report[value + 2] - report[value];
  return difSkipOne >= 1 && difSkipOne <= 3;
}

function unsafeToSafeDescending(report, value) {
  const difSkipOne = report[value + 2] - report[value];
  return difSkipOne >= -3 && difSkipOne <= -1;
}

reports.forEach((report) => {
  if (ascendingSafeReport(report) || descendingSafeReport(report)) {
    safeReports += 1;
  }
});

console.log(safeReports);
