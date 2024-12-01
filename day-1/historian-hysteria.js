const fs = require("fs");

// Read the file synchronously (or use async methods)
const rawData = fs.readFileSync("input.txt", "utf-8");

//PART 1

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

//PART 2

let similarityScore = 0;

for (let i = 0; i < leftList.length; i++) {
  let appearancesInRightList = rightList.filter((num) => num === leftList[i]);
  console.log(appearancesInRightList);

  similarityScore += appearancesInRightList.length * leftList[i];
}

console.log(similarityScore);
