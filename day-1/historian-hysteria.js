const fs = require("fs");

// Read the file synchronously (or use async methods)
const rawData = fs.readFileSync("input.txt", "utf-8");

const leftList = [];
const rightList = [];

// Split rawData into left and right list
rawData
  .trim()
  .split("\n")
  .map((line) => {
    const [a, b] = line.split("   ").map(Number);
    leftList.push(a);
    rightList.push(b);
  });

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

function getDifference(leftNum, rightNum) {
  return Math.abs(leftNum - rightNum);
}

let totalDistance = 0;

for (let i = 0; i < leftList.length; i++) {
  let difference = getDifference(leftList[i], rightList[i]);
  totalDistance += difference;
}

console.log(totalDistance);

//30000062 too high
