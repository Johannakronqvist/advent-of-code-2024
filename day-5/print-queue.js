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

let hasInCorrectOrder = [];

pageUpdates.filter((row) => {
  // Check all rules for this row
  return pageRules.every((rule) => {
    const firstNum = rule[0];
    const secondNum = rule[1];

    const firstIndex = row.indexOf(firstNum);
    const secondIndex = row.indexOf(secondNum);

    // If both numbers are in the row, check their order
    if (firstIndex !== -1 && secondIndex !== -1) {
      let isCorrectOrder = false;
      firstIndex < secondIndex
        ? (isCorrectOrder = true)
        : hasInCorrectOrder.push(row);

      return isCorrectOrder;
    }

    // If only one number is in the row, or neither is in the row, it doesn't violate the rule
    return true;
  });
});

console.log("hasIncorrectOrder", hasInCorrectOrder);

const ruleDictionary = pageRules.reduce((acc, rule) => {
  rule.forEach((num) => {
    if (!acc[num]) {
      acc[num] = [];
    }
    acc[num].push(rule);
  });
  return acc;
}, {});

const sortedRows = hasInCorrectOrder.map((row) => {
  return row.slice().sort((a, b) => {
    // Find all rules involving these two numbers
    const rulesForA = ruleDictionary[a] || [];
    const rulesForB = ruleDictionary[b] || [];

    // Check rules that specify order between a and b
    const directRule = rulesForA.find(
      (rule) =>
        rule.includes(b) &&
        (rule[0] === a
          ? rule[0] === a && rule[1] === b
          : rule[1] === a && rule[0] === b)
    );

    if (directRule) {
      // If there's a direct rule, use it to determine order
      return directRule[0] === a ? -1 : 1;
    }

    // If no direct rule, check if a has any rules that force it earlier
    const aRulesForcedEarlier = rulesForA.some(
      (rule) => row.includes(rule[1]) && row.indexOf(rule[1]) < row.indexOf(a)
    );

    const bRulesForcedEarlier = rulesForB.some(
      (rule) => row.includes(rule[1]) && row.indexOf(rule[1]) < row.indexOf(b)
    );

    // If a has rules forcing it earlier, it should come first
    if (aRulesForcedEarlier && !bRulesForcedEarlier) {
      return -1;
    }
    if (bRulesForcedEarlier && !aRulesForcedEarlier) {
      return 1;
    }

    // If no clear rule, maintain original relative order
    return row.indexOf(a) - row.indexOf(b);
  });
});

function sumOfMiddlePages(pageRows) {
  let sumOfMiddlePageNumbers = 0;

  pageRows.forEach((row) => {
    const middlePageIndex = Math.floor(row.length / 2);
    sumOfMiddlePageNumbers += row[middlePageIndex];
  });

  return sumOfMiddlePageNumbers;
}

console.log(sumOfMiddlePages(sortedRows));
