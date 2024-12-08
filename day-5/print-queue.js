const fs = require("fs");

const pageInput = fs.readFileSync("pageUpdates.txt", "utf-8");
const ruleInput = fs.readFileSync("updateRules.txt", "utf-8");

const pageUpdates = pageInput
  .trim()
  .split("\n")
  .map((row) => row.split(",").map(Number));

const pageRules = ruleInput
  .trim()
  .split("\n")
  .map((row) => row.split("|").map(Number));

/*const ruleDictionary = pageRules.reduce((acc, rule) => {
  rule.forEach((num) => {
    if (!acc[num]) {
      acc[num] = [];
    }
    acc[num].push(rule);
  });
  return acc;
}, {});*/

const hasCorrectOrder = pageUpdates.filter((row) => {
  // Check all rules for this row
  return pageRules.every((rule) => {
    const firstNum = rule[0];
    const secondNum = rule[1];

    const firstIndex = row.indexOf(firstNum);
    const secondIndex = row.indexOf(secondNum);

    // If both numbers are in the row, check their order
    if (firstIndex !== -1 && secondIndex !== -1) {
      return firstIndex < secondIndex;
    }

    // If only one number is in the row, or neither is in the row, it doesn't violate the rule
    return true;
  });
});

let sumOfMiddlePageNumbers = 0;

hasCorrectOrder.forEach((row) => {
  const middlePageIndex = Math.floor(row.length / 2);
  sumOfMiddlePageNumbers += row[middlePageIndex];
  console.log(row[middlePageIndex]);
});

console.log(sumOfMiddlePageNumbers);
